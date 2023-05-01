// найдем элементы на странице:
const btnNode = document.querySelector('.btn');
const contentNode = document.querySelector('#content');

function useRequest(page, limit) {
    return fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
        .then(response => response.json())
        .catch(() => {
            console.log('error');
            contentNode.innerHTML = '<p>Что-то пошло не так</p>';
        })
}

function displayContent(apiData){
    let cards = '';

    apiData.forEach(item => {
        const cardBlock = `
        <div class="card">
        <img class="card_image" src="${item.download_url}" alt="image">
        <p>${item.author}</p>
        </div>`;
        cards = cards + cardBlock;
    });

    contentNode.innerHTML = cards;
}

// проверим правильность ввода:
function displayNoContent(page, limit){
    if ((page < sizeMin || page > sizeMax) && (limit < sizeMin || limit > sizeMax)){
        contentNode.innerHTML = `<h2>Номер страницы и лимит вне диапазона от ${sizeMin} до ${sizeMax}</h2>`;
    } else if ((page < sizeMin || page > sizeMax)){
        contentNode.innerHTML = `<h2>Номер страницы вне диапазона от ${sizeMin} до ${sizeMax}</h2>`;
    } else {
        contentNode.innerHTML = `<h2>Лимит вне диапазона от ${sizeMin} до ${sizeMax}</h2>`;
    }
}

// зададим диапазон:
const sizeMin = 1, sizeMax = 10;

if (localStorage.lastJson){
    const json = JSON.parse(localStorage.getItem('lastJson'));
    displayContent(json);
}

btnNode.addEventListener('click', async () => {
    // получим данные из полей ввода:
    const inputPage = document.querySelector('#page').value;
    const inputLimit = document.querySelector('#limit').value;
    localStorage.setItem('page', inputPage);
    localStorage.setItem('limit', inputLimit);
    // проверим правильность ввода:
    if ((inputPage >= sizeMin && inputPage <= sizeMax) && (inputLimit >= sizeMin && inputLimit <= sizeMax)){
        const json = await useRequest(inputPage, inputLimit);
        localStorage.setItem('lastJson', JSON.stringify(json));
        console.log(localStorage.getItem('lastJson'))
        displayContent(json)
    } else {
        displayNoContent(inputPage, inputLimit)
    }
});

const requestURL = "https://picsum.photos/v2/list";
// создадим экземпляр класса:
const xhr = new XMLHttpRequest()
xhr.open('GET', requestURL)
xhr.responseType = 'json';
// добавим обработчик ответа сервера типа json:
xhr.onload = () => {
    console.log(xhr.response)
}
// отправим запрос:
xhr.send()