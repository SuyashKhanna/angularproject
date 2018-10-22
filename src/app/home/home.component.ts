import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { FetchArticlesService } from '../services/fetch-articles.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private tagSelected: boolean
  private tags : any
  private currentTag : string
  globalFeedArticles : any
  tagArticles : any
  constructor(private getArticles: FetchArticlesService, private router : Router) { }

  ngOnInit() {
    this.getArticles.fetchGlobalFeed()
    .subscribe(x => { this.globalFeedArticles = x.articles;
                      });

    this.getArticles.fetchTags()
    .subscribe(x => { this.tags = x;
                      this.tags = this.tags.tags})        
  }

  globalfeed()
  {
    this.tagSelected = false;
  }

  tagfunc(tag)
  {
    this.tagSelected = true;
    this.currentTag = tag;
    this.getArticles.fetchtagArticle(tag)
    .subscribe(x => { this.tagArticles = x;
                      this.tagArticles = this.tagArticles.articles});
  }


}
