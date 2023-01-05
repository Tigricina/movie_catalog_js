const apiKey = '7dd9f2bc-fccf-4cc0-9713-b7c209c9efdd';
const url = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';


const options = {
	method: 'GET',
	headers: {
		'X-API-KEY': apiKey,
		'Content-Type': 'application/json',
	},
};

/*
fetch(url + 'top', options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.log(err))
	*/

async function fetchAndRenderFilms() {
	const response = await fetch(url + 'top', options);
	const data = await response.json()
	console.log(data)
}

fetchAndRenderFilms().catch((err) => console.log(err));