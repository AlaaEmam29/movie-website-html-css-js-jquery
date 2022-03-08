let submitBtn = document.getElementById("submitBtn"),
  nameInput = document.getElementById("nameInput"),
  emailInput = document.getElementById("emailInput"),
  ageInput = document.getElementById("ageInput"),
  phoneInput = document.getElementById("phoneInput"),
  passwordInput = document.getElementById("passwordInput"),
  rePasswordInput = document.getElementById("rePasswordInput"),
  checkInput = document.querySelectorAll(".form-validation"),
  moviesDetails,allResults,
  searchByWord = document.getElementById("searchByWord"),
  navLink = document.querySelectorAll(".nav-link"),
  searchSameArray=document.getElementById('searchSameArray');
let nav1=document.getElementsByClassName('nav1')
submitBtn.addEventListener("click", function () {
  let requiredInput = document.getElementById("requiredInput");
  if (
    nameInput.value === "" ||
    emailInput.value === "" ||
    ageInput.value === " " ||
    phoneInput.value === "" ||
    passwordInput.value === " " ||
    rePasswordInput.value === ""
  ) {
    requiredInput.style.display = "block";
  }
});
nameInput.onkeyup = function () {
  let rejexName = /^[A-Z][a-z]{3,8}$/;
  if (rejexName.test(nameInput.value) === true) {
    $(this).siblings().removeClass("d-block");
    submitBtn.removeAttribute("disabled");
  } else {
    $(this).siblings().addClass("d-block");
    submitBtn.disabled = "true";
  }
};
emailInput.onkeyup = function () {
  let rejexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (rejexEmail.test(emailInput.value) === true) {
    $(this).siblings().removeClass("d-block");
    submitBtn.removeAttribute("disabled");
  } else {
    $(this).siblings().addClass("d-block");
    submitBtn.disabled = "true";
  }
};
passwordInput.onkeyup = function () {
  let rejexPassword =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
  if (rejexPassword.test(passwordInput.value) === true) {
    $(this).siblings().removeClass("d-block");
    submitBtn.removeAttribute("disabled");
  } else {
    $(this).siblings().addClass("d-block");
    submitBtn.disabled = "true";
  }
};
rePasswordInput.onkeyup = function () {
  if (passwordInput.value === rePasswordInput.value) {
    $(this).siblings().removeClass("d-block");
    submitBtn.removeAttribute("disabled");
  } else {
    $(this).siblings().addClass("d-block");
    submitBtn.disabled = "true";
  }
};
ageInput.onkeyup = function () {
  let rejexPhone = /^(012|011|010|015)[0-9]{8}$/;
  if (rejexPhone.test(phoneInput.value) === true) {
    $(this).siblings().removeClass("d-block");
    submitBtn.removeAttribute("disabled");
  } else {
    $(this).siblings().addClass("d-block");
    submitBtn.disabled = "true";
  }
};
ageInput.onkeyup = function () {
  let rejexAge = /^[1-9][0-9]$/;
  if (rejexAge.test(ageInput.value) === true) {
    $(this).siblings().removeClass("d-block");
    submitBtn.removeAttribute("disabled");
  } else {
    $(this).siblings().addClass("d-block");
    submitBtn.disabled = "true";
  }
};

$("#toggleBtn").click(function () {
  let navMenuWidth = $(".navMenu").outerWidth();
  if ($(".headerNav").css("left") === "0px") {
    $(".headerNav").animate({ left: navMenuWidth }, 100, function () {
      $(".navMenu").addClass("openMenu").removeClass("closeMenu");
      $(".fa-align-justify").toggleClass("fa-times");
      $(".nav1").animate(
        {
          opacity: "1",
          paddingTop: "25px",
        },
        1200
      ),
        $(".nav2").animate(
          {
            opacity: "1",
            paddingTop: "25px",
          },
          1300
        ),
        $(".nav3").animate(
          {
            opacity: "1",
            paddingTop: "25px",
          },
          1400
        ),
        $(".nav4").animate(
          {
            opacity: "1",
            paddingTop: "25px",
          },
          1500
        ),
        $(".nav5").animate(
          {
            opacity: "1",
            paddingTop: "25px",
          },
          1600
        ),
        $(".nav6").animate({
          opacity: "1",
          paddingTop: "25px",
        });
    });
  } else {
    $(".headerNav").animate({ left: 0 }, 100, function () {
      $(".navMenu").addClass("closeMenu").removeClass("openMenu");
      $(".fa-align-justify").toggleClass("fa-times");
      $(".nav-link").animate(
        {
          opacity: "0",
          paddingTop: "500px",
        },
        200
      );
    });
  }
});
const api_key = "api_key=6212560e9398bcdfa2b83000088f3029";
const BASE_URL = "https://api.themoviedb.org/3/";
const NowPlaying = `movie/now_playing?${api_key}&language=en-US&page=1`;
const Popular = `movie/popular?${api_key}&language=en-US&page=1`;
const TopRated = `movie/top_rated?${api_key}&language=en-US&page=1`;
const Trending = `trending/all/day?${api_key}`;
const Upcoming = `movie/upcoming?${api_key}&language=en-US&page=1`;
const SEARCH_MOVIE = `search/movie?${api_key}&language=en-US&include_adult=false`;
const moviePlayingURL = BASE_URL + NowPlaying;
const searchURL = BASE_URL + SEARCH_MOVIE;

