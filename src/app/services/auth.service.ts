import { computed, Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { delay, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersKey = 'auth-users';
  private currentUserKey = 'auth-current-user';

  private currentUser = signal<User | null>(null);
  public isAuthenticated = computed(() => this.currentUser !== null);
  public userRole = computed(() => this.currentUser()?.role || null);

  constructor() {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    const storedUser = localStorage.getItem(this.usersKey);
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
          throw new Error('Email already exists');
        }

        const newUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          password_hashed: user.password_hashed,
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
          throw new Error('Invalid email or password');
        }

        if (userToLogin.password_hashed !== password) {
          throw new Error('Invalid email or password');
        }

        if (password !== 'demo123') {
          throw new Error('Invalid password');
        }

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
}
