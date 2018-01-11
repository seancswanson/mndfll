module.exports = function(req, res, next){  
  $.ajax({
  url: 'https://quotes.rest/qod?category=inspire',
  method: 'GET'
  }).done(function(res) {
  console.log(res.contents.quotes[0].quote);
  console.log(res.contents.quotes[0].author);
  var quoteOfTheDay = '"' + res.contents.quotes[0].quote + '"' + " -" + res.contents.quotes[0].author;
});
  next();
};