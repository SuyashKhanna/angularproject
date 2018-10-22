import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IArticles } from '../shared/interfaces' 
@Injectable({
  providedIn: 'root'
})
export class FetchArticlesService {
  private globalFeedUrl = 'https://conduit.productionready.io//api/articles';
  private tagUrl = 'https://conduit.productionready.io//api/tags';
  constructor(private http : HttpClient) { }

  fetchGlobalFeed()
  {
      return this.http.get<IArticles>(this.globalFeedUrl);
  }

  fetchArticle(slug: string)
  {
    return this.http.get(this.globalFeedUrl+'/'+slug)
  }

  fetchUserArticle(user : string)
  {
    return this.http.get<IArticles>(this.globalFeedUrl + '?author=' + user);
  }

  fetchFavoriteUserArticle(user : string)
  {
    return this.http.get<IArticles>(this.globalFeedUrl + '?favorited=' + user);
  }

  fetchtagArticle(tag : string)
  {
    return this.http.get<IArticles>(this.globalFeedUrl + '?tag=' + tag);
  }

  fetchTags()
  {
    return this.http.get(this.tagUrl)
  }


}
