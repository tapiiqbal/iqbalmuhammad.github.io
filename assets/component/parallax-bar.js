import { parallax } from '../js/initialization.js'
class ParallaxBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <style>
        </style>
            <div class="parallax-container">
                <div class="parallax"><img src="./assets/images/stadium-2.jpg" alt="stadium-ball"></div>
            </div>`;
        parallax();
    }
}
customElements.define("parallax-bar", ParallaxBar);