import GameEditorInline from "./game-editor-inline";
import gameService, {findAllGames} from "./game-service"

const GAME_URL = "http://localhost:8080/api/games"
const { useState, useEffect } = React;

const GameList = () => {
    const [games, setGames] = useState([])
    const [newGame, setNewGame] = useState({})
    useEffect(() => {
        findAllGames()
    }, [])
    const createGame = (game) =>
        gameService.createGame(game)
            .then(game => {
              setNewGame({mode:''})
                setGame(games => ([...games, game]))
            })
    const updateGame = (id, newGame) =>
        gameService.updateGame(id, newGame)
            .then(game => setGames(games => (games.map(game => game.id === id ? newGame : game))))
    const findAllGames = () =>
        gameService.findAllGames()
            .then(games => setGames(games))
    const deleteGame = (id) =>
        gameService.deleteGame(id)
            .then(games => setGames(games => games.filter(game => game.id !== id)))
    return(
        <div>
            <h2>Games</h2>
            <ul className="list-group">
                <li className="list-group-item">
                    <div className="row">
                        <div className="col">
                            <input placeholder="Game Mode"
                                   title="Please enter a mode for the game" className="form-control" value={newGame.mode}
                                   onChange={(e) => setNewGame(newGame => ({...newGame, mode: e.target.value}))}/>
                        </div>
                        <div className="col-3">
                            <i className="fas fa-plus fa-2x float-right" onClick={() => createCourse(newCourse)}></i>
                        </div>
                    </div>
                </li>
            {
                games.map(game =>
                    <li key={game.id} className="list-group-item">
                        <GameEditorInline key={game._id}
                            updateGame={updateGame()}
                            deleteGame={deleteGame()}
                            game={game}/>
                    </li>)
            }
            </ul>
        </div>
    )
}

export default GameList;