const data = [
  {
    id: 1,
    name: "Invicta Men's Pro Diver",
    img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
    price: 74,
    cat: "Dress",
  },
  {
    id: 11,
    name: "Invicta Men's Pro Diver 2",
    img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
    price: 74,
    cat: "Dress",
  },
  {
    id: 2,
    name: "Timex Men's Expedition Scout ",
    img: "https://m.media-amazon.com/images/I/91WvnZ1g40L._AC_UY879_.jpg",
    price: 40,
    cat: "Sport",
  },
  {
    id: 3,
    name: "Breitling Superocean Heritage",
    img: "https://m.media-amazon.com/images/I/61hGDiWBU8L._AC_UY879_.jpg",
    price: 200,
    cat: "Luxury",
  },
  {
    id: 4,
    name: "Casio Classic Resin Strap ",
    img: "https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg",
    price: 16,
    cat: "Sport",
  },
  {
    id: 5,
    name: "Garmin Venu Smartwatch ",
    img: "https://m.media-amazon.com/images/I/51kyjYuOZhL._AC_SL1000_.jpg",
    price: 74,
    cat: "Casual",
  },
];

const searchBar = document.querySelector(".searchBar");
const catsContainer = document.querySelector(".categories");
const slider = document.querySelector(".priceRange");
const slidValue = document.querySelector(".priceValue");
const prodContainer = document.querySelector(".products");

const displayProducts = (filteredProds) => {
  prodContainer.innerHTML = filteredProds
    .map(
      (product) =>
        `
        <div class="card">
            <img src=${product.img} alt="">
            <span class="name">${product.name}</span>
            <span class="priceText">$${product.price}</span>
        </div>
            `
    )
    .join("");
};

displayProducts(data);

searchBar.addEventListener("keyup", (e) => {
  const searchValue = e.target.value.toLowerCase();

  if (searchValue) {
    displayProducts(
      data.filter((item) => item.name.toLowerCase().indexOf(searchValue) !== -1)
    );
  } else {
    displayProducts(data);
  }
});

const displayCats = (c) => {
  catsContainer.innerHTML = c
    .map(
      (c) =>
        `
      <span class="cat">${c}</span>
      `
    )
    .join("");
};

const setCategories = () => {
  const allCats = data.map((item) => item.cat);

  /*In JavaScript, the spread syntax (`...`) is used to expand an iterable (like an array) into individual elements. 
    In the provided snippet, the spread syntax is used to concatenate the elements of the `categories` array with the filtered unique elements from the `allCats` array.

    Here's what's happening in the code:

    1. `allCats.filter((item, i) => allCats.indexOf(item) === i)` is filtering out duplicate elements from the `allCats` array.
    It creates a new array containing only the unique elements.

    2. The spread syntax `...` is then used to spread these unique elements into individual elements within the `categories` array.

    So, if `allCats` contains `["A", "B", "A", "C"]`, after filtering out duplicates, it would become `["A", "B", "C"]`, and the `categories` 
    array would end up containing `["All", "A", "B", "C"]`. (source: chat GPT)*/

  const categories = [
    "All",
    ...allCats.filter((item, i) => {
      return allCats.indexOf(item) === i;
    }),
  ];

  displayCats(categories);

  catsContainer.addEventListener("click", (e) => {
    const selCategorie = e.target.textContent;

    if (selCategorie === "All") {
      displayProducts(data);
    } else if (selCategorie.length > 10) {
      return null;
    } else {
      displayProducts(data.filter((item) => item.cat === selCategorie));
    }
    console.log(selCategorie);
  });
};

const setPrice = () => {
  const priceList = data.map((item) => item.price);
  const minPrice = Math.min(...priceList);
  const maxPrice = Math.max(...priceList);

  slider.min = minPrice;
  slider.max = maxPrice;
  slider.value = maxPrice;
  slidValue.textContent = "$" + maxPrice;

  slider.addEventListener("mouseup", (e)=>{
    displayProducts(data.filter(item => item.price <= e.target.value))
  })

  slider.addEventListener("input", (e)=>{
    slidValue.textContent = "$" + e.target.value;
  })
}



// funciones para el header


const burg = document.querySelector(".burg");
const burgMenu = document.querySelector(".burgMenu");


function menuBase(){
    burg.innerHTML = 
    `
    <img src="../img/mebnu.svg" alt="">
    `
}


function toggleMenu(){
    if(burg.classList.contains('open')) {
        // If menu is open, close it
        burg.style.transform = "translateX(0)";
        menuBase(); // Restore the original menu icon
        burg.classList.remove('open');
        burgMenu.style.right = "-20vw";
    } else {
        // If menu is closed, open it
        burg.style.transform = "translateX(-11vw) rotate(180deg)";
        burg.innerHTML = 
        `
        <img src="../img/x.svg" alt="">
        `
        burg.classList.add('open');
        burgMenu.style.right = "0";
    }
}


burg.addEventListener("click", toggleMenu); 
menuBase();
setCategories();
setPrice();