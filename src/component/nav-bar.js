import { navbar } from '../assets/js/initialization.js'
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
        a.home,a.save{
            background-color: #131313 !important;
        }
        </style>
            <div class="navbar-fixed" id="nav-bar">
            <nav class="transparent" role="navigation">
                <div class="container">
                    <div class="nav-wrapper">
                        <a href="index.html" class="brand-logo" id="logo-container"><img src="./assets/images/triumph-soccer-ball-symbol.png"></a>
                       <a href="#" data-target="mobile-nav" class="sidenav-trigger"><i style="color: #131313;"class="material-icons">menu</i></a>
                        <ul class="topnav right hide-on-med-and-down">
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
        <ul class="sidenav" id="mobile-nav">
        </ul>`;
        navbar();
    }
}
customElements.define("nav-bar", NavBar);