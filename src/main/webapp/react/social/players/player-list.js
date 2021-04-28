import playerService, {findAllPlayers} from "./player-service"

const {useState, useEffect} = React;
const {Link, useHistory} = window.ReactRouterDOM;



const PlayerList = () => {

  const history = useHistory()

  const[players, setPlayers] = useState([])
    useEffect(() => {findAllPlayers()}, [])

  const findAllPlayers = () =>
      playerService.findAllPlayers().then(players=>setPlayers(players))

    return(
        <div>
          <h2>Players</h2>
          <button onClick={() => history.push("/players/new")}>
            Add Players
          </button>

          <ul className="list-group">
            {
              players.map(player =>
                  <li key={player.id}>
                    <Link to={`/players/${player.id}`}>
                    {player.firstName},
                    {player.lastName},
                    {player.username}
                    </Link>
                  </li>)
            }
          </ul>
        </div>

    )
}

export default PlayerList;