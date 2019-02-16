import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Customer } from './customer';
import { ConfigService } from '../config.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient, private config: ConfigService) {
  }

  public getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.config.apiUrl}/customers`)
      .pipe(
        catchError(_ => throwError('Zurzeit ist die Datenbank nicht erreichbar.')),
      );
  }

  public getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.config.apiUrl}/customers/${id}`)
      .pipe(
        catchError(_ => throwError('Zurzeit ist die Datenbank nicht erreichbar.')),
      );
  }

  public postCustomer(customer: Customer): Observable<null> {
    return this.http.post<Customer>(`${this.config.apiUrl}/customers`, customer)
      .pipe(
        map(_ => null),
        catchError(_ => throwError('Das Speichern ist fehlgeschlagen, da die Datenbank zurzeit nicht erreichbar ist')),
      );
  }

  public putCustomer(customer: Customer): Observable<null> {
    return this.http.put<Customer>(`${this.config.apiUrl}/customers/${customer.id}`, {
      firstName: customer.firstName,
      lastName: customer.lastName,
      emailAddress: customer.emailAddress,
      gender: customer.gender,
    }).pipe(
      map(_ => null),
      catchError(_ => throwError('Das Speichern ist fehlgeschlagen, da die Datenbank zurzeit nicht erreichbar ist')),
    );
  }
}
