import GameList from "./games/game-list";
import StatList from "./stats/stat-list";
import GameEditorForm from "./games/game-editor-form";
import StatEditorForm from "./stats/stat-editor-form";

const {HashRouter, Link, Route} = window.ReactRouterDOM;
 
const App = () => {
    console.log(window.ReactRouterDOM)
    return (
        <div className="container-fluid">
            <HashRouter>
                <Route path={["/games", "/"]} exact={true}>
                    <GameList/>
                </Route>
                <Route path="/games/:id" exact={true}>
                    <GameEditorForm/>
                </Route>
                <Route path="/games/:gameId/stats" exact={true}>
                    <StatList/>
                </Route>
                <Route path="/stats/:statId" exact={true}>
                    <StatEditorForm/>
                </Route>
            </HashRouter>
        </div>
    );
}

export default App;
