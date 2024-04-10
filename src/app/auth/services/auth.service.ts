import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
	private baseUrl = environments.baseUrl;
	private user?: User;

	constructor(private http: HttpClient) {}

	get currentUser(): User | undefined {
		if (!this.user) return undefined;
		return structuredClone(this.user);
	}

	login(email: string, password: string): Observable<User> {
		// http.post('login', { email, password }):
		return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
			tap((user) => (this.user = user)),
			tap((user) => localStorage.setItem('token', 'sd6f1sd56f.s1f6sd1f65sd1f56s.f1sd56f1sd46f1'))
		);
	}

	checkAutentication(): Observable<boolean> | boolean {
		if (!localStorage.getItem('token')) return of(false);

		const token = localStorage.getItem('token');

		return this.http.get<User>(`${this.baseUrl}/user/1`).pipe(
			tap((user) => (this.user = user)),
			map((user) => !!user),
			catchError((err) => of(false))
		);
	}

	logout() {
		this.user = undefined;
		localStorage.clear();
	}
}
