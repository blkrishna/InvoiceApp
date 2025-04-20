import { Routes } from '@angular/router';
import { ClientComponent } from './components/client/client.component';

export const routes: Routes = [
  { path: 'clients', component: ClientComponent },
  { path: '', redirectTo: 'clients', pathMatch: 'full' }
];
