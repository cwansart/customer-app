import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customers/list/customer-list.component';
import { CustomerListResolver } from './customers/list/customer-list.resolver';
import { CustomerAddComponent } from './customers/add/customer-add.component';
import { CustomerEditComponent } from './customers/edit/customer-edit.component';
import { CustomerEditResolver } from './customers/edit/customer-edit.resolver';

const routes: Routes = [
  {
    path: 'customers',
    children: [
      {
        path: '',
        component: CustomerListComponent,
        resolve: { customers: CustomerListResolver },
      },
      {
        path: 'add',
        component: CustomerAddComponent,
      },
      {
        path: 'edit/:id',
        component: CustomerEditComponent,
        resolve: { customer: CustomerEditResolver },
      },
    ],
  },
  {
    path: '',
    redirectTo: '/customers',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
