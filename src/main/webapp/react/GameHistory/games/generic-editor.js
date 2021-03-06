const {useState, useEffect} = React
const {useParams} = window.ReactRouterDOM;
const GAME_URL = "http://localhost:8080/api/games"

const GameEditor = (
    {
        schema = {
            mode: {type: "text"},
            // id: {type: "text"}
        }
    }) => {
    const [item, setItem] = useState({})
    const {id} = useParams()
    useEffect(() => {
        findById(id)
    }, []);
    const findById = (id) =>
        fetch(`${GAME_URL}/${id}`)
            .then(response => response.json())
            .then(item => setItem(item))
    return (
        <div>
            <h2>Game Editor {id}</h2>
            {JSON.stringify(item)}
            <ul className="list-group">
                {
                    Object.keys(item).map((key, ndx) => {
                        if(!schema[key]) return null
                        return(
                            <li>
                                {
                                    
                                }
                                <input
                                    className="form-control"
                                    type={schema[key].type}
                                    value={item[key]}/>
                            </li>)

                    })
                }
            </ul>
        </div>
    )
}

export default GameEditor