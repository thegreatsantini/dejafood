# Dejafood

[LIVE SITE](https://dejafood.herokuapp.com/)

This a working fullstack recipe suggestion app helping to reduce the amount of food that goes to waste and try new food. Just put in the indregients that you have in the fridge and let the app do the rest. Devafood uses the recipe searching api provided by [Food2Fork](https://food2fork.com/about/api) 

***

## Using the app:

Dejafood does not require you to create an account to search recipes, however you must create an account to save recipes for later, I'm sure that your searches will result in many tasty ideas. Click get started then input ingredients in the search then submit your query. Once you get your results you can either click the link to view the recipe or click the plus button to save your recipe for later. Or do both.

***

## Technologies Used
* Node.js
* Express
* MongoDB
* Mongoose
* JavaScript
* Materialize
* jQuery
* HTML5/CSS3
* EJS
* Trello
* Auth/Bcrypt

## Routes 

|      CRUD          |Route                          |Functionally                         |
|----------------|-------------------------------|-----------------------------|
|GET|/index|Renders the homepage of Dejafood|
|GET|/index/ingredients|Makes api call to get recipe results|
|GET|/auth/login|Renders login page|
|POST|/auth/login|Allows user to Log In with existing profile|
|GET|/auth/signup|Renders Sign Up page|
|POST|/auth/signup|Allow a new user to create an account|
|GET|/auth/logout|Renders Log Out page|
|GET |/profile   |Renders the profile page for the current user            |
|POST|/profile|Bookmarked clicked recipe to users profile |
|DELETE|/profile|Removes clicked recipe from bookmarks|

## Models
### userSchema

| name   | email | password            | Saved    |
|--------|-------|------------------------------|--------|
  | STRING | String | $2a$10$8qKpgr1yN...ENCRYPTED STRING | [SavedRecipes.schema] |

### savedRecipesSchema

| Publisher   | Title | Image            | Source    |
|--------|-------|------------------------------|--------|
  | String | String | String | String |

## Road Map

[Trello Board](https://trello.com/b/IupdgdV9/dejafood)

1) Remove saved recipes without refreshing
2) Implement infinite scrolling
3) Add toasts when saving and removing recipes 
4) Add discovery 
5) Add slide in to search box or remove entirely 


#### For more ideas visit Trello board

## To Contribute

### Clone repo
```git clone https://github.com/thegreatsantini/dejafood.git```

### Install dependencies
```npm i```

### Update .env 

1) Add PORT (optional)
2) visit Food2Fork api and get key
3) create a secret key for password hashing

### Run server and DB

#### Server 
```npm run start```
#### DB
```mongod```

## Start Hacking!
