import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { Observable } from 'rxjs';
import { ConnectionService } from 'src/app/services/connection.service';
import { FormlyService } from 'src/app/shared/service/formly.service';

@Component({
  selector: 'app-create-connection',
  templateUrl: './create-connection.component.html',
  styleUrls: ['./create-connection.component.scss']
})
export class CreateConnectionComponent extends SimpleModalComponent<void, void> implements OnInit {

  connectionTypes$!: Observable<string[]>;

  connectionDetailsForm = this.fb.group({});
  connectionForm = this.fb.group({
    type: '',
    name:''
  });

  model = {};
  fields: FormlyFieldConfig[];
  formOptions: FormlyFormOptions = {};

  constructor(private fb: FormBuilder, private connectionService: ConnectionService, private formlyService: FormlyService) {
    super();
  }

  ngOnInit(): void {
    this.connectionTypes$ = this.connectionService.getConnectionTypes();
    
    this.connectionTypes$.subscribe(types => {
      const typeControl = this.connectionForm.get('type');
      typeControl.valueChanges.subscribe(connectionType => this.initConnectionDetailsForm(connectionType));
      typeControl.setValue(types[0])
    });
  }


  onSubmit() {
    console.log({...this.connectionForm.value, ...this.connectionDetailsForm.value})
  }

  initConnectionDetailsForm(connectionType: string) {
    this.connectionService.getConnectionParameters(connectionType).subscribe(parameters => {
      this.resetConnectionDetailsForm();

      this.fields = this.formlyService.createFormlyFieldConfigs(parameters);
    });
  }

  resetConnectionDetailsForm() {
    this.model = {};
    this.formOptions.resetModel({});
    this.connectionDetailsForm.reset();
  }

}
