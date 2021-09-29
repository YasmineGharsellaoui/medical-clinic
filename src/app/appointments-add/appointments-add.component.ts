import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-appointments-add',
  templateUrl: './appointments-add.component.html',
  styleUrls: ['./appointments-add.component.css']
})
export class AppointmentsAddComponent implements OnInit {

  private appointment;
  private patient;
  private appointmentForm;
  private services;
  private date: Date;

  constructor(
    public rest: RestService,
    public dialogRef: MatDialogRef<AppointmentsAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.services = data.services || [];
    this.date = data.date;
    this.appointment = data.appointment;
  }

  ngOnInit() {
    this.appointmentForm = new FormGroup({
      cnp: new FormControl('', [Validators.required, Validators.maxLength(13), Validators.minLength(13)]),
      time: new FormControl('', ), 
      services: new FormControl('', [Validators.required])
    });
  }

  save() {
    if (!this.appointmentForm.valid) {
      return;
    }

    const formValues = this.appointmentForm.value;
    this.rest.findPatientByCnp(formValues.cnp).subscribe(res => {
      const patient = res;
      formValues.patient = patient
      this.createAppointment(formValues).subscribe(newAppointment => {
        this.dialogRef.close({
          patientName: patient.name,
          appointmentDate: newAppointment.appointmentDate,
          appointmentId: newAppointment.id
        });
      })

    },
    err => {
      console.log(err);
      this.appointmentForm.controls['cnp'].setErrors({'notexist': true});
    } );
  }

  createAppointment(appointmentFormValue) {
    const time = appointmentFormValue.time;
    const meridian = time.slice(6, 8);
    const hours = Number.parseInt(time.slice(0, 2));
    let date = new Date(this.date);
    date.setHours(meridian == 'pm' ? hours + 12 : hours);
    date.setMinutes(Number.parseInt(time.slice(3, 5)))
    const appointment = {
      patient: appointmentFormValue.patient,
      appointmentDate: date,
      servicesIds: appointmentFormValue.services
    }
    return this.rest.createAppointment(appointment)
  }

  cancel() {
    this.dialogRef.close({ canceled: true });
  }

  hasError(controlName, errorName) {
    return this.appointmentForm.controls[controlName].hasError(errorName);
  }

  checkCnpDoesntExist(control: AbstractControl) {
    return this.rest.findPatientByCnp(control.value).subscribe(res => {
      this.patient = res;
      return res ? null : { cnpDoesntExist: true };
    });
  }

}
