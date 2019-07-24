import { Component } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormConfig} from "../models/form-config.model";
import {config} from "rxjs";

@Component({
  selector: 'app-form-input',
  template: `
    <mat-form-field [formGroup]="group">
        <input
          matInput
          [value]="inputValue"
          [formControlName]="config.name"
          [placeholder]="config.placeholder"
        />
    </mat-form-field>
  `
})
export class FormInputComponent {
  config: FormConfig;
  group: FormGroup;
  get inputValue() { return this.config.value ? this.config.value : '' };
}
