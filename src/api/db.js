import idb from 'idb';
import { toast } from '../assets/js/initialization.js';
import { showNotifSaveCompetition, showNotifSaveTeam } from '../assets/js/push-notification.js';
const dbPromised = idb.open("football-data", 1, (upgradeDb) => {
    let competitionsObjectStore = upgradeDb.createObjectStore("v2-competitions", {
        keyPath: "id"
    });
    competitionsObjectStore.createIndex("post_competitions", "post_competitions", { unique: false });

    let teamObjectStore = upgradeDb.createObjectStore("v2-teams", {
        keyPath: "id"
    });
    teamObjectStore.createIndex("post_teams", "post_teams", { unique: false });

});

const saveByIdCompetitions = (competition) => {
    dbPromised
        .then(function(db) {
            let tx = db.transaction("v2-competitions", "readwrite");
            let store = tx.objectStore("v2-competitions");
            store.add(competition);
            return tx.complete;
        })
        .then(function() {
            showNotifSaveCompetition(competition);
            let toastHTML = `<span>Data saved.</span>`;
            toast(toastHTML);

        })
        .catch(function() {
            let toastHTML = `<span>Data has been saved.</span>`;
            toast(toastHTML);
        })
}

const saveByIdTeam = (team) => {
    dbPromised
        .then(function(db) {
            let tx = db.transaction("v2-teams", "readwrite");
            let store = tx.objectStore("v2-teams");
            store.add(team);
            return tx.complete;
        })
        .then(function() {
            showNotifSaveTeam(team);
            let toastHTML = `<span>Data saved.</span>`;
            toast(toastHTML);

        })
        .catch(function() {
            let toastHTML = `<span>Data has been saved.</span>`;
            toast(toastHTML);
        })
}

const getByIdCompetition = (id) => {
    return new Promise(function(resolve, reject) {
        dbPromised
            .then(function(db) {
                let tx = db.transaction("v2-competitions", "readonly");
                let store = tx.objectStore("v2-competitions");
                return store.get(id);
            })
            .then(function(competition) {
                resolve(competition);
            });
    });
}
const getByIdTeam = (id) => {
    return new Promise(function(resolve, reject) {
        dbPromised
            .then(function(db) {
                let tx = db.transaction("v2-teams", "readonly");
                let store = tx.objectStore("v2-teams");
                return store.get(id);
            })
            .then(function(team) {
                resolve(team);
            });
    });
}

function getAllCompetitions() {
    return new Promise(function(resolve, reject) {
        dbPromised
            .then(function(db) {
                let tx = db.transaction("v2-competitions", "readonly");
                let store = tx.objectStore("v2-competitions");
                return store.getAll();
            })
            .then(function(competitions) {
                resolve(competitions);
            })
    })
}

function getAllTeams() {
    return new Promise(function(resolve, reject) {
        dbPromised
            .then(function(db) {
                let tx = db.transaction("v2-teams", "readonly");
                let store = tx.objectStore("v2-teams");
                return store.getAll();
            })
            .then(function(teams) {
                resolve(teams);
            })
    })
}

const deleteByIdTeam = (id) => {
    dbPromised
        .then(function(db) {
            const key = parseInt(id);
            let tx = db.transaction('v2-teams', 'readwrite');
            let store = tx.objectStore('v2-teams');
            store.delete(key);
            return tx.complete;
        }).then(function() {
            let toastHTML = `<span>Delete success.</span>`;
            toast(toastHTML);

        })
        .catch(function() {
            let toastHTML = `<span>Delete failed.</span>`;
            toast(toastHTML);
        })
}

const deleteByIdCompetition = (id) => {
    dbPromised
        .then(function(db) {
            const key = parseInt(id);
            let tx = db.transaction('v2-competitions', 'readwrite');
            let store = tx.objectStore('v2-competitions');
            store.delete(key);
            return tx.complete;
        }).then(function() {
            let toastHTML = `<span>Delete success.</span>`;
            toast(toastHTML);
        })
}
export { saveByIdCompetitions, saveByIdTeam, getAllCompetitions, getAllTeams, deleteByIdTeam, deleteByIdCompetition };