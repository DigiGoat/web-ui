import { NgModule, type OnInit, type Type } from '@angular/core';
import { TitleStrategy as NgTitleStrategy, RouterModule, Route as ngRoute } from '@angular/router';

import type { Observable } from 'rxjs';
import { kiddingScheduleGuard } from './guards/kidding-schedule.guard';
import { BucksComponent } from './pages/bucks/bucks.component';
import { DoesComponent } from './pages/does/does.component';
import { HomeComponent } from './pages/home/home.component';
import { KiddingScheduleComponent } from './pages/kidding-schedule/kidding-schedule.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TitleStrategy } from './strategies/title.strategy';

interface Route extends ngRoute {
  component?: Type<Page>;
  children?: Route[];
}
const routes: Route[] = [
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
    path: 'kidding-schedule', canMatch: [kiddingScheduleGuard], children: [
      { path: '', component: KiddingScheduleComponent, title: 'Kidding Schedule' },
      { path: ':goat', component: KiddingScheduleComponent, title: ':goat - Kidding Schedule' }
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

export interface Page extends OnInit {
  setDescription(): Observable<void> | void;
}
