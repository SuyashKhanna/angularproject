import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { IUserRegister, IUserAuth, IUser } from '../shared/interfaces'


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private registerUserUrl = 'https://conduit.productionready.io//api/users';
  private signInUrl = 'https://conduit.productionready.io//api/users/login';
  private articleUrl = 'https://conduit.productionready.io//api/articles';
  private userUrl = 'https://conduit.productionready.io//api/user';

  constructor(private http : HttpClient) { }

  signup(user : IUserRegister)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
  };

    return this.http.post<IUserAuth>(this.registerUserUrl,JSON.stringify(user), httpOptions);
  }

  signin(user : IUser)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
  };
    return this.http.post<IUserAuth>(this.signInUrl, JSON.stringify(user), httpOptions);
  }

  currentUser(jWtToken)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization' : 'Token '+jWtToken
      })
    };
    return this.http.get<IUserAuth>(this.userUrl, httpOptions);
  }
  
  writeArticle(jWtToken, article)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization' : 'Token '+jWtToken
      })
  };

  return this.http.post(this.articleUrl,JSON.stringify(article), httpOptions);
  }

  updateArticle(jWtToken, article, slug)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization' : 'Token '+jWtToken
      })
    };
    return this.http.put(this.articleUrl+'/'+slug,JSON.stringify(article), httpOptions);
  }

  deleteArticle(jWtToken, slug)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization' : 'Token '+jWtToken
      })
    };
    return this.http.delete(this.articleUrl+'/'+slug, httpOptions);
  }

  favoriteArticle(jWtToken, slug)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization' : 'Token '+jWtToken
      })
    };
    return this.http.post(this.articleUrl+'/'+slug + '/favorite',{},httpOptions);
  }

  unfavoriteArticle(jWtToken, slug)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization' : 'Token '+jWtToken
      })
    };
    return this.http.delete(this.articleUrl+'/'+slug + '/favorite', httpOptions);
  }

  fetchComments(jWtToken, slug)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization' : 'Token '+jWtToken
      })
    };

    return this.http.get(this.articleUrl+'/'+slug+'/comments', httpOptions);
  }
  addComment(comment, slug, jWtToken)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization' : 'Token '+jWtToken
      })
    };

    return this.http.post(this.articleUrl+'/'+slug+'/comments',JSON.stringify(comment), httpOptions);
  }

  deleteComment(jWtToken, slug, id)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization' : 'Token '+jWtToken
      })
    };

    return this.http.delete(this.articleUrl+'/'+slug+'/comments/'+id, httpOptions);
  }
}
