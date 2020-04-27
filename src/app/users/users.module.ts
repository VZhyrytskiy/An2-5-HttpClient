import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';

import { UserComponent } from './components';

@NgModule({
  imports: [CommonModule, FormsModule, UsersRoutingModule],
  declarations: [UsersRoutingModule.components, UserComponent]
})
export class UsersModule {}
