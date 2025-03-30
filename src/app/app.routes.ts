import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PropertyListComponent } from './pages/property-list/property-list.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'properties', component: PropertyListComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent },
];
