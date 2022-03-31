import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { startWith, tap, filter } from 'rxjs/operators';

@Component({
  selector: 'formly-app-example',
  templateUrl: './app.component.html',
})
export class AppComponent {
  form = new FormGroup({});
  model: any = {
    investmentsCount: 3,
    investments: [],
  };
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      key: 'investmentsCount',
      type: 'input',
      defaultValue: 3,
      templateOptions: {
        type: 'number',
        label: 'Investments count',
        required: true,
        min: 1,
      },
      hooks: {
        onInit: (field) => {
          return field.formControl.valueChanges.pipe(
            startWith(field.formControl.value),
            filter((v) => v > 0),
            tap((value) => {
              if (this.model.investments.length !== value) {
                this.model.investments.length = value;
                this.model = { ...this.model, investmentsCount: value };
              }
            })
          );
        },
      },
    },
    {
      key: 'investments',
      type: 'repeat',
      fieldArray: {
        type: 'input',
        key: 'investmentName',
        templateOptions: {
          label: 'Name of Investment:',
          required: true,
        },
      },
      hooks: {
        onInit: (field) => {
          return field.formControl.valueChanges.pipe(
            tap((v) => {
              console.log('array valueChange triggered', v);
            })
          );
        },
      },
    },
  ];

  submit() {
    alert(JSON.stringify(this.model));
  }
}

/**  Copyright 2021 Formly. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://github.com/ngx-formly/ngx-formly/blob/main/LICENSE */
