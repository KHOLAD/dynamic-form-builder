import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import {MatButtonModule, MatFormFieldModule, MatInputModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {DynamicFormComponent} from "./dynamic-form.component";
import {FormInputComponent} from "./form-input/form-input.component";
import {DynamicFieldDirective} from "./dynamic-field.directive";
import { FormButtonComponent } from './form-button/form-button.component';
import {DynamicFormService} from "./services/dynamic-form.service";
import {DynamicServiceModule} from "./services/dynamic-service.module";

@NgModule({
  declarations: [
    DynamicFormComponent,
    FormInputComponent,
    DynamicFieldDirective,
    FormButtonComponent
  ],
  exports: [
    DynamicFormComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    DynamicServiceModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  entryComponents: [
    FormInputComponent,
    FormButtonComponent
  ],
  providers: [DynamicFormService]
})
export class DynamicFormModule { }
