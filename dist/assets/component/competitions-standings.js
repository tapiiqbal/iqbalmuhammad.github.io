import api from '../api/api.js'
class CompetitionsStanding extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    async render() {
        const response = await api.getByIdCompetitionsStandings();
        const { competition } = response;
        const { standings } = response;
        const { table } = standings[0];
        const standingsHTML = table.map(dt => {
            let dtHTML = "";
            dtHTML += `
                <li class="collection-item avatar dark-border dark-background dark-color">
                    <img src="${dt.team.crestUrl}" alt="${dt.team.name}" class="circle">
                    <span class="title">${dt.team.name}</span>
                    <p class="center">
                        <a class="secondary-content" id="detail" value="${dt.team.id}"><i style="color: white;" class="material-icons small">pageview</i></a>
                    </p>
                </li>`;
            return dtHTML;
        })
        this.innerHTML = `
            <div class="col s4 m2">
                <ul class="collection dark-border">
                    <p class="competition-name center">${competition.name}</p>
                    ${standingsHTML.join('')}
                </ul>
            </div>`;

        const btnDetail = document.querySelectorAll("a#detail");
        btnDetail.forEach(elems => {
            elems.addEventListener('click', async() => {
                document.querySelector('loader-bar').style.visibility = "visible";
                const urlParams = new URLSearchParams(window.location.search);
                let idParam = urlParams.get("id");
                const id = elems.getAttribute('value');
                document.querySelector('ul.sidenavdetail li a').setAttribute("href", `detail.html?id=${idParam}`);
                let checkId = (table) => {
                    return table.team.id == id;
                }
                const dataTeam = table.filter(checkId);
                document.querySelector('loader-bar').style.visibility = "visible";
                api.detail(dataTeam[0]);
            })
        })
    }
}
customElements.define("standings-bar", CompetitionsStanding);