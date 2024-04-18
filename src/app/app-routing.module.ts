import { NgModule } from '@angular/core';
import { RouterModule, Routes, TitleStrategy as NgTitleStrategy } from '@angular/router';

import { DoesComponent } from './pages/does/does.component';
import { HomeComponent } from './pages/home/home.component';
import { TitleStrategy } from './strategies/title.strategy';
import { BucksComponent } from './pages/bucks/bucks.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';


const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  {
    path: 'does', children: [
      { path: '', component: DoesComponent, title: 'Does' },
      { path: ':goat', component: DoesComponent, title: ':goat - Does' }
    ]
  }, {
    path: 'bucks', children: [
      { path: '', component: BucksComponent, title: 'Bucks' },
      { path: ':goat', component: BucksComponent, title: ':goat - Bucks' }
    ]
  },
  {
    path: '**', component: NotFoundComponent, title: 'Not Found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: NgTitleStrategy, useClass: TitleStrategy }]
})
export class AppRoutingModule { }
