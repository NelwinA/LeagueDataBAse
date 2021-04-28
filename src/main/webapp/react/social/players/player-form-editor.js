import playerService, {findPlayerById} from "./player-service"

const {useState, useEffect} = React;
const {useParams, useHistory} = window.ReactRouterDOM;
const PlayerFormEditor = () => {

        const history = useHistory()
        const {id} = useParams()
        const [player, setPlayer] = useState({})

        useEffect(() => {
          if(id !== "new") {
            findPlayerById(id)
          }
        }, []);

        const findPlayerById = (id) =>
            playerService.findPlayerById(id).then(player=>setPlayer(player))
        const deletePlayer = (id) =>
            playerService.deletePlayer(id)
            .then(() => history.goBack())
        const createPlayer = (player) =>
            playerService.createPlayer(player)
            .then(() => history.goBack())
        const updateUser = (id, newPlayer) =>
            playerService.updatePlayer(id, newPlayer)
            .then(() => history.goBack())


  return (
            <div>
                    <h2>Player Editor</h2>
                    <label>ID</label>
                    <input value={player.id}/><br/>
                    <label>First Name</label>
                    <input
                        onChange={(e) =>
                            setPlayer(player =>
                                ({...player, firstName: e.target.value}))}
                        value={player.firstName}/><br/>
                    <label>Last Name</label>
                    <input
                        onChange={(e) =>
                            setPlayer(player =>
                                ({...player, lastName: e.target.value}))}
                        value={player.lastName}/><br/>
                    <label>Username</label>
                    <input
                        onChange={(e) =>
                            setPlayer(player =>
                                ({...player, username: e.target.value}))}
                        value={player.username}/><br/>
                    <label>Password</label>
                    <input
                        onChange={(e) =>
                            setPlayer(player =>
                                ({...player, password: e.target.value}))}
                        value={player.password}/><br/>
                    <button
                        onClick={() => {
                                history.goBack()}}>
                            Cancel
                    </button>
                    <button
                        onClick={() => deletePlayer(player.id)}>
                            Delete
                    </button>
                    <button
                        onClick={() => createPlayer(player)}>
                      Create
                    </button>
                    <button
                        onClick={() => updateUser(player.id, player)}>
                      Save
                    </button>

            </div>

        )
}

export default PlayerFormEditor