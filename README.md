# BarHops

The website will use a brewery api that has access to breweries across the country and be able to relay information about each brewery individually. Users will be able to see breweries in their region as well as be able to interact with a brewery's page by leaving a comment/review as well as save breweries they like to a saved items list.

BarHops serves to provide local communities with a way to search for local places where they can hang out with friends or meet new people. BarHops on the frontend gives users a way to access a database of information for thousands of breweries mainly across the U.S. On the backend, mongoDB and passport serve as database management systems to help capture user information and allow them to interact with other users, review breweries, and ultimately use the site as a full social media site.

3rd party api that generously provided the information:
https://www.openbrewerydb.org/documentation

# Initial Structure
<img width="732" alt="Screen Shot 2022-09-16 at 3 16 43 PM" src="https://user-images.githubusercontent.com/104710154/191978747-38c56192-c1e0-40e8-ba13-2a274bdfdd92.png">

Given that this is supposed to serve as a social media site, there are many relationships that can be expanded upon between users and the information they see on screen.

# Initial Wireframe
<img width="850" alt="Screen Shot 2022-09-16 at 3 26 23 PM" src="https://user-images.githubusercontent.com/104710154/191978987-b493710b-d3a3-4206-8c86-be0cc2bf0e33.png">

# User Stories
Users should be able to retrieve information relevant to a location they want to visit based on the location they are at. Users should also be able to share feedback similar to yelp reviews or simply leave comments under the individual brewery page.

# Primary stack/libraries Used
Express - For backend routing and management of information received from frontend

MongoDB - For management of user created profiles and comments

React - For frontend ui/ux 

Node - Base library used for connection between all components

