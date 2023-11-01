const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader=document.getElementById('loader');

let apiQuotes = [];

// loading funtion : to show loading
function loading(){
  loader.hidden=false;
  quoteContainer.hidden=true;
}

//Hide loading. 
function complete(){
  quoteContainer.hidden=false;
  loader.hidden=true;
}

//Show new Quote
function newQuote() {

  loading();
  //Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  //Check if Author field is blank or not
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  //Check quote length to determine style

  if(quote.text.length > 120){
    quoteText.classList.add('long-quote');
  }else{
    quoteText.classList.remove('long-quote');
  }

  // Set quote and hide loader
  quoteText.textContent = quote.text;
  complete();
}

//Get Quotes from API
async function getQuotes() {

  loading();

  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();

    newQuote();
  } catch (error) {
    //Catch Error here
  }
}


//TWeet Quote
function tweetQuotes(){

  const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl,'_blank');
}


// Event Listeners
// Here we are adding event listeners to buttons. 
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuotes);



//On load
getQuotes();


