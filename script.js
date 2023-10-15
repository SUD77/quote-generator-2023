const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

let apiQuotes = [];

//Show new Quote
function newQuote() {
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

  quoteText.textContent = quote.text;
}

//Get Quotes from API
async function getQuotes() {
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
