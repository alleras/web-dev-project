window.addEventListener('layout-initialized', () => {
    // The scroll to top element itself
    const goUpButton = document.getElementById('go-up-button');

    // This enables the posibility to click the element and have an action happen
    goUpButton.addEventListener('click', () => {
        // Scroll to the very top of the site
        window.scroll({top: 0, behavior: 'smooth'});
    });

    // OnScroll event will let us detect when we have scrolled after a threshold and show/hide the scroll to top button
    window.onscroll = function (e) {
        html = document.documentElement;
        body = document.body;
    
        // If HTML or Body element is scrolled more than 20 units, we display
        if (html.scrollTop > 20 || body.scrollTop > 20) {
            goUpButton.style.display = "block";
        } else { // We hide the element
            goUpButton.style.display = "none";
        }
    }
});


