import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MotorsPageRoutingModule } from './motors-routing.module';

import { MotorsPage } from './motors.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MotorsPageRoutingModule
  ],
  declarations: [MotorsPage]
})
export class MotorsPageModule {}
