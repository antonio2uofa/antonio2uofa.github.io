const sectionOne = document.querySelector('.trigger');

let visible = false;

const options = {root: null, threshold: 0.20, rootMargin: "-100px"};

var faders = document.getElementsByClassName('fadeIn');

const observer = new IntersectionObserver(function(entries, observer){
    entries.forEach(entry => {
        if(!entry.isIntersecting) {
            if(!visible) {
                return;
            } else {
                for(let i = 0; i < faders.length; i++) {
                    faders[i].classList.remove("appear");
                }
            };
        } else {
            for(let i = 0; i < faders.length; i++) {
                faders[i].classList.add("appear");
                visible = true;
            }
        };
    });
}, options);

observer.observe(sectionOne);

function scrollHeader() {
    const nav = document.getElementById("header");
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 60) {
      nav.classList.add("nav_appear");
    } else {
      nav.classList.remove("nav_appear");
    }
}
  
window.addEventListener('scroll', scrollHeader);

el_autohide = document.querySelector('.autohide');

var last_scroll_top = 0;

window.addEventListener('scroll', function() {
    let scroll_top = window.scrollY;
    console.log("scroll_top: ", scroll_top);
    console.log("last_scroll_top", last_scroll_top);
    if(scroll_top > 49) {
        if(scroll_top < last_scroll_top) {
            el_autohide.classList.remove('scrolled-down');
            el_autohide.classList.add('scrolled-up');
        }
        else {
            el_autohide.classList.remove('scrolled-up');
            el_autohide.classList.add('scrolled-down');
        }
        last_scroll_top = scroll_top;
    }
}); 
