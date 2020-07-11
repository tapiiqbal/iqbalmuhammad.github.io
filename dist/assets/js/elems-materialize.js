document.addEventListener("DOMContentLoaded", () => {
    let elemsSideNav = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elemsSideNav);

    var elems = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(elems, {
        direction: 'top',
        hoverEnabled: false,
    });

    var elemsCarousel = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elemsCarousel);

    var elemsDropdown = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elemsDropdown);

    var elemsTooltips = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elemsTooltips);
})