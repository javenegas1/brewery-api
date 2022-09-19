# brewery-api

The website will use a brewery api that has access to breweries across the country and be able to relay information about each brewery individually. Users will be able to see breweries in their region as well as be able to interact with a brewery's page by leaving a comment/review as well as save breweries they like to a saved items list.

Link to the API you plan to use
https://www.openbrewerydb.org/documentation

Example data response you plan to use
{
        "id": "barrel-dog-brewing-evergreen",
        "name": "Barrel Dog Brewing",
        "brewery_type": "micro",
        "street": null,
        "address_2": null,
        "address_3": null,
        "city": "Evergreen",
        "state": "Colorado",
        "county_province": null,
        "postal_code": "80439",
        "country": "United States",
        "longitude": "-105.321458",
        "latitude": "39.6361637",
        "phone": "5599176846",
        "website_url": null,
        "updated_at": "2022-08-20T02:56:08.975Z",
        "created_at": "2022-08-20T02:56:08.975Z"
    },
Visual of your component hierarchy
Screen Shot 2022-09-16 at 3 16 43 PM

Wire Frames
Screen Shot 2022-09-16 at 3 26 23 PM

User Stories
I would like users to be able to retrieve information relevant to a location they want to visit based on the location they are at. I would also want users to be able to share feedback similar to yelp reviews.

MVP Goals
Backend Express app that retrieves information from the brewery API
Frontend React app that displays information about each individual brewery with routes categorized by location
Stretch Goals (if applicable)
Include backend way for users to log in and register profiles saved in database (MongoDB or Passport)
they should be able to create edit and delete comments they post, and update their personal list of liked breweries
