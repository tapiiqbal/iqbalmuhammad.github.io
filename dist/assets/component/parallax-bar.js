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
        .parallax-container {
            height: 350px !important;
        }
        .parallax img {
            width:auto !important;
            height:450px;
        }
        </style>
            <div class="parallax-container">
                <div class="parallax"><img src="./assets/images/mario-klassen-70YxSTWa2Zw-unsplash.jpg"></div>
            </div>`;

        document.addEventListener('DOMContentLoaded', function() {
            const elems = document.querySelectorAll('.parallax');
            // let instances = M.Parallax.init(elems, options);
            let instances = M.Parallax.init(elems);
        });
    }
}
customElements.define("parallax-bar", ParallaxBar);