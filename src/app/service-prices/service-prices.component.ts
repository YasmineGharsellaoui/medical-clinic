import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { MatDialog } from '@angular/material/dialog';
import { ServiceAddComponent } from '../service-add/service-add.component';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-service-prices',
  templateUrl: './service-prices.component.html',
  styleUrls: ['./service-prices.component.css']
})
export class ServicePricesComponent implements OnInit {

  services: any = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'actions'];

  constructor(public rest: RestService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
    this.rest.getServices().subscribe((data: {}) => {
      this.services = data;
      this.services.forEach( (service, index) => {
        service.priceText = service.price ? service.price + ' RON' : ' - ';
        service.index = index + 1;
      })
    })
  }

  add() {
    const dialogRef = this.dialog.open(ServiceAddComponent,
      { data: { viewMode: 'add' } });

    dialogRef.afterClosed().subscribe(result => {
      if (result.canceled) {
        // do nothing
      } else {
        this.loadServices();
      }
    });
  }

  edit(serviceId) {
    const service = this.services.find(p => p.id === serviceId);
    if (!service) {
      console.error(`Cannot find service ${serviceId} to update.`);
      return;
    }

    const dialogRef = this.dialog.open(ServiceAddComponent,
      { data: { viewMode: 'edit', service: service } });

    dialogRef.afterClosed().subscribe(result => {
      if (result.canceled) {
        // do nothing
      } else {
        this.loadServices();
      }
    });
  }

  delete(serviceId) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,
      { data: { message: `Are you sure you want do delete this service?` } });

    dialogRef.afterClosed().subscribe(result => {
      if (result.confirmed) {
        this.rest.deleteService(serviceId).subscribe(any => {
          this.loadServices();
        });
      }
    });
  }

}
