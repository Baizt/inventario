import React, {Component} from 'react'
import './styles/Loader.css'
import Spinner from 'react-bootstrap/Spinner';

function Loader(){
	return(
		<div className="loaderContainer">
			<Spinner animation="border" />
		</div>
	)
}

export default Loader;