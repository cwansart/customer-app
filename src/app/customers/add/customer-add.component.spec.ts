import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomerService } from '../customer.service';
import { ConfigService } from '../../config.service';
import { FormsModule } from '@angular/forms';
import { CustomerAddComponent } from './customer-add.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Gender } from '../customer';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('CustomerAddComponent', () => {
  let fixture: ComponentFixture<CustomerAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
      ],
      declarations: [
        CustomerAddComponent,
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

    fixture = TestBed.createComponent(CustomerAddComponent);
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
      const serviceSpy = spyOn(TestBed.get(CustomerService), 'postCustomer').and.returnValue(of(null));
      fixture.componentInstance.customer = {
        firstName: 'Foo',
        lastName: 'Bar',
        emailAddress: 'foo@example.com',
        gender: Gender.Female,
      };

      (fixture.debugElement.query(By.css('input[type=submit]')).nativeElement as HTMLButtonElement).click();

      expect(serviceSpy).toHaveBeenCalled();
      expect(routerSpy).toHaveBeenCalled();
    });

    it('should fail', async () => {
      const serviceSpy = spyOn(TestBed.get(CustomerService), 'postCustomer').and.returnValue(throwError('error'));
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

      expect(serviceSpy).toHaveBeenCalled();
      expect(fixture.debugElement.query(By.css('.customer-add-error'))).toBeDefined();
      expect(fixture.debugElement.query(By.css('.customer-add-error')).nativeElement.innerText).toBe('error');
    });
  });
});
