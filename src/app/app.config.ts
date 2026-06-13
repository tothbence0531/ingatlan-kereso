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
        projectId: '',
        appId: '',
        storageBucket: '',
        apiKey: '',
        authDomain: '',
        messagingSenderId: '',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
