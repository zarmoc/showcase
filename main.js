const burg = document.querySelector(".burg");
const burgMenu = document.querySelector(".burgMenu");


function menuBase(){
    burg.innerHTML = 
    `
    <img src="img/mebnu.svg" alt="">
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
        <img src="img/x.svg" alt="">
        `
        burg.classList.add('open');
        burgMenu.style.right = "0";
    }
}

menuBase();
burg.addEventListener("click", toggleMenu); // Add event listener for menu button