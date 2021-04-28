import gameService from "./game-service"

const {useState, useEffect} = React
const {useParams, useHistory} = window.ReactRouterDOM;
const GAME_URL = "http://localhost:8080/api/games"

const GameEditorForm = () => {
    const [game, setGame] = useState({})
    const {id} = useParams()
    const history = useHistory()
    useEffect(() => {
        findGameById(id)
    }, []);
    const findGameById = (id) =>
        gameService.findGameById(id)
            .then(game => setGame(game))
    const updateGame = (id, newGame) =>
        gameService.updateGame(id, newGame)
            .then(() => history.goBack())
    const deleteGame = (id) =>
        gameService.deleteGame(id)
            .then(() => history.goBack())
    
    return (
        <div>
            <h2>
                Game Editor
            </h2>
            <label>Id</label>
            <input
                className="form-control margin-bottom-10px"
                readOnly={true}
                value={game.id}/>
            <label>Mode</label>
            <input
                className="form-control margin-bottom-10px"
                onChange={(e) => setGame(game => ({...game, mode: e.target.value}))}
                value={game.mode}/>
            <button
                onClick={() => updateGame(game.id, game)}
                className="btn btn-success btn-block">Save</button>
            <button
                onClick={() => {
                    history.goBack()
                }}
                className="btn btn-danger btn-block margin-left-10px">Cancel</button>
            <button
                onClick={() => deleteGame(game.id)}
                className="btn btn-danger btn-block margin-left-10px">Delete</button>
        </div>
    )
}

export default GameEditorForm