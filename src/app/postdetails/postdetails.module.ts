import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostdetailsPageRoutingModule } from './postdetails-routing.module';

import { PostdetailsPage } from './postdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostdetailsPageRoutingModule
  ],
  declarations: [PostdetailsPage]
})
export class PostdetailsPageModule {}
