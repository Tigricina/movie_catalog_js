const apiKey = '7dd9f2bc-fccf-4cc0-9713-b7c209c9efdd';
const url = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';


const options = {
	method: 'GET',
	headers: {
		'X-API-KEY': apiKey,
		'Content-Type': 'application/json',
	},
};

const filmsWrapper = document.querySelector('.films');

async function fetchData(url, options) {
	const response = await fetch(url, options);
	const data = await response.json();

	return data;
}

async function fetchAndRenderFilms() {
	//const response = await fetch(url + 'top', options);
	//const data = await response.json();

	const data = await fetchData(url + 'top', options);
	
	renderFilms(data.films);
}

function renderFilms(films) {
	for (film of films) {
		

		const html = `
					<div class="card">
					<img src=${film.posterUrlPreview} alt="Cover" class="card__img" />
					<h3 class="card__title">${film.nameRu}</h3>
					<p class="card__year">${film.year}</p>
					<p class="card__rate">Рейтинг: ${film.rating}</p
					></div>`;
									
		filmsWrapper.insertAdjacentHTML('beforeend', html);
	}
}

fetchAndRenderFilms().catch((err) => console.log(err));