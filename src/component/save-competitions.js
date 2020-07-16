import { getAllCompetitions, getAllTeams, deleteByIdTeam, deleteByIdCompetition } from '../api/db.js'
import { collapsible, tabs } from '../assets/js/initialization.js';
class SaveCompetitions extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    async render() {
        const resultCompetitions = await getAllCompetitions();
        const resultCompetition = resultCompetitions.map(dt => {
            let dtHTML = "";
            return dtHTML += `
                <li id="competition-${dt.id}">
                    <div class="collapsible-header">
                        <img class="circle" id="id-${dt.id}" src="${dt.emblemUrl}" alt="${dt.name}" width="40px" height="40px">
                                    <span style="padding: 10px;">${dt.name}</span>
                                    <span class="badge"><a><i class="material-icons" id="competition" value="${dt.id}">delete</i></a></span></div>
                    <div class="collapsible-body" id="detail-id-competition${dt.id}"></div>
                </li>`;
        })
        const resultTeams = await getAllTeams();
        const resultTeam = resultTeams.map(dt => {
            let dtHTML = "";
            return dtHTML += `
                <li id="team-${dt.id}">
                    <div class="collapsible-header">
                        <img class="circle" id="id-${dt.id}" src="${dt.crestUrl}" alt="${dt.name}" width="40px" height="40px">
                                    <span style="padding: 10px;">${dt.name}</span>
                                    <span class="badge"><a><i class="material-icons" id="team" value="${dt.id}">delete</i></a></span></div>
                    <div class="collapsible-body" id="detail-id-team${dt.id}"></div>
                </li>`;
        })
        this.innerHTML = ` 
            <div class="row">
                <div class="col s12 m12 l12">
                    <div class="card">
                        <div class="card-content">
                            <p class="center-align">Soccer Match</p>
                        </div>
                        <div class="card-tabs">
                            <ul class="tabs tabs-fixed-width">
                                <li class="tab"><a class="active" href="#competitions"><i style="color: #131313;" class="material-icons">layers</i></a></li>
                                <li class="tab"><a href="#teams"><i style="color: #131313;" class="material-icons">group</i></a></li>
                            </ul>
                        </div>
                        <div class="card-content grey lighten-4">
                            <div id="competitions">
                                <ul class="collapsible">
                                ${resultCompetition.join('')}
                                <div id="competition-error"></div>
                                </ul>
                            </div>
                            <div id="teams">
                                <ul class="collapsible">
                                    ${resultTeam.join('')}
                                    <div id="team-error"></div>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <savedetail-bar></savedetail-bar>
                </div>
            </div>`;
        collapsible();
        tabs();
        const loader = document.querySelector('loader-bar');
        if (loader) loader.remove();
        if (document.querySelector('img#id-2002')) document.querySelector('img#id-2002').setAttribute("src", "./assets/images/clubs/bundes-liga.svg");
        if (document.querySelector('img#id-2003')) document.querySelector('img#id-2003').setAttribute("src", "./assets/images/clubs/eredivisie.svg");
        if (document.querySelector('img#id-2021')) document.querySelector('img#id-2021').setAttribute("src", "./assets/images/clubs/premier-league.svg");
        if (document.querySelector('img#id-2014')) document.querySelector('img#id-2014').setAttribute("src", "./assets/images/clubs/primera-division.svg");
        if (document.querySelector('img#id-2015')) document.querySelector('img#id-2015').setAttribute("src", "./assets/images/clubs/ligue-1.svg");

        const btnCompetitions = document.querySelectorAll('i#competition');
        btnCompetitions.forEach(dt => {
            dt.addEventListener('click', () => {
                let val = dt.getAttribute('value');
                deleteByIdCompetition(val);
                document.querySelector(`li#competition-${val}`).remove();
            })
        });
        const btnTeams = document.querySelectorAll('i#team');
        btnTeams.forEach(dt => {
            dt.addEventListener('click', () => {
                let val = dt.getAttribute('value');
                deleteByIdTeam(val);
                document.querySelector(`li#team-${val}`).remove();
            })
        });
        if (Object.keys(resultCompetitions).length === 0) document.querySelector('div#competition-error').innerHTML = `<p class="center-align">Data not available</p>`;
        if (Object.keys(resultTeams).length === 0) document.querySelector('div#team-error').innerHTML = `<p class="center-align">Data not available</p>`;
    }
}
customElements.define("save-competitions", SaveCompetitions);