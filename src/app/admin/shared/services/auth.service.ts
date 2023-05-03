import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { FbAuthResponse, User } from "../../../sherad/interfaces";
import { Observable, Subject, catchError, tap, throwError } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable()

export class AuthService {
    
    isAuthenticatedMock: boolean = true

     public error$: Subject<string> = new Subject<string>()

    constructor(private http: HttpClient) { }

    get token(): string {
        return ''
    }

    login(user: User): Observable<any> {
        user.returnSecureToken = true
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
            .pipe(
                tap(this.setToken),
                catchError(this.handleError.bind(this))
            )
    }
    logout() {
        // this.setToken(null)
        this.isAuthenticatedMock = false
    }
    isAuthenticated(): boolean {
         return !!this.token
    }

    private setToken(response: any) {
        const expData = new Date(new Date().getTime() + +response.expiresIn * 1000)
        localStorage.setItem('fb-token', response.idToken)
        localStorage.setItem('fb-token-exp', expData.toString())
    }
    private handleError(error: HttpErrorResponse) {
        const { message } = error.error.error

        switch (message) {
            case 'INVALID_EMAIL':
            this.error$.next('Неверный Email')
                break
            case 'INVALID_PASSWORD':
                this.error$.next('Неверный пароль')
                break
            case 'EMAIL_NOT_FOUND':
                this.error$.next('Такого Email нет')
                break
        }
    
       return throwError(error)
    }
}