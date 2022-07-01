// variables


// news
const generalBtn = document.getElementById("general");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sport");
const entertainmentBtn = document.getElementById("entertainment");
const technologyBtn = document.getElementById("technology");
const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");
var current_country;





// NEWS FUNCTION 
function getNewsContent() {
    // apis 
    const API_KEY = "f0479631d877462a924ca5701e72f631";
    const HEADLINES_NEWS = "https://newsapi.org/v2/top-headlines?country=ng&apiKey=";
    const GENERAL_NEWS = "https://newsapi.org/v2/top-headlines?country=ng&category=general&apiKey=";
    const BUSINESS_NEWS = "https://newsapi.org/v2/top-headlines?country=ng&category=business&apiKey=";
    const SPORTS_NEWS = "https://newsapi.org/v2/top-headlines?country=ng&category=sports&apiKey=";
    const ENTERTAINMENT_NEWS = "https://newsapi.org/v2/top-headlines?country=ng&category=entertainment&apiKey=";
    const TECHNOLOGY_NEWS = "https://newsapi.org/v2/top-headlines?country=ng&category=technology&pageSize=8&apiKey=";
    const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";


    var news = fetch('https://ipinfo.io/json?token=df734007e5cbdc')
                .then((res)=> { return res.json() })
                .then((data) => {
                    console.info(data.country)
                    fetchHeadlines(data.country)
                    current_country = data.country
                    console.log(current_country)
                })
}

// get location function
// var countries = (data.country).toLowerCase();

// async function fetchText() {
//     let url = 'https://ipinfo.io/json?token=df734007e5cbdc';



//     let response = await fetch(url);
//     let data = await response.json();
//     console.log(data);
//     return;
// }
// fetchText();

// var countries = (data.country).toLowerCase();

// let countries = JSON.parse(fetchText(data.country));

// Array
var newsDataArr = [];

// apis 
const API_KEY = "f0479631d877462a924ca5701e72f631";
const HEADLINES_NEWS = "https://newsapi.org/v2/top-headlines?country=ng&apiKey=";
const GENERAL_NEWS = "https://newsapi.org/v2/top-headlines?country=ng&category=general&apiKey=";
const BUSINESS_NEWS = "https://newsapi.org/v2/top-headlines?country=ng&category=business&apiKey=";
const SPORTS_NEWS = "https://newsapi.org/v2/top-headlines?country=ng&category=sports&apiKey=";
const ENTERTAINMENT_NEWS = "https://newsapi.org/v2/top-headlines?country=ng&category=entertainment&apiKey=";
const TECHNOLOGY_NEWS = "https://newsapi.org/v2/top-headlines?country=ng&category=technology&pageSize=8&apiKey=";
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";



// news query functions
window.onload = function() {
    newsType.innerHTML="<h4>Headlines</h4>";
    getNewsContent();
};


generalBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>General news</h4>";
    fetchGeneralNews();
});

businessBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Business</h4>";
    fetchBusinessNews();
});

sportsBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Sports</h4>";
    fetchSportsNews();
});

entertainmentBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Entertainment</h4>";
    fetchEntertainmentNews();
});

technologyBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Technology</h4>";
    fetchTechnologyNews();
});

searchBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Search : "+newsQuery.value+"</h4>";
    fetchQueryNews();
});

// news data functions
const fetchHeadlines =(data) => {
    const response = fetch("https://newsapi.org/v2/top-headlines?country="+ data +"&apiKey=" +API_KEY)
                     .then((res) => res.json())
                     .then((data) => {
                        newsDataArr = [];
                        newsDataArr = data.articles;
                        console.log(data.articles)

                        if (newsDataArr.length){
                            displayNews();
                        } else {
                            // handle errors
                            console.log(data.status, data.statusText);
                            newsdetails.innerHTML = "<h5>No data found.</h5>"
                        }
                     });
    
}


const fetchGeneralNews = async () => {
    const response = await fetch("https://newsapi.org/v2/top-headlines?country="+ current_country +"&category=general&apiKey="+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

const fetchBusinessNews = async () => {
    const response = await fetch("https://newsapi.org/v2/top-headlines?country="+ current_country +"&category=business&apiKey="+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

const fetchEntertainmentNews = async () => {
    const response = await fetch("https://newsapi.org/v2/top-headlines?country="+ current_country +"&category=entertainment&apiKey="+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        console.log(myJson);
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

const fetchSportsNews = async () => {
    const response = await fetch("https://newsapi.org/v2/top-headlines?country="+ current_country +"&category=sports&apiKey="+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

const fetchTechnologyNews = async () => {
    const response = await fetch("https://newsapi.org/v2/top-headlines?country="+ current_country +"&category=technology&pageSize=8&apiKey="+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

const fetchQueryNews = async () => {

    if(newsQuery.value == null)
        return;

    const response = await fetch(SEARCH_NEWS+encodeURIComponent(newsQuery.value)+"&apiKey="+API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        //error handle
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

// news display functions
function displayNews() {

    newsdetails.innerHTML = "";

    if(newsDataArr.length == 0) {
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    newsDataArr.forEach(news => {

        var date = news.publishedAt.split("T");
        
        var col = document.createElement('div');
        col.className="col-sm-12 col-md-4 col-lg-3 p-2 card";

        var card = document.createElement('div');
        card.className = "p-2";

        var image = document.createElement('img');
        image.setAttribute("height","matchparent");
        image.setAttribute("width","100%");
        image.src=news.urlToImage;

        var cardBody = document.createElement('div');
        
        var newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        var dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];

        var discription = document.createElement('p');
        discription.className="text-muted";
        discription.innerHTML = news.description;

        var link = document.createElement('a');
        link.className="btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML="Read more";

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(discription);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsdetails.appendChild(col);
    });

}

