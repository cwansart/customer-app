import { Component, ViewChild } from '@angular/core';
import { Customer } from '../customer';
import { NgForm } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './customer-add.component.html',
})
export class CustomerAddComponent {
  @ViewChild('form')
  public form: NgForm;
  public submitted = false;
  public error: string;
  public customer: Customer = {
    firstName: null,
    lastName: null,
    gender: null,
    emailAddress: null,
  };

  constructor(private service: CustomerService, private router: Router) {
  }

  public onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;
    this.service.postCustomer(this.customer).subscribe(
      _ => this.router.navigate([ '/customers' ]),
      _ => {
        this.error = 'Beim Speichern ist ein Fehler aufgetreten. Bitte versuchen sie es später erneut.';
        this.submitted = false;
      },
    );
  }
}
