import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomerListComponent } from './customer-list.component';
import { HttpTestingController } from '@angular/common/http/testing';

describe('CustomerListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpTestingController,
        RouterTestingModule,
      ],
      declarations: [
        CustomerListComponent,
      ],
      providers: [

      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(CustomerListComponent);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should list users', () => {
    //
  });
});
