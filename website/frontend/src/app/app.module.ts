import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './layout/app.component';
import { AppRoutingModule } from './app-routing.module';
import { HolyGrailLayoutComponent } from './layout/holy-grail-layout/holy-grail-layout.component';
import { IndexComponent } from './pages/index/index.component';

@NgModule({
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  declarations: [AppComponent, HolyGrailLayoutComponent, IndexComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
