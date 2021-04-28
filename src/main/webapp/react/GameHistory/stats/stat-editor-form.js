import statService from "./stat-service"

const {useState, useEffect} = React
const {useParams, useHistory} = window.ReactRouterDOM;

const StatEditorForm = () => {
    const [stat, setStat] = useState({})
    const {statId} = useParams()
    const history = useHistory()
    useEffect(() => {
        findStatById(statId)
    }, []);
    const findStatById = (id) =>
        statService.findStatById(id)
            .then(stat => setStat(stat))
    const updateStat = (id, newStat) =>
        statService.updateStat(id, newStat)
            .then(() => history.goBack())
    const deleteStat = (id) =>
        statService.deleteStat(id)
            .then(() => history.goBack())
    
    return (
        <div>
            <h2>
                Stat Editor
            </h2>
            <label>Id</label>
            <input
                className="form-control margin-bottom-10px"
                readOnly={true}
                value={stat.id}/>
            <label>Champion</label>
            <input
                className="form-control margin-bottom-10px"
                onChange={(e) => setStat(stat => ({...stat, champion: e.target.value}))}
                value={stat.champion}/>
            <label>Takedowns</label>
            <input
                type="number"
                className="form-control margin-bottom-10px"
                value={stat.takedowns}
                onChange={(e)=>setStat(stat => ({...stat, takedowns: parseInt(e.target.value)}))}/>

          <label>Assists</label>
          <input
              type="number"
              className="form-control margin-bottom-10px"
              value={stat.assists}
              onChange={(e)=>setStat(stat => ({...stat, assists: parseInt(e.target.value)}))}/>

          <label>Deaths</label>
          <input
              type="number"
              className="form-control margin-bottom-10px"
              value={stat.deaths}
              onChange={(e)=>setStat(stat => ({...stat, deaths: parseInt(e.target.value)}))}/>


            {/*<label>Semester</label>*/}
            {/*<select*/}
            {/*    className="form-control margin-bottom-10px"*/}
            {/*    value={section.semester}*/}
            {/*    onChange={(e)=>setSection(section => ({...section, semester: e.target.value}))}>*/}
            {/*    <option>FALL</option>*/}
            {/*    <option>SPRING</option>*/}
            {/*    <option>SUMMER</option>*/}
            {/*</select>*/}


            <label className="margin-bottom-10px">
            <input
                type="checkbox"
                checked={stat.victory}
                onChange={(e)=>setStat(stat => ({...stat, victory: e.target.checked}))}/>
                &nbsp;Victory
            </label>
            <br/>
            <button
                onClick={() => updateStat(stat.id, stat)}
                className="btn btn-success btn-block">Save</button>
            <button
                onClick={() => {
                    history.goBack()
                }}
                className="btn btn-danger btn-block margin-left-10px">Cancel</button>
            <button
                onClick={() => deleteStat(stat.id)}
                className="btn btn-danger btn-block margin-left-10px">Delete</button>
        </div>
    )
}

export default StatEditorForm