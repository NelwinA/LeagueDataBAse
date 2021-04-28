import StatEditorInline from "./stat-editor-inline";
import statService, {createStatForGame} from "./stat-service"

const STAT_URL = "http://localhost:8080/api/stats" //< -------- WATCH THIS keep an eye out bro
const { useState, useEffect } = React;
const {Link, useParams, useHistory} = window.ReactRouterDOM;

const StatList = () => {
    const [stats, setStats] = useState([])
    const [newStat, setNewStat] = useState({})
    const {gameId} = useParams()
    useEffect(() => {
        findStatsForGame(gameId)
    }, [])
    const createStatForGame = (stat) =>
        statService.createStatForGame(gameId, stat)
            .then(stat => {
                setNewStat({name:''})
                setStats(stats => ([...stats, stat]))
            })
    const updateStat = (id, newStat) =>
        statService.updateStat(id, newStat)
            .then(stat => setStats(stats => (stats.map(stat => stat.id === id ? newStat : stat))))
    const findStatsForGame = (gameId) =>
        statService.findStatsForGame(gameId)
            .then(stats => setStats(stats))
    const deleteStat = (id) =>
        statService.deleteStat(id)
            .then(stats => setStats(stats => stats.filter(stat => stat.id !== id)))
    return(
        <div>
            <h2>
                <Link onClick={() => history.back()}>
                    <i className="fas fa-arrow-left margin-right-10px"></i>
                </Link>
                Stats
            </h2>
            <ul className="list-group">
                <li className="list-group-item">
                    <div className="row">
                        <div className="col">
                            <input placeholder="Stat Champion"
                                   title="Please enter a champion for this stat"
                                   className="form-control"
                                   value={newStat.champion}
                                   onChange={(e) => setNewStat(newStat => ({...newStat, champion: e.target.value}))}/>
                        </div>
                        <div className="col-2">
                            <i className="fas float-right fa-plus fa-2x" onClick={() => createSectionForCourse(newSection)}></i>
                        </div>
                    </div>
                </li>
            {
                stats.map(stat =>
                    <li key={stat.id} className="list-group-item">
                        <StatEditorInline key={stat._id}
                                             updateStat={updateStat}
                                             deleteStat={deleteStat()}
                                             stat={stat}/>
                    </li>)
            }
            </ul>
        </div>
    )
}

export default StatList;