// * Importing libraries
const rp = require('request-promise');
const $ = require('cheerio');
const express = require('express');
const port = process.env.PORT || 3001;

// * Initializing the Server
const server = express();

// * Base Parsing URL
const url = 'https://www.dealerrater.com/dealer/McKaig-Chevrolet-Buick-A-Dealer-For-The-People-dealer-reviews-23685/';

// * Importing Custom Functions
const perfectReviewGetter = require('./perfectReviewGetter');
const sortReviews = require('./sortReviews');

// * Creating Variables
let perfectReviews = [];
let finalPerfectReviews;
const promises = [];

// * Test Route
server.get('/', (req, res) => res.send(`The server is live`));


// * Main Route
server.get('/reviews', (req, res) => {
    // * Making the Requests
    for (let i = 1; i <= 5; i++){
        promises.push(rp(url + `page${i}/?filter=ONLY_POSITIVE`)); // we push the promises to an array so they can be run through Promise.all
    };

    // * Running Promise.all 
    Promise.all(promises) // we do this so that sorting doesn't happen until all promises have resolved
        .then(reviewRes => {
            reviewRes.forEach(page => {
                perfectReviewGetter(page).forEach(review => {
                    perfectReviews.push(review);
                })
            });

            perfectReviews.sort(sortReviews); // running the custom sort function
            finalPerfectReviews = perfectReviews.splice(0, 3); // grabbing the top three reviews
            res.status(200).send(finalPerfectReviews);
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({ loadingError: "There was an error loading the reviews, please try again" });
        });
})

server.listen(port, () => console.log(`The server is listening on port ${port}`));