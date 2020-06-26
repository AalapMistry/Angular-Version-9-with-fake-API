import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashProjectRoutingModule } from './dash-project-routing.module';
import { DashProjectComponent } from './dash-project.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import {NgbProgressbarModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [DashProjectComponent],
  imports: [
    CommonModule,
    DashProjectRoutingModule,
    SharedModule,
    NgbProgressbarModule
  ]
})
export class DashProjectModule { }
