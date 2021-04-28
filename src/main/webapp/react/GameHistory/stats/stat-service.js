const GAME_URL = "http://localhost:8080/api/games"
const STAT_URL = "http://localhost:8080/api/stats"

export const createStatForGame = (gameId, stat) =>
    fetch(`${GAME_URL}/${gameId}/stats`, {
        method: 'POST',
        body: JSON.stringify(stat),
        headers: {'content-type': 'application/json'}
    })
    .then(response => response.json())

export const findStatsForGame = (gameId) =>
    fetch(`${GAME_URL}/${gameId}/stats`)
        .then(response => response.json())

export const findStatById = (id) =>
    fetch(`${SECTION_URL}/${id}`)
        .then(response => response.json())

export const updateStat = (id, stat) =>
    fetch(`${STAT_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(stat),
        headers: {'content-type': 'application/json'}
    })
    .then(response => response.json())

const deleteStat = (id) =>
    fetch(`${STAT_URL}/${id}`, {
        method: "DELETE"
    })

export default {
    createStatForGame,
    findStatsForGame,
    findStatById,
    updateStat,
    deleteStat
}