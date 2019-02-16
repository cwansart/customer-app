import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CustomerService } from '../customer.service';
import { Customer, CustomerResult } from '../customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerEditResolver implements Resolve<Observable<CustomerResult>> {
  constructor(private service: CustomerService) {
  }

  public resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    return this.service.getCustomer(+id);
  }
}
