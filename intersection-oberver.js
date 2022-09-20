const sectionOne = document.querySelector('.box1');

const options = {};

const observer = new IntersectionObserver(function(entries, oberserver){
    entries.forEach(entry => {
        console.log(entry);
    });
}, options);

observer.observe(sectionOne);