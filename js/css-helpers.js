window.addEventListener('layout-initialized', () => {
    // Just storing the hamburger and navGroup elements into variables
    const hamburger = document.querySelector(".nav-hamburger");
    const navGroup = document.querySelector(".nav-group");
    
    // If the hamburger button is clicked (which, it should only be visible when the site is too small)
    hamburger.addEventListener("click", () => {
        // Then we toggle the active property of both hamburger and navGroup
        // This will make the combination of .nav-hamburger and .active trigger, and it will display/hide as appropriate
        hamburger.classList.toggle("active");
        navGroup.classList.toggle("active");
    })

    // Store the accessibility button itself and menu to later modify their active property
    const accessibilityButton = document.getElementById('floating-accessibility');
    const accesibilityMenu = document.getElementById('accessibility-options');
    // Same thing for each specific option
    const accessibilityUnderline = document.getElementById('accessibility-option__underline');
    const accessibilityBigFonts = document.getElementById('accessibility-option__bigFonts');

    // If someone clicks on the Accessibility option, make it and the menu active so they display
    accessibilityButton.addEventListener('click', () => {
        accessibilityButton.classList.toggle('active');
        accesibilityMenu.classList.toggle('active');
    });

    // Logic for the underline option
    accessibilityUnderline.addEventListener('click', () => {
        // The method for changing the underline of the links is loosely based on https://stackoverflow.com/questions/10766328/javascript-how-to-change-the-style-of-all-links-in-a-page
        // I modified the code to make it better and fit my necessity

        // Make it active, this is how we track whether it's enabled or not
        accessibilityUnderline.classList.toggle('active');
        let enabled = accessibilityUnderline.classList.contains('active');
        // An array of objects containing each link in the website
        let allLinks = document.links || document.getElementsByTagName('a');
        // Make the text-decoration property of each individual link underline if enabled, or none if it's not enabled
        for(link of allLinks) link.style.textDecoration = (enabled ? 'underline' : 'none');
        // Just some debugging
        console.log('underline ' + (enabled ? 'on ': 'off'));
    });
    // Logic for the bigFont option
    accessibilityBigFonts.addEventListener('click', () => {
        // Make it active, this is how we track whether it's enabled or not
        accessibilityBigFonts.classList.toggle('active');
        let enabled = accessibilityBigFonts.classList.contains('active');
        // Increase the font-size property of the body if enabled, revert it back to original if disabled
        document.body.style.fontSize = (enabled ? '1.2em' : 'initial');
        // Just some debugging
        console.log('bigFont ' + (enabled ? 'on ': 'off'));
    });
});