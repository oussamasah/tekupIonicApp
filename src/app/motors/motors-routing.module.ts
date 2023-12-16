import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MotorsPage } from './motors.page';

const routes: Routes = [
  {
    path: '',
    component: MotorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MotorsPageRoutingModule {}
