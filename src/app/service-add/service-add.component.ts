import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-service-add',
  templateUrl: './service-add.component.html',
  styleUrls: ['./service-add.component.css']
})
export class ServiceAddComponent implements OnInit {

  serviceForm: any = {};
  viewMode: string;
  service: any = {
    name: '',
    description: '',
    price: ''
  }

  constructor(
    public rest: RestService,
    public dialogRef: MatDialogRef<ServiceAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.viewMode = data.viewMode;
    this.service = data.service || this.service;
  }

  ngOnInit() {
    this.serviceForm = new FormGroup({
      name: new FormControl(this.service.name, [Validators.required]),
      description: new FormControl(this.service.description),
      price: new FormControl(this.service.price, Validators.required)
    });
  }

  save() {
    if (!this.serviceForm.valid) {
      return;
    }
    const formValue = this.serviceForm.value;
    if (this.viewMode == 'edit') {
      this.updateService(formValue).subscribe(updatedService => {
        this.dialogRef.close(updatedService);
      })
    } else {
      this.createService(formValue).subscribe(newService => {
        this.dialogRef.close(newService);
      })
    }
  }

  updateService(serviceFormValue) {
    return this.rest.updateService(this.service.id, serviceFormValue);
  }

  createService(serviceFormValue) {
    return this.rest.createService(serviceFormValue)
  }

  cancel() {
    this.dialogRef.close({ canceled: true });
  }

  hasError(controlName, errorName) {
    return this.serviceForm.controls[controlName].hasError(errorName);
  }

}
