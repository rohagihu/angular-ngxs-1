import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { ModalModule } from 'ngx-bootstrap/modal';

import { ItemsState } from './store/items.state';

import { AppService } from './app.service';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


// export function appInit(appConfigService: AppConfigService) {
export function appInit(appService: AppService): any {
  return () => appService.loadData();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([ItemsState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    AppService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      multi: true,
      deps: [AppService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
