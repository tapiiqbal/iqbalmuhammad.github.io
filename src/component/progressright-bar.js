class ProgressrightBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <style>
        progress[value]::-webkit-progress-value::after {
            content: '';
            width: 6px;
            height: 6px;
            position: absolute;
            border-radius: 100%;
            right: 7px;
            top: 7px;
            background-color: white;
        }
        
        progress[value]::-webkit-progress-value::before {
            content: '80%';
            position: absolute;
            right: 0;
            top: -125%;
        }
        
        progress[value] {
            /* height: 2rem;
            margin-left: 11rem;
            position: relative; */
            /* Reset the default appearance */
            -webkit-appearance: none;
            appearance: none;
            width: 250px;
            height: 20px;
            text-align: -webkit-right;
        }
        
        progress[value]::-webkit-progress-bar {
            background-color: #eee;
            border-radius: 2px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
        }
        
        progress[value]::-webkit-progress-value {
            background-image: -webkit-linear-gradient(-45deg, transparent 33%, rgba(0, 0, 0, .1) 33%, rgba(0, 0, 0, .1) 66%, transparent 66%), -webkit-linear-gradient(top, rgba(255, 255, 255, .25), rgba(0, 0, 0, .25)), -webkit-linear-gradient(left, #09c, #f44);
            border-radius: 2px;
            background-size: 35px 20px, 100% 100%, 100% 100%;
        }
        </style>
        <div class="row">
            <progress class="progress-right" max="100" value="80"></progress>
        </div>`;
    }
}
customElements.define("progressright-bar", ProgressrightBar);