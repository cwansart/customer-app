import { Injectable } from '@angular/core';
import { Resolve, } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Customer, CustomerListResult } from './customer';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomerListResolver implements Resolve<Observable<CustomerListResult | null>> {
  constructor(private http: HttpClient, private config: ConfigService) {
  }

  public resolve() {
    return this.http.get<Customer[]>(`${this.config.apiUrl}/customers`)
      .pipe(
        map(customers => ({
          customers,
        })),
        catchError(error => of({
          customers: null,
          error,
        })),
      );
  }
}
