import { NgModule, type OnInit } from '@angular/core';
import { TitleStrategy as NgTitleStrategy, Route, RouterModule } from '@angular/router';

import type { Observable } from 'rxjs';
import { kiddingScheduleGuard } from './guards/kidding-schedule/kidding-schedule.guard';
import { referencesGuard } from './guards/references/references.guard';
import { BucksComponent } from './pages/bucks/bucks.component';
import { DoesComponent } from './pages/does/does.component';
import { HomeComponent } from './pages/home/home.component';
import { KiddingScheduleComponent } from './pages/kidding-schedule/kidding-schedule.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ReferencesComponent } from './pages/references/references.component';
import { TitleStrategy } from './strategies/title.strategy';

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
    path: 'references', canMatch: [referencesGuard], children: [
      { path: '', component: ReferencesComponent, title: 'References' },
      { path: ':goat', component: ReferencesComponent, title: ':goat - References' }
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
