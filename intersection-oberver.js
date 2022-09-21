const sectionOne = document.querySelector('.trigger');

const options = {root: null, threshold: 0, rootMargin: "-100px"};

var faders = document.getElementsByClassName('fadeIn');

const observer = new IntersectionObserver(function(entries, observer){
    entries.forEach(entry => {
        if(!entry.isIntersecting) {
            return;
        } else {
            for(let i = 0; i < faders.length; i++) {
                faders[i].classList.add("appear");
            }
        };
    });
}, options);

observer.observe(sectionOne);