async function getMovies(url) {
  let response = await fetch(`${url}`);
  let movieNowPlayingInfo = await response.json();
  displayAllNowPlayingMovie(movieNowPlayingInfo.results);
}
getMovies(moviePlayingURL);

function displayAllNowPlayingMovie(results) {
  let res = "";
  for (let i = 0; i < results.length; i++) {
    res += `
        <div class="col-md-6 col-lg-4 my-3 ">
        <div class="movieData">
            <img src='https://image.tmdb.org/t/p/w500${results[i].poster_path}' alt="${results[i].title}" >
            <div class="movieLayer text-center d-flex align-items-center">
            <div class="row">
            <div class='col-12 '>
            <h2>
            ${results[i].original_title}
            </h2>
                <p class='my-4'>${results[i].overview}</p>
                <h5 class='my-4'>
                rate : ${results[i].vote_average}
                </h5>
                <h6 class='my-4'>
                ${results[i].release_date}
                </h6>

            </div>
            </div>
            </div>
        </div>
    </div>
        `;
  }
  let AllMovies = document.getElementById("AllMovies");
  AllMovies.innerHTML = res;
}

searchByWord.addEventListener("keyup", function (e) {
  searchByWordMovie(e.target.value);
});
async function searchByWordMovie(valMovie) {
  valMovie = searchByWord.value;

  if (valMovie) {
    getMovies(searchURL + `&query=${valMovie}`);
    // console.log("true");
  } else if (valMovie === " " || valMovie === undefined) {
    getMovies(moviePlayingURL);
  } else {
    // console.log("false");
    getMovies(moviePlayingURL);
  }
}
$(".nav-link").on("click", function () {
  $(".nav-link").removeClass("activeLink");
  $(this).addClass("activeLink");
});

for (let i = 0; i < navLink.length - 1; i++) {
  navLink[i].addEventListener("click", function (e) {
    displayMovies(e.target.innerHTML)
  });

}
 function  displayMovies(e) {
    switch (e) {
        case "Now Playing":
          getMovies(BASE_URL + NowPlaying);
          break;
        case "Popular":
          getMovies(BASE_URL + Popular);
  
          break;
        case "Top Rated":
          getMovies(BASE_URL + TopRated);  
          break;
        case "Trending":
          getMovies(BASE_URL + Trending);
          break;
        case "Upcoming":
          getMovies(BASE_URL + Upcoming);
          break;  
        default:
          getMovies(BASE_URL + NowPlaying);
          break;
      }
  }
$(document).ready(function(){
    $('.nav-link').click(function(e){
        e.preventDefault()
        // console.log('tmam')
    let curr=$(this).attr('href')
    let currOffSet = $(curr).offset().top;
    // console.log(curr)
    
    $('body,html').animate({scrollTop:currOffSet},700)
    })
})
searchSameArray.addEventListener('keyup',function(e){
        searchSameArrayMovie(e.target.value,moviePlayingURL)
})
 async function searchSameArrayMovie(valueArray, url){
    let response = await fetch(`${url}`);
   console.log(url)
    let movieNowPlayingInfo = await response.json();
     allResults=movieNowPlayingInfo.results
 res = "";
for (let i = 0; i < allResults.length; i++) {

    if(allResults[i].title.toLowerCase().includes(valueArray.toLowerCase())){

        res += `
        <div class="col-md-6 col-lg-4 my-3 ">
        <div class="movieData">
            <img src='https://image.tmdb.org/t/p/w500${allResults[i].poster_path}' alt="${allResults[i].title}" >
            <div class="movieLayer text-center d-flex align-items-center">
            <div class="row">
            <div class='col-12 '>
            <h2>
            ${allResults[i].original_title}
            </h2>
                <p class='my-4'>${allResults[i].overview}</p>
                <h5 class='my-4'>
                rate : ${allResults[i].vote_average}
                </h5>
                <h6 class='my-4'>
                ${allResults[i].release_date}
                </h6>

            </div>
            </div>
            </div>
        </div>
    </div>
        `;
}
else{
      
} 


  let AllMovies = document.getElementById("AllMovies");
  AllMovies.innerHTML = res;
}  
}
function searchAll (e) {

    switch (e) {
        case "NowPlaying":
         return BASE_URL + NowPlaying;
        case "Popular":
            return BASE_URL + Popular;
  
        case "TopRated":
           return BASE_URL + TopRated
        case "Trending":
            return BASE_URL + Trending
        case "Upcoming":
            return BASE_URL + Upcoming;
        default:
            return BASE_URL + NowPlaying;
      }

  }


  
