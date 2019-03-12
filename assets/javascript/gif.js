var topics = ["Russell Westbrook", "Lebron James", "Michael Jordan", "Nick Young", "Kobe Bryant",
"Allen Iverson", "Shaq", "Kyrie Irving", "Joel Embiid", "Jr Smith",
];
var numberOfGIFs = 10;


function renderButtons(){
	for(var i = 0; i < topics.length; i++) { //for the length of the array add a new button
		var newButton = $("<button>"); //first add a button tag
        newButton.addClass("btn"); //give the button a class called btn 
        //cartoon becomes player
		newButton.addClass("player-button");
		newButton.text(topics[i]);
		$("#button-container").append(newButton); //populate the id called button container with all the new buttons
	}
	$(".player-button").unbind("click"); //remove the click function from the button

	$(".player-button").on("click", function(){
		$(".gif-image").unbind("click"); //remove the click function from the button
		$("#gif-container").empty();
		$("#gif-container").removeClass("dotted-border");
		populateGIFContainer($(this).text());
	});

}

function addButton(player){
	if(topics.indexOf(player) === -1) {
		topics.push(player);
		$("#button-container").empty();
		renderButtons();// render a button when player name is added to text field and push
	}
}

function populateGIFContainer(show){
	$.ajax({
		url: "https://api.giphy.com/v1/gifs/search?q=" + show + 
		"&api_key=61TKqzUDPHfv40Bqr6iEsqqBCfa360mt&rating=" + "&limit=" + numberOfGIFs,
		method: "GET"
	}).then(function(response){
		response.data.forEach(function(element){
			newDiv = $("<div>");
			newDiv.addClass("individual-gif-container");
			var newImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");
			newImage.addClass("gif-image");
			newImage.attr("state", "still");
			newImage.attr("still-data", element.images.fixed_height_still.url);
			newImage.attr("animated-data", element.images.fixed_height.url);
			newDiv.append(newImage);
			$("#gif-container").append(newDiv);
		});
		
		//$("#gif-container").addClass("dotted-border");
		$(".gif-image").unbind("click");
		$(".gif-image").on("click", function(){
			if($(this).attr("state") === "still") {
				$(this).attr("state", "animated");
				$(this).attr("src", $(this).attr("animated-data"));
			}
			else {
				$(this).attr("state", "still");
				$(this).attr("src", $(this).attr("still-data"));
			}
		});
	});
}

$(document).ready(function(){
	renderButtons(); //When this function runs render my added player button to button container
	$("#submit").on("click", function(){
		event.preventDefault(); //So that page does not refresh after click ( because the default action of the submit button is to refresh the pag after click)
		addButton($("#player").val().trim());
		$("#player").val(""); 
	});
});