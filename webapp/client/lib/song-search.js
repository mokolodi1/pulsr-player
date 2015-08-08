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
		console.log(response);
	});
}