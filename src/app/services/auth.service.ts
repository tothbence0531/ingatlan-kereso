import { computed, Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { delay, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

// TODO: change to bcrypt, add password reset, database, salt, register/login rework
export class AuthService {
  private usersKey = 'auth-users';
  private currentUserKey = 'auth-current-user';

  private currentUser = signal<User | null>(null);
  public currentUserSignal = computed(() => this.currentUser());
  public isAuthenticated = computed(() => this.currentUser() !== null);
  public userRole = computed(() => this.currentUser()?.role || null);

  constructor() {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    const storedUser = localStorage.getItem(this.currentUserKey);
    if (storedUser) {
      this.currentUser.set(JSON.parse(storedUser));
    }
  }

  register(user: User): Observable<User> {
    return of(null).pipe(
      delay(500),
      map(() => {
        const users = this.getStoredUsers();

        if (users.some((u) => u.email === user.email)) {
          throw new Error('Ez az email cím már használatban van');
        }

        const newUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          password_hashed: this.simpleHash(user.password_hashed),
          savedProperties: user.savedProperties,
        };

        users.push(newUser);
        localStorage.setItem(this.usersKey, JSON.stringify(users));
        return newUser;
      })
    );
  }

  login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Observable<User> {
    return of(null).pipe(
      delay(500),
      map(() => {
        const users = this.getStoredUsers();
        const userToLogin = users.find((u) => u.email === email);

        if (!userToLogin) {
          throw new Error('Helytelen email vagy jelszó');
        }

        if (userToLogin.password_hashed !== this.simpleHash(password)) {
          throw new Error('Helytelen email vagy jelszó');
        }

        userToLogin.lastLogin = new Date();
        localStorage.setItem(this.usersKey, JSON.stringify(users));

        this.currentUser.set(userToLogin);
        localStorage.setItem(this.currentUserKey, JSON.stringify(userToLogin));
        return userToLogin;
      })
    );
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem(this.currentUserKey);
  }

  getCurrentUser(): Observable<User | null> {
    return of(this.currentUser());
  }

  private getStoredUsers(): User[] {
    const storedUsers = localStorage.getItem(this.usersKey);
    if (storedUsers) {
      return JSON.parse(storedUsers);
    } else {
      return [];
    }
  }

  generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  private simpleHash(password: string): string {
    // TODO: change to bcrypt
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return hash.toString();
  }
}
