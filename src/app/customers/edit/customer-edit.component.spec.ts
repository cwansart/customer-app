import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomerService } from '../customer.service';
import { ConfigService } from '../../config.service';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Gender } from '../customer';
import { HttpClient } from '@angular/common/http';
import { CustomerEditComponent } from './customer-edit.component';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import Spy = jasmine.Spy;

describe('CustomerEditComponent', () => {
  let fixture: ComponentFixture<CustomerEditComponent>;
  let serviceSpy: Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
      ],
      declarations: [
        CustomerEditComponent,
      ],
      providers: [
        {
          provide: HttpClient,
          useValue: () => void 0,
        },
        CustomerService,
        {
          provide: ConfigService,
          useValue: {
            apiUrl: '/api',
          },
        }
      ],
    }).compileComponents();
  });

  describe('init succeeds', () => {
    beforeEach(async () => {
      serviceSpy = spyOn(TestBed.get(CustomerService), 'getCustomer').and.returnValue(of({
        id: 1,
        firstName: 'Lorem',
        lastName: 'Ipsum',
        emailAddress: 'lorem@example.com',
        gender: Gender.Female,
      }));

      fixture = TestBed.createComponent(CustomerEditComponent);
      fixture.detectChanges();
      await fixture.whenStable();
    });

    describe('firstName input', () => {
      let input: HTMLInputElement;
      beforeEach(() => {
        input = fixture.debugElement.query(By.css('input[name=firstName]')).nativeElement;
      });

      it('should be valid', () => {
        input.value = 'Foo';
        input.dispatchEvent(new Event('input'));

        expect(fixture.componentInstance.form.controls.firstName.valid).toBeTruthy();
      });

      it('should be invalid for invalid chars', () => {
        input.value = 'there are spaces';
        input.dispatchEvent(new Event('input'));

        expect(fixture.componentInstance.form.controls.firstName.invalid).toBeTruthy();
        expect(fixture.componentInstance.form.controls.firstName.errors.pattern).toBeTruthy();
        expect(fixture.debugElement.query(By.css('.firstName-errors-pattern'))).toBeDefined();
      });

      it('should be invalid empty name', () => {
        input.value = '';
        input.dispatchEvent(new Event('input'));

        expect(fixture.componentInstance.form.controls.firstName.invalid).toBeTruthy();
        expect(fixture.componentInstance.form.controls.firstName.errors.required).toBeTruthy();
        expect(fixture.debugElement.query(By.css('.firstName-errors-required'))).toBeDefined();
      });
    });

    describe('submit', () => {
      it('should succeed', () => {
        const routerSpy = spyOn(TestBed.get(Router), 'navigate');
        const putCustomerSpy = spyOn(TestBed.get(CustomerService), 'putCustomer').and.returnValue(of(null));
        fixture.componentInstance.customer = {
          firstName: 'Foo',
          lastName: 'Bar',
          emailAddress: 'foo@example.com',
          gender: Gender.Female,
        };

        (fixture.debugElement.query(By.css('input[type=submit]')).nativeElement as HTMLButtonElement).click();

        expect(putCustomerSpy).toHaveBeenCalled();
        expect(routerSpy).toHaveBeenCalled();
      });

      it('should fail', async () => {
        const putCustomerSpy = spyOn(TestBed.get(CustomerService), 'putCustomer').and.returnValue(throwError('error'));
        fixture.componentInstance.customer = {
          firstName: 'Foo',
          lastName: 'Bar',
          emailAddress: 'foo@example.com',
          gender: Gender.Female,
        };

        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
        await fixture.whenStable();

        (fixture.debugElement.query(By.css('input[type=submit]')).nativeElement as HTMLButtonElement).click();

        fixture.detectChanges();
        await fixture.whenStable();

        expect(putCustomerSpy).toHaveBeenCalled();
        expect(fixture.debugElement.query(By.css('.customer-edit-error'))).toBeDefined();
        expect(fixture.debugElement.query(By.css('.customer-edit-error')).nativeElement.innerText).toBe('error');
      });
    });
  });

  it('init should fail', async () => {
    serviceSpy = spyOn(TestBed.get(CustomerService), 'getCustomer').and.returnValue(throwError('error'));

    fixture = TestBed.createComponent(CustomerEditComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(serviceSpy).toHaveBeenCalled();
    expect(fixture.debugElement.query(By.css('.customer-edit-error'))).toBeDefined();
    expect(fixture.debugElement.query(By.css('.customer-edit-error')).nativeElement.innerText).toBe('error');
  });
});
