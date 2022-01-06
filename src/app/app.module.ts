import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectionCardComponent } from './components/connections/connection-card/connection-card.component';
import { ConnectionsComponent } from './components/connections/connections.component';
import { CoreModule } from './modules/core/core.module';
import { CreateConnectionComponent } from './components/connections/create-connection/create-connection.component';
import { QueriesComponent } from './components/queries/queries.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './modules/shared/shared.module';
import { SimpleModalModule } from 'ngx-simple-modal';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { QueryCardComponent } from './components/queries/query-card/query-card.component';
import { defaultSimpleModalOptions } from 'ngx-simple-modal';
import { QueryResultComponent } from './components/queries/query-result/query-result.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [
    AppComponent,
    ConnectionCardComponent,
    ConnectionsComponent,
    CreateConnectionComponent,
    QueriesComponent,
    QueryCardComponent,
    QueryResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    ReactiveFormsModule,
    SimpleModalModule.forRoot({ container: "modal-container" }, { ...defaultSimpleModalOptions, ...{ closeOnEscape: true, animationDuration: 0 } }),
    HttpClientModule,
    FormlyModule.forRoot({ extras: { lazyRender: true } }),
    FormlyBootstrapModule,
    BrowserAnimationsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
