const sectionOne = document.querySelector('.trigger');

const options = {root: null, threshold: 0, rootMargin: "-100px"};

const observer = new IntersectionObserver(function(entries, observer){
    entries.forEach(entry => {
        console.log(entry);
    });
}, options);

observer.observe(sectionOne);