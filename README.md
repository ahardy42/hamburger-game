# hamburger

this full-stack web app satisfied the requirements for DU Coding BootCamp week 14... 

## What the App is... 

This app allows anyone who uses it to create named burgers, which are persisted through saving information about the burgers in the cloud using a SQL database. Entering a name in the input area, and clicking "Make That Burger!" will "create" the burger by running a CREATE operation - saving the burger to the database. 

Initially, the burger is "un-eaten" (or, "conceived"), and is displayed on the left side of the page.  Clicking on a "conceived" burger will UPDATE that database setting ```isDevoured: true``` and reloading the page. On reload, the ```true``` value tells handlebars to render the burger on the right side of the page.  

Clicking on an eaten burger will UPDATE the database, setting ```isDevoured: false``` and resulting in a re-rendering of the page, with the burger on the left hand side.

This app does not feature a DELETE option for any burger.  Like a fast-food hamburger... they have no expiration date. 

## How it works...

This web app is a full-stack app which uses the MVC design strategy.  The server is built using Node.js / Express.js, the html content is created dynamically using handlebars (utilizing the node package [express-handlebars](https://www.npmjs.com/package/express-handlebars)) with help on the front-end from bootstrap and jQuery for styling and DOM manipulation. The model is set up using a custom ORM and [mysql](https://www.npmjs.com/package/mysql) node package to CRU the SQL database (there is no delete functionality in this app, as it wasn't a requirement of the assignment).

### Dependencies:

- [mysql](https://www.npmjs.com/package/mysql)
- [express](https://www.npmjs.com/package/express)
- [express-handlebars](https://www.npmjs.com/package/express-handlebars)

### Libraries:

- [bootstrap](https://getbootstrap.com/)
- [jQuery](https://jquery.com/)

### Languages: 

- JavaScript
- CSS
- HTML
- SQL

## Enjoy! 

The app is hosted by heroku at: https://ahardy42-hamburger.herokuapp.com/, and here at [GitHub](https://github.com/ahardy42/hamburger) as well!