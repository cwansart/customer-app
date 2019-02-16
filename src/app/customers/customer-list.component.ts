import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from './customer';

@Component({
  templateUrl: './customer-list.component.html',
})
export class CustomerListComponent implements OnInit {
  public customers: Customer[];
  public error: string;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit() {
    this.customers = this.route.snapshot.data.customers.customers;
    if (this.route.snapshot.data.customers.error) {
      this.error = 'Zurzeit ist die Datenbank nicht erreichbar.';
    }
  }
}
