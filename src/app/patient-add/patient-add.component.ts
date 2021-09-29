import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestService } from '../rest.service';


@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.css']
})
export class PatientAddComponent implements OnInit {

  patientForm: any = {};
  viewMode: string;
  patient: any = {
    name: '',
    cnp: '',
    dateOfBirth: ''
  }

  constructor(
    public rest: RestService,
    public dialogRef: MatDialogRef<PatientAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.viewMode = data.viewMode;
    this.patient = data.patient || this.patient;
  }

  ngOnInit() {
    this.patientForm = new FormGroup({
      name: new FormControl(this.patient.name, [Validators.required, Validators.maxLength(13)]),
      cnp: new FormControl(this.patient.cnp, [Validators.required, Validators.maxLength(13), Validators.minLength(13)]),
      dateOfBirth: new FormControl(new Date(this.patient.dateOfBirth), Validators.required)
    });
  }

  save() {
    if (!this.patientForm.valid) {
      return;
    }
    const formValue = this.patientForm.value;
    if (this.viewMode == 'edit') {
      this.updatePatient(formValue).subscribe(updatedPatient => {
        this.dialogRef.close(updatedPatient);
      })
    } else {
      this.createPatient(formValue).subscribe(newPatient => {
        this.dialogRef.close(newPatient);
      })
    }
  }

  updatePatient(patientFormValue) {
    return this.rest.updatePatient(this.patient.id, patientFormValue);
  }

  createPatient(patientFormValue) {
    return this.rest.createPatient(patientFormValue)
  }

  cancel() {
    this.dialogRef.close({ canceled: true });
  }

  hasError(controlName, errorName) {
    return this.patientForm.controls[controlName].hasError(errorName);
  }
}
