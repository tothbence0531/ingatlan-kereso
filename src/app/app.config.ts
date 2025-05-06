import {
  ApplicationConfig,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import '@angular/common/locales/global/hu';

import { routes } from './app.routes';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom(HttpClientModule),
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'hu' },
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'keyfinder-dd44c',
        appId: '1:330981805429:web:89f9f4821f56d75364973c',
        storageBucket: 'keyfinder-dd44c.firebasestorage.app',
        apiKey: 'AIzaSyA8avxs_ZzoIAY_Cz83fkur3IAp2nzmPhU',
        authDomain: 'keyfinder-dd44c.firebaseapp.com',
        messagingSenderId: '330981805429',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
