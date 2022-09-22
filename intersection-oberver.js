const sectionOne = document.querySelector('.trigger');

let visible = false;

const options = {root: null, threshold: 0.25, rootMargin: "-100px"};

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