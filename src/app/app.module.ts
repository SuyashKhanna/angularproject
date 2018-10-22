import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ArticleCardComponent } from './article-card/article-card.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { NewarticleComponent } from './newarticle/newarticle.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { ArticlComponent } from './articl/articl.component';
import { CommentComponent } from './comment/comment.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ArticleCardComponent,
    SigninComponent,
    SignupComponent,
    NewarticleComponent,
    SettingsComponent,
    ProfileComponent,
    ArticlComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([{path: '', component : HomeComponent}
                          ,{path: 'SignIn', component : SigninComponent},
                          {path: 'SignUp', component : SignupComponent},
                          {path: 'editor/:slug', component : NewarticleComponent},
                          {path: 'editor', component : NewarticleComponent},
                          {path: 'article/:slug', component : ArticlComponent},
                          {path: 'profile', component : ProfileComponent}

                        ]),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
