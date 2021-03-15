import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  AboutComponent,
  MessagesComponent,
  LoginComponent,
  PathNotFoundComponent
} from './components';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  imports: [CommonModule, FormsModule, MaterialModule,],
  declarations: [
    AboutComponent,
    PathNotFoundComponent,
    LoginComponent,
    MessagesComponent
  ]
})
export class LayoutModule {}
