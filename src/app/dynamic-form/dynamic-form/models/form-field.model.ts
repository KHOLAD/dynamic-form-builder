import {FormGroup} from "@angular/forms";
import {FormConfig} from "./form-config.model";

export interface Field {
  config: FormConfig,
  group: FormGroup
}
