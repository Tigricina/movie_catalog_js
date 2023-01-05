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

	// Fetch films data
	const data = await fetchData(url + `top?page=${page}`, options);
	if (data.pagesCount > 1) page++;

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

		const card = document.createElement('div');
		card.classList.add('card');
		card.id = film.filmId;

		card.onclick = openFilmDetails;
		
		const html = `
					
					<img src=${film.posterUrlPreview} alt="Cover" class="card__img" />
					<h3 class="card__title">${film.nameRu}</h3>
					<p class="card__year">${film.year}</p>
					<p class="card__rate">Рейтинг: ${film.rating}</p
					>`;
		
		card.insertAdjacentHTML('afterbegin', html);
		//filmsWrapper.insertAdjacentHTML('beforeend', html);
		filmsWrapper.insertAdjacentElement('beforeend', card);
	}
}

async function openFilmDetails(e) {
	// Get film's Id
	const id = e.currentTarget.id;

	//Get film's data
	const data = await fetchData(url + id, options);
	console.log(data);

	// Show film's details on the page
	renderFilmData(data);
}

function renderFilmData(film) {
	console.log('render');
	// 0. Проверка на открытую карточку фильма и её удаление
	if (document.querySelector('.container-right')) document.querySelector('.container-right').remove();
	
	// 1. Render container-right
	const containerRight = document.createElement('div');
	containerRight.classList.add('container-right');
	document.body.insertAdjacentElement('beforeend', containerRight);

	// 2. Close button
	const btnClose = document.createElement('button');
	btnClose.classList.add('btn-close');
	btnClose.innerHTML = '<img src="./img/cross.svg" alt="Close" width="24" />';
	containerRight.insertAdjacentElement('afterbegin', btnClose);

	// 2.1 Кнопка закрытия по клику - удаление контейнера со страницы
	btnClose.onclick = () => {containerRight.remove()}

	// 3. Film's details
	const html = `<div class="film">
		<div class="film__title">${film.nameRu}</div>
		<div class="film__img">
			<img src=${film.coverUrl} alt=${film.nameRu} />
		</div>
		<div class="film__desc">
			<p class="film__details">${film.year}</p>
			<p class="film__details">Рейтинг Кинопоиска: ${film.ratingKinopoisk}</p>
			<p class="film__details">Продолжительность: ${film.filmLength}</p>
			<p class="film__details">Страна: ${film.countries[0]['country']}</p>
			<p class="film_text">${film.description}</p>
		</div>
		
	</div>`;

	containerRight.insertAdjacentHTML('beforeend', html);




}

fetchAndRenderFilms().catch((err) => console.log(err));