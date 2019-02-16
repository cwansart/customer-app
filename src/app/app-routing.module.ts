import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customers/customer-list.component';
import { CustomerListResolver } from './customers/customer-list.resolver';

const routes: Routes = [
  {
    path: 'customers',
    component: CustomerListComponent,
    resolve: { customers: CustomerListResolver },
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
