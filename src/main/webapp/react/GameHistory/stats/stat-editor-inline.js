const {useState, useEffect } = React;
const {Link} = window.ReactRouterDOM;

const StatEditorInline = ({stat, deleteStat, updateStat}) => {
    const [statCopy, setStatCopy] = useState(stat)
    const [editing, setEditing] = useState(false)
    return(
        <div>
            {
                editing &&
                <div className="row">
                    <div className="col">
                        <input
                            className="form-control"
                            value={statCopy.champion}
                            onChange={(e)=>setStatCopy(statCopy => ({...statCopy, champion: e.target.value}))}/>
                    </div>
                    <div className="col">
                        <input
                            type="number"
                            className="form-control"
                            value={statCopy.takedowns}
                            onChange={(e)=>setStatCopy(statCopy => ({...statCopy, takedowns: parseInt(e.target.value)}))}/>
                    </div>
                    <div className="col">
                        <input
                            type="number"
                            className="form-control"
                            value={statCopy.assists}
                            onChange={(e)=>setStatCopy(statCopy => ({...statCopy, assists: parseInt(e.target.value)}))}/>
                    </div>
                    <div className="col">
                        <input
                            type="number"
                            className="form-control"
                            value={statCopy.deaths}
                            onChange={(e)=>setStatCopy(statCopy => ({...statCopy, deaths: parseInt(e.target.value)}))}/>
                    </div>


                    <div className="col">
                        <label>
                        <input
                            type="checkbox"
                            checked={statCopy.victory}
                            onChange={(e)=>setStatCopy(statCopy => ({...statCopy, victory: e.target.checked}))}/>
                            &nbsp;
                            Online
                        </label>
                    </div>
                    {/*<div className="col">*/}
                    {/*    <input*/}
                    {/*        type="date"*/}
                    {/*        className="form-control"*/}
                    {/*        value={statCopy.startDate}*/}
                    {/*        onChange={(e)=>setStatCopy(statCopy => ({...statCopy, startDate: e.target.value}))}/>*/}
                    {/*</div>*/}
                    <div className="col-2">
                        <i className="fas fa-2x fa-check float-right margin-left-10px"
                           onClick={() => {
                               setEditing(false)
                               updateStat(statCopy.id, statCopy)
                           }}></i>
                        <i className="fas fa-2x fa-undo float-right margin-left-10px"
                           onClick={() => setEditing(false)}></i>
                        <i className="fas fa-2x fa-trash float-right margin-left-10px"
                           onClick={() => deleteStat(stat.id)}></i>
                    </div>
                </div>
            }
            {
                !editing &&
                <div className="row">
                    <div className="col">
                        <Link to={`/stats/${statCopy.id}`}>
                            {statCopy.champion}
                        </Link>
                    </div>
                    <div className="col">
                        <Link to={`/stats/${statCopy.id}`}>
                            {statCopy.takedowns}
                        </Link>
                    </div>
                    <div className="col">
                        <Link to={`/stats/${statCopy.id}`}>
                            {statCopy.assists}
                        </Link>
                    </div>
                    <div className="col">
                        <Link to={`/stats/${statCopy.id}`}>
                            {statCopy.deaths}
                        </Link>
                    </div>
                    <div className="col">
                        <Link to={`/stats/${statCopy.id}`}>
                            {statCopy.victory && 'VICTORY'}
                            {!statCopy.victory && 'DEFEAT'}
                        </Link>
                    </div>
                    <div className="col-1">
                        <i className="fas fa-cog fa-2x float-right"
                           onClick={() => setEditing(true)}></i>
                    </div>
                </div>
            }
        </div>
    )
}

export default StatEditorInline;