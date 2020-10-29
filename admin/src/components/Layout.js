import React from 'react'
import NavBar from './NavBar'
import Container from 'react-bootstrap/Container';

function Layout (props){
	return(
		<Container>
			<NavBar/>
			{props.children}
		</Container>
	)
}

export default Layout