window.addEventListener('layout-initialized', () => {
    // Store the carousel elements as variables
    const slidesContainer = document.getElementById("slides-container");
    const slide = document.querySelector(".slide");
    const prevButton = document.getElementById("slide-arrow-prev");
    const nextButton = document.getElementById("slide-arrow-next");
    // Integer to keep track of how many times we multiply the width to displace the slide
    let currentPosition = 0; // Default
    const lastSlide = slidesContainer.childElementCount;

    function toSlide(slideNum){
        const slideWidth = slide.clientWidth;
        slidesContainer.scrollLeft = slideNum * slideWidth;
    }

    function scrollSlide(toPrevious){
        console.log('Move slide');
        // Do not increase/decrease this if we're at the beginning or the end
        if ((toPrevious && (currentPosition === 0)) || !toPrevious && (currentPosition === lastSlide))
            return; 

        if(toPrevious) 
            currentPosition -= 1;
        else 
            currentPosition += 1;

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

        if(slidesContainer.scrollLeft === lastSlidePos){
            toSlide(0); // Back to the beginning
            currentPosition = 0;
        }
        else
            scrollSlide(false) // keep scrolling
    }, 5000);
});