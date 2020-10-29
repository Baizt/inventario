import React from 'react'
import api from '../callApi';
import Loader from '../components/Loader';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class NewBranch extends React.Component{
	state = {
		branch:{
			name:"",
			address:"",
		}
	}

	handleChange = e => {
		this.setState({
			branch:{
				...this.state.branch,
				[e.target.name]: e.target.value
			}
		})
	}

	handleSave = async e => {
		let data_save = {
			"branch_name": this.state.branch.name,
			"branch_address": this.state.branch.address,
		};

		try {
			await api.branches.set(data_save);
			console.log('branch Setted')
			window.location.replace("/sucursales");
			
		} catch (error) {
			console.log('Fail setBranch', error)
		}
	}

	render(){
		return(
			<section>
				<h1>Nueva Sucursal</h1>
				<Form as={Row}>
					<Col sm="5">
						<Form.Group as={Row} controlId="branchName">
							<Form.Label column md="2">Nombre</Form.Label>
							<Col md="10">
								<Form.Control
									type="text"
									placeholder="Nombre de la Sucursal"
									name="name"
									value={this.state.branch.name}
									onChange={this.handleChange}
								/>
							</Col>
						</Form.Group>
					</Col>

					<Col sm="5">
						<Form.Group as={Row} controlId="branchAddress">
							<Form.Label column md="2">Dirección</Form.Label>
							<Col md="10">
								<Form.Control
									type="text"
									placeholder="Dirección de la Sucursal"
									name="address"
									value={this.state.branch.address}
									onChange={this.handleChange}
									/>
							</Col>
						</Form.Group>
					</Col>
					
					<Col sm="2">
						<Button variant="primary" type="button" onClick={this.handleSave}>
							Guardar
						</Button>
					</Col>
				</Form>
			</section>
		)
	}
}

export default NewBranch;