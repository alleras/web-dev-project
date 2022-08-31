window.addEventListener('layout-initialized', () => {
    const hamburger = document.querySelector(".nav-hamburger");
    const navGroup = document.querySelector(".nav-group");
    
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navGroup.classList.toggle("active");
    })
});