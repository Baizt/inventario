import Cookies from 'universal-cookie';
const BASE_URL = `http://localhost:8001`;

async function callApi(endpoint, options = {}, single_answer) {
	options.headers = {
	  'Content-Type':'application/json',
	  'Accept':'application/json',
	  'access-token': getToken(),
	};
	const url = BASE_URL + endpoint;
	const response = await fetch(url, options);
	const data = await response.json();

	if(!data.tokenStatus){
		window.location.replace("/login");
		return false;
	}

	if(single_answer){
		return data.data[0];
	}
	
	return data.data;
 }

function getToken() {
	 const cookies = new Cookies();
	 return cookies.get('adminRef');
 }

const api = {
	login:{
		log(user){
			console.log('api.login.log', user)
			return callApi(`/auth`, {
				method: 'POST',
				body: JSON.stringify(user),
			});
		},
	},
	branches: {
		getAll(){
			return callApi(`/branches`);
		},
		get(branch_id){
			return callApi(`/branches/${branch_id}`, {}, true);
		},
		update(update){
			return callApi(`/branches/${update.branch_id}`, {
				method: 'PATCH',
				body: JSON.stringify(update),
			});
		},
		set(new_branch){
			return callApi(`/branches`, {
				method: 'POST',
				body: JSON.stringify(new_branch),
			});
		},
		drop(branch_id){
			return callApi(`/branches/${branch_id}`, {
				method: 'DELETE',
			});
		},
	},
	branchItems:{
		getByBranch(branch_id){
			return callApi(`/branchitems/${branch_id}`);
		},
		set(new_branch_item){
			return callApi(`/branchItems`, {
				method: 'PATCH',
				body: JSON.stringify(new_branch_item),
			});
		},
		drop(branch_item){
			return callApi(`/branchItems/`, {
				method: 'DELETE',
				body: JSON.stringify(branch_item),
			});
		},
	},
	items: {
		getAll(){
			return callApi(`/items`);
		},
		get(id_item){
			return callApi(`/items/${id_item}`, {}, true);
		},
		update(update){
			return callApi(`/items/${update.id_item}`, {
				method: 'PATCH',
				body: JSON.stringify(update),
			});
		},
		set(new_item){
			return callApi(`/items`, {
				method: 'POST',
				body: JSON.stringify(new_item),
			});
		},
		drop(id_item){
			return callApi(`/items/${id_item}`, {
				method: 'DELETE',
			});
		},
	},
};

export default api;