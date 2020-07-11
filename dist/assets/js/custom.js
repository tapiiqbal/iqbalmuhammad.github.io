import api from "../api/api.js";
import { saveForLater } from "../api/db.js";
document.addEventListener("DOMContentLoaded", () => {
    const btnSave = document.querySelector('#save');
    if (btnSave) {
        btnSave.addEventListener('click', async() => {
            const getByIdCompetitions = await api.getByIdCompetitions();
            saveForLater(getByIdCompetitions);
        });
    }
})

// export default custom;