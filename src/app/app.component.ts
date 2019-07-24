import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {FormConfig} from "./dynamic-form/dynamic-form/models/form-config.model";
import {DynamicFormComponent} from "./dynamic-form/dynamic-form/dynamic-form.component";
import {Validators} from "@angular/forms";
import {DynamicFormService} from "./dynamic-form/dynamic-form/services/dynamic-form.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  config: FormConfig[] = [
    {
      type: 'input',
      label: 'Label',
      name: 'form_name',
      placeholder: 'Enter your name',
      value: 'John',
      validation: [Validators.required]
    },
    {
      type: 'input',
      label: 'Label',
      value: 'Doe',
      name: 'form_lastname',
      placeholder: 'Enter your last name',
    },
    {
      type: 'button',
      label: 'Submit',
      name: 'submit'
    }
  ];

  @ViewChild(DynamicFormComponent, { static: false }) form: DynamicFormComponent;

  ngAfterViewInit() {
    console.log(this.form);
    // On submit
    // let previousValid = this.form.valid;
    // this.form.changes.subscribe(() => {
    //   if (this.form.valid !== previousValid) {
    //     previousValid = this.form.valid;
    //     this.form.setDisabled('submit', !previousValid);
    //   }
    // });
    //
    // this.form.setDisabled('submit', true);
    // this.form.setValue('name', 'Todd Motto');
  }

  onSubmit(data: any) {
    console.log('submit', data);
  }
}
