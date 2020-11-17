//Just included in main App methods

const getProductAndStyles = function() {
  fetch('http://52.26.193.201:3000/products/5')
    .then(data => {
      return data.json();
    })
    .then(data => {
        console.log(data);
        this.setState({
            MAWproductData: data
        })
    })
    .then(() => {
      fetch('http://52.26.193.201:3000/products/5/styles')
      .then(data => {
        return data.json();
      })
      .then(data => {
        this.setState({
          MAWstylesData: data
        })
      })
      .catch(err => {
        console.log(err);
      })
    })
    .catch(err => {
      console.log(err);
    })
}

const getAvgRating = function(id) {
  fetch(`http://52.26.193.201:3000/reviews/${id}/meta`)
  .then(data => {
    return data.json();
  })
  .then(data => {
    var numOfRatings = 0;
    var totalStars = 0;
    for (var ratingKey in data.ratings) {
      numOfRatings += data.ratings[ratingKey];
      totalStars += (ratingKey * data.ratings[ratingKey]);
    }
    if(numOfRatings !== 0) {
      return (totalStars / numOfRatings);
    } else {
      return 0;
    }
  })
  .catch(err => {
    console.log(err);
  })
}

const helplerFunctions = {
  getProductAndStyles,
  getAvgRating
}

export default helplerFunctions;
