fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/top?page=2', {
    method: 'GET',
    headers: {
        'X-API-KEY': '7dd9f2bc-fccf-4cc0-9713-b7c209c9efdd',
        'Content-Type': 'application/json',
    },
})
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.log(err))