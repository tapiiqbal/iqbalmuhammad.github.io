import api from '../api/api.js';
import { saveByIdCompetitions } from '../api/db.js';
import { visibleLoader } from '../assets/js/helper.js';

class CompetitionsBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }
    async render() {
        visibleLoader();
        const response = await api.getAllCompetitions();
        const { competitions } = response;
        let dataCompetitions = [];
        competitions.map((dt, index, arr) => {
            if (dt.id === 2001) dataCompetitions.push(arr[index]);
            if (dt.id === 2002) dataCompetitions.push(arr[index]);
            if (dt.id === 2003) dataCompetitions.push(arr[index]);
            if (dt.id === 2021) dataCompetitions.push(arr[index]);
            if (dt.id === 2014) dataCompetitions.push(arr[index]);
            if (dt.id === 2015) dataCompetitions.push(arr[index]);
            return dt;
        });
        const competitionsHTML = dataCompetitions.map(dt => {
            let urlImg = dt.emblemUrl;
            if (urlImg !== null) {
                urlImg = urlImg.replace(/^http:\/\//i, 'https://')
            };
            let dtHTML = "";
            dtHTML += `
                <div class="col s6 m2">
                    <div class="card small hoverable">
                        <a href="./detail.html?id=${dt.id}">
                            <div class="card-image" id="id-${dt.id}">
                                <img src="${dt.emblemUrl}" id="id-${dt.id}" alt="${dt.name}">
                            </div>
                            <a class="btn-floating halfway-fab btn-sm waves-effect waves-light btn-small transparent" id="btnFav" value="${dt.id}"><i class="material-icons" style="color:black;">star</i></a>
                            <div class="card-content center">
                                <p class="name">${dt.name}</p>
                                <p class="area-name">${dt.area.name}</p>
                            </div>
                        </a>
                    </div>
                </div>`
            return dtHTML;
        })
        this.innerHTML = `
            <div class="row">
                ${competitionsHTML.join('')}
            </div>`;
        if (document.querySelector('img#id-2002')) document.querySelector('img#id-2002').setAttribute("src", "./assets/images/clubs/bundes-liga.svg");
        if (document.querySelector('img#id-2003')) document.querySelector('img#id-2003').setAttribute("src", "./assets/images/clubs/eredivisie.svg");
        if (document.querySelector('img#id-2021')) document.querySelector('img#id-2021').setAttribute("src", "./assets/images/clubs/premier-league.svg");
        if (document.querySelector('img#id-2014')) document.querySelector('img#id-2014').setAttribute("src", "./assets/images/clubs/primera-division.svg");
        if (document.querySelector('img#id-2015')) document.querySelector('img#id-2015').setAttribute("src", "./assets/images/clubs/ligue-1.svg");

        const btnFav = document.querySelectorAll('#btnFav');
        btnFav.forEach(dt => {
            dt.addEventListener('click', async() => {
                dt.remove();
                const id = dt.getAttribute('value');
                const result = await api.getByIdCompetitions(id);
                saveByIdCompetitions(result);
            })
        })

    }
}
customElements.define("competitions-bar", CompetitionsBar);