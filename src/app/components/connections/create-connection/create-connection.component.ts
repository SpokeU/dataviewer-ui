import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { Observable } from 'rxjs';
import { Connection, ConnectionType } from 'src/app/models/connection.model';
import { ConnectionService } from 'src/app/services/connection.service';
import { FormlyService } from 'src/app/shared/service/formly.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-create-connection',
  templateUrl: './create-connection.component.html',
  styleUrls: ['./create-connection.component.scss']
})
export class CreateConnectionComponent extends SimpleModalComponent<void, void> implements OnInit {

  loading = true;
  
  connectionTypes$!: Observable<string[]>;

  connectionDetailsForm = this.fb.group({});
  connectionForm = this.fb.group({
    type: '',
    name: ''
  });

  model = {};
  fields: FormlyFieldConfig[];
  formOptions: FormlyFormOptions = {};

  constructor(private fb: FormBuilder, private connectionService: ConnectionService, private formlyService: FormlyService) {
    super();
  }

  ngOnInit(): void {

    this.connectionTypes$ = this.connectionService.getConnectionTypes();

    this.connectionTypes$.pipe(delay(1000)).subscribe(types => {
      const typeControl = this.connectionForm.get('type');
      typeControl.valueChanges.subscribe(connectionType => this.initConnectionDetailsForm(connectionType));
      typeControl.setValue(types[0]);

      this.loading = false;
    });
  }


  onSubmit() {
    const connectionFormData: Connection = { ...this.connectionForm.value, connectionDetails: { ...this.connectionDetailsForm.value } } as Connection
    console.log(connectionFormData)
    this.connectionService.addConnection(connectionFormData);
  }

  initConnectionDetailsForm(connectionType: string) {
    this.connectionService.getConnectionParameters(connectionType).subscribe(parameters => {
      this.resetConnectionDetailsForm();
      this.fields = this.formlyService.createFormlyFieldConfigs(parameters, connectionType);
    });

  }

  resetConnectionDetailsForm() {
    this.model = {};
    this.formOptions.resetModel({});
    this.connectionDetailsForm.reset();
  }

}
