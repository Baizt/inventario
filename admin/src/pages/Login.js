import React, {Component} from 'react';
import api from '../callApi';
import './styles/Login.css';
import Cookies from 'universal-cookie';
import Loader from '../components/Loader';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Login extends Component {

	state = {
		loading:false,
		error:null,
		usuario:{
			"username": "",
			"password": ""
		},
	}
	
	componentDidMount(){
		const cookies = new Cookies();
		cookies.remove('adminRef')
	}
	
	handleChange = e => {
		this.setState({
			usuario:{
				...this.state.usuario,
				[e.target.name]: e.target.value,
			}
		});
	};

	logUser = async e => {
		e.preventDefault();
		this.setState({loading:true, error:null});
		try {
			const log = await api.login.log(this.state.usuario);
			if(log.tokenStatus){
				const cookies = new Cookies();
				cookies.set('adminRef', log.token, {  });
				window.location.replace("/home");
			}else{
				console.log('Error al Loggear')
				this.setState({loading:false});
			}

		} catch (error) {
			console.log('Fail logUser', error)
			this.setState({loading:true, error:null});
		}
	}

	render(){
		if(this.state.loading)
			return(
				<Loader/>
			)
		return(
			<section className="login">
				<h1>LogIn</h1>
				<Form>
					<Form.Group controlId="formUser">
						<Form.Control type="text" placeholder="Usuario"
							name="username"
							onChange={this.handleChange}
						/>
					</Form.Group>

					<Form.Group controlId="formPass">
						<Form.Control type="password" placeholder="Contraseña"
							name="password"
							onChange={this.handleChange}
						/>
					</Form.Group>

					<Button variant="primary" type="submit" onClick={this.logUser}>
						Aceptar
					</Button>
				</Form>
			</section>
		)
	}
}

export default Login;