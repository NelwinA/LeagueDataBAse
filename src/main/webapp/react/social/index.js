import PlayerList from "./players/player-list";
import PlayerFormEditor from "./players/player-form-editor";
const {HashRouter, Route} = window.ReactRouterDOM; 
const App = () => {
    return (
        <div className="container-fluid">
            <HashRouter>
                <Route path={["/players", "/"]} exact={true}>
                    <PlayerList/>
                </Route>
                <Route path="/players/:id" exact={true}>
                    <PlayerFormEditor/>
                </Route>
            </HashRouter>
        </div>
    );
}

export default App;
