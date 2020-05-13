import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule , routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './Login/Login.component';
import { ProfileComponent } from './profile/profile.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FirebaseAuthComponent } from './firebase-auth/user-profile.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { FormsModule } from '@angular/forms';
import { WindowService } from './window.service';
import { AdmitCardComponent } from './admitCard/admitCard.component';
import { resultComponent } from './result/result.component';

const config = {
  apiKey: "AIzaSyDm15po4iTKjo5QOeSsiUoq63Sfg7aCOOU",
    authDomain: "sih-stet.firebaseapp.com",
    databaseURL: "https://sih-stet.firebaseio.com",
    projectId: "sih-stet",
    storageBucket: "sih-stet.appspot.com",
    messagingSenderId: "1058455347761",
    appId: "1:1058455347761:web:b50900bd685762b7632b10",
    measurementId: "G-4QQR83JDC7"
}

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    FirebaseAuthComponent,
    AdmitCardComponent,
    resultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatRadioModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    RecaptchaModule,
    FormsModule
  ],
  providers: [WindowService],
  bootstrap: [AppComponent]
})
export class AppModule { }
