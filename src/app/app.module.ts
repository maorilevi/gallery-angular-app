import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImagesListComponent } from './images-list/images-list.component';
import { ImagesInfoComponent } from './images-info/images-info.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { AllImagesResolver } from './resolvers/all-images.resolver';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
const appRoutes: Routes = [
  {
    path: '', redirectTo: '/dashboard', pathMatch: 'full'
  }, {
    path: 'dashboard',
    component: DashboardComponent,
    resolve: {
      images: AllImagesResolver
    }
  }
];
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ImagesListComponent,
    ImagesInfoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ScrollingModule,
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
