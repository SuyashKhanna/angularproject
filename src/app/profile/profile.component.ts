import { Component, OnInit } from '@angular/core';

import { FetchArticlesService } from '../services/fetch-articles.service'
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  yourArticles : any
  favoriteArticles : any
  yourarticleSelected : boolean

  constructor(private getArticles: FetchArticlesService, private user: UserService) { }

  ngOnInit() {
    this.user.currentUser(localStorage.getItem('jWtToken')).subscribe(
      user => {
        this.getArticles.fetchUserArticle(user.user.username)
      .subscribe(x => this.yourArticles = x.articles);
      this.getArticles.fetchFavoriteUserArticle(user.user.username)
      .subscribe(x => this.favoriteArticles = x.articles)
      }
    )
    this.yourarticleSelected = true;
  }

  loadYourArticles()
  {
    this.yourarticleSelected = true;
  }

  loadYourFavoriteArticles()
  {
    this.yourarticleSelected = false;
  }
}
