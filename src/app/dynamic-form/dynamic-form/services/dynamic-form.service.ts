import {Injectable, Type} from '@angular/core';
import {Field} from "../models/form-field.model";
import {FormInputComponent} from "../form-input/form-input.component";
import {FormButtonComponent} from "../form-button/form-button.component";
import {DynamicServiceModule} from "./dynamic-service.module";

@Injectable({providedIn: DynamicServiceModule})
export class DynamicFormService {
  components: {[type: string] : Type<Field>} = {
    input: FormInputComponent,
    button: FormButtonComponent
  };
}
