import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ConnectionParameter } from 'src/app/models/connection.model';

@Injectable({
  providedIn: 'root'
})
export class FormlyService {

  constructor() { }

  createFormlyFieldConfigs(connectionParameter: ConnectionParameter[]) {
    return connectionParameter.map(p => this.createFormlyFieldConfig(p));
  }

  createFormlyFieldConfig(connectionParameter: ConnectionParameter): FormlyFieldConfig {
    const fieldConfig: FormlyFieldConfig = {
      key: connectionParameter.key,
      type: 'input',
      templateOptions: {
        label: connectionParameter.key.toUpperCase(),
        type: connectionParameter.type
      }
    }
    return fieldConfig;
  }
}
