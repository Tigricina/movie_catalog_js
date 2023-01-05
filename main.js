const apiKey = '7dd9f2bc-fccf-4cc0-9713-b7c209c9efdd';
const url = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';


const options = {
	method: 'GET',
	headers: {
		'X-API-KEY': apiKey,
		'Content-Type': 'application/json',
	},
};

async function fetchAndRenderFilms() {
	try {
		const response = await fetch(url + 'top', options);
		const data = await response.json()
		console.log(data)
	} catch(err) {
		console.log(err)
	}
	
}

fetchAndRenderFilms();