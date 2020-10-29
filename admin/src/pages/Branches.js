import React, { Component } from 'react'
import api from '../callApi';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Branch from '../components/Branch';
import Loader from '../components/Loader';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

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
			return +branch.id === +e.target.dataset.id
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

	dropBranch = async e =>{
		try {
			await api.branches.drop(e.target.dataset.id);
			let tmp_branches = this.state.branches;
			tmp_branches.splice(e.target.dataset.index, 1);
	
			this.setState({
				branches:[
					...tmp_branches
				]
			})
		} catch (error) {
			console.log('Fail deleteBranch', error)
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
					{this.state.branches.map((branch, indexBranch) => {
						return(
							<Col sm="6" md="4" key={branch.id}>
								<Branch branch={branch} index={indexBranch} handleChange={this.handleChange} handleDrop={this.dropBranch} />
							</Col>
						)
					})}
				</Row>
				<Button variant="success" as={Link} to="sucursales/agregar">Agregar Sucursal</Button>
			</section>
		)
	}
}

export default Branches;