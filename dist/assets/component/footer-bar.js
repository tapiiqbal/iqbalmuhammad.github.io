class FooterBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }
    render() {
        this.innerHTML = `
        <style>
        body {
            display: flex;
            min-height: 100vh;
            flex-direction: column;
        }

        main {
            flex: 1 0 auto;
        }
        </style>
            <footer class="page-footer blue">
            <div class="footer-copyright">
                <div class="container">
                © 2020 IM Industri
                <a class="grey-text text-lighten-4 right" href="#!">More Links</a>
                </div>
            </div>
            </footer>`;
    }
}
customElements.define("footer-bar", FooterBar);