import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'

import { UserService } from '../services/user.service'

@Component({
  selector: 'app-newarticle',
  templateUrl: './newarticle.component.html',
  styleUrls: ['./newarticle.component.css']
})
export class NewarticleComponent implements OnInit {
  slug: string
  articleForm: FormGroup
  article: any
  errors: Array<string>

  constructor(private articleService: UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.articleForm = this.fb.group({
      'title': [''],
      'description': [''],
      'body': [''],
      'taglist': ['']
    });
  }

  ngOnInit() {
    this.route.params.subscribe(x => this.slug = x.slug)
  }

  createOrUpdateArticle() {
    this.errors = []

    let taglist = this.articleForm.value.taglist.split(' ');
    let article = {
      article: {
        title: this.articleForm.value.title,
        description: this.articleForm.value.description,
        body: this.articleForm.value.body,
        taglist: taglist
      }
    }
    if (this.slug == undefined) {
      this.articleService.writeArticle(localStorage.getItem('jWtToken'), article)
        .subscribe(article => {
          this.article = article;
          this.router.navigateByUrl('/article/' + this.article.article.slug);
        },
          err => {
            if (err.error.errors.body) {
              for (var i = 0; i < err.error.errors.body.length; i++) {
                err.error.errors.body[i] = 'body ' + err.error.errors.body[i];
              }
              this.errors = this.errors.concat(err.error.errors.body);
            }
            if (err.error.errors.description) {
              for (var i = 0; i < err.error.errors.description.length; i++) {
                err.error.errors.description[i] = 'description ' + err.error.errors.description[i];
              }
              this.errors = this.errors.concat(err.error.errors.description);
            }
            if (err.error.errors.title) {
              for (var i = 0; i < err.error.errors.title.length; i++) {
                err.error.errors.title[i] = 'title ' + err.error.errors.title[i];
              }
              this.errors = this.errors.concat(err.error.errors.title);
            }
          });
    }
    else {
      this.articleService.updateArticle(localStorage.getItem('jWtToken'), article, this.slug)
        .subscribe(()=> {this.router.navigateByUrl('/article/' + this.slug);
                          });
    }
  }
}
