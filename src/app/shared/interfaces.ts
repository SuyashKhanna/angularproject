
interface IUserData
{
    email : string,
    password : string,
}

export interface IUser
{
    user : IUserData
}

interface IAuthor
{
    username: string,
    bio: string,
    image: string,
    following: boolean
}
export interface IArticle
{
    slug: string,
    title: string,
    description: string,
    body: string,
    tagList: Array<string>,
    createdAt: Date,
    updatedAt: Date,
    favorited: boolean,
    favoritesCount: number,
    author: IAuthor
}

export interface IArticles
{
    articles : Array<IArticle>,
    articlesCount : number
}

export interface IUserRegister
{
    user:{
        username: string,
        email: string,
        password: string
      }
}

export interface IUserAuth
{
    user: {
          email: string,
          token: string,
          username: string,
          bio: string,
          image: string
        }  
}



