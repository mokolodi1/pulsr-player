searchResults = new ReactiveVar([]); // package is reactive-var
//searchResults.set([])

searchSongs = function(e) {
  var request = gapi.client.youtube.search.list({
    part: "snippet",
    type: "video",
    q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
    maxResults: 10,
    order: "viewCount",
    publishedAfter: "2010-01-01T00:00:00Z"
  });
  // execute the request
  request.execute(function(response) {
    //console.log(response);

    results = []

    response.items.forEach(function(item) {
      results.push({
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.default.url
      });
    });

    searchResults.set(results);




    console.log(JSON.stringify(results));
    resultElements = []
    results.map(function(result) {
    });
  });
}