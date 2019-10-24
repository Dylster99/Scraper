const cheerio = require("cheerio");
const axios = require("axios");

axios.get("https://www.urbandictionary.com/define.php?term=clown").then(function(response) {

  const $ = cheerio.load(response.data);

  const results = [];

  // With cheerio, find each p-tag with the "title" class
  // (i: iterator. element: the current element)
  $("div.meaning").each(function(i, element) {

    // Save the text of the element in a "title" variable
    const title = $(element).text();

    // In the currently selected element, look at its child elements (i.e., its a-tags),
    // then save the values for any "href" attributes that the child elements may have
    const link = $(element).children().attr("href");

    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
      title: title,
      link: link
    });
  });

  // Log the results once you've looped through each of the elements found with cheerio
  console.log(results);
});
