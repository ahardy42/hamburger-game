# hamburger

this full-stack web app satisfied the requirements for DU Coding BootCamp week 15... 

## What the App is... 

This app builds on a previous version, with a few key modifications.  One, the ORM isn't "custom", the app uses sequelize as the ORM. 

Second, the app uses passport.js to login / signup a user who can then create their own burgers to enjoy. The login strategy is 'local-strategy' which uses a username / password combination in conjunction with bjcrypt a hashing module, to login a user. Once logged in the page is updated with that user's burger and (this is new) game information.

Third, instead of just clicking on a burger and changing its ```isDevoured``` property in the database, clicking a burger launches a game.  The object of the game is to eat as many burgers as you can in 1 minute.  Once the time is up, you are kicked back to the main page where "burgers eaten" is updated as well as new information about your game stats. 

## How it works...

This web app is a full-stack app which uses the MVC design strategy.  The server is built using Node.js / Express.js, the html content is created dynamically using handlebars (utilizing the node package [express-handlebars](https://www.npmjs.com/package/express-handlebars)) with help on the front-end from bootstrap and jQuery for styling and DOM manipulation. The model is set up using the [sequelize](https://www.npmjs.com/package/sequelize) ORM and [mysql2](https://www.npmjs.com/package/mysql2). login functionality is handled using the [passport](https://www.npmjs.com/package/passport) package. 

### Dependencies:

- [mysql2](https://www.npmjs.com/package/mysql2)
- [express](https://www.npmjs.com/package/express)
- [express-handlebars](https://www.npmjs.com/package/express-handlebars)
- [sequelize](https://www.npmjs.com/package/sequelize)
- [passport](https://www.npmjs.com/package/passport)

### Libraries:

- [bootstrap](https://getbootstrap.com/)
- [jQuery](https://jquery.com/)
- [phaser]()

### Languages: 

- JavaScript
- CSS
- HTML
- SQL

## Enjoy! 

The app is hosted by heroku at: insert link!, and here at [GitHub](https://github.com/ahardy42/hamburger-game) as well!
