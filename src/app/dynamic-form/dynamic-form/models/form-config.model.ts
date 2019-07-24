import {ValidatorFn} from "@angular/forms";

export type ComponentType = 'input' | 'select' | 'datepicker' | 'button';

export interface FormConfig {
  type: ComponentType;
  name: string;
  value?: any;
  label?: string;
  placeholder?: string;
  options?: Array<string>;
  disabled?: boolean;
  validation?: ValidatorFn[];
}
