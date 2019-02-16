import { Component, OnInit } from '@angular/core';
import { Customer, CustomerListResult } from '../customer';
import { CustomerService } from '../customer.service';

@Component({
  templateUrl: './customer-list.component.html',
})
export class CustomerListComponent implements OnInit {
  public customers: Customer[];
  public error: string;

  constructor(private service: CustomerService) {
  }

  public ngOnInit() {
    this.service.getCustomers().subscribe(
      customers => this.customers = customers,
      error => this.error = error,
    );
  }
}
