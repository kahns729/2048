README.txt

2048-GameCenter
Project by Seth Kahn
Created in April, 2014

The purpose of this application is to provide both a page for logging 2048 scores by players using the API, and to provide an
API for interacting with said scores.

The application allows for cross-origin resource sharing. It uses a MongoDB database and is deployed as a heroku application.

The /submit.json API, which is a POST API for adding user data to the homepage of the website, works properly. It takes a 
POST request with the fields username, score, and grid, and sends those fields to the application. The user's data is then
added to the database, and upon refresh will be displayed on the homepage.

The /scores.json API, which is a GET API for retrieving the scores for a specified user, works properly. It takes a GET request
with the field username, and returns in its response the JSON for items in the database with the specified username, with the
items ordered in descending order by score.

The / url, which serves as the homepage, renders a styled table of all scores in the database (all scores that were
posted using the /submit.json API) listed in descending order by score. This table includes scores by any username in the
database.

The score and grid of the 2048 game are stored in a Game Manager that's created at the start of the 2048 application. This 
Game Manager object is created in application.js, and the score and grid are created in the actuator file.

To send the username, scores, and grid from the 2048 game, I had to modify two files. First, I modified the index.html file
to include the script for jQuery. Second, I modified html_actuator.js to post the username (hardcoded), score, and grid to 
the url specified in my API when metadata.over evaluates to false, i.e. the game has terminated. 

This project took about 10 hours to complete. 