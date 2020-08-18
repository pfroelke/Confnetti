import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './layout/app.component';
import { AppRoutingModule } from './app-routing.module';
import { HolyGrailLayoutComponent } from './layout/holy-grail-layout/holy-grail-layout.component';
import { IndexComponent } from './pages/index/index.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { TestPageComponent } from './pages/test-page/test-page.component';

@NgModule({
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  declarations: [AppComponent, HolyGrailLayoutComponent, IndexComponent, FooterComponent, HeaderComponent, SidenavComponent, TestPageComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
