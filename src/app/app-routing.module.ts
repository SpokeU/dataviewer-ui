import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectionsComponent } from './components/connections/connections.component';
import { QueriesComponent } from './components/queries/queries.component';

const routes: Routes = [
  { path: 'connections', component: ConnectionsComponent },
  { path: 'queries', component: QueriesComponent },
  { path: '**', redirectTo: 'connections', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
