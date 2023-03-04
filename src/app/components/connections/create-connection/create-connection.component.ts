import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { SimpleModalComponent, SimpleModalService } from 'ngx-simple-modal';
import { Observable, Subscription } from 'rxjs';
import { Connection, ConnectionTestResult, ConnectionType } from 'src/app/models/connection.model';
import { ConnectionService } from 'src/app/services/connection.service';
import { FormlyService } from 'src/app/modules/shared/service/formly.service';
import { delay } from 'rxjs/operators';
import { ConnectionInput } from 'src/app/modules/shared/models/simple-modal.model';
import { ConfirmModalComponent } from 'src/app/modules/shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-create-connection',
  templateUrl: './create-connection.component.html',
  styleUrls: ['./create-connection.component.scss']
})
export class CreateConnectionComponent extends SimpleModalComponent<ConnectionInput, void> implements OnInit {

  editMode = false
  connection: Connection

  loading = true;
  connectionInProggress = false;

  connectionTypes!: string[];

  connectionDetailsForm = this.fb.group({});
  connectionForm = this.fb.group({
    type: ['', Validators.required],
    name: ['', Validators.required]
  });

  model = {};
  fields: FormlyFieldConfig[];
  formOptions: FormlyFormOptions = {};

  connectionTestResult: ConnectionTestResult;

  constructor(private fb: FormBuilder, private connectionService: ConnectionService, private formlyService: FormlyService, private simpleModalService: SimpleModalService) {
    super();
  }

  ngOnInit(): void {
    if (!!this.connection) {
      this.editMode = true;
      this.connection = Object.assign({}, this.connection);
    }

    this.initForm();
  }


  onSubmit() {
    const connectionFormData: Connection = { ...this.connectionForm.value, details: { ...this.connectionDetailsForm.value } } as Connection

    if (this.editMode) {
      this.connectionService.updateConnection({ ...this.connection, ...connectionFormData })
    } else {
      this.connectionService.addConnection(connectionFormData);
    }

    this.close();

  }

  initForm() {
    const typeControl = this.connectionForm.get('type');
    typeControl.valueChanges.subscribe(connectionType => this.initConnectionDetailsForm(connectionType));

    this.connectionService.getConnectionTypes().subscribe(types => {
      this.connectionTypes = types;
      if (this.editMode) {
        typeControl.setValue(this.connection.type);
        typeControl.disable();
      } else {
        typeControl.setValue(types[0]);
      }
    });
  }

  initConnectionDetailsForm(connectionType: string) {
    if (!connectionType) {
      return;
    }

    this.connectionService.getConnectionParameters(connectionType).subscribe(parameters => {
      this.fields = this.formlyService.createFormlyFieldConfigs(parameters);
      this.initInputModel();

      this.loading = false;
    });
  }

  initInputModel() {
    if (this.editMode) {
      this.formOptions.resetModel(this.connection.details);
      this.connectionForm.get('name').setValue(this.connection.name);
    } else {
      this.resetConnectionDetailsForm();
    }
  }

  //Used when switching dropdown
  resetConnectionDetailsForm() {
    this.model = {};
    this.formOptions.resetModel({});
    this.connectionDetailsForm.reset();
  }

  testConnection(): Subscription {
    this.connectionInProggress = true;
    const connectionFormData: Connection = { ...this.connectionForm.getRawValue(), details: { ...this.connectionDetailsForm.value } } as Connection
    return this.connectionService.testConnection(connectionFormData).subscribe(result => {
      this.connectionInProggress = false;
      this.connectionTestResult = result;
    });
  }

}
