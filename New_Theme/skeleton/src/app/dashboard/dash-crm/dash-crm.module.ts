import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashCrmRoutingModule } from './dash-crm-routing.module';
import { DashCrmComponent } from './dash-crm.component';
import {SharedModule} from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [DashCrmComponent],
  imports: [
    CommonModule,
    DashCrmRoutingModule,
    SharedModule
  ]
})
export class DashCrmModule { }
