const openModal = () => {
    const elemsModal = document.querySelector(".modal");
    if (elemsModal) {
        M.Modal.init(elemsModal, {
            startingTop: "10%",
            endingTop: "20%",
        });
        M.Modal.init(elemsModal);
        let instance = M.Modal.getInstance(elemsModal);
        instance.open();
    }
}
const closeModal = () => {
    const elemsModal = document.querySelector(".modal");
    if (elemsModal) {
        let instance = M.Modal.getInstance(elemsModal);
        instance.close();
    }
}

const tabs = () => {
    let elemsTabs = document.querySelector('.tabs');
    if (elemsTabs) {
        M.Tabs.init(elemsTabs);
    }
}
const navbar = () => {
    let elemsSideNav = document.querySelector(".sidenav");
    if (elemsSideNav) {
        M.Sidenav.init(elemsSideNav);
    }
}
const parallax = () => {
    const elemsParallax = document.querySelector('.parallax');
    if (elemsParallax) {
        M.Parallax.init(elemsParallax);
    }
}

const toast = (param) => {
    return M.toast({ html: param, inDuration: 2000, outDuration: 2000, displayLength: 10000, classes: "toast" })
}
const floatingActionButton = () => {
    const elemsBtn = document.querySelector('.fixed-action-btn');
    if (elemsBtn) {
        M.FloatingActionButton.init(elemsBtn, {
            direction: 'top',
            hoverEnabled: false,
        });
    }
}

const collapsible = () => {
    const elemsCollaps = document.querySelectorAll(".collapsible");
    if (elemsCollaps) {
        M.Collapsible.init(elemsCollaps);
    }
}
export { openModal, closeModal, tabs, navbar, parallax, toast, floatingActionButton, collapsible };