const tabsNavs = document.querySelectorAll(".tabs-nav");
const starsContainer = document.querySelectorAll(".star");

tabsNavs.forEach((tabNav, idx) => {
    tabNav.addEventListener('click', e => {
        let x = document.getElementsByClassName("tab");
        for (let i = 0; i < x.length; i++) {
            x[i].style.display = "none";
            tabsNavs[i].style.borderBottom = "none";
        }
        tabsNavs[idx].style.borderBottom = "2px solid dimgray";
        document.getElementById("tab_" + idx).style.display = "block";
    })
})



for (let i = 0; i < starsContainer.length; i++) { //add events to all stars
    starsContainer[i].addEventListener("mouseover", hoverStarRating);
    starsContainer[i].addEventListener("mouseout", removeStarRating);
    starsContainer[i].addEventListener("click", saveData);
}

function hoverStarRating(){ //add color to all stars before a hovered one
    for (let i = 1; i <= starsContainer.length; i++){
        if (this.classList.contains("star_" + i)){  //find what star was hovered and set color for all previous ones
            for (let j = 0; j < i; j++){
                starsContainer[j].style.color = "gold";
            }
        }
    }
}

function saveData (){ //save the rating if we need
    let numberOfStar = this.classList[this.classList.length-1];
    alert(numberOfStar.slice(numberOfStar.length-1,numberOfStar.length));
    removeStarRating();
}

function removeStarRating(){ //return default color
    for (let i = 0; i < starsContainer.length; i++){ //just to change ratings without refreshing the page, can be removed
        starsContainer[i].style.color = "gray";
    }
}







