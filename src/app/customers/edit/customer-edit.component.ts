import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from '../customer';
import { NgForm } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './customer-edit.component.html',
})
export class CustomerEditComponent implements OnInit {
  @ViewChild('form')
  public form: NgForm;
  public submitted = false;
  public error: string;
  public customer: Customer;

  constructor(private service: CustomerService, private router: Router, private route: ActivatedRoute) {
  }

  public ngOnInit() {
    this.customer = this.route.snapshot.data.customer.customer;
    this.error = this.route.snapshot.data.customer.error;
  }

  public onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;
    this.service.putCustomer(this.customer).subscribe(
      _ => this.router.navigate([ '/customers' ]),
      _ => {
        this.error = 'Beim Speichern ist ein Fehler aufgetreten. Bitte versuchen sie es später erneut.';
        this.submitted = false;
      },
    );
  }
}
