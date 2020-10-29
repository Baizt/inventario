// const PUERTO = 8001;
// const BASE_URL = `http://localhost:${PUERTO}`;
const BASE_URL = `http://localhost:`;
const mysql = require('mysql');
const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('./config');

const con = mysql.createConnection(config.database);

const http = require('http');
const app = express();

app.set('llave', config.llave);

const bodyParser = require('body-parser'); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin,Origin, X-Requested-With, Content-Type, Accept, access-token');
	next();
})

const getData = (req, res, query) => {
	con.query(query, (err, rows) => {
		if(err) throw err;
		res.send(verifyToken(req.headers['access-token'], rows[0]));
	});
};

const verifyToken = (token=false, data=false, msg='') => {
	let tokenStatus = true;

	if (token) {
		jwt.verify(token, app.get('llave'), (err, decoded) => {
			if (err) {
			   tokenStatus = false;
			}
		});

	} else {
	   tokenStatus = false;
	}

	const answer = {
		msg,
		data,
		tokenStatus,
	}
	return JSON.stringify(answer);
}

const encriptar = (user, pass) => {
   var crypto = require('crypto');
   var hmac = crypto.createHmac('sha1', user).update(pass).digest('hex');
   console.log('Encriptado', hmac)
   return hmac;
}

const rutasProtegidas = express.Router(); 
rutasProtegidas.use((req, res, next) => {
	const token = req.headers['access-token'];
    if (token) {
		jwt.verify(token, app.get('llave'), (err, decoded) => {
			if (err) {
				return res.json({
					mensaje: 'Token inválida',
					tokenStatus: false
				});    
			} else {
				req.decoded = decoded;    
				next();
			}
		});
    } else {
		res.send({ 
			mensaje: 'Token no proveída.' 
		});
    }
 });
 
 app.post('/auth', function(request, response) {

	 const username = request.body.username;
	 const password = request.body.password;
	//  const password = encriptar(username, request.body.password);

	 if (username && password) {
		 con.query(`SELECT * FROM users WHERE user = ? AND password = ?`, [username, password], function(error, results, fields) {
			 if (typeof results != 'undefined' && results.length > 0) {
 
				 const payload = {
					 check:  true
				 };
				 const token = jwt.sign(payload, app.get('llave'), {
					 expiresIn: 3600
				 });
 
				 response.json({
					 msg: 'Autenticación correcta',
					 tokenStatus: true,
					 data:{
						tokenStatus: true,
						token
					 },
					 token
				 });
			 } else {
				 response.json({
					 msg: 'Usuario o Contraseña Incorrecta',
					 tokenStatus: false,
					 data:{
						tokenStatus: false,
					 },
				 });
			 }			
		 });
	 } else {
		 response.json({
			 msg: 'Por favor ingresa Usuario y Contraseña',
			 tokenStatus: false,
			 data:{
				tokenStatus: false,
			 },
		 });
	 }
 });


 // Items
 app.get('/items/:item', (req, res) => {
	 getData(req, res, `CALL getItem(${req.params.item});`);
 })
 
 app.patch('/items/:item', rutasProtegidas, (req, res) => {
	 const data = req.body;
	 const query = `CALL updateItem(${data.item_id}, '${data.item_name}', ${data.item_barcode}, ${data.item_price});`;
 
	 con.query(query, (err) => {
			 if(err) throw err;
	 });
 
	 res.send(verifyToken(req.headers['access-token'], false, `Item Actualizado`));
 })
 
 app.delete('/items/:item', rutasProtegidas, (req, res) => {
	 const query = `CALL dropItem('${req.params.item}');`;
		 
	 con.query(query, (err) => {
			 if(err) throw err;
	 });
 
	 res.status(200).send(verifyToken(req.headers['access-token'], false, `Item Eliminando`));
 })
 
 app.get('/items', (req, res) => {
	 getData(req, res, 'CALL getAllItems();');
 })
 
 app.post('/items', rutasProtegidas, (req, res) => {
	 const data = req.body;
	 const query = `CALL setItem('${data.item_name}', '${data.item_barcode}', '${data.item_price}');`;
	 
	 con.query(query, (err) => {
			 if(err) throw err;
	 });
 
	 res.status(200).send(verifyToken(req.headers['access-token'], false, `Item Agregado`));
 })


 // BranchItems
 app.get('/branchitems/:branch', (req, res) => {
	 getData(req, res, `CALL getBranchItems(${req.params.branch});`);
 })
 app.patch('/branchitems/', (req, res) => {
	 const data = req.body;
	 const query = `CALL setBranchItem(${data.item_id}, ${data.branch_id}, ${data.num});`;
	 console.log(query)
	 
	 con.query(query, (err) => {
			 if(err) throw err;
	 });
 
	 res.status(200).send(verifyToken(req.headers['access-token'], false, `BranchItem Agregado`));
 })
 app.delete('/branchitems/', rutasProtegidas, (req, res) => {
	const data = req.body;
	const query = `CALL dropBranchItem(${data.item_id}, ${data.branch_id});`;
		 
	 con.query(query, (err) => {
			 if(err) throw err;
	 });
 
	 res.status(200).send(verifyToken(req.headers['access-token'], false, `BranchItem Eliminando`));
 })


 // Branches
 app.get('/branches/:branch', (req, res) => {
	 getData(req, res, `CALL getBranch(${req.params.branch});`);
 })
 
 app.patch('/branches/:branch', rutasProtegidas, (req, res) => {
	 const data = req.body;
	 const query = `CALL updateBranch(${data.branch_id}, '${data.branch_name}', '${data.branch_address}');`;
 
	 con.query(query, (err) => {
			 if(err) throw err;
	 });
 
	 res.send(verifyToken(req.headers['access-token'], false, `Branch Actualizado`));
 })
 
 app.delete('/branches/:branch', rutasProtegidas, (req, res) => {
	 const query = `CALL dropBranch('${req.params.branch}');`;
		 
	 con.query(query, (err) => {
			 if(err) throw err;
	 });
 
	 res.status(200).send(verifyToken(req.headers['access-token'], false, `Branch Eliminando`));
 })
 
 app.get('/branches', (req, res) => {
	 getData(req, res, 'CALL getAllBranches();');
 })
 
 app.post('/branches', rutasProtegidas, (req, res) => {
	 const data = req.body;
	 const query = `CALL setBranch('${data.branch_name}', '${data.branch_address}}');`;
	 
	 con.query(query, (err) => {
			 if(err) throw err;
	 });
 
	 res.status(200).send(verifyToken(req.headers['access-token'], false, `Branch Agregado`));
 })


