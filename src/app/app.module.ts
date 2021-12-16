import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectionCardComponent } from './components/connections/connection-card/connection-card.component';
import { ConnectionsComponent } from './components/connections/connections.component';
import { CoreModule } from './core/core.module';
import { CreateConnectionComponent } from './components/connections/create-connection/create-connection.component';
import { QueriesComponent } from './components/queries/queries.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { SimpleModalModule } from 'ngx-simple-modal';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    ConnectionCardComponent,
    ConnectionsComponent,
    CreateConnectionComponent,
    QueriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    ReactiveFormsModule,
    SimpleModalModule,
    HttpClientModule,
    FormlyModule.forRoot({ extras: { lazyRender: true } }),
    FormlyBootstrapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
