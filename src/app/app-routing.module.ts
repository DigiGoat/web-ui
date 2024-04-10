import { NgModule } from '@angular/core';
import { RouterModule, Routes, TitleStrategy as NgTitleStrategy } from '@angular/router';

import { DoesComponent } from './pages/does/does.component';
import { HomeComponent } from './pages/home/home.component';
import { TitleStrategy } from './startegies/TitleStrategy';


const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  {
    path: 'does', children: [
      { path: '', component: DoesComponent, title: 'Does' },
      { path: ':goat', component: DoesComponent, title: ':goat - Does' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: NgTitleStrategy, useClass: TitleStrategy }]
})
export class AppRoutingModule { }
