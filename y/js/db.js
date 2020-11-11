const idbPromised = idb.open("teams-favorite", 1, (upgradeDb) => {
    const teamsObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id",
    });
    teamsObjectStore.createIndex("teams", "teams", {
        unique: false,
    });
});

function insertTeams(team) {
    idbPromised
        .then((db) => {
            let club = db.transaction("teams", "readwrite");
            let store = club.objectStore("teams");
            console.log(team);
            store.put(team);
            return club.complete;
        })
        .then(() => {
            console.log("Teams berhasil disimpan.");
        });
}

function getFavTeams() {
    return new Promise((resolve, reject) => {
        idbPromised
            .then((db) => {
                const club = db.transaction("teams", "readonly");
                let store = club.objectStore("teams");
                return store.getAll();
            })
            .then((teams) => {
                resolve(teams);
            });
    });
}

function deleteTeams(team) {
    idbPromised
        .then((db) => {
            let club = db.transaction("teams", "readwrite");
            let store = club.objectStore("teams");
            console.log(team);
            store.delete(team.id);
            return club.complete;
        })
        .then(() => {
            console.log("Teams berhasil dihapus.");
        });
}