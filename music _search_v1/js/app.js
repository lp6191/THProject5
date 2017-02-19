$(document).ready(function(){
  $(".search-form").submit(function(event){
    //prevent default form submission
    event.preventDefault();
    var api = "https://api.spotify.com/v1/search"
    var keyWord = {
      q: $("#search").val(),
      type: "album"
    };
    //function that displays returned albums
    function displayAlbums (data){
      $("ul li").hide();
      //console.log(data);
      var html;
      //if there aren't any returned albums
      if(data.albums.items.length === 0){
        html = "<li class='no-albums desc'>";
        html += "<i class='material-icons icon-help'>help_outline</i>No albums found that match: "+ $("#search").val() +".";
        html += "</li>";
        $("#albums").append(html);
      }else{
        $.each(data.albums.items, function(i, album){
          //concatenating each album in .each loop
          html = "<li>";
          html += "<a class='album-link' href=" + album.external_urls.spotify + ">"
          html += '<div class="album-wrap">';
          html += '<img class="album-art" src="'+ album.images[0].url +'">';
          html += "</div>";
          html += '<span class="album-title">'+ album.name + '</span>';
          html += '<span class="album-artist">'+ album.artists[0].name + '</span>';
          html += "</a>"
          html += "</li>";
          //console.log(html);
          $("#albums").append(html);
        });
      }
    };
    //api call
    $.get(api, keyWord, displayAlbums, "json");
  });
});
