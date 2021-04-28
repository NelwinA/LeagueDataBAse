const GAME_URL = "http://localhost:8080/api/games"

export const createGame = (game) =>
    fetch(GAME_URL, {
        method: 'POST',
        body: JSON.stringify(game),
        headers: {'content-type': 'application/json'}
    })
    .then(response => response.json())

export const findAllGames = () =>
    fetch(GAME_URL)
        .then(response => response.json())

export const findGameById = (id) =>
    fetch(`${GAME_URL}/${id}`)
        .then(response => response.json())

export const updateGame = (id, game) =>
    fetch(`${GAME_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(game),
        headers: {'content-type': 'application/json'}
    })
    .then(response => response.json())

const deleteGame = (id) =>
    fetch(`${GAME_URL}/${id}`, {
        method: "DELETE"
    })

export default {
    createGame,
    findAllGames,
    findGameById,
    updateGame,
    deleteGame
}