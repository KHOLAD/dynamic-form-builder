import { Component } from '@angular/core';
import {FormConfig} from "../models/form-config.model";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'button-submit',
  template: `
    <button
      type="submit"
      [disabled]="group.invalid"
      mat-raised-button
      color="primary">{{config.label}}</button>
  `
})
export class FormButtonComponent {
  config: FormConfig;
  group: FormGroup;
}
