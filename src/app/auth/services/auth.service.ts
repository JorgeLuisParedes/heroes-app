import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, of, tap, map, catchError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
	private baseUrl = environments.baseUrl;
	private user?: User;

	constructor(private http: HttpClient) {}

	get currentUser(): User | undefined {
		return this.user ? structuredClone(this.user) : undefined;
	}

	login(email: string, password: string): Observable<User> {
		return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
			tap((user) => (this.user = user)),
			tap(() => localStorage.setItem('token', 'sd6f1sd56f.s1f6sd1f65sd1f56s.f1sd56f1sd46f1'))
		);
	}

	checkAuthentication(): Observable<boolean> {
		if (!localStorage.getItem('token')) {
			return of(false);
		}

		return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
			tap((user) => (this.user = user)),
			map(() => true),
			catchError(() => of(false))
		);
	}

	logout(): void {
		this.user = undefined;
		localStorage.clear();
	}
}
