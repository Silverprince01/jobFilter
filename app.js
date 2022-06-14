const JsonData = "data.json";
const whole = document.querySelector(".whole");
const clear = document.querySelector(".clear");
const search = document.querySelector(".search");
const filt = document.querySelectorAll(".filt");
const searchContent = document.querySelector(".searchContent");

const Json = async () => {
  const resp = await fetch(JsonData);
  const data = await resp.json();
  return data;
};

//template for each card

const templateCard = (item) => {
  return `      
        <div class="card">
        <div class="first">
        <img src=${item.logo} alt=${item.position} class="img" />
        <div class="midDiv">
        <div class="companyName">
        <p class="name">${item.company}</p>
        ${feature(item.featured)}
        ${neaw(item.new)}
        
        </div>
        <h2 class="position">${item.position}</h2>
        <div class="time">
        <p class="postedAt">${item.postedAt}</p>
        <p class="contract">${item.contract}</p>
        <p class="location">${item.location}</p>
        </div>
        </div>
        </div>
        <hr>
        <div class="stack">
        <button class="filt role">${item.role}</button>
        <button class="filt level">${item.level}</button>
        ${language(item.languages)}
        ${tool(item.tools)}
        </div>
        </div>
        
        `;
};

const displayCard = () => {
  let card = "";
  Json().then((data) => {
    data.forEach((dat) => {
      card += templateCard(dat);
      whole.innerHTML = card;
    });
  });

};
displayCard();

// displaying the languages
const language = (langs) => {
  let lang = "";
  langs.forEach((lan) => {
    lang += ` <button class="filt">${lan}</button>  `;
  });
  return lang;
};

//displaying each tools
const tool = (tools) => {
  let too = "";
  tools.forEach((toools) => {
    too += ` <button class="filt">${toools}</button>  `;
  });
  return too;
};

const feature = (feat) => {
  let featur = "";
  if ((feat)) {
    featur += `  <button> FEATURED! </button>  `;
  }
  return featur;
};
const neaw = (naw) => {
  let news = "";
  if ((naw)) {
    news += `  <button> NEW! </button>  `;
  }
  return news;
};
// Function to display the search bar
const displaySearchBar = (e) => {
  let element = e.target;
  if (element.classList.contains("filt")) {
    search.classList.add("search2");
  }
  displayFilterOnScreen(element);
};
let filterArray = [];

//the funtion to display the desired element to filter
const displayFilterOnScreen = (filt) => {
  let filter = "";

  if (!filterArray.includes(filt.innerHTML)) {
    filterArray.push(filt.innerHTML);
  }
  filterArray.forEach((ele) => {
    filter += ` <div class="filter">
    <span class="text">${ele}</span>
    <span class="cancel" > <img src ="images/icon-remove.svg"> </span>

    
     </div>`;

    searchContent.innerHTML = filter;
    filteredCards();
  });
};

//appending the Json data to the cards to compare
const filteredCards = (data) => {
  if (filterArray.length !== 0) {
    let newCards = "";
    Json().then((data) => {
      data.forEach((dat) => {
        if (valid(dat)) {
          newCards += templateCard(dat);
          whole.innerHTML = newCards;
        }
      });
    });
  } else {
    search.classList.add("search");
    displayCard(data);
  }
};
// the function checking the json to see if each cards contains the desired filter
const valid = (val) => {
  let tru = true;
  filterArray.forEach((fil) => {
    if (
      val.role !== fil &&
      val.level !== fil &&
      !val.languages.includes(fil) &&
      !val.tools.includes(fil)
    ) {
      tru = false;
    }
  });
  return tru;
};

const removeFilterElement = (e) => {
  let element = e.target;
  if (element.classList.contains("cancel")) {
    const remov = element.parentElement;

    let index = filterArray.indexOf(remov.innerHTML.split(" ")[0].trim());
    filterArray.splice(index, 1);
    remov.remove();
  }

  if (filterArray == 0) {
    search.classList.remove("search2");
  }
  filteredCards();
};

const clearSearchBar = () => {
  search.classList.remove("search2");
  filterArray = [];
  filteredCards();
};
whole.addEventListener("click", displaySearchBar);
searchContent.addEventListener("click", removeFilterElement);
clear.addEventListener("click", clearSearchBar);
