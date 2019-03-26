// * Custom Sorting Function
// this function runs as the callback in JavaScript's Array.prototype.sort() method
function sortReviews(a, b) {
    let comparison = 0;

    // here we sort by the value of the star count
    if (a.starCount > b.starCount) comparison = -1;
    else if (a.starCount < b.starCount) comparison = 1;

    return comparison;
}

module.exports = sortReviews;