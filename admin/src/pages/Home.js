import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Home extends Component{
	render(){
		return(
			<div>
				<Link to="/sucursales">Sucursales</Link> | <Link to="/productos">Productos</Link>
			</div>
		)
	}
}

export default Home;