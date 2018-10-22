import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

import { FetchArticlesService } from '../services/fetch-articles.service'
import { AuthenticationService } from '../services/authentication.service'
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-articl',
  templateUrl: './articl.component.html',
  styleUrls: ['./articl.component.css']
})
export class ArticlComponent implements OnInit {
  private slug : string
  private article : any
  private authentic 
  private comments : any

  constructor(private route : ActivatedRoute,
              private router : Router,
             private fetchArticle : FetchArticlesService, 
             private auth : AuthenticationService,
             private userService : UserService) { }

  ngOnInit() {

    this.slug = this.route.snapshot.params.slug;
    
    this.fetchArticle.fetchArticle(this.slug)
    .subscribe(resp => this.article = resp, () => this.article = { article : { title : "unable to find article"}} )

    this.auth.authenticate(localStorage.getItem('jWtToken')).subscribe(x => this.authentic = x,err => this.authentic = null)
    
    if(localStorage.getItem('jWtToken'))
    {
    this.userService.fetchComments(localStorage.getItem('jWtToken'),this.slug)
    .subscribe(x => this.comments = x)
    }

  }

  delete()
  {
    this.userService.deleteArticle(localStorage.getItem('jWtToken'),this.slug)
    .subscribe(() => {
      this.router.navigateByUrl('/profile') 
       });
  }

  addComment(comment)
  {
      if(this.comments == undefined)
      {
        this.comments = 
        {
          comments : Array<any>()
        }
      }
      this.comments.comments.unshift(comment.comment);
  }

  deleteComment(id)
  {
     this.comments.comments = this.comments.comments.filter(
       function(value, index, arr)
       {
           return value.id !=id
       }
     )
  }
}
 