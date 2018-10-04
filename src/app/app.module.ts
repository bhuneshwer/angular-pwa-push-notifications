import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import 'hammerjs';

import { MyFeedsComponent } from './my-feeds/my-feeds.component';
import { SwSandboxComponent } from './sw-sandbox/sw-sandbox.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';



import {
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    MyFeedsComponent,
    SwSandboxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })

  ],
  exports: [
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule
   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


// interface NgServiceWorker {
//   push: Observable<any>;
//   registerForPush(): Observable<NgPushRegistration>;
//   // some other methods for talking to the worker.
// }

// interface NgPushRegistration {
//   auth(): string;
//   key(method: string = 'p256dh'): string;
//   url: string;
//   unsubscribe(): Observable<boolean>;
//   toJSON();
// }