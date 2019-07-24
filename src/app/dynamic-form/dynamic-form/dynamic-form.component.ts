import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormConfig} from "./models/form-config.model";
import {DynamicFormService} from "./services/dynamic-form.service";

@Component({
  selector: 'dynamic-form',
  template: `
    <form [formGroup]="form" (submit)="onSubmit($event)">
      <ng-container 
        *ngFor="let config of formConfig;"
        dynamicField
        [config]="config"
        [group]="form">
      </ng-container>
    </form>
  `
})
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input()
  formConfig: FormConfig[] = [];

  @Output()
  submit = new EventEmitter<any>();

  form: FormGroup;

  get controls() { return this.formConfig.filter(({type}) => type !== 'button'); }
  get changes() { return this.form.valueChanges; }
  get valid() { return this.form.valid; }
  get value() { return this.form.value; }

  constructor(
    private formService: DynamicFormService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.createGroup();
  }

  ngOnChanges() {
    if (this.form) {
      const controls = Object.keys(this.form.controls);
      const configControls = this.controls.map(item => item.name);

      controls
        .filter((control) => !configControls.includes(control))
        .forEach((control) => this.form.removeControl(control));

      configControls
        .filter((control) => !controls.includes(control))
        .forEach((name) => {
          const config = this.formConfig.find((control) => control.name === name);
          this.form.addControl(name, this.createControl(config));
        });
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.submit.emit(this.value);
  }

  createGroup() {
    const group = this.fb.group({});
    this.formConfig.forEach(control => group.addControl(control.name, this.createControl(control)));
    return group;
  }

  createControl(config: FormConfig) {
    const { disabled, validation, value } = config;
    return this.fb.control({ disabled, value }, validation);
  }

  setDisabled(name: string, disable: boolean) {
    if (this.form.controls[name]) {
      const method = disable ? 'disable': 'enable';
      this.form.controls[name][method]();
      return;
    }

    this.formConfig = this.formConfig.map((item) => {
      if (item.name === name) {
        item.disabled = disable;
      }
      return item;
    });
  }

  setValue(name: string, value: any) {
    this.form.controls[name].setValue(value, {emitEvent: true});
  }

}
