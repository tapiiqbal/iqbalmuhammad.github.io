const dbPromised = idb.open("football-data", 1, (upgradeDb) => {
    let footballObjectStore = upgradeDb.createObjectStore("v2-competitions", {
        keyPath: "competition.id"
    });
    footballObjectStore.createIndex("post_competitions", "post_competitions", { unique: false });

});

const saveForLater = async(competitions) => {
    try {
        let db = await dbPromised;
        let tx = db.transaction("v2-competitions", "readwrite");
        let store = tx.objectStore("v2-competitions");
        store.add(competitions);
        if (tx.complete) console.log("Data berhasil di simpan.");
    } catch (error) {
        console.log(error);
        console.log('Data gagal disimpan');
    }

}
export { saveForLater };