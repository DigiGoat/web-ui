import { NgOptimizedImage } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImgDirective } from './directives/img/img.directive';
import { PopoverDirective } from './directives/popover/popover.directive';
import { BreedingComponent } from './elements/breeding/breeding.component';
import { CarouselComponent } from './elements/carousel/carousel.component';
import { GoatCardComponent } from './elements/goat-card/goat-card.component';
import { GoatsComponent } from './elements/goats/goats.component';
import { GoatCardComponent as GoatCardModalComponent } from './elements/modal/goat-card/goat-card.component';
import { ModalComponent } from './elements/modal/modal/modal.component';
import { NotFoundComponent as NotFoundModalComponent } from './elements/modal/not-found/not-found.component';
import { PedigreeComponent } from './elements/pedigree/pedigree.component';
import { AnalyticsComponent } from './features/analytics/analytics.component';
import { ColorSchemeComponent } from './features/color-scheme/color-scheme.component';
import { BucksComponent } from './pages/bucks/bucks.component';
import { DoesComponent } from './pages/does/does.component';
import { HomeComponent } from './pages/home/home.component';
import { KiddingScheduleComponent } from './pages/kidding-schedule/kidding-schedule.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AgePipe } from './pipes/age/age.pipe';
import { LongDatePipe } from './pipes/longDate/longDate.pipe';
import { TooltipDirective } from './directives/tooltip/tooltip.directive';
import { ReferencesComponent } from './pages/references/references.component';


@NgModule({
  declarations: [
    AppComponent,
    BucksComponent,
    DoesComponent,
    GoatCardComponent,
    GoatsComponent,
    HomeComponent,
    AgePipe,
    NotFoundComponent,
    ModalComponent,
    GoatCardModalComponent,
    NotFoundModalComponent,
    ImgDirective,
    CarouselComponent,
    AnalyticsComponent,
    ColorSchemeComponent,
    PedigreeComponent,
    PopoverDirective,
    KiddingScheduleComponent,
    BreedingComponent,
    LongDatePipe,
    TooltipDirective,
    ReferencesComponent
  ],
  imports: [
    BrowserModule,
    NgOptimizedImage,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
