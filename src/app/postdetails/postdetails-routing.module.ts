import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostdetailsPage } from './postdetails.page';

const routes: Routes = [
  {
    path: '',
    component: PostdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostdetailsPageRoutingModule {}
