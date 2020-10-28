import React, {Component} from 'react'

class Branch extends Component{
	render(){
		return(
			<div>{this.props.branch.name}</div>
		)
	}
}

export default Branch