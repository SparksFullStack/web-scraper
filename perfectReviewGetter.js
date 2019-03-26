// * Importing Libraries
const rp = require('request-promise');
const $ = require('cheerio');

// * Function for Parsing the HTML
function perfectReviewGetter(html) {
        const perfectReviews = [];
        const reviews = $('.review-wrapper', html);

        // looping over every review and checking that it has all five star reviews
        for (let i = 0; i < reviews.length; i++){
            let review = $(reviews[i], reviews);
            let ratingsStaticIndv = $('.rating-static-indv', review).length;
            let ratingsStatic = $('.rating-static', review).length;
            let ratings50 = $('.rating-50', review).length;
            let cumulativeRatings = ratingsStatic + ratingsStaticIndv; // if any of the reviews does not have the class of ratings-50, it will not be considered a perfect review

            if (ratings50 === cumulativeRatings) { // if these values are equal the reviewer gave a perfect store all around
                    let reviewTitle = $('h3', reviews[i]).text()
                    let reviewContent = $('.review-content', reviews[i]).text()
                    let starCount = ratings50;

                    perfectReviews.push({ reviewTitle, reviewContent, starCount });
            };
        }

    return perfectReviews;
}

module.exports = perfectReviewGetter;