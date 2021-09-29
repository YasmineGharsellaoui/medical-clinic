import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://localhost:8888/api';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) {
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  createAppointment(appointment): Observable<any> {
    return this.http.post(`${endpoint}/patients/${appointment.patient.id}/appointments`, {
      appointmentDate: appointment.appointmentDate,
      servicesIds: appointment.servicesIds
    }).pipe(
      map(this.extractData));
  }

  getPatientAppointments(patientId): Observable<any> {
    return this.http.get(`${endpoint}/patients/${patientId}/appointments`).pipe(
      map(this.extractData));
  }

  getAppointments(year?: number, month?: number): Observable<any> {
    let queryParams = {}
    if (year && month) {
      queryParams = {
        params: {
          year: year + '',
          month: month + ''
        }
      }
    }
    return this.http.get(`${endpoint}/appointments`, queryParams).pipe(
      map(this.extractData));
  }

  getServices(): Observable<any> {
    return this.http.get(`${endpoint}/services`).pipe(
      map(this.extractData));
  }

  createService(service): Observable<any> {
    return this.http.post(`${endpoint}/services`, service).pipe(
      map(this.extractData));
  }

  updateService(serviceId, service): Observable<any> {
    return this.http.put(`${endpoint}/services/${serviceId}`, service).pipe(
      map(this.extractData));
  }

  deleteService(serviceId): Observable<any> {
    return this.http.delete(`${endpoint}/services/${serviceId}`);
  }

  getPatients(): Observable<any> {
    return this.http.get(`${endpoint}/patients`).pipe(
      map(this.extractData));
  }

  createPatient(patient): Observable<any> {
    return this.http.post(`${endpoint}/patients`, patient).pipe(
      map(this.extractData));
  }

  updatePatient(patientId, patient): Observable<any> {
    return this.http.put(`${endpoint}/patients/${patientId}`, patient).pipe(
      map(this.extractData));
  }

  deletePatient(patientId): Observable<any> {
    return this.http.delete(`${endpoint}/patients/${patientId}`);
  }

  findPatientById(patientId): Observable<any> {
    return this.http.get(`${endpoint}/patients/${patientId}`).pipe(
      map(this.extractData));
  }


  findPatientByCnp(cnp): Observable<any> {
    return this.http.get(`${endpoint}/patients/search`, {
      params: {
        cnp: cnp
      }
    }).pipe(
      map(this.extractData));
  }

}
