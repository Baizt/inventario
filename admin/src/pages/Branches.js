import React, { Component } from 'react'
import api from '../callApi';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Branch from '../components/Branch';
import Loader from '../components/Loader';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

class Branches extends Component{
	
	state = {
		branches: false
	}

	componentDidMount(){
		this.fetch();
	}

	fetch = async e => {
		try {
			const branches = await api.branches.getAll();
			console.log('branches', branches)
			this.setState({branches});
			
		} catch (error) {
			console.log('Fail getAllBranches', error)
		}
	}

	handleChange = e => {
		let index_edited = 0;
		let edited_branch = this.state.branches.filter((branch, index) => {
			if(branch.id == e.target.dataset.id){ index_edited = index; }
			return branch.id == e.target.dataset.id
		})[0];
		edited_branch[e.target.name] = e.target.value;

		this.setState({
			branches:[
				...this.state.branches,
			]
		});

		const send_branch_api = {
			"branch_address": edited_branch.address,
			"branch_id": edited_branch.id,
			"branch_name": edited_branch.name,
		}
		
		console.log('Editado', edited_branch)
		this.save(send_branch_api)
	}

	save = async send_branch_api => {
		try {
			await api.branches.update(send_branch_api);
			console.log('Branch Updated')
			
		} catch (error) {
			console.log('Fail getAllBranches', error)
		}
	}
	
	render(){
		if(!this.state.branches){
			return(
				<Loader/>
			)
		}
		return(
			<section>
				<h1>Sucursales</h1>
				<Row>
					{this.state.branches.map(branch => {
						return(
							<Col sm="6" md="4" key={branch.id}>
								<Branch branch={branch} handleChange={this.handleChange}/>
							</Col>
						)
					})}
				</Row>
				<Button variant="success">Agregar Sucursal</Button>
			</section>
		)
	}
}

export default Branches;