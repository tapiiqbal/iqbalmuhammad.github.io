import { closeModal } from '../js/initialization.js'
class ConfirmBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <style>
        .modal{
            border-radius: 20px;
        }
        </style>
        <div id="targetModal" class="modal">
            <div class="modal-content center">
            <img src="./assets/images/caution-logout.svg">
            <h4>Please check your network!</h4>
            </div>
            <div class="center" style="padding:20px;">
            <a  class="waves-effect waves-green btn" id="btnNo">Tidak</a>
            <a  class="waves-effect waves-green btn" id="btnYes">Ya</a>
            </div>
        </div>`;

        const btnYes = document.querySelector("a#btnYes");
        const btnNo = document.querySelector("a#btnNo");

        btnYes.addEventListener("click", () => {
            localStorage.removeItem("userlogin");
            window.location = "index.html";
        });
        btnNo.addEventListener("click", () => {
            closeModal();
        });
    }
}
customElements.define("confirm-bar", ConfirmBar);