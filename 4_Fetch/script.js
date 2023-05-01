// найдем элементы на странице:
const btn = document.querySelector('.btn');
const contentNode = document.querySelector('#content');

function useRequest(Input1, Input2) {
    return fetch(`https://picsum.photos/${Input1}/${Input2}`)
        .then(response => response.blob())
        .then(blob => URL.createObjectURL(blob))
        .catch(() => {
            console.log('error')
            contentNode.innerHTML = '<p>  Что-то пошло не так(</p>'
        })
}

btn.addEventListener('click', async () => {
    // получим данные из полей ввода:
    const inputWidth = document.querySelector('#input_1').value;
    const inputHeight = document.querySelector('#input_2').value;
    let sizeMin = 100, sizeMax = 300;
    // проверим правильность ввода:
    if ((inputWidth >= sizeMin && inputWidth <= sizeMax) && (inputHeight >= sizeMin && inputHeight <= sizeMax)){
        const url = await useRequest(inputWidth, inputHeight)
        contentNode.innerHTML = `
        <img src='${url}' alt='image'>`
    } else {
        contentNode.innerHTML = `
        <p>Одно из чисел вне диапазона от ${sizeMin} до ${sizeMax}</p>`
    }
});