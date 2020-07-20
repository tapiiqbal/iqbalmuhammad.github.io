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
        footer.page-footer{
            background-color: #131313;
        }
        </style>
            <footer class="page-footer">
                <div class="footer-copyright">
                    <div class="container">
                    © 2020 IM Industri
                    <a class="grey-text text-lighten-4 right">More Links</a>
                    </div>
                </div>
            </footer>`;
    }
}
customElements.define("footer-bar", FooterBar);