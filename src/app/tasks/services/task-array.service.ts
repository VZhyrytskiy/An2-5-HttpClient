import { Injectable } from '@angular/core';

import { TaskModel } from './../models/task.model';

const taskList = [
  new TaskModel(1, 'Estimate', 1, 8, 8, true),
  new TaskModel(2, 'Create', 2, 8, 4, false),
  new TaskModel(3, 'Deploy', 3, 8, 0, false)
];

const taskListPromise = Promise.resolve(taskList);

@Injectable({
  providedIn: 'any'
})
export class TaskArrayService {
  getTasks(): Promise<TaskModel[]> {
    return taskListPromise;
  }

  getTask(id: number | string): Promise<TaskModel> {
    return this.getTasks()
      .then(tasks => tasks.find(task => task.id === +id))
      .catch(() => Promise.reject('Error in getTask method'));
  }

  createTask(task: TaskModel): void {
    taskList.push(task);
  }

  updateTask(task: TaskModel): void {
    const i = taskList.findIndex(t => t.id === task.id);

    if (i > -1) {
      taskList.splice(i, 1, task);
    }
  }

  deleteTask(task: TaskModel): void {
    const i = taskList.findIndex(t => t.id === task.id);

    if (i > -1) {
      taskList.splice(i, 1);
    }
  }
}
