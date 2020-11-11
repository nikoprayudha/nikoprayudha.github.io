const API_KEY = "e30f136bd30b4e708bab7abe18a460b1";
const BASE_URL = "https://api.football-data.org/v2/";
const LEAGUE_ID = 2021;
const ENDPOINT_STANDINGS = `${BASE_URL}competitions/${LEAGUE_ID}/standings`;
const ENDPOINT_TEAMS = `${BASE_URL}competitions/${LEAGUE_ID}/teams`;

const fetchAPI = (url) => {
    return fetch(url, {
            headers: {
                "X-Auth-Token": API_KEY,
            },
        })
        .then((res) => {
            if (res.status !== 200) {
                console.log("Error: " + res.status);
                return Promise.reject(new Error(res.statusText));
            } else {
                return Promise.resolve(res);
            }
        })
        .then((res) => res.json())
        .catch((err) => {
            console.log(err);
        });
};

/* ============================================================= STANDINGS API ================================================== */
function getAllStandings() {
    if ("caches" in window) {
        caches.match(ENDPOINT_STANDINGS).then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    console.log("Competition Data: " + data);
                    showStanding(data);
                });
            }
        });
    }
    fetchAPI(ENDPOINT_STANDINGS)
        .then((data) => {
            showStanding(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function showStanding(data) {
    let standings = "";
    let standingElement = document.getElementById("standings");

    data.standings[0].table.forEach(function(standing) {
        standings += `
                <tr>    
                <td><span>${standing.position}</span></td>  
                    <td><img src="${standing.team.crestUrl.replace(
                      /^http:\/\//i,
                      "https://"
                    )}" width="30px" alt="badge"/></td>
                    <td>${standing.team.name}</td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.goalsFor}</td>
                    <td>${standing.goalsAgainst}</td>
                    <td>${standing.goalDifference}</td>
                    <td>${standing.points}</td>
                </tr>
            `;
    });

    standingElement.innerHTML = `
                    <table class="striped responsive-table" style="text-align: center; vertical-align: middle;  bgcolor:#bbdefb; ">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Klub</th>
                                <th>Team Name</th>
                                <th>Win</th>
                                <th>Draw</th>
                                <th>Lose</th>
                                <th>GF</th>
                                <th>GA</th>
                                <th>GD</th>
                                <th>Point</th>
                            </tr>
                        </thead>
                        <tbody id="standing">
                            ${standings}
                        </tbody>
                    </table>
        `;
}

/* ========================================================= TEAMS API ==================================================== */

function getAllTeams() {
    if ("caches" in window) {
        caches.match(ENDPOINT_TEAMS).then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    console.log("Competition Data: " + data);
                    showTeams(data);
                });
            }
        });
    }
    fetchAPI(ENDPOINT_TEAMS)
        .then((data) => {
            showTeams(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function showTeams(data) {
    let teams = "";
    let teamElement = document.getElementById("teams");
    data.teams.forEach(function(team) {
        return (teams += `
                <div class="card" style="width:100%; display:flexbox; flex-direction:row; flex-wrap:wrap;">
                    <div class="card-image waves-effect waves-block waves-light" style="background-color:#f0f0f0;">
                    <center><img class="activator" src="${team.crestUrl.replace(
                      /^http:\/\//i,
                      "https://"
                    )}" style="width:180px; height:180px;"></center>
                    </div>
                    <div class="card-content" style="background-color:#343434;">
                    <span class="card-title activator white-text text-darken-4">${
                      team.name
                    }<i class="material-icons white-text right">more_vert</i></span>
                    <p><a href="${team.website}" target="_blank">${
      team.shortName
    }</a></p>
            </div>
            <div class="card-reveal">
            <span class="card-title black-text text-darken-4">Information<i class="material-icons right">close</i></span>
                <p class="flow-text">Id Team:</p><p>${team.id}</p>
                <br>
                <p class="flow-text">Address:</p><p>${team.address}</p>
                <br>
                <p class="flow-text">Email:</p><p><a href="#" target="_blank">${
                  team.email
                }</a></p>
                <br>
                <p class="flow-text">Phone:</p><p>${team.phone}</p>
                <br>
                <p class="flow-text">Founded:</p><p>${team.founded}</p>
                <br>
                <p class="flow-text">Club Colors:</p><p>${team.clubColors}</p>
                <br>
                <p class="flow-text">Stadium:</p><p>${team.venue}</p>
                <br>
                <p>Add Favorite Team</p>
                <button class="btn-floating btn-large cyan pulse btn add" id="${
                  team.id
                }"><i class="material-icons">add</i></button>
            </div>
            </div>
        
        `);
    });
    teamElement.innerHTML = teams;

    let btnAdd = document.querySelectorAll(".add");
    btnAdd.forEach((button) => {
        button.onclick = () => {
            M.toast({
                html: "Add Succes",
                completeCallback: function() {
                    alert("Your Add Teams Favorite");
                },
            });
            console.log("Teams favorite ditambahkan.");
            const id = parseInt(button.id);
            data.teams.forEach((team) => {
                if (team.id === id) {
                    insertTeams(team);
                }
            });
        };
    });
}

/* ========================================================= FAVORITE TEAMS ==================================================== */

function getAllFavoriteTeams() {
    getFavTeams().then((favorite) => {
        console.log(favorite);

        let favTeams = "";
        let teamElement = document.getElementById("favoriteteams");

        favorite.forEach((team) => {
            favTeams += `<div class="row">
                    <div class="card">
                        <div class="card blue-grey darken-1" style="backgrond:#45623B;">
                        <img align="center" src="${team.crestUrl.replace(
                          /^http:\/\//i,
                          "https://"
                        )}">
                        </div>
                        <div class="card-content">
                        <span class="card-title">${team.name}</span>
                        <p class="flow-text">Id Team:</p><p>${team.id}</p>
                        <p class="flow-text">Address:</p><p>${team.address}</p>
                        <p class="flow-text">Email:</p><p><a href="#" target="_blank">${
                          team.email
                        }</a></p>
                        <p class="flow-text">Phone:</p><p>${team.phone}</p>
                        <p class="flow-text">Founded:</p><p>${team.founded}</p>
                        <p class="flow-text">Club Colors:</p><p>${
                          team.clubColors
                        }</p>
                        <p class="flow-text">Stadium:</p><p>${team.venue}</p>
                        </div>
                        <div class="card-action #ffab91 deep-orange lighten-3">
                        <btn class="waves-effect waves-light red btn delete" id="${
                          team.id
                        }" >Delete</btn>
                        </div>
                    </div>
                </div>`;
        });
        teamElement.innerHTML = favTeams;

        let rel;
        let deleteBtn = document.querySelectorAll(".delete");
        deleteBtn.forEach((button) => {
            button.onclick = () => {
                M.toast({ html: "Delete Succes" });
                console.log("Teams favorite dihapus.");
                const id = parseInt(button.id);
                favorite.forEach((team) => {
                    if (team.id === id) {
                        deleteTeams(team);
                        rel = setTimeout(location.reload(), 2000);
                    }
                });
            };
        });
    });
}