import { getAllCompetitions, getAllTeams, deleteByIdTeam, deleteByIdCompetition } from '../api/db.js'
import { formatDate } from '../assets/js/helper.js';
class SaveDetail extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    async render() {
        let teamHTML = "";
        const resultTeams = await getAllTeams();
        resultTeams.forEach(dt => {
            const { squad } = dt;
            for (let squads of squad) {
                if (squads.position === null) squads.position = '-';
                if (squads.shirtNumber === null) squads.shirtNumber = '-';
                if (document.querySelector(`#detail-id-team${dt.id}`)) {
                    teamHTML += `
                        <p class="center-align">${squads.position}</p>
                        <p class="center-align">${squads.name}</p>
                        <p class="center-align">${squads.role}</p>
                        <p class="center-align">${squads.nationality}</p>
                        <p class="center-align">${squads.shirtNumber}</p>
                        <hr style="width:50px;">`;
                    document.querySelector(`#detail-id-team${dt.id}`).innerHTML = teamHTML;
                }
            }
        });
        // id="detail-id-competition${dt.id}"
        let competitionHTML = "";
        const resultCompetitions = await getAllCompetitions();
        resultCompetitions.forEach(dt => {
            const { seasons } = dt;
            for (let season of seasons) {
                const startDate = formatDate(season.startDate);
                const endDate = formatDate(season.endDate);
                const { winner } = season;

                if (season.winner === null) season.winner = '-';
                if (season.currentMatchday === null) season.currentMatchday = '-';

                if (document.querySelector(`#detail-id-competition${dt.id}`)) {
                    competitionHTML += `
                            <p class="center-align">Current Match Day</p>
                            <p class="center-align">${season.currentMatchday}</p>
                            <p class="center-align">Start Date</p>
                            <p class="center-align">${startDate}</p>
                            <p class="center-align">End Date</p>
                            <p class="center-align">${endDate}</p>
                            <hr style="width:50px;">
                            `;
                    if (winner) {
                        if (winner.crestUrl === null) winner.crestUrl = '-';
                        competitionHTML += `<p class="center-align">WInner</p>
                            <p class="center-align">${winner.name}</p>
                            <p class="center-align"><img src="${winner.crestUrl}" alt="${winner.name}" width="40px" height="40px"></p>
                            <hr style="width:50px;">`;
                    }
                    document.querySelector(`#detail-id-competition${dt.id}`).innerHTML = competitionHTML;
                }
            }
        });
    }
}
customElements.define("savedetail-bar", SaveDetail);