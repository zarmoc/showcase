const left = document.getElementById("arrow-left");
const right = document.getElementById("arrow-right");
const slider = document.querySelector(".slider");
const images = document.querySelectorAll(".image");
const bottom = document.querySelector(".bottom");

// "slideNum" sirve para multiplicar la distancia que queremos trasladar las imagenes en el carrusel
let slideNum = 1;
// "length" nos dice el length del array creado por "images" :)
const length = images.length;


//puntitos 

//creamos los puntitos 
for(let i = 0; i<length; i++)
{
    const div = document.createElement("div");
    div.className = "button";
    bottom.appendChild(div);
};

//agarramos todos los puntitos y los juntamos en una sola variable
const BALLS = document.querySelectorAll(".button");
BALLS[0].className = "button-selected";


// funcion para resetear la clase de todos los botones
const resetCls = () =>
{
    BALLS.forEach((button) => {
        button.className = "button";
    });
}

// funcion para cambiar el color del puntito seleccionado
const changeClr = ()=>{
    resetCls();
    BALLS[slideNum - 1].className = "button-selected";
}


// primero reseteamos todos los botones, despues movemos el slider acorde con el botoncito, y cambiamos la clase del boton seleccionado
BALLS.forEach((button,i) =>
{
    button.addEventListener("click", ()=>
    {
        resetCls();
        slider.style.transform = `translateX(-${i * 50}vw)`;
        slideNum = i+1;
        button.className = "button-selected";
    });
});


//Flechitas



right.addEventListener("click", function slideR() {
  if (slideNum < length) {
    slider.style.transform = `translateX(-${slideNum * 50}vw)`;
    slideNum++;
  } else {
    slider.style.transform = `translateX(0vw)`;
    slideNum = 1;
  }
    changeClr();
});



left.addEventListener("click", function slideL() {
  if (slideNum <= length && slideNum > 1) {
    slider.style.transform = `translateX(${-(slideNum - 2) * 50}vw)`;
    slideNum--;
  } else {
    slider.style.transform = `translateX(-200vw)`;
    slideNum = length;
  }
  changeClr();
});


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
