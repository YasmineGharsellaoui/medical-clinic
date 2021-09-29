import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { DatePipe } from '@angular/common'
import { IndexPageComponent } from './index-page/index-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatIconModule, MatButtonModule, MatSidenavModule, MatToolbarModule,
  MatTableModule, MatFormFieldModule, MatDialogModule, MatInputModule,
  MatSelectModule, MatCardModule, MatDatepickerModule, MatNativeDateModule,
} from '@angular/material';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FullCalendarModule } from '@fullcalendar/angular';
import { PatientsComponent } from './patients/patients.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppointmentsAddComponent } from './appointments-add/appointments-add.component';
import { ServicePricesComponent } from './service-prices/service-prices.component';
import { AppComponent } from './app.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { PatientAddComponent } from './patient-add/patient-add.component';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { ServiceAddComponent } from './service-add/service-add.component';
import { PatientHistoryComponent } from './patient-history/patient-history.component';

const appRoutes: Routes = [
  {
    path: 'appointments',
    component: AppointmentsComponent,
    data: { title: 'Appointments' }
  },
  {
    path: 'appointments-add',
    component: AppointmentsAddComponent,
    data: { title: 'Add appointment' }
  },
  {
    path: 'patient-add',
    component: PatientAddComponent,
    data: { title: 'Add patient' }
  },
  {
    path: 'patientHistory/:patientId',
    component: PatientHistoryComponent,
    data: { title: 'Patient history' }
  },
  {
    path: 'patients',
    component: PatientsComponent,
    data: { title: 'Patients' }
  },
  {
    path: 'service-prices',
    component: ServicePricesComponent,
    data: { title: 'Services nomenclature' }
  },
  {
    path: 'service-add',
    component: ServiceAddComponent,
    data: { title: 'Service' }
  },
  {
    path: 'index-page',
    component: IndexPageComponent,
    data: { title: 'Medical clinic' }
  },
  {
    path: 'confirmation',
    component: ConfirmationDialogComponent,
    data: { title: 'Confirmation' }
  },
  {
    path: '',
    redirectTo: '/index-page',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AppointmentsComponent,
    AppointmentsAddComponent,
    ServicePricesComponent,
    IndexPageComponent,
    PatientsComponent,
    NavbarComponent,
    PatientAddComponent,
    ConfirmationDialogComponent,
    ServiceAddComponent,
    PatientHistoryComponent,
  ], 
  imports: [
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatExpansionModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    NgxMaterialTimepickerModule,
  ],
  providers: [DatePipe,],
  bootstrap: [AppComponent]
})
export class AppModule {
}
