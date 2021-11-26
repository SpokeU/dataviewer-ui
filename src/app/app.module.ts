import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectionCardComponent } from './components/connections/connection-card/connection-card.component';
import { ConnectionsComponent } from './components/connections/connections.component';
import { CoreModule } from './core/core.module';
import { CreateConnectionComponent } from './components/connections/create-connection/create-connection.component';
import { QueriesComponent } from './components/queries/queries.component';
import { ReactiveFormsModule } from '@angular/forms';


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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
