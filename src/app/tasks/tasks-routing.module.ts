import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MetaDefinition } from '@angular/platform-browser';

import { TaskListComponent, TaskFormComponent } from './components';

const metaTags: Array<MetaDefinition> = [
  {
    name: 'description',
    content: 'Task Manager Application. This is SPA'
  },
  {
    name: 'keywords',
    content: 'Angular tutorial, SPA, Routing'
  }
];

const routes: Routes = [
  {
    path: 'home',
    component: TaskListComponent,
    data: {
      title: 'Task Manager',
      meta: metaTags
    }
  },
  {
    path: 'edit/:taskID',
    component: TaskFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {}
