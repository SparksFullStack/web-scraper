# Web Scraper
- This website reaches out to a particular dealership on dealerrater.com and gets the three best reviews for that particular dealer.

## Running the Project
- The project can be run with 'npm start' or 'yarn start'.
- The custom script loads the scraper.js through Nodemon so as to watch for any and all changes and handle refreshes.

## Technologies
- Main: Node
- Requests: Request-Promise
- Scraping: Cheerio
- Other: Nodemon

## Files
### scraper.js
- The main file for this project. 
- Does the initial setup and makes the requests using React-Promise
- Pushes all requests to an array, which is resolved using Promise.all()
- Reaches out to sortReviews.js to sort the data resolved with Promise.all() and then prints the top 3 to the console.

### perfectReviewGetter.js
- This file contains one function which receives the scrapped HTML for each page and finds all the star ratings.
- Reviews with perfect star ratings all around are pushed to an array, which is returned at the bottom.

### sortReviews.js
- Also contains a single function that acts in conjunction with Array.prototype.sort();
- Sorts all the values by their star rating.