import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DoesComponent } from './pages/does/does.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'does', component: DoesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
