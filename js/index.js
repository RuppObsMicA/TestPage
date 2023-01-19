const tabsNavs = document.querySelectorAll(".tabs-nav");

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

