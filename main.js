// Settings
const apiKey = '7dd9f2bc-fccf-4cc0-9713-b7c209c9efdd';
const url = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';

const options = {
	method: 'GET',
	headers: {
		'X-API-KEY': apiKey,
		'Content-Type': 'application/json',
	},
};

// Dom elements
const filmsWrapper = document.querySelector('.films');
const loader = document.querySelector('.loader-wrapper');
const btnShowMore = document.querySelector('.show-more');
btnShowMore.onclick = fetchAndRenderFilms;

let page = 1;

// Получение и вывод TOP 250 фильмов
async function fetchAndRenderFilms() {
	// Show preloader
	loader.classList.remove('none');

	console.log(page);

	// Fetch films data
	const data = await fetchData(url + `top?page=${page}`, options);
	if (data.pagesCount > 1) page++;
	console.log(page);

	// Show the button if there are more then one pages
	if (data.pagesCount > 1) {
		// Show the button
		btnShowMore.classList.remove('none')
	}

	// Hide preloader
	loader.classList.add('none')

	// Render films on page
	renderFilms(data.films);

	// Hide the button if showing the finel page
	if (page > data.pagesCount) {
		// Show the button
		btnShowMore.classList.add('none')
	}
}

async function fetchData(url, options) {
	const response = await fetch(url, options);
	const data = await response.json();

	return data;
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