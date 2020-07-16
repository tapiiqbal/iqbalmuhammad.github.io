class LoaderBar extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: "open" })
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowDOM.innerHTML = `
            <style>
            /*Loader*/
            #loader-wrapper {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1000;
            }

            /*Text Loading */
            h2{
                display: block;
                position: relative;
                top: 13%;
                font-size: 50px;
                font-family: Brush Script Std;
                text-align: center;
                color: white;
                z-index: 1001;
                animation: mymove 1.5s infinite alternate;
            }
            @keyframes mymove{
                0%{
                    opacity: 100; 
                }

                100%{
                    opacity: 0;
                }
            }
            </style>
            <div id="loader-wrapper">
            <h2><img src="./assets/images/loader/Interwind-1.1s-227px.gif"></h2>
            <div id="loader"></div>
            <div class="loader-section section-left"></div>
            <div class="loader-section section-right"></div>
            </div>`;
    }
}
customElements.define("loader-bar", LoaderBar);