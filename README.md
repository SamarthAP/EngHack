## Inspiration
**Scenario:** Its a lazy day and you don't feel like cooking, so you decide to eat outside, you deserve it! You hop on google, search up some restaurants near you and are bombarded by a list of 100s of restaurants presented randomly to you. You go through a few, but the complicated and frustrating process of choosing the right place deters you from eating out and you just decide to eat some frozen pizza. Bon Appétit solves this dilemma, which almost all of us have faced at one time or another.

## What does it do?
Bon Appétit quickly gets an idea of what you're looking for through a few quick questions. Based on this information, such as your location, price range and type of cuisine you are craving, Bon Appétit quickly finds the best choices for you by pulling the best rated restaurants that fit your criteria. If you don't want to go to the restaurant, Bon Appétit selects for you, you can simply say no to that one and see the next best match. Additionally, Bon Appétit can send you and your friends a text on your phone with a google maps link to the address of the restaurant of your choice, allowing you to get there trouble free.
 
## How did we build the app?
The back-end server was developed using express.js and node.js. The Google Places API was used to pass in the desired parameters and return the results for the restaurants that the user could potentially go to. The typeform API was used on the server-side to retrieve the user's inputs. The stdlib API was finally used to text the user with a link that For the back-end we used node.js with the following APIs: Google Places, Google Maps, Typeform, and Stdlib. The front end was built using HTML and CSS in conjunction with the Bootstrap framework for styling purposes.

## Challenges we ran into
The main problem that we ran into was getting the Google Places API to work on the server-side in Node.js. As there was limited documentation on this particular API for Node.js, we had to read through the source code to understand how the API calls and HTTP requests were structured.

## Accomplishments that we're proud of
Making a clean and finished website that accomplished the task it set out to do. We prioritized the main functionality and the minimal viable product and thus we ended up with a website that effectively allowed the user to find a restaurant catered to their preferences. 

## What we learned
The main takeaway from this project was putting together a full-stack application. We learned a lot about the whole process of creating a working web application from scratch and connecting the front-end and back-end together. We also got to work with some industry-standard frameworks and APIs. 

## What's next for Bon Appetit
We still have a lot of ideas in mind that could help the user figure out where they want to eat. We could add more criteria to classify restaurants in the future as well as auto location detection. With more time we could also implement user profiles to remember user preferences. Furthermore, we could add integration with some online food ordering services that would allow the user to quickly order online from the restaurant of their choice. 
