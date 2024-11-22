import { computed, Injectable, signal } from '@angular/core';
import { enviroments } from '../../../environments/environments';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User,AuthStatus, LoginResponse, CheckTokenResponse } from '../interfaces';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl= enviroments.baseUrl;
  //Tambien puede usar
  // private http = inject(HttpClient);

  //Señales
  private _currentUser = signal<User|null>(null); //Este usuario es el que vamos a estar guardando
  //Vamos a saber el estado
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

//Señales que exponen  los datos solo de lectura
  public currentUser = computed(()=>this._currentUser());//Señar solo de lectura
  public authStatus = computed(()=>this._authStatus());//Señar solo de lectura

  constructor(private http:HttpClient) {
    this.checkAuthStatus().subscribe();
   }

  private setAuthentication(user:User,token:string):boolean{
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticate)
    localStorage.setItem('token',token);
    return true;
  }

  login(email:string,password:string):Observable<boolean>{
    const url = `${this.baseUrl}/auth/login`;

    const body = {email:email,password:password};
    return this.http.post<LoginResponse>(url,body)
    .pipe(
      map(({user,token})=> this.setAuthentication(user,token)),
      catchError(err=> throwError(()=> err.error.message) )
    );
  }

  checkAuthStatus():Observable<boolean>{
    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem('token');
    debugger;

    if(!token) {
      this.logout();  
     return of(false)
    };

    const headers = new HttpHeaders()
    .set('Authorization',`Bearer ${token}`);

    return this.http.get<CheckTokenResponse>(url,{headers})
    .pipe(
      map(({user,token})=> this.setAuthentication(user,token)),
      catchError(()=>{
        this._authStatus.set(AuthStatus.notAuthenticate);
       return of(false)
      })
    )

  }

  logout(){
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticate);
    localStorage.removeItem('token');
  }
}
