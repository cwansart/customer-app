import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomerListComponent } from './customer-list.component';
import { CustomerService } from '../customer.service';
import { ConfigService } from '../../config.service';
import { By } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('CustomerListComponent', () => {
  let fixture: ComponentFixture<CustomerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        CustomerListComponent,
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

  it('should list users', async () => {
    const serviceSpy = spyOn(TestBed.get(CustomerService), 'getCustomers').and.returnValue(of([
      { id: 1, firstName: 'Lorem', lastName: 'Ipsum', emailAddress: 'lorem@example.com', gender: 'FEMALE' },
      { id: 2, firstName: 'Foo', lastName: 'Bar', emailAddress: 'foo@example.com', gender: 'MALE' },
    ]));

    fixture = TestBed.createComponent(CustomerListComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.componentInstance.customers.length).toBe(2);
    expect(fixture.debugElement.query(By.css('table'))).toBeDefined();
    expect(fixture.debugElement.query(By.css('.customer-list-info'))).toBeNull();
  });

  it('should show an info if there are no customers available', async () => {
    const serviceSpy = spyOn(TestBed.get(CustomerService), 'getCustomers').and.returnValue(of([]));

    fixture = TestBed.createComponent(CustomerListComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.componentInstance.customers.length).toBe(0);
    expect(fixture.debugElement.query(By.css('table'))).toBeNull();
    expect(fixture.debugElement.query(By.css('.customer-list-info'))).toBeDefined();
  });

  it('should show an error if the backend is unavailable', async () => {
    const serviceSpy = spyOn(TestBed.get(CustomerService), 'getCustomers').and.returnValue(throwError('error'));

    fixture = TestBed.createComponent(CustomerListComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.componentInstance.customers).toBeUndefined();
    expect(fixture.debugElement.query(By.css('table'))).toBeNull();
    expect(fixture.debugElement.query(By.css('.customer-list-error'))).toBeDefined();
    expect(fixture.debugElement.query(By.css('.customer-list-error')).nativeElement.innerText).toBe('error');
  });
});
