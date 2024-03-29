
export const config = {
    baseUrl: "https://nomoreparties.co/v1/plus-cohort-15",
    headers: {
        "Content-type": 'application/json',
        authorization: '6472c60b-4eb1-46f9-9617-7836b32c3838'
    },
}

//Проверка ответа на ошибку
export function getAnswer(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
}

// Отображение карточки сервером
export function displayCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
    })
    .then(getAnswer);
}

//Добавление карточек
export function createNewCards(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
        .then(getAnswer)
}

//Удаление карточки
export function deletedCards(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(getAnswer)
}

//Лайк карточки
export function puteLikeCards(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
        .then(getAnswer)
}

//Удаление лайка
export function deleteLikeCards(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(getAnswer)
}

//Редактирование профиля
export function editProfileUser(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
        .then(getAnswer)
}

//Загрузка данных о пользователе
export function loadingProfileUser() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(getAnswer)
}

//Обновление аватара
export function updateAvatar(avatar) {
    return fetch(`${config.baseUrl}/users/me/avatar`,{
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatar
        })
    })
        .then(getAnswer)
}