import dataApi from './data-api.js'
class Api {

    static async getAllCompetitions() {
        const response = await fetch(`${dataApi.url}competitions`, dataApi.options);
        const responseJson = await response.json();
        return responseJson;
    }

    static async getByIdCompetitions() {
        const urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get("id");
        const buildURLQuery = obj =>
            Object.entries(obj)
            .map(pair => pair.map(encodeURIComponent).join('='))
            .join('&');
        const response = await fetch(`${dataApi.url}competitions/${idParam}/standings?` + buildURLQuery({
            standingType: "HOME"
        }), dataApi.options);
        const responseJson = await response.json();
        return responseJson;
    }

    static async getByIdTeams(id) {
        const response = await fetch(`${dataApi.url}teams/${id}`, dataApi.options);
        const responseJson = await response.json();
        return responseJson;
    }
}
export default Api;