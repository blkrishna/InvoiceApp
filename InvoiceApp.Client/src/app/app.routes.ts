import { Routes } from '@angular/router';
import { ClientComponent } from './components/client/client.component';
import { TestComponent } from './components/test/test.component';

export const routes: Routes = [
  { path: 'clients', component: ClientComponent },
  { path: 'test', component: TestComponent },
  { path: '', redirectTo: 'clients', pathMatch: 'full' }
];
