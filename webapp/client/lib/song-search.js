searchResults = new ReactiveVar([]); // package is reactive-var
scSearchResults = new ReactiveVar([]);

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

    results = [];

    response.items.forEach(function(item) {
      //console.log(item);
      results.push({
        id: item.id.videoId,
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.default.url,
        videoId: item.id.videoId,
      });
    });

    ids = [];
    results.forEach(function(result) {
      ids.push(result.id);
    });

    //Get view count
    var request = gapi.client.youtube.videos.list({
      id: ids.join(','),
      part: "statistics"
    });

    request.execute(function(response) {

      response.items.forEach(function(item, index) {
        console.log(item);
        results[index].viewCount = window.numberWithCommas(item.statistics.viewCount);
        results[index].likeCount = window.numberWithCommas(item.statistics.likeCount);
        results[index].dislikeCount = window.numberWithCommas(item.statistics.dislikeCount);
      });

      //console.log(results);
      searchResults.set(results);

    });
    //searchResults.set(results);
  });
};

searchSC = function(e) {
	var q = encodeURIComponent($("#search").val()).replace(/%20/g, "+");
	SC.get("/tracks", {q: q}, function (tracks) {
		console.log(tracks);

		var scResults = [];

		tracks.forEach(function(track) {
			scResults.push({
				id: track.id,
				title: track.title,
				username: track.user.username,
				thumbnail: track.artwork_url,
				playCount: track.playback_count,
				likeCount: track.likes_count,
				favoriteCount: track.favoritings_count,
			});
		});

		console.log(scResults);
		scSearchResults.set(scResults);
	});

	};
