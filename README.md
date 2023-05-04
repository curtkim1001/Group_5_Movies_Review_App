# Movies Review Web App

An app where users can see movie reviews and post their own reviews.

## Authors

Curt Kim, Solomon Montagno, Jose Estrada

## Installation

### Clone this repository:

```
git clone https://github.com/dhk2431/Group_5_Movies_Review_App
```

### For development in challenges:

cd movies-review-app
yarn install
yarn run dev

### Instructions for other developers:

Clone the project files from github using
git clone https://github.com/dhk2431/Group_5_Movies_Review_App.git

Once user designates file location in terminal,
cd server

Create a new database called “movies-review-app_development”
createdb movies-review-app_development

Make sure to yarn install before migrating anything into the database so all the dependencies and packages are configured.
yarn install

Create a migration for the movies table so that it can take in a required title, year, genre and an optional synopsis and link for a poster of the movie.
yarn run migrate:make "name of migration for movies table"

Make sure to migrate the table to the database
yarn run migrate:latest && yarn run migrate:rollback && yarn run migrate:latest

Once all the migrations are set, ensure that the seeded data is added to your database
yarn db:seed

Lastly, connect to have the server up and running!
yarn run dev

## [Text for the link here](URL here!)

## Features:

- List of movies

- A Nav-bar

- User authentication

- Clicking the movies lets you see its details and submit a review if you are a registered user

- You can leave a comment under a review

## Technologies in the project here:

- Technology1

- Technology2
