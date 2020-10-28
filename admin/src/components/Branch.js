import React, {Component} from 'react'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

function Branch (props){
	return(
		<Card as={Form} className="mt-4 mb-4">
			<Card.Header>
				<Form.Control type="text" placeholder="Nombre de Sucursal" value={props.branch.name} name="name" data-id={props.branch.id} onChange={props.handleChange} />
			</Card.Header>
			<Card.Body>
				<Form.Control type="text" placeholder="Dirección de Sucursal" value={props.branch.address} name="address" data-id={props.branch.id} onChange={props.handleChange} />
				<Button variant="primary" className="mt-3" as={Link} to={`/sucursales/${props.branch.id}`}>Administrar Productos</Button>
			</Card.Body>
		</Card>
	)
}

export default Branch