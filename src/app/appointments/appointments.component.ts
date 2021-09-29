import { Component, OnInit, OnDestroy } from '@angular/core';
import { RestService } from '../rest.service';
import { AppointmentsAddComponent } from '../appointments-add/appointments-add.component';
import { ActivatedRoute, Router } from '@angular/router';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DatePipe } from '@angular/common'
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit, OnDestroy {

  private appointments = [];
  private services = [];
  private events = [];
  private subscriptions = [];
  private calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin];

  constructor(
    public rest: RestService,
    public datepipe: DatePipe,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.subscriptions.push(this.loadAppointments());
    this.subscriptions.push(this.loadService());
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private loadService() {
    this.services = [];
    return this.rest.getServices().subscribe((data: any) => {
      this.services = data;
    });
  }

  private loadAppointments() {
    this.appointments = [];

    return this.rest.getAppointments().subscribe((data: any) => {
      this.appointments = data;
      this.events = this.appointments.map(appointment => {
        return {
          title: appointment.patientName,
          start: new Date(appointment.appointmentDate),
          appointmentId: appointment.appointmentId
        }
      });
    });
  }

  openDialog(arg: any): void {
    const dialogRef = this.dialog.open(AppointmentsAddComponent, {
      data: { services: this.services, date: arg.date }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.canceled) {
        return;
      }
      this.events = this.events.concat({
        appointmentId: result.appointmentId,
        title: result.patientName,
        start: result.appointmentDate,
        allDay: false
      })
    });
  }


  addAppointment() {
    this.router.navigate(['/appointments-add']);
  }

  handleDateClick(arg) {
    this.openDialog(arg);
  }
  handleEventClick(arg) {
    const appointmentId = arg.event.extendedProps.appointmentId;
    console.log(' appointment click: ' + JSON.stringify(appointmentId));
  }
}
