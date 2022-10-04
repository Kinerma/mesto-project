
const config = {
    baseUrl: "https://nomoreparties.co/v1/plus-cohort-15",
    headers: {
        "Content-type": 'application/json',
        authorization: '6472c60b-4eb1-46f9-9617-7836b32c3838'
    },
}

//Проверка ответа на ошибку
export const getAnswer = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка. Запрос не выполнен: ${res.status}`);
}

// Отображение карточки сервером
export function displayCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
    })
    .then(getAnswer);
}

export function giveInformation() {
    return Promise.all([displayCards(), editProfileUser()])
}

//Добавление карточек
export function createNewCards(data) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(data)
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
export function puteLikeCards(cardId,likeCards) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: likeCards ? 'DELETE' : 'PUT',
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