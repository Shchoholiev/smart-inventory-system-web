import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from '../network/api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { GlobalUser } from './global-user.model';
import { Router } from '@angular/router';
import { Login } from './login/login.model';
import { Tokens } from './tokens.model';
import { Register } from './register/register.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private globalUserSubject = new BehaviorSubject<GlobalUser | null>(null);
    globalUser$ = this.globalUserSubject.asObservable();

    constructor(private apiService: ApiService, private jwtHelper: JwtHelperService, private router: Router) { }

    login(login: Login): Observable<any> {
        return this.apiService
            .post<Tokens>('/users/login', login)
            .pipe(
                map(tokens => {
                    localStorage.setItem('accessToken', tokens.accessToken);
                    localStorage.setItem('refreshToken', tokens.refreshToken);

                    const globalUser = this.createGlobalUserFromToken(tokens.accessToken);
                    this.globalUserSubject.next(globalUser);

                    return true;
                }
            ));
    }

    register(register: Register): Observable<any> {
        return this.apiService
            .post<Tokens>('/users/register', register)
            .pipe(
                map(tokens => {
                    localStorage.setItem('accessToken', tokens.accessToken);
                    localStorage.setItem('refreshToken', tokens.refreshToken);

                    const globalUser = this.createGlobalUserFromToken(tokens.accessToken);
                    this.globalUserSubject.next(globalUser);

                    return true;
                }
            ));
    }

    logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        this.router.navigate(['/login']);
        this.globalUserSubject.next(null);
    }

    refreshTokens(): Observable<any> {
        var accessToken = localStorage.getItem('accessToken');
        var refreshToken = localStorage.getItem('refreshToken');
        const tokens = {
            accessToken: accessToken,
            refreshToken: refreshToken
        }

        return this.apiService
            .post<Tokens>('/tokens/refresh', tokens)
            .pipe(
                map(tokens => {
                    localStorage.setItem('accessToken', tokens.accessToken);
                    localStorage.setItem('refreshToken', tokens.refreshToken);

                    const globalUser = this.createGlobalUserFromToken(tokens.accessToken);
                    this.globalUserSubject.next(globalUser);

                    return tokens;
                }
            ));
    }

    isLoggedIn(): Observable<boolean> {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            return of(false);
        }

        const tokenPayload = this.jwtHelper.decodeToken(accessToken);
        const tokenExpiration = tokenPayload.exp * 1000;
        const now = new Date();
        const utcNow = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());

        if (tokenExpiration < utcNow) {
            return this.refreshTokens().pipe(map(tokens => {
                console.log('Refreshed tokens.');
                return true;
            }), catchError(error => {
                console.error('Failed to refresh tokens.');
                this.logout();
                return of(false);
            }));
        } else {
            const globalUser = this.createGlobalUserFromToken(accessToken);
            this.globalUserSubject.next(globalUser);

            return of(true);
        }
    }

    private createGlobalUserFromToken(accessToken: string): GlobalUser {
        const decodedToken = this.jwtHelper.decodeToken(accessToken);
        const globalUser = new GlobalUser();
        globalUser.id = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        globalUser.email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
        globalUser.name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
        globalUser.roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        return globalUser;
    }
}