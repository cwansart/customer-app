import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Customer, CustomerListResult, CustomerResult } from './customer';
import { ConfigService } from '../config.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient, private config: ConfigService) {
  }

  public getCustomers(): Observable<CustomerListResult> {
    return this.http.get<Customer[]>(`${this.config.apiUrl}/customers`)
      .pipe(
        map(customers => ({
          customers,
        })),
        catchError(_ => of({
          customers: null,
          error: 'Zurzeit ist die Datenbank nicht erreichbar.',
        })),
      );
  }

  public getCustomer(id: number): Observable<CustomerResult> {
    return this.http.get<Customer>(`${this.config.apiUrl}/customers/${id}`)
      .pipe(
        map(customer => ({
          customer,
        })),
        catchError(_ => of({
          customer: null,
          error: 'Zurzeit ist die Datenbank nicht erreichbar.',
        })),
      );
  }

  public postCustomer(customer: Customer): Observable<string | null> {
    return this.http.post<Customer>(`${this.config.apiUrl}/customers`, customer)
      .pipe(
        map(_ => null),
        catchError(_ => throwError('Das Speichern ist fehlgeschlagen, da die Datenbank zurzeit nicht erreichbar ist')),
      );
  }

  public putCustomer(customer: Customer): Observable<string | null> {
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
