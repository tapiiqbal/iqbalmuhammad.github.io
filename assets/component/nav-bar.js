class NavBar extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <style>
        nav a:hover{
            background-color: #29B6F6 !important;
        }
        </style>
            <div class="navbar-fixed" id="nav-bar">
            <nav class="white" role="navigation">
                <div class="container">
                    <div class="nav-wrapper">
                        <a href="#home" class="brand-logo" id="logo-container"><img src="assets/images/logo-ball-64.svg"></a>
                       <a href="#" data-target="mobile-nav" class="sidenav-trigger" style="color:black;"><i class="material-icons">menu</i></a>
                        <ul class="topnav right hide-on-med-and-down">
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
        <ul class="sidenav" id="mobile-nav">
        </ul>`;
    }
}
customElements.define("nav-bar", NavBar);