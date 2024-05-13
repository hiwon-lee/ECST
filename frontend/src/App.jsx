import './App.css';
import Login from "./Page/Login";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Signup from "./Page/Signup";
import Home from "./Page/Home.jsx"
import Focus from "./Page/Focus.jsx";
import Mypage from "./Page/Mypage.jsx";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />  // 홈 경로를 최상위에 위치시킵니다.
                <Route path="/focus-analysis" exact component={Focus} />
                <Route path="/my-page" exact component={Mypage} />
                <Route path="/login" exact>
                    <Login />
                </Route>
                <Route path="/signup" exact>
                    <Signup />
                </Route>

            </Switch>
        </Router>
    );
}

export default App;