import { NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoatCardComponent } from './elements/goat-card/goat-card.component';
import { GoatsComponent } from './elements/goats/goats.component';
import { DoesComponent } from './pages/does/does.component';
import { HomeComponent } from './pages/home/home.component';
import { GoatModalComponent } from './elements/modals/goat/goat.component';
import { GoatModalComponent as NotFoundGoatModal } from './elements/modals/not-found/not-found.component';
import { AgePipe } from './pipes/age.pipe';
import { BucksComponent } from './pages/bucks/bucks.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    BucksComponent,
    DoesComponent,
    GoatCardComponent,
    GoatModalComponent,
    GoatsComponent,
    HomeComponent,
    NotFoundGoatModal,
    AgePipe,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgOptimizedImage,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
