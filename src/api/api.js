import dataApi from './data-api.js'
import { tabs, openModal, toast } from '../assets/js/initialization.js';
import { removeLoader } from '../assets/js/helper.js';
class Api {

    static async getAllCompetitions() {
        try {
            if ('caches' in window) {
                const response = await caches.match(`${dataApi.url}competitions`);
                const responseJson = await response.json();
                if (responseJson) removeLoader();
                return responseJson;
            }
        } catch (error) {
            if (error instanceof TypeError) {
                const response = await fetch(`${dataApi.url}competitions`, dataApi.options);
                const responseJson = await response.json();
                if (!responseJson) return showModal();
                if (responseJson) removeLoader();
                return responseJson;
            }
        }
    }

    static async getByIdCompetitions(id) {
        try {
            if ('caches' in window) {
                const response = await caches.match(`${dataApi.url}competitions/${id}`);
                const responseJson = await response.json();
                if (responseJson) removeLoader();
                return responseJson;
            }
        } catch (error) {
            if (error instanceof TypeError) {

                const response = await fetch(`${dataApi.url}competitions/${id}`, dataApi.options);
                const responseJson = await response.json();
                if (!responseJson) return showModal();
                if (responseJson) removeLoader();
                return responseJson;
            }
        }
    }

    static async getByIdCompetitionsStandings() {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            let idParam = urlParams.get("id");
            if ('caches' in window) {
                const response = await caches.match(`${dataApi.url}competitions/${idParam}/standings?standingType=HOME`);
                const responseJson = await response.json();
                if (responseJson) removeLoader();
                return responseJson;
            }
        } catch (error) {
            const urlParams = new URLSearchParams(window.location.search);
            let idParam = urlParams.get("id");
            const buildURLQuery = obj =>
                Object.entries(obj)
                .map(pair => pair.map(encodeURIComponent).join('='))
                .join('&');
            if (error instanceof TypeError) {

                const response = await fetch(`${dataApi.url}competitions/${idParam}/standings?` + buildURLQuery({
                    standingType: "HOME"
                }), dataApi.options);
                const responseJson = await response.json();
                if (!responseJson) return showModal();
                if (responseJson) removeLoader();
                return responseJson;
            }
        }
    }

    static async getByIdTeam(id) {
        try {
            if ('caches' in window) {
                const response = await caches.match(`${dataApi.url}teams/${id}`);
                const responseJson = await response.json();
                if (responseJson) removeLoader();
                return responseJson;
            }
        } catch (error) {
            if (error instanceof TypeError) {
                const response = await fetch(`${dataApi.url}teams/${id}`, dataApi.options);
                const responseJson = await response.json();
                if (!responseJson) return showModal();
                if (responseJson) removeLoader();
                return responseJson;
            }
        }
    }

    static async getByIdTeamMatch(id) {
        try {
            if ('caches' in window) {
                const response = await caches.match(`${dataApi.url}teams/${id}/matches?status=SCHEDULED`);
                const responseJson = await response.json();
                if (responseJson) removeLoader();
                return responseJson;
            }
        } catch (error) {
            const buildURLQuery = obj =>
                Object.entries(obj)
                .map(pair => pair.map(encodeURIComponent).join('='))
                .join('&');
            if (error instanceof TypeError) {

                const response = await fetch(`${dataApi.url}teams/${id}/matches?` + buildURLQuery({
                    status: "SCHEDULED"
                }), dataApi.options);
                const responseJson = await response.json();
                if (!responseJson) return showModal();
                if (responseJson) removeLoader();
                return responseJson;
            }
        }
    }

    static async detail(dataTeam) {
        const resultTeam = await this.getByIdTeam(dataTeam.team.id)
        const { squad } = resultTeam;
        const resultMatch = await this.getByIdTeamMatch(dataTeam.team.id);
        const { matches } = resultMatch;
        // row
        let teamContentInnerHTML = `
            <div class="row">
                <div class="col s12 hide-on-large-only hide-on-med-only">
                    <ul class="collection with-header center-align">
                        <li class="collection-header dark-background dark-color">
                            <img src="${dataTeam.team.crestUrl}" alt="${dataTeam.team.name}" height="50px" width="auto">
                            <p>${dataTeam.team.name}</p>
                        </li>
                    </ul>
                </div>
                <div class="col s12 m4 hide-on-small-only">
                    <ul class="collection with-header center-align">
                        <li class="collection-header dark-background dark-color">
                            <img src="${dataTeam.team.crestUrl}" alt="${dataTeam.team.name}" height="50px" width="auto">
                            <p>${dataTeam.team.name}</p>
                        </li>
                        <li class="collection-item dark-background dark-color">
                            <div>Position<a class="secondary-content dark-color">${dataTeam.position}</a></div>
                        </li>
                        <li class="collection-item dark-background dark-color">
                            <div>Played Games<a class="secondary-content dark-color">${dataTeam.playedGames}</a></div>
                        </li>
                        <li class="collection-item dark-background dark-color">
                            <div>Won<a class="secondary-content dark-color">${dataTeam.won}</a></div>
                        </li>
                        <li class="collection-item dark-background dark-color">
                            <div>Draw<a class="secondary-content dark-color">${dataTeam.draw}</a></div>
                        </li>
                        <li class="collection-item dark-background dark-color">
                            <div>Goal Difference<a class="secondary-content dark-color">${dataTeam.goalDifference}</a></div>
                        </li>
                        <li class="collection-item dark-background dark-color">
                            <div>Goals Against<a class="secondary-content dark-color">${dataTeam.goalsAgainst}</a></div>
                        </li>
                        <li class="collection-item dark-background dark-color">
                            <div>Goals For<a class="secondary-content dark-color">${dataTeam.goalsFor}</a></div>
                        </li>
                        <li class="collection-item dark-background dark-color">
                            <div>Lost<a class="secondary-content dark-color">${dataTeam.lost}</a></div>
                        </li>
                        <li class="collection-item dark-background dark-color">
                            <div>Points<a class="secondary-content dark-color">${dataTeam.points}</a></div>
                        </li>
                    </ul>
                </div>`;
        // tabs
        teamContentInnerHTML += `
                    <div class="col s12 m8">
                        <ul class="tabs">
                            <li class="tab col s3 disabled"><a href="#latest" class="btn dark-background dark-color">Latest</a></li>
                            <li class="tab col s3"><a href="#squads" class="btn dark-background dark-color active">Squads</a></li>
                            <li class="tab col s3"><a href="#stats" class="btn dark-background dark-color">Stats</a></li>
                            <li class="tab col s3 disabled"><a href="#related" class="btn dark-background dark-color">Related</a></li>
                        </ul>
                    </div>`;
        // squads
        teamContentInnerHTML += `
            <div id="squads">`;

        squad.forEach(dtSquad => {
            if (dtSquad.position === null) dtSquad.position = `-`;
            if (dtSquad.shirtNumber === null) dtSquad.shirtNumber = `-`;
            teamContentInnerHTML += `
                <div class="col s12 m4">
                    <p class="center-align">${dtSquad.position}</p>
                    <div class="collection">
                        <a class="collection-item dark-background dark-color"><span class="badge status dark-color">${dtSquad.name}</span>Name</a>
                        <a class="collection-item dark-background dark-color"><span class="badge status dark-color">${dtSquad.role}</span>Role</a>
                        <a class="collection-item dark-background dark-color"><span class="badge status dark-color">${dtSquad.nationality}</span>Nationality</a>
                        <a class="collection-item dark-background dark-color"><span class="badge status dark-color">${dtSquad.shirtNumber}</span>Shirt Number</a>
                    </div>
                </div>`;
        });
        teamContentInnerHTML += `
            </div>`;
        // endsquads

        // stats
        teamContentInnerHTML += `
            <div id="stats">`;
        for (let match of matches) {
            const { score } = match;
            if (score.extraTime.awayTeam === null) score.extraTime.awayTeam = `-`;
            if (score.extraTime.homeTeam === null) score.extraTime.homeTeam = `-`;
            if (score.fullTime.awayTeam === null) score.fullTime.awayTeam = `-`;
            if (score.fullTime.homeTeam === null) score.fullTime.homeTeam = `-`;
            if (score.halfTime.awayTeam === null) score.halfTime.awayTeam = `-`;
            if (score.halfTime.homeTeam === null) score.halfTime.homeTeam = `-`;
            if (score.penalties.awayTeam === null) score.penalties.awayTeam = `-`;
            if (score.penalties.homeTeam === null) score.penalties.homeTeam = `-`;
            if (score.winner === null) score.winner = `-`;

            teamContentInnerHTML += `
                <div class="col s6 m4">
                    <p class="right-align">${match.awayTeam.name}</p>
                    <div class="collection">
                        <a href="#!" class="collection-item dark-background dark-color"><span class="badge status dark-color">Extra Time</span>${score.extraTime.awayTeam}</a>
                        <a href="#!" class="collection-item dark-background dark-color"><span class="badge status dark-color">Full Time</span>${score.fullTime.awayTeam}</a>
                        <a href="#!" class="collection-item dark-background dark-color"><span class="badge status dark-color">Half Time</span>${score.halfTime.awayTeam}</a>
                        <a href="#!" class="collection-item dark-background dark-color"><span class="badge status dark-color">Penalties</span>${score.penalties.awayTeam}</a>
                    </div>
                </div>

                <div class="col s6 m4">
                    <p class="left-align">${match.homeTeam.name}</p>
                    <div class="collection">
                        <a href="#!" class="collection-item dark-background dark-color status"><span class="badge dark-color">${score.extraTime.homeTeam}</span>Extra Time</a>
                        <a href="#!" class="collection-item dark-background dark-color status"><span class="badge dark-color">${score.fullTime.homeTeam}</span>Full Time</a>
                        <a href="#!" class="collection-item dark-background dark-color status"><span class="badge dark-color">${score.halfTime.homeTeam}</span>Half Time</a>
                        <a href="#!" class="collection-item dark-background dark-color status"><span class="badge dark-color">${score.penalties.homeTeam}</span>Penalties</a>
                    </div>
                </div>
                <p class="center-align">Winner ${score.winner}</p>`;
        }
        teamContentInnerHTML += `
                </div>`;
        // endstats
        //endrow
        teamContentInnerHTML += `
                <div id="idTeam" value="${dataTeam.team.id}"></div>
                <buttonsave-bar></buttonsave-bar>
                </div>`;
        document.querySelector("#body-content").innerHTML = teamContentInnerHTML;
        tabs();
        document.querySelector('loader-bar').style.visibility = "hidden";
    }
}
export default Api;