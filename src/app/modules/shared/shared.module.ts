import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';



@NgModule({
  declarations: [

    LoadingIndicatorComponent,
      ConfirmModalComponent
  ],
  imports: [
    CommonModule
  ], exports: [
    LoadingIndicatorComponent
  ]
})
export class SharedModule { }