// Usuarios
app.get('/users/:user', (req, res) => {
	getData(req, res, `CALL get_user(${req.params.user});`);
})

app.patch('/users/:user', rutasProtegidas, (req, res) => {
	const data = req.body;
	const query = `CALL put_user(${data.id_user}, '${data.name_user}', '${data.user_user}',
		'${data.email_user}', '${data.password_user === "" ? "" : encriptar(data.user_user, data.password_user)}');`;
		
	con.query(query, (err) => {
			if(err) throw err;
	});

	res.status(200).send(verifyToken(req.headers['access-token'], false, `Usuario Actualizado`));
})

app.delete('/users/:user', rutasProtegidas, (req, res) => {
	const query = `CALL delete_user('${req.params.user}');`;
		
	con.query(query, (err) => {
			if(err) throw err;
	});

	res.status(200).send(verifyToken(req.headers['access-token'], false, `Usuario Eliminado`));
})

app.get('/users', (req, res) => {
	getData(req, res, 'CALL get_all_users();');
})

app.post('/users', rutasProtegidas, (req, res) => {
	const data = req.body;
	const query = `CALL post_user('${data.name_user}', '${data.user_user}',
		'${data.email_user}', '${encriptar(data.user_user, data.password_user)}');`;
		
	con.query(query, (err) => {
			if(err) throw err;
	});

	res.status(200).send(verifyToken(req.headers['access-token'], false, `Usuario Agregado`));
})

app.get('/', (req, res) => {
	res.status(200).send('Bienvenido al API');
})

http.createServer(app).listen(8001, () => {
	console.log(`Servidor iniciado en LocalHost (${BASE_URL})`);
})
