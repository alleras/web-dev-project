// The code for this carousel was HEAVILY modified from the one in this link: https://webdesign.tutsplus.com/tutorials/how-to-build-a-simple-carousel-with-vanilla-javascript--cms-41734 
window.addEventListener('layout-initialized', () => {
    // Store the carousel elements as variables
    const slidesContainer = document.getElementById("slides-container");
    const slide = document.querySelector(".slide");
    const prevButton = document.getElementById("slide-arrow-prev");
    const nextButton = document.getElementById("slide-arrow-next");
    // Integer to keep track of how many times we multiply the width to displace the slide
    let currentPosition = 0; // Default
    // Store which "index" is the last element
    const lastSlide = slidesContainer.childElementCount - 1;

    // A function that will displace the scroll property of the container by the width of the container times the slide number, to show each specific slide
    function toSlide(slideNum){
        const slideWidth = slide.clientWidth;
        slidesContainer.scrollLeft = slideNum * slideWidth;
    }

    // A function to scroll to the next or previous slide
    function scrollSlide(toPrevious){
        console.log('Move slide');
        // Do not increase/decrease this if we're at the beginning or the end
        if ((toPrevious && (currentPosition === 0)) || !toPrevious && (currentPosition === lastSlide))
            return; 
        // Move back or forward depending on toPrevious
        if(toPrevious) 
            currentPosition -= 1;
        else 
            currentPosition += 1;
        // Once we determine which is our current slide, we move to it
        toSlide(currentPosition);
    }

    // This will add an onClick function to the buttons
    nextButton.addEventListener("click", () => scrollSlide(false, slidesContainer, slide));
    prevButton.addEventListener("click", () => scrollSlide(true, slidesContainer, slide));

    // Automatic slide scrolling, will occur every 4 seconds
    var scrollTimer = setInterval(() => {
        // The scroll position will increase by the width of the container each time
        // We'll use this variable to know when the scroll bar is at the end of the sequence
        // Then scroll back to the beginning 
        let lastSlidePos = slidesContainer.clientWidth * (slidesContainer.childElementCount - 1);

        // If we reach the last slide, then we go back to the first one
        if(slidesContainer.scrollLeft === lastSlidePos){
            toSlide(0); // Back to the beginning
            currentPosition = 0; // Set the tracker integer back to 0
        }
        else
            scrollSlide(false) // keep scrolling
    }, 5000); // Happens every five seconds
});