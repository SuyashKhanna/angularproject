import { Component, OnInit, Input , Output} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router' 
import { EventEmitter } from '@angular/core'

import { UserService } from '../services/user.service'

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment : any
  @Input() slug : string
  @Input() authentic 
  @Output() commentPosted : EventEmitter<any> = new EventEmitter<any>();
  @Output() commentDeleted : EventEmitter<number> = new EventEmitter<number>();

  
  commentForm: FormGroup
  postValue : string

  constructor(private fb : FormBuilder, private userService : UserService, private route : Router) { 
    this.commentForm = this.fb.group({
      'body' : ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  postComment()
  {
    let comment = 
    {
      comment :
      {
        body : this.commentForm.value.body
      }
    }

    this.userService.addComment(comment,this.slug, localStorage.getItem('jWtToken'))
    .subscribe(x=> this.commentPosted.emit(x));
  }

  deleteComment()
  {
    this.userService.deleteComment(localStorage.getItem('jWtToken'),this.slug,this.comment.id)
    .subscribe(x => this.commentDeleted.emit(this.comment.id));
  }

}
