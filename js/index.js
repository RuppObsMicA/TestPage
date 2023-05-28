const tabsNavs = document.querySelectorAll(".tabs-nav");
const starsContainer = document.querySelectorAll(".star");
const averageStarsContainer = document.querySelectorAll(".gen_star");
const commentForm = document.getElementById("comment-form");
const commentArea = document.getElementsByClassName("all-comments");
const NUMBER_OF_REVIEWS = document.getElementsByClassName("reviews")[0];
const pagsContainer = document.querySelectorAll(".pag");

// slider
let widthOfSlider = 0;
let widthOfSecondarySlider = 0;
const sliderWrapper = document.querySelector(".slider-wrapper");
const sliderSecondaryWrapper = document.querySelector(".slider-secondary-wrapper");

// star rating
let ratingForSubmit = "";
let numberOfReviews = 0;
let currentStarRating = 0;
let generalStarRating = 0;

for (let i = 0; i < pagsContainer.length; i++){
    pagsContainer[i].addEventListener("click", getPictureOfPagination);
}
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


// Stars related section

for (let i = 0; i < starsContainer.length; i++) { //add events to all stars
    starsContainer[i].addEventListener("mouseover", hoverStarRating);
    starsContainer[i].addEventListener("mouseout", removeStarRating);
    starsContainer[i].addEventListener("click", saveDataOfStars);
}

function hoverStarRating() { //add color to all stars before a hovered one
    for (let i = 1; i <= starsContainer.length; i++) {
        if (this.classList.contains("star_" + i)) {  //find what star was hovered and set color for all previous ones
            for (let j = 0; j < i; j++) {
                starsContainer[j].style.color = "gold";
            }
        }
    }
}

function saveDataOfStars() {
    // update stars' color after every click
    for (let i = 1; i <= starsContainer.length; i++) {
        if (this.classList.contains("star_" + i)) {
            for (let j = 4; j >= i; j--) {
                starsContainer[j].style.color = "gray";
            }
        }
    }

    for (let i = 1; i <= starsContainer.length; i++) {
        if (this.classList.contains("star_" + i)) {
            for (let j = 0; j < i; j++) {
                starsContainer[j].style.color = "gold";
            }
        }
    }

    ratingForSubmit = "";
    let numberOfStar = this.classList[this.classList.length - 1];
    for (let i = 0; i < +numberOfStar.slice(numberOfStar.length - 1, numberOfStar.length); i++) {
        ratingForSubmit += "★";
    }
    currentStarRating = +numberOfStar.slice(numberOfStar.length - 1, numberOfStar.length);

    for (let i = 0; i < starsContainer.length; i++) { //add events to all stars
        starsContainer[i].removeEventListener("mouseout", removeStarRating);
        starsContainer[i].removeEventListener("mouseover", hoverStarRating);
    }
}

function removeStarRating() { //return default color
    for (let i = 0; i < starsContainer.length; i++) { //just to change ratings without refreshing the page
        starsContainer[i].style.color = "gray";
    }
}

// Comment related section
commentForm.addEventListener("submit", submitComment);
function submitComment(e) {
    e.preventDefault();
    if (e.target[0].value == "" || ratingForSubmit === "") {
        return alert('Chose stars or enter the text')
    }
    const currentDate = new Date();

    // create 4 new divs
    const newComment = document.createElement("div");
    const commentRating = document.createElement("div");
    const commentDate = document.createElement("div");
    const commentText = document.createElement("div");

    // add classes to the new divs
    newComment.classList.add("new-comment");
    commentRating.classList.add("comment-star");
    commentDate.classList.add("comment-date");
    commentText.classList.add("comment-text");

    // insert stars and a date
    commentRating.innerHTML = ratingForSubmit;
    commentDate.innerHTML = `${currentDate.getMonth() + 1}.${currentDate.getDate()}.${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`

    commentText.innerHTML = e.target[0].value + "<hr>";

    newComment.appendChild(commentRating);
    newComment.appendChild(commentDate);
    newComment.appendChild(commentText);
    commentArea[0].prepend(newComment);

    // set data of number of reviews and average rating
    numberOfReviews += 1;
    generalStarRating += currentStarRating;
    for (let i = 0; i < averageStarsContainer.length; i++) {
        averageStarsContainer[i].style.color = "gray";
    }
    for (let i = 1; i <= Math.round(generalStarRating / numberOfReviews); i++) {
        if (averageStarsContainer[i-1].classList.contains("gen_star_" + i)) {
            for (let j = 0; j < i; j++) {
                averageStarsContainer[j].style.color = "gold";
            }
        }
    }
    NUMBER_OF_REVIEWS.innerHTML = `(${numberOfReviews})`;

    // reset the data we just used
    ratingForSubmit = "";
    removeStarRating();
    e.target[0].value = "";
    for (let i = 0; i < starsContainer.length; i++) {
        starsContainer[i].addEventListener("mouseout", removeStarRating);
        starsContainer[i].addEventListener("mouseover", hoverStarRating);
    }

}

// Slider section
document.querySelector(".slider-button-prev img").addEventListener("click", () => changeSlide(false));

document.querySelector(".slider-button-next img").addEventListener("click", changeSlide);

const images = 6; // here should be length of the array of images that came from server

function changeSlide(moveForward = true) {
    const direction = moveForward ? -1 : 1;

    widthOfSlider = widthOfSlider + (direction * 100);
    widthOfSecondarySlider = widthOfSecondarySlider + (direction * 33.3);

    if (moveForward && widthOfSlider < -(images - 1) * 100) {
        widthOfSlider = 0;
        widthOfSecondarySlider = 0;
    }

    if (!moveForward && widthOfSlider > 0) {
        widthOfSlider = -(images - 1) * 100;
        widthOfSecondarySlider = -132;
    }

    sliderWrapper.style.left =  widthOfSlider + "%";
    sliderSecondaryWrapper.style.left = widthOfSecondarySlider + "%";
}

// Pagination
function getPictureOfPagination(){
    for (let i = 0; i < pagsContainer.length; i++){
        if (this.classList.contains("pag-" + (i+1))){
            widthOfSlider = -100*i;
            widthOfSecondarySlider = -33.3*i;
            sliderWrapper.style.left =  widthOfSlider + "%";
            sliderSecondaryWrapper.style.left = widthOfSecondarySlider + "%";
        }
    }
}











