import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './component/Home.js';
import Alluser from './component/Alluser.js';
import Transaction from './component/History.js';
import Singaluser from './component/Singleuser.js';


function App() {
	return (
		<div className="App">
			<Switch>
				<Route path="/alluser" ><Alluser /></Route>
				<Route path="/history" ><Transaction /></Route>
				<Route path="/allusers/:id"><Singaluser /></Route>
				<Route path="/" exact={true}><Home /></Route>
				<Route path="/*"><Notfound /></Route>
			</Switch>
		</div>
	);
}
function Notfound() {
	return (
		<div>
			404 Not Found
		</div>
	);
}

export default App;
