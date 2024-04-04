import { NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoatCardComponent } from './elements/goat-card/goat-card.component';
import { GoatsComponent } from './elements/goats/goats.component';
import { DoesComponent } from './pages/does/does.component';
import { HomeComponent } from './pages/home/home.component';
import { AgePipe } from './pipes/age.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DoesComponent,
    GoatCardComponent,
    GoatsComponent,
    AgePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgOptimizedImage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
