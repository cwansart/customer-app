import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomerService } from './customer.service';
import { ConfigService } from '../config.service';
import { HttpClient } from '@angular/common/http';
import { Gender } from './customer';

describe('CustomerService', () => {
  let client: HttpClient;
  let controller: HttpTestingController;
  let service: CustomerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        CustomerService,
        {
          provide: ConfigService,
          useValue: {
            apiUrl: '/api',
          },
        }
      ],
    }).compileComponents();

    client = TestBed.get(HttpClient);
    controller = TestBed.get(HttpTestingController);
    service = TestBed.get(CustomerService);
  });

  describe('getCustomers', () => {
    it('should succeed', async () => {
      service.getCustomers().subscribe(customers => expect(customers.length).toBe(2));

      const request = controller.expectOne('/api/customers');
      expect(request.request.method).toBe('GET');
      request.flush([
        { id: 1, firstName: 'Foo', lastName: 'Bar', emailAddress: 'foo@example.com', gender: Gender.Female },
        { id: 2, firstName: 'Lorem', lastName: 'Ipsum', emailAddress: 'lorem@example.com', gender: Gender.Male },
      ]);
      controller.verify();
    });

    it('should fail', async () => {
      service.getCustomers().subscribe(
        _ => fail('should fail'),
        error => expect(error).toEqual('Zurzeit ist die Datenbank nicht erreichbar.'),
      );

      const request = controller.expectOne('/api/customers');
      expect(request.request.method).toBe('GET');
      request.flush(null, { status: 0, statusText: 'Backend unavailable' });
      controller.verify();
    });
  });

  describe('getCustomer', () => {
    it('should succeed', async () => {
      const customer = { id: 1, firstName: 'Foo', lastName: 'Bar', emailAddress: 'foo@example.com', gender: Gender.Female };
      service.getCustomer(1).subscribe(fetchedCustomer => expect(fetchedCustomer).toEqual(customer));

      const request = controller.expectOne('/api/customers/1');
      expect(request.request.method).toBe('GET');
      request.flush(customer);
      controller.verify();
    });

    it('should fail', async () => {
      service.getCustomer(1).subscribe(
        _ => fail('should fail'),
        error => expect(error).toEqual('Zurzeit ist die Datenbank nicht erreichbar.'),
      );

      const request = controller.expectOne('/api/customers/1');
      expect(request.request.method).toBe('GET');
      request.flush(null, { status: 0, statusText: 'Backend unavailable' });
      controller.verify();
    });
  });

  describe('postCustomer', () => {
    const newCustomer = { id: 1, firstName: 'Foo', lastName: 'Bar', emailAddress: 'foo@example.com', gender: Gender.Female };

    it('should succeed', async () => {
      service.postCustomer(newCustomer).subscribe(data => expect(data).toBeNull());

      const request = controller.expectOne('/api/customers');
      expect(request.request.method).toBe('POST');
      request.flush(null, { status: 201, statusText: 'Created' });
      controller.verify();
    });

    it('should fail', async () => {
      service.postCustomer(newCustomer).subscribe(
        _ => fail('should fail'),
        error => expect(error).toEqual('Das Speichern ist fehlgeschlagen, da die Datenbank zurzeit nicht erreichbar ist.'),
      );

      const request = controller.expectOne('/api/customers');
      expect(request.request.method).toBe('POST');
      request.flush(null, { status: 0, statusText: 'Backend unavailable' });
      controller.verify();
    });
  });

  describe('putCustomer', () => {
    const alteredCustomer = { id: 1, firstName: 'Foo', lastName: 'Bar', emailAddress: 'foo@example.com', gender: Gender.Female };

    it('should succeed', async () => {
      service.putCustomer(alteredCustomer).subscribe(data => expect(data).toBeNull());

      const request = controller.expectOne('/api/customers/1');
      expect(request.request.method).toBe('PUT');
      request.flush(null, { status: 204, statusText: 'No content' });
      controller.verify();
    });

    it('should fail', async () => {
      service.putCustomer(alteredCustomer).subscribe(
        _ => fail('should fail'),
        error => expect(error).toEqual('Das Speichern ist fehlgeschlagen, da die Datenbank zurzeit nicht erreichbar ist.'),
      );

      const request = controller.expectOne('/api/customers/1');
      expect(request.request.method).toBe('PUT');
      request.flush(null, { status: 0, statusText: 'Backend unavailable' });
      controller.verify();
    });
  });
});
