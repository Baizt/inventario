import React from 'react'
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function NavBar (){
	return(
		<Navbar bg="dark" variant="dark" className="mb-4">
			<Navbar.Brand>Admin</Navbar.Brand>
			<Nav className="mr-auto">
				<Nav.Link href="/home">Home</Nav.Link>
				<Nav.Link href="/sucursales">Sucursales</Nav.Link>
				<Nav.Link href="/productos">Productos</Nav.Link>
			</Nav>
			<Button variant="danger" as={Link} to="/">Cerrar Sesión</Button>
		</Navbar>
	)
}

export default NavBar;