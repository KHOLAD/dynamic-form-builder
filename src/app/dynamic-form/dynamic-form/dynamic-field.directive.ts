import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnChanges,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Field} from "./models/form-field.model";
import {FormConfig} from "./models/form-config.model";
import {DynamicFormService} from "./services/dynamic-form.service";

@Directive({
  selector: '[dynamicField]'
})
export class DynamicFieldDirective implements OnInit, OnChanges {
  @Input()
  config: FormConfig;

  @Input()
  group: FormGroup;

  component: ComponentRef<Field>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef,
    private dynamicFormService: DynamicFormService
  ) {}

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
    }
  }

  ngOnInit() {
    if (!this.dynamicFormService.components[this.config.type]) {
      const supportedTypes = Object.keys(
        this.dynamicFormService.components
      ).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.config.type}).
        Supported types: ${supportedTypes}`
      );
    }
    const component = this.resolver.resolveComponentFactory<Field>(
      this.dynamicFormService.components[this.config.type]
    );
    this.component = this.container.createComponent(component);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }

}
