import React, {Component} from 'react'
import api from '../callApi';
import Loader from '../components/Loader';
import {Link} from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

class ItemsBranch extends Component{
	state = {
		branch:false,
		items:false,
		allItems:false
	}

	componentDidMount(){
		this.fetchData()
	}

	fetchData = async e => {
		console.log(this.props.match.params.branchId)
		try {
			const branch = await api.branches.get(this.props.match.params.branchId)
			const items = await api.branchItems.getByBranch(this.props.match.params.branchId)
			const allItems = await api.items.getAll()
			console.log('branch', branch)
			console.log('items', items)
			console.log('allItems', allItems)
			this.setState({branch, items, allItems})
			
		} catch (error) {
			console.log('fail getBranch', error)
		}
	}
	
	handleChange = e => {
		let index_edited = 0;
		let edited_item = this.state.items.filter((item, index) => {
			if(item.id_item == e.target.dataset.id){ index_edited = index; }
			return item.id_item == e.target.dataset.id
		})[0];

		console.log('edited_item', edited_item)
		edited_item[e.target.name] = e.target.value;

		this.setState({
			items:[
				...this.state.items,
			]
		});

		const send_item_api = {
			"item_id": edited_item.id_item,
			"branch_id": this.state.branch.id,
			"num": edited_item.lot,
		}
		
		console.log('send_item_api', send_item_api)
		this.save(send_item_api)
	}

	save = async send_item_api => {
		try {
			await api.branchItems.set(send_item_api);
			console.log('Item Updated')
			
		} catch (error) {
			console.log('Fail setBranchItem', error)
		}
	}

	addItem = e => {

		this.setState({
			items:[
				...this.state.items,
				{
					barcode: "",
					item: "",
					price: ""
				}
			]
		});
	}

	itemExistInBranch(id){
		const coincidencias = this.state.items.filter(item => {
			return item.id_item === id
		})
		return coincidencias.length > 0;
	}

	addInfoItem = e => {
		let temp_items = this.state.items;
		temp_items.pop();
		console.log('temp_items', temp_items)
		
		const info_item = this.state.allItems[e.target.dataset.index];

		this.setState({
			items:[
				...temp_items,
				{
					id_item: info_item.id,
					barcode: info_item.barcode,
					item: info_item.name,
					price: info_item.price
				}
			]
		});
	}

	dropItem = async e => {

		try {
			const data_delete = {
				"item_id": e.target.dataset.id,
				"branch_id": this.state.branch.id,
			};
			await api.branchItems.drop(data_delete);

			let tmp_items = this.state.items;
			tmp_items.splice(e.target.dataset.index, 1);
			this.setState({
				items:[
					...tmp_items
				]
			})
			console.log('Item Deleted', data_delete)
			
		} catch (error) {
			console.log('Fail deleteBranchItem', error)
		}
	}

	render(){
		if(!this.state.branch || !this.state.items){
			return(
				<Loader/>
			)
		}
		return(
			<div>
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
								Cantidad en Sucursal
							</Col>
							<Col>
								Precio
							</Col>
						</Row>
					</ListGroup.Item>
					{this.state.items.map((item, indexItem) => {
						if(item.item === ""){
							return(
								<ListGroup.Item key={item.id} action >
									<Row>
										<Col>
											<DropdownButton id="dropdown-item-button" title="Seleccione el Nuevo Producto">
												{this.state.allItems.map((item, index) =>{
													return( this.itemExistInBranch(item.id) ? "" :
														<Dropdown.Item as="button" onClick={this.addInfoItem} data-index={index} >{item.name}</Dropdown.Item>
													)
												})}
											</DropdownButton>
										</Col>
									</Row>
								</ListGroup.Item>
							)
						}
						return (
							<ListGroup.Item key={item.id} action >
								<Row>
									<Col>
										{item.item}
									</Col>
									<Col>
										{item.barcode}
									</Col>
									<Col>
										<Form.Control type="text" placeholder="Cantidad en Sucursal" value={item.lot} name="lot" data-id={item.id_item} onChange={this.handleChange} />
									</Col>
									<Col>
										${item.price}
									</Col>
									<Col>
										<Button variant="danger" type="button" onClick={this.dropItem} data-id={item.id_item} data-index={indexItem}>
											X
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						)
					})}
				</ListGroup>
				<Button variant="success" type="button" onClick={this.addItem} className="mt-4" >
					Agregar Producto
				</Button>
			</div>
		)
	}
}

export default ItemsBranch