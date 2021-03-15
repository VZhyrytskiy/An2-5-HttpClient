import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TaskComponent, TaskFormComponent, TaskListComponent } from './components';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  declarations: [TaskListComponent, TaskFormComponent, TaskComponent],
  imports: [CommonModule, FormsModule, TasksRoutingModule, MaterialModule],
  providers: []
})
export class TasksModule {}
