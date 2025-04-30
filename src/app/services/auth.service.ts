import { computed, Injectable, signal } from '@angular/core';
import { User } from '@angular/fire/auth';
import { delay, map, Observable, of } from 'rxjs';
import {
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth';
import { Auth, authState } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser$: Observable<User | null>;

  constructor(private auth: Auth, private router: Router) {
    this.currentUser$ = authState(this.auth);
  }

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth).then(() => {
      this.router.navigateByUrl('/');
    });
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser$;
  }

  isAuthenticated(): Observable<User | null> {
    return this.currentUser$;
  }
}
