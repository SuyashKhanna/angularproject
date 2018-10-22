import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'

import { UserService } from '../services/user.service'
import { AuthenticationService } from '../services/authentication.service'

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css']
})
export class ArticleCardComponent implements OnInit {

  @Input() article : any
  liked : boolean
  date : string
  user : any
  
  constructor(private userService : UserService, private auth: AuthenticationService, private router : Router) { }

  ngOnInit() {
    var date = new Date(this.article.createdAt);
    this.date = date.getDate().toString() + '-' + date.getMonth() + '-' + date.getFullYear();
    this.article.createdAt = this.date;

    this.liked = this.article.favorited
  }

  toggleFavorite()
  {
    
    if(localStorage.getItem('jWtToken') == null) 
    {
      this.router.navigateByUrl('/SignIn')
    }
    else 
    {
      this.auth.authenticate(localStorage.getItem('jWtToken'))
      .subscribe(x => {this.user = x;
        if(this.user == null)
        {
          this.router.navigateByUrl('/SignIn');
        }
        if(this.liked)
        {
          this.liked = false;
          this.userService.unfavoriteArticle(localStorage.getItem('jWtToken'),this.article.slug)
          this.article.favoritesCount--;
        }
        else
        {
          this.liked = true;
          this.userService.favoriteArticle(localStorage.getItem('jWtToken'),this.article.slug)
          this.article.favoritesCount++;
        }
      });
    }
   
   
  }

  
}
