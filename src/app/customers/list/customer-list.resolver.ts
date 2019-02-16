import { Injectable } from '@angular/core';
import { Resolve, } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerListResult } from '../customer';
import { CustomerService } from '../customer.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerListResolver implements Resolve<Observable<CustomerListResult | null>> {
  constructor(private service: CustomerService) {
  }

  public resolve() {
    return this.service.getCustomers();
  }
}
