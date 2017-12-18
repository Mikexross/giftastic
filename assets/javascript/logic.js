 // "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=yzbTgrV7wPcDaamxmzSfH5iQ4J5b4Xyw&limit=10"
 // global variables

 $(document).ready(function() {
     // create variable that is an array of strings of topic
     var topics = {
         searchValue: "",
         shows: ["family guy", "friends", "game of thrones", "eastbound and down"]
     }

     function init() {
         for (i = 0; i < topics.shows.length; i++) {
             console.log(topics.shows[i]);
             $("#topics").append("<button class='btn-primary topic-btn'>" + topics.shows[i] + "</button>")
         };
     };


     function search() {
         //Empty the html giphy-area after each search
         $("#display").html("");
         topics.searchValue = $("#search").val().trim();
         //Set queryURL for AJAX Request
         var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + topics.searchValue + "&api_key=yzbTgrV7wPcDaamxmzSfH5iQ4J5b4Xyw&limit=10";
         $.ajax({
             url: queryUrl,
             method: 'GET'
         }).done((response) => {
             console.log(response);
             for (i = 0; i < response.data.length; i++) {
                 //Add raiting and img to html
                 $("#display").append("<div class= 'gif-div'>Rating: " + response.data[i].rating.toUpperCase() + "<br>" + "<img data-name= " + response.data[i].images.fixed_height.url + " src= " + response.data[i].images.fixed_height_still.url + " class= 'gif-img'></div>");
             };
         });

         topics.shows = [];
         topics.shows.push(topics.searchValue);
         $("#search").val("")
         init();
     };

     function pressTopicBtn() {
         $("#display").html("");
         var topicBtnValue = $(this).text();
         var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicBtnValue + "&api_key=yzbTgrV7wPcDaamxmzSfH5iQ4J5b4Xyw&limit=10";
         $.ajax({
             url: queryURL,
             method: 'GET'
         }).done((response) => {
             console.log(response);
             for (i = 0; i < response.data.length; i++) {
                 //Add raiting and img to html
                 $("#display").append("<div class= 'gif-div'>Rating: " + response.data[i].rating.toUpperCase() + "<br>" + "<img data-name= " + response.data[i].images.fixed_height.url + " src= " + response.data[i].images.fixed_height_still.url + " class= 'gif-img'></div>");
             };
         });
     };

     //In creating each image, I added a data-name containing the gif url. Here I swap that with the still image url being used in the src.
     function changeImage() {
         var temp = $(this).attr("data-name");
         $(this).attr("data-name", $(this).attr("src"));
         $(this).attr("src", temp);
     };



     //=======================
     //MAIN PROCESS
     //=======================
     //Initialize on start
     init();

     //When the Submit button is clicked the search function is called
     $("#submit").on("click", search);
     //When the show buttons are clicked, the presstopicBtn function is called
     $(document).on("click", ".topic-btn", pressTopicBtn);
     //When the gif images are clicked, changeImage function is called
     $(document).on("click", ".gif-img", changeImage);
 });

 //  	//  function to render html to display appropriate content
 //  	function displayShow(){
 //  		var topic = $(this).attr("data-topic");
 //  		var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=yzbTgrV7wPcDaamxmzSfH5iQ4J5b4Xyw&limit=10";
 //  		// ajax call using get method
 //  		$.ajax({
 //  			url: queryUrl,
 //  			method: "GET"
 //  		}).done(function(response){
 //  			// create variables for the returned data(results)
 //  			var results = response.data;
 //  			// loop through array
 //  			for (var i =0;i < results.length; i++) {
 //  				//variables for rating
 //  				var rating = results[i].rating;
 //  				// variable to update display area with <p> tag + rating
 //  				var p = $("<p>").text("Rating: " + rating);
 //  				// create div for gif
 //  				var gifDiv = $("<div class='gif'>")
 //  				// create var for animate and still data states
 //  				var animate = results[i].images.fixed_height.url
 //  				var still = results[i].images.fixed_height_still.url
 //  				// creat var for img tag and add animate and still data states
 //  				var topicImage = $("<img data-state='still' data-animate='"+animate+"' data-still='"+still+"''>");
 //  				// give image src attribute pulled off result item and make still
 //  				topicImage.attr("src", still);

 //  				// append gifdiv with <p> with rating
 //  				gifDiv.append(p);
 //  				gifDiv.append(topicImage);
 //  				// prepend gifDiv to the display id using jquery
 //  				$("#display").prepend(gifDiv);


 //  			}


 //  		});

 //  	}
 //  	// function for displaying initial topic data
 //  	function renderButtons() {

 //  		// deleting the buttons prior to adding new buttons
 //  		$("#topics").empty();

 //  		// loop through array of topics and create button new button div
 //  		for (var i = 0; topics.length ; i++) {
 //  			var a = $("<button>");
 //  			a.addClass("show");
 //  			a.attr("data-topic", topics[i]);
 //  			a.text(topics[i]);
 //  			$("#topics").append(a);
 //  		}
 //  		}
 //  		// on click event for submit button
 //  		$("#submit").on("click", function(event){
 //  			// prevent default of going to external url
 //  			event.preventDefault();
 //  			// take value in field and trim whitespace
 //  			var show = $("#search").val().trim();
 //  			// add searched show to array
 //  			topics.push(show);
 //  			// call function to render buttons
 //  			renderButtons();
 //  		});