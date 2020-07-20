class Preloader extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render()
    }
    render() {
        this.innerHTML = `
        <style>
        .preloader-wrapper.active {
            -webkit-animation: container-rotate 1568ms linear infinite;
            animation: container-rotate 1568ms linear infinite;
            margin-top: 25%;
        }
        #loader-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
        }
        .spinner-blue-only {
            border-color: #131313 !important;
        }
        div.circle {
            border-width: 10px !important;
        }
        @media only screen and (max-width: 400px) {
            .preloader-wrapper.active {
                margin-top: 65%;
            }
        }
        </style>
        <div id="loader-wrapper" class="center-align">
            <div class="preloader-wrapper big active">
            <div class="spinner-layer spinner-blue-only">
                <div class="circle-clipper left" style="border-color: #FFFFFF;">
                <div class="circle"></div>
                </div><div class="gap-patch">
                <div class="circle"></div>
                </div><div class="circle-clipper right" style="border-color: #131313;">
                <div class="circle"></div>
                </div>
            </div>
            </div>
        </div>`;
    }
}
customElements.define("preloader-bar", Preloader);