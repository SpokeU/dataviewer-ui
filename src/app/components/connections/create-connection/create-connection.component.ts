import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { Observable } from 'rxjs';
import { Connection, ConnectionType } from 'src/app/models/connection.model';
import { ConnectionService } from 'src/app/services/connection.service';
import { FormlyService } from 'src/app/modules/shared/service/formly.service';
import { delay } from 'rxjs/operators';
import { ConnectionInput } from 'src/app/modules/shared/models/simple-modal.model';

@Component({
  selector: 'app-create-connection',
  templateUrl: './create-connection.component.html',
  styleUrls: ['./create-connection.component.scss']
})
export class CreateConnectionComponent extends SimpleModalComponent<ConnectionInput, void> implements OnInit {

  editMode = false
  connection: Connection

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
    if (!!this.connection) {
      this.editMode = true;
      this.connection = Object.assign({}, this.connection);
    }

    this.initForm();
  }


  onSubmit() {
    const connectionFormData: Connection = { ...this.connectionForm.value, connectionDetails: { ...this.connectionDetailsForm.value } } as Connection

    if (this.editMode) {
      this.connectionService.updateConnection({...this.connection, ...connectionFormData})
    } else {
      this.connectionService.addConnection(connectionFormData);
    }

    this.close();
  }

  initForm() {
    this.connectionTypes$ = this.connectionService.getConnectionTypes();
    const typeControl = this.connectionForm.get('type');
    typeControl.valueChanges.subscribe(connectionType => this.initConnectionDetailsForm(connectionType));

    this.connectionTypes$.subscribe(types => {
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
      this.fields = this.formlyService.createFormlyFieldConfigs(parameters, connectionType);
      this.initInputModel();

      this.loading = false;
    });
  }

  initInputModel() {
    if (this.editMode) {
      this.formOptions.resetModel(this.connection.connectionDetails);
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

}
