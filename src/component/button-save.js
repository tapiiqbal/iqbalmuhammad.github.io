import { floatingActionButton } from '../assets/js/initialization.js'
import api from '../api/api.js';
import { saveByIdTeam } from '../api/db.js';
class ButttonSave extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.render();
    }

    render() {
        const urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get("id");
        this.innerHTML = `
        <div class="fixed-action-btn">
            <a class="btn-floating btn-medium btn-detail dark-background">
                <i class="medium material-icons">menu</i>
            </a>
            <ul>
                <li><a href="./detail.html?id=${idParam}" class="btn-floating dark-background"><i class="material-icons">arrow_back</i></a></li>
                <li><a class="btn-floating dark-background pulse" id="save"><i class="material-icons">save</i></a></li>
            </ul>
        </div>`
        floatingActionButton();
        const btnSave = document.querySelector('#save');
        const idTeam = document.querySelector('div#idTeam').getAttribute('value');

        btnSave.addEventListener('click', async() => {
            const result = await api.getByIdTeam(idTeam);
            console.log("team proses");
            console.log("result", result);

            saveByIdTeam(result);
        })

    }
}
customElements.define("buttonsave-bar", ButttonSave);