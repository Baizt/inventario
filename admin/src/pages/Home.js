import React, {Component} from 'react';
import api from '../callApi';
import Loader from '../components/Loader';
import Summary from '../components/Summary';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Home extends Component{
	state = {
		branches: false,
		items: false
	}

	componentDidMount(){
		this.fetchData();
	}

	fetchData = async e => {
		try {
			const branches = await api.branches.getAll();
			console.log('branches', branches)
			this.setState({branches});
			this.state.branches.forEach(branch => {
				this.getItemsBranch(branch.id)
			});
			
		} catch (error) {
			console.log('Fail getAllBranches', error)
		}
	}

	getItemsBranch = async id_branch => {
		try {
			const items = await api.branchItems.getByBranch(id_branch)
			console.log('items', items)
			this.setState({
				items:{
					...this.state.items,
					[id_branch]:items
				}
			});
			
		} catch (error) {
			console.log('Fail getAllItemsBranch', error)
			this.setState({
				items:{
					...this.state.items,
					[id_branch]:[]
				}
			});
		}
	}

	render(){
		if(!this.state.branches){
			return(
				<Loader/>
			)
		}
		return(
			<div>
			<Row>
				{this.state.branches.map((branch, indexBranch) => {
					return(
						<Col lg="6" key={branch.id}>
							<Summary branch={branch} items={this.state.items[branch.id]} />
						</Col>
					)
				})}
			</Row>
			</div>
		)
	}
}

export default Home;