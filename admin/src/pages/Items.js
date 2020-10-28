import React, { Component } from 'react'
import api from '../callApi';
import {Link} from 'react-router-dom';
import Loader from '../components/Loader';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

class Items extends Component{
	state = {
		items:false
	}

	componentDidMount(){
		this.fetch()
	}

	fetch = async e => {
		try {
			const items = await api.items.getAll();
			console.log('items', items)
			this.setState({items});
			
		} catch (error) {
			console.log('Fail getAllItems', error)
		}
	}

	render(){
		if(!this.state.items){
			return(
				<Loader/>
			)
		}
		return(
			<section>
				<h1>Productos</h1>
				<ListGroup defaultActiveKey="0">
					<ListGroup.Item variant="primary">
						<Row>
							<Col>
								Nombre
							</Col>
							<Col>
								Código de Barras
							</Col>
							<Col>
								Precio
							</Col>
						</Row>
					</ListGroup.Item>
					{this.state.items.map(item => {
						return(
							<ListGroup.Item key={item.id} action as={Link} to={`/productos/${item.id}`}>
								<Row>
									<Col>
										{item.name}
									</Col>
									<Col>
										{item.barcode}
									</Col>
									<Col>
										${item.price}
									</Col>
								</Row>
							</ListGroup.Item>
						)
					})}
				</ListGroup>
				<Button variant="success" type="button" as={Link} to="/productos/agregar" className="mt-4" >
					Agregar Producto
				</Button>
			</section>
		)
	}
}

export default Items;