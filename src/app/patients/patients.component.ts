import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource} from '@angular/material/table';
import { PatientAddComponent } from '../patient-add/patient-add.component';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  dataSource: any = undefined;
  displayedColumns: string[] = ['id', 'name', 'cnp', 'dateOfBirth', 'actions', 'history'];

  constructor(public rest: RestService,
    public datepipe: DatePipe,
    public dialog: MatDialog,
    private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.loadPatients();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private loadPatients() {
    this.rest.getPatients().subscribe((data: {}) => {
      let patients: any = data;
      patients.forEach(patient => {
        patient.dateOfBirthText = this.datepipe.transform(patient.dateOfBirth, 'yyyy-MMM-dd');
      });
      this.dataSource = new MatTableDataSource(patients);
    })
  }

  add() {
    const dialogRef = this.dialog.open(PatientAddComponent,
      { data: { viewMode: 'add' } });

    dialogRef.afterClosed().subscribe(result => {
      if (result.canceled) {
        // do nothing
      } else {
        this.loadPatients();
      }
    });
  }

  edit(patientId) {
    const patient = this.dataSource.filteredData.find(p => p.id === patientId);
    if (!patient) {
      console.error(`Cannot find patient ${patientId} to update.`);
      return;
    }

    const dialogRef = this.dialog.open(PatientAddComponent,
      { data: { viewMode: 'edit', patient: patient } });

    dialogRef.afterClosed().subscribe(result => {
      if (result.canceled) {
        // do nothing
      } else {
        this.loadPatients();
      }
    });
  }

  delete(patientId) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,
      { data: { message: `Are you sure you want do delete this patient?` } });

    dialogRef.afterClosed().subscribe(result => {
      if (result.confirmed) {
        this.rest.deletePatient(patientId).subscribe(any => {
          this.loadPatients();
        });
      }
    });
  }

}
