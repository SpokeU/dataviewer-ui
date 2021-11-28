import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SimpleModalComponent } from 'ngx-simple-modal';

@Component({
  selector: 'app-create-connection',
  templateUrl: './create-connection.component.html',
  styleUrls: ['./create-connection.component.scss']
})
export class CreateConnectionComponent extends SimpleModalComponent<void, void> implements OnInit {

  name = new FormControl('');

  constructor() {
    super();
   }

  ngOnInit(): void {
  }

}
