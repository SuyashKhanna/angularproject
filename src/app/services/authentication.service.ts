import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
private authenticationUrl = 'https://conduit.productionready.io//api/user';

  constructor(private http: HttpClient) { }

  authenticate(jWtToken)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization' : 'Token '+jWtToken
      })
    };
    
    return this.http.get(this.authenticationUrl,httpOptions)
    
  }
}
