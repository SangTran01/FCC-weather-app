var isCelcius = true;

var main = function() {
  // Gets the user's latitude and longitude
  function getLocation() {
    var msg;

    /**
  first, test for feature support
  **/
    if ("geolocation" in navigator) {
      // geolocation is supported :)
      requestLocation();
    } else {
      // no geolocation :(
      msg = "Sorry, looks like your browser doesn't support geolocation";
      outputResult("#error", msg); // output error message
    }

    /***
  requestLocation() returns a message, either the users coordinates, or an error message
  **/
    function requestLocation() {
      /**
    getCurrentPosition() below accepts 3 arguments:
    a success callback (required), an error callback  (optional), and a set of options (optional)
    **/

      var options = {
        // enableHighAccuracy = should the device take extra time or power to return a really accurate result, or should it give you the quick (but less accurate) answer?
        enableHighAccuracy: false,
        // timeout = how long does the device have, in milliseconds to return a result?
        timeout: 5000,
        // maximumAge = maximum age for a possible previously-cached position. 0 = must return the current position, not a prior cached position
        maximumAge: 0
      };

      // call getCurrentPosition()
      navigator.geolocation.getCurrentPosition(success, error, options);

      // upon success, do this
      function success(pos) {
        $(".fa-spinner").css("display", "none");
        // get longitude and latitude from the position object passed in
        var lng = pos.coords.longitude;
        var lat = pos.coords.latitude;
        var key = "7d3b03e7f55d602a5179b3cd15d5b9a2/";
        var url = "https://crossorigin.me/https://api.darksky.net/forecast/";
        var units = "units=ca";
        var exclude = "exclude=minutely,hourly,daily,alerts,flags";
        var fullUrl = url + key + lat + "," + lng + "?" + units + "&" + exclude;

        var geocodingAPI =
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
          lat +
          "," +
          lng +
          "&key=AIzaSyDEyUQJAGCpJKoJPnC4sgevwc_Wrc6oZXo";

        $.getJSON(geocodingAPI, function(json) {
          if (json.status == "OK") {
            //Check result 0
            var result = json.results[0];
            //look for locality tag and administrative_area_level_1
            var city = "";
            var state = "";
            var country = "";
            for (
              var i = 0, len = result.address_components.length;
              i < len;
              i++
            ) {
              var ac = result.address_components[i];
              if (ac.types.indexOf("locality") >= 0) {
                city = ac.long_name;
              }
              if (ac.types.indexOf("administrative_area_level_1") >= 0) {
                state = ac.long_name;
              }
              if (ac.types.indexOf("country") >= 0) {
                country = ac.long_name;
              }
            }
            if (state != "") {
              outputResult(
                "#current-location",
                city + ", " + state + ". " + country + "!"
              );
            }
          }
        });
        //Now to perform another AJAX call with DarkSky
        getCurrentWeather(fullUrl);
      } //END of success

      // upon error, do this
      function error(err) {
        // return the error message
        msg = "Error: " + err + " :(";
        outputResult("#error", msg); // output button
      }
    } // end requestLocation();
  } // end getLocation()

  function getCurrentWeather(url) {
    $.ajax({
      url: url,
      type: "GET",
      datatype: "json",
      success: function(data) {
        var dateFormatted = moment(new Date()).format("MMMM Do YYYY, h:mm a");
        console.log(data);
        switch (data.currently.icon) {
          case "clear-day":
            $(".wi").addClass("wi-day-sunny");
            //change bg image
            $("body").css(
              "background-image",
              "url(https://cdn.pixabay.com/photo/2017/03/05/01/21/cumulus-clouds-2117442_960_720.jpg)"
            );
            $("body").css("color", "#044389");
            break;
          case "clear-night":
            $(".wi").addClass("wi-night-clear");
            //change bg image
            $("body").css(
              "background-image",
              "url(https://cdn.pixabay.com/photo/2017/02/20/06/01/stars-2081685_960_720.jpg)"
            );
            $("body").css("color", "#F2E9E4");
            break;
          case "rain":
            $(".wi").addClass("wi-day-rain");
            //change bg image
            $("body").css(
              "background-image",
              "url(https://cdn.pixabay.com/photo/2014/04/05/11/39/rain-316579_960_720.jpg)"
            );
            $("body").css("color", "#001C55");
            break;
          case "snow":
            $(".wi").addClass("wi-day-snow");
            //change bg image
            $("body").css(
              "background-image",
              "url(https://cdn.pixabay.com/photo/2012/03/01/01/34/winter-20234_960_720.jpg)"
            );
            $("body").css("color", "#0A0908");
            break;
          case "sleet":
            $(".wi").addClass("wi-day-sleet");
            //change bg image
            $("body").css(
              "background-image",
              "url(https://cdn.pixabay.com/photo/2016/04/26/10/18/hailstones-on-window-pane-1354038_960_720.jpg)"
            );
            $("body").css("color", "#B95F89");
            break;
          case "wind":
            $(".wi").addClass("wi-day-windy");
            //change bg image
            $("body").css(
              "background-image",
              "url(https://cdn.pixabay.com/photo/2015/11/22/14/31/reed-1056322_960_720.jpg)"
            );
            $("body").css("color", "#C0CAAD");
            break;
          case "fog":
            $(".wi").addClass("wi-day-fog");
            //change bg image
            $("body").css(
              "background-image",
              "url(https://cdn.pixabay.com/photo/2017/05/14/13/57/lake-2312089_960_720.jpg)"
            );
            $("body").css("color", "#5E503F");
            break;
          case "cloudy":
            $(".wi").addClass("wi-day-cloudy");
            //change bg image
            $("body").css(
              "background-image",
              "url(https://cdn.pixabay.com/photo/2013/11/01/08/46/sun-203792_960_720.jpg)"
            );
            $("body").css("color", "#283044");
            break;
          case "partly-cloudy-day":
            $(".wi").addClass("wi-day-cloudy");
            //change bg image
            $("body").css(
              "background-image",
              "url(https://cdn.pixabay.com/photo/2016/01/02/00/42/cloud-1117279_960_720.jpg)"
            );
            $("body").css("color", "#393E41");
            break;
          case "partly-cloudy-night":
            $(".wi").addClass("wi-night-alt-cloudy");
            //change bg image
            $("body").css(
              "background-image",
              "url(https://cdn.pixabay.com/photo/2016/11/20/22/31/moon-1843939_960_720.jpg)"
            );
            $("body").css("color", "#DFF8EB");
            break;
          default:
            $(".wi").addClass("wi-na");
        } // end switch
        //display date
        outputResult("#current-date", dateFormatted);
        
        //display celcius and farenhait buttons
        outputResult("#temp-c", "C");
        outputResult("#divider", "|");
        outputResult("#temp-f", "F");
        
        if (isCelcius) {
          //display Temp in Celcius
          outputResult("#temp", Math.round(data.currently.temperature) + "&deg;");
          $("#temp-c").prop("disabled", true);
        } else {
          var temp = parseInt(data.currently.temperature, 10);
          var temp = Math.round(temp * 9 / 5 + 32);
          outputResult("#temp", temp + "&deg;");
          
          $("#temp-f").prop("disabled", true);
        }

        //display precipatation, humidity, and wind speed
        outputResult(".precip-val", data.currently.precipProbability + "%");
        outputResult(
          ".humid-val",
          Math.round(data.currently.humidity * 100) + "%"
        );
        outputResult(".wind-val", data.currently.windSpeed + " km/h");
      },
      error: function(err) {
        console.log(err);
      }
    });
  } // end getCurrentWeather

  /***
  outputResult() inserts msg into the DOM
  **/
  function outputResult(id, msg) {
    $(id).html(msg);
  }

  $(document).ready(function() {
    // attach getLocation() to button click
    $(".button-start").on("click", function() {
      // show spinner while getlocation() does its thing
      $(".result").html('<i class="fa fa-spinner fa-spin"></i>');
      //after click change text to 'refresh'
      $(this).text("Refresh");
      //TODO: remember temp units preference
      //initial hide tables
      $(".table-m-screen").removeClass("hidden");
      $(".table-s-screen").removeClass("hidden");
      $(".footer-text").removeClass("hidden");
      getLocation();
      //hasClicked = true;
    });

    $(document).on("click", "#temp-c", function() {
      //change #current-temp to celcius
      $(this).prop("disabled", true);
      $("#temp-f").prop("disabled", false);
      //check if other is selected and after selected
      //deselect
      var temp = parseInt($("#temp").text(), 10);
      var temp = Math.round((temp - 32) * 5 / 9);
      $("#temp").html(temp + "&deg;");
      
      $(this).addClass('hovered');
      $("#temp-f").removeClass('hovered');
      isCelcius = true;
    });

    $(document).on("click", "#temp-f", function() {
      //change #current-temp to celcius
      $(this).prop("disabled", true);
      $("#temp-c").prop("disabled", false);
      //check if other is selected and after selected
      //deselect
      var temp = parseInt($("#temp").text(), 10);
      var temp = Math.round(temp * 9 / 5 + 32);
      $("#temp").html(temp + "&deg;");
      
      $(this).addClass('hovered');
      $("#temp-c").removeClass('hovered');
      isCelcius = false;
    });
  });
};

main();