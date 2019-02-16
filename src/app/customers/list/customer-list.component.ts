import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerListResult } from '../customer';

@Component({
  templateUrl: './customer-list.component.html',
})
export class CustomerListComponent implements OnInit {
  public customers: CustomerListResult | null;

  constructor(private route: ActivatedRoute) {
  }

  public ngOnInit() {
    this.customers = this.route.snapshot.data.customers;
  }
}
