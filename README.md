# NC News

This project was started with [Create React App](https://github.com/facebook/create-react-app).

The deployed version is hosted with Netlify and can be viewed [here](https://ostens-nc-news.netlify.app).

## About

NC News is a short-form news site which allows you to add comments to articles, vote on comments and articles, and browse different topics.

The backend repository can be found [here](https://github.com/ostens/nc-news) and is hosted using [Cyclic](https://www.cyclic.sh/) and [ElephantSQL](https://www.elephantsql.com/).

## Getting started

When you open [NC News](https://ostens-nc-news.netlify.app) you will be redirected to the landing page which is a list of all articles defaulted to display the most recent. You will be automatically "logged in" as a hardcoded user, but can log out by accessing your profile page in the top right of the screen. You will only be able to add comments when logged in to replicate real-life behaviour.

You can click on an article to see the full content and comments, as well as vote on any comment or article, and add your own comments.

## Setting up locally

If you'd like to fork this repository and play around with it locally, you will need to:

- ensure you're using > node v18
- fork the repository
- clone the repository
- run `npm i` to install dependencies
- run `npm start` to run the app in the development mode
