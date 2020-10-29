import React from 'react'
import Loader from '../components/Loader';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

function Summary(props){
	if(typeof props.items === 'undefined'){
		return(
			<Loader/>
		)
	}
	return(
		<div>
			<Card className="mt-4 mb-4">
				<Card.Header>
					<Card.Title>{props.branch.name}</Card.Title>
				</Card.Header>

				<Card.Body>
					<ListGroup className="list-group-flush">
						{props.items.length > 0 ?
							<ListGroupItem>
									<Row>
										<Col>Código</Col>
										<Col>Producto</Col>
										<Col>Existencias</Col>
										<Col>Precio</Col>
									</Row>
							</ListGroupItem> : ""
						}
						{props.items.length > 0 ? props.items.map(item =>
							<ListGroupItem key={`${props.branch.id}${item.id_item}`}>
								<Row>
									<Col>{item.barcode}</Col>
									<Col>{item.item}</Col>
									<Col>{item.lot}</Col>
									<Col>${item.price}</Col>
								</Row>
							</ListGroupItem>
						) : <Card.Text>Sin Productos</Card.Text>}
					</ListGroup>
				</Card.Body>

				<Card.Footer className="text-muted">
					{props.branch.address}
				</Card.Footer>
			</Card>
		</div>
	)
}

export default Summary