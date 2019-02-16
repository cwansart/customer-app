import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customers/list/customer-list.component';
import { CustomerAddComponent } from './customers/add/customer-add.component';
import { CustomerEditComponent } from './customers/edit/customer-edit.component';

const routes: Routes = [
  {
    path: 'customers',
    children: [
      {
        path: '',
        component: CustomerListComponent,
      },
      {
        path: 'add',
        component: CustomerAddComponent,
      },
      {
        path: 'edit/:id',
        component: CustomerEditComponent,
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
