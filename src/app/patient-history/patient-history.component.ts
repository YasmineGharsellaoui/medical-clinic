import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '../rest.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.css']
})
export class PatientHistoryComponent implements OnInit {

  appointments: any;
  patient: any;
  totalCost: number = 0;

  constructor(
    private route: ActivatedRoute,
    public datepipe: DatePipe,
    public rest: RestService) {
    this.appointments = [];
    this.patient = {};
  }

  ngOnInit() {
    const patientId = this.route.snapshot.params.patientId

    this.rest.findPatientById(patientId).subscribe((data: {}) => {
      this.patient = data;
      this.patient.dateOfBirthText = this.datepipe.transform(this.patient.dateOfBirth, 'yyyy-MMM-dd');
    });

    this.rest.getPatientAppointments(patientId).subscribe((data: any) => {
      this.appointments = data.sort((a: any, b: any) => {
        return new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime();
      });

      // calculate total cost per appointment
      this.appointments.forEach(a => {
        a.totalCost = 0;
        a.servicesSummary.forEach(s => {
          a.totalCost += s.price ? s.price : 0;
        });
      })

      // calculate total cost report
      this.appointments.forEach(a => {
        a.dateText = this.datepipe.transform(a.appointmentDate, 'yyyy-MMM-dd hh:mm');
        this.totalCost += a.totalCost;
      });
    });

  }

}
