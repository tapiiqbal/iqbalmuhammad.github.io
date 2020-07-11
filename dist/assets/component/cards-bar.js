import api from '../api/api.js'
class CardsBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }
    async render() {
        this.innerHTML = `
        <style>
        .card{
            height:270px !important;
            border-bottom: 1px solid blue;
        }
        .card-image img{
            height: 150.51px !important;
        }
        .card-content{
        }
        .card-content p.name{
            font-weight: bold;
            color:blue;
            border-bottom: 1px solid black;
            font-family: Montserrat, sans-serif;
        }
        .card-content p.area-name{
            color:blue;
        }
        </style>`;
        let dataCompetitions = [];
        const response = await api.getAllCompetitions();
        const { competitions } = response;
        const data = competitions.map((dt, index, arr) => {
            if (dt.id === 2001) dataCompetitions.push(arr[index]);
            if (dt.id === 2002) dataCompetitions.push(arr[index]);
            if (dt.id === 2003) dataCompetitions.push(arr[index]);
            if (dt.id === 2021) dataCompetitions.push(arr[index]);
            if (dt.id === 2014) dataCompetitions.push(arr[index]);
            if (dt.id === 2015) dataCompetitions.push(arr[index]);
            return dt;
        });
        dataCompetitions.forEach(dt => {
            this.innerHTML += `
                <div class="col s6 m2">
                    <div class="card hoverable">
                        <a href="./detail.html?id=${dt.id}">
                            <div class="card-image" id="id-${dt.id}">
                                <img src="${dt.emblemUrl}">
                            </div>
                            <div class="card-content center">
                                <p class="name">${dt.name}</p>
                                <p class="area-name">${dt.area.name}</p>
                            </div>
                        </a>
                    </div>
                </div>`;
            if (dt.id === 2002) document.querySelector('#id-2002 img').setAttribute("src", './assets/images/clubs/bundes-liga.svg');
            if (dt.id === 2003) document.querySelector('#id-2003 img').setAttribute("src", './assets/images/clubs/eredivisie.svg');
            if (dt.id === 2021) document.querySelector('#id-2021 img').setAttribute("src", './assets/images/clubs/premier-league.png');
            if (dt.id === 2014) document.querySelector('#id-2014 img').setAttribute("src", './assets/images/clubs/primera-division.svg');
            if (dt.id === 2015) document.querySelector('#id-2015 img').setAttribute("src", './assets/images/clubs/ligue-1.svg');
        })

    }
}
customElements.define("cards-bar", CardsBar);