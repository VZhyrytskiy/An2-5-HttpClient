import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  imports: [CommonModule, MaterialModule, AdminRoutingModule],
  declarations: [AdminRoutingModule.components]
})
export class AdminModule {}
