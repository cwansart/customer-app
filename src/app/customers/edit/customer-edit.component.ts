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
    this.route.paramMap.subscribe(map => {
      this.service.getCustomer(+map.get('id')).subscribe(
        customer => this.customer = customer,
        error => this.error = error,
      );
    });
  }

  public onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;
    this.service.putCustomer(this.customer).subscribe(
      _ => this.router.navigate([ '/customers' ]),
      error => this.error = error,
    );
  }
}
