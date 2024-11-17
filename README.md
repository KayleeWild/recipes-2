# Overview

This software was added to an existing project I already had, a recipe-collection site. It utilizes Google Firebase and Firstore to better organize that data. Recipes can be added to the database (clicking the "+" button and filling out the form), as well as queried (clicking the "search" tab and typing in the search bar). The information in the database can only be updated/deleted by me navigating to the firestore console. This helps me keep things secure. 

My main purpose for writing this software was to experience what cloud databases have to offer, and upgrading one of my past projects to function better. 

[Recipes 2.0 Demo Video](https://youtu.be/ZR7YtqdLkRM)

# Cloud Database

In this project, I use Google Firestore, which is a product of Google Firebase.

This is a NoSQL database, so it is structured into collections and documents. The database I created has only one collection, and has the potential for as many "recipe" documents as are added by users. Each "recipe" document has a name, an array of ingredients, an array of directions, and a timestamp for when it was added.

# Development Environment

Tools:
* VS Code
* Live Server extension for VS Code
* Google Firebase
* Google Firestore

Languages:
* HTML
* CSS
* Javascript

# Useful Websites

- [Google Firestore Tutorial](https://firebase.google.com/docs/firestore/quickstart)
- [ChatGPT](https://chatgpt.com)

# Future Work

- Add another collection in the database to manage users and ensure that only authenticated users can add recipes
- Integrate cloud databases with more of my projects! This one took some time, and I honestly needed my hand held through all of it. But now that I've done it once, I'd like to see if I can do it again with other projects!
- Update colors? (they're nostalgic, but look a little amature)