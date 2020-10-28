import React, { Component } from 'react'
import api from '../callApi';
import Branch from '../components/Branch';
import Loader from '../components/Loader';

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
	
	render(){
		if(!this.state.branches){
			return(
				<Loader/>
			)
		}
		return(
			<section>
				<h1>Sucursales</h1>
				<div>
					{this.state.branches.map(branch => {
						return(
							<Branch key={branch.id} branch={branch}/>
						)
					})}
				</div>
			</section>
		)
	}
}

export default Branches;