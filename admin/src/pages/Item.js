import React, {Component} from 'react'
import api from '../callApi';
import Loader from '../components/Loader';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Item extends Component{
	state = {
		item:false,
		nuevo_item:typeof this.props.match.params.itemId == 'undefined'
	}

	componentDidMount(){
		if(this.state.nuevo_item){
			this.setState({
				item:{
					name:"",
					barcode:"",
					price:"",
				}
			})

		} else {
			this.fetch()
		}
	}

	fetch = async e => {
		try {
			const item = await api.items.get(this.props.match.params.itemId);
			console.log('item', item)
			this.setState({item});
			
		} catch (error) {
			console.log('Fail getItem', error)
		}
	}

	handleChange = e => {
		this.setState({
			item:{
				...this.state.item,
				[e.target.name]: e.target.value
			}
		})
	}

	handleSave = async e => {
		let data_save = {
			"item_name": this.state.item.name,
			"item_barcode": this.state.item.barcode,
			"item_price": this.state.item.price,
		};

		try {
			if(this.state.nuevo_item){
				await api.items.set(data_save);
				console.log('item Setted')

			}else{
				data_save.item_id = this.state.item.id;
				await api.items.update(data_save);
				console.log('item Updated')
			}

			window.location.replace("/productos");
			
		} catch (error) {
			console.log('Fail updateItem', error)
		}
	}

	handleDrop = async e => {
		try {
			await api.items.drop(this.state.item.id);
			console.log('item Deleted')
			window.location.replace("/productos");
			
		} catch (error) {
			console.log('Fail deleteItem', error)
		}
	}

	render(){
		if(!this.state.item){
			return(
				<Loader/>
			)
		}
		return(
			<section>
				<h1>{this.state.nuevo_item ? "Nuevo Producto" : this.state.item.name}</h1>
				<Form>
					<Form.Group as={Row} controlId="itemName">
						<Form.Label column sm="2" md="1">Producto</Form.Label>
						<Col sm="10" md="11">
							<Form.Control
								type="text"
								placeholder="Nombre del Producto"
								name="name"
								value={this.state.item.name}
								onChange={this.handleChange}
							/>
						</Col>
					</Form.Group>

					<Form.Group as={Row} controlId="itemCode">
						<Form.Label column sm="2" md="1">Código</Form.Label>
						<Col sm="10" md="11">
							<Form.Control
								type="number"
								placeholder="Código de Barras"
								name="barcode"
								value={this.state.item.barcode}
								onChange={this.handleChange}
							/>
						</Col>
					</Form.Group>

					<Form.Group as={Row} controlId="itemPrice">
						<Form.Label column sm="2" md="1">Precio</Form.Label>
						<Col sm="10" md="11">
							<Form.Control
								type="number" step="0.01"
								placeholder="Precio al Público"
								name="price"
								value={this.state.item.price}
								onChange={this.handleChange}
							/>
						</Col>
					</Form.Group>
					
					<Row>
						<Col>
							<Button variant="primary" type="button" onClick={this.handleSave}>
								Guardar
							</Button>
						</Col>
						{!this.state.nuevo_item ?
							<Col>
								<Button variant="danger" type="button" onClick={this.handleDrop}>
									Eliminar
								</Button>
							</Col> : ""
						}
					</Row>
				</Form>
			</section>
		)
	}
}

export default Item;