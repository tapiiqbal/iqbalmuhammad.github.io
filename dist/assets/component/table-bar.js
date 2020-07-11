import api from '../api/api.js'
import idByTeams from '../api/data.js'
class TableBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    async render() {
        this.innerHTML = `
            <style>
            table, th, td {
                border: 1px solid black;
                border-collapse: collapse;  
                font-size: 10px;
            }
            table{
                width: 100%;    
                background-color: #f1f1c1;
            }
            p.competition-name{
                font-weight: bold;
                font-size: 30px;
            }
            .img-modal {
                border-style: none;
                display: block;
                margin-left: auto;
                margin-right: auto;
                width: 20%;
            }
            .team-detail{
                border: 1px solid black;
            }
            .team-detail p{
                font-size: 10px;
                font-family: sans-serif;
                margin-left: 10px;
            }
            table.team-detail{
                margin: 10px;
            }
            hr{
                width: 90px;
                border-top: 2px solid #999;
            }
            h4{
                font-size: bold;
                font-family: sans-serif;
            }
            .modal{
                border-radius: 10px;
            }
            </style>`;
        const response = await api.getByIdCompetitions();
        const { competition } = response;
        const { standings } = response;
        this.innerHTML += `<p class="competition-name center">${competition.name}</p>`;
        standings.forEach(element => {
            // if (element.stage === "REGULAR_SEASON") console.log(element.table);
            // if (element.stage === "GROUP_STAGE") console.log(element.table);
            element.table.forEach((element, index, array) => {
                this.innerHTML += `
                <div class="col s12 m6">
                    <ul class="collection">
                        <li class="collection-item avatar">
                            <img src="${element.team.crestUrl}" alt="" class="circle">
                            <span class="title">${element.team.name}</span>
                            <p class="center">
                                <a href="#!" class="secondary-content" id="detail" value="${element.team.id}"><img src="./assets/images/info.png"></a>
                            </p>
                        </li>
                        <li><a href="#!" class="collection-item"><span class="badge">${element.position}</span>Position</a></li>
                        <li><a href="#!" class="collection-item"><span class="badge">${element.playedGames}</span>Played Games</a></li>
                        <li><a href="#!" class="collection-item"><span class="badge">${element.won}</span>Won</a></li>
                        <li><a href="#!" class="collection-item"><span class="badge">${element.draw}</span>Draw</a></li>
                        <li><a href="#!" class="collection-item"><span class="badge">${element.goalDifference}</span>Goal Difference</a></li>
                        <li><a href="#!" class="collection-item"><span class="badge">${element.goalsAgainst}</span>Goals Againts</a></li>
                        <li><a href="#!" class="collection-item"><span class="badge">${element.goalsFor}</span>Goals For</a></li>
                        <li><a href="#!" class="collection-item"><span class="badge">${element.lost}</span>Lost</a></li>
                        <li><a href="#!" class="collection-item"><span class="badge">${element.points}</span>Points</a></li>
                    </ul>
                </div>`;

                const btnDetail = document.querySelectorAll("a#detail");
                btnDetail.forEach(elems => {
                    elems.addEventListener('click', async() => {
                        const id = elems.getAttribute('value');
                        const response = await api.getByIdTeams(id);
                        console.log("response ", response);

                        let detailItem = `
                            <div id="modal" class="modal">
                                <div class="modal-content">
                                    <img class="img-modal" src="${response.crestUrl}">
                                    <h4 class="center">${response.name}</h4>
                                    <hr>
                                    <div class="team-detail">
                                        <p>Address: ${response.address}</p>
                                        <p>Phone: ${response.phone}</p>
                                        <p>Website: ${response.website}</p>
                                        <p>Email: ${response.email}</p>
                                        <p>Founded: ${response.founded}</p>
                                        <p>Club Colors: ${response.clubColors}</p>
                                        <p>Venue: ${response.venue}</p>
                                    </div>
                                </div>
                                <h4 class="center">Squad</h4>
                                <hr>`;
                        const { squad } = response;
                        if (squad) {
                            squad.forEach((dt, index, arr) => {
                                detailItem += `
                                <div style="overflow-x: auto;">
                                    <table class="team-detail">
                                        <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Position</th>
                                            <th>Date Of Birth</th>
                                            <th>Country Of Birth</th>
                                            <th>Nationality</th>
                                            <th>Role</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        <tr>
                                            <td>${dt.name}</td>
                                            <td>${dt.position}</td>
                                            <td>${dt.dateOfBirth}</td>
                                            <td>${dt.countryOfBirth}</td>
                                            <td>${dt.nationality}</td>
                                            <td>${dt.role}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="modal-footer">
                                </div>`;
                            })
                        } else {
                            detailItem += `<h1 class="center">Not Found</h1>`;
                        }
                        detailItem += `</div>`;
                        document.querySelector('#body-content').innerHTML = detailItem;
                        let elemsModal = document.querySelectorAll('.modal');
                        M.Modal.init(elemsModal);
                        let elem = document.querySelector('.modal');
                        let instance = M.Modal.getInstance(elem);
                        instance.open();
                    })
                })
            });
        });

    }
}
customElements.define("table-bar", TableBar);