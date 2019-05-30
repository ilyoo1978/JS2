const products = [{
    id: 1,
    title: 'Notebook',
    price: 2000
}, {
    id: 2,
    title: 'Mouse',
    price: 30
}, {
    id: 3,
    title: 'Keyboard',
    price: 55
}, {
    id: 4,
    title: 'Gamepad',
    price: 65
}, {
    id: 5,
    title: 'Chair',
    price: 165
} ];

const renderProduct = (title = 'нет данных', price = 'нет данных') => //добавил значения по умолчанию, убрал return и фигурные скобки
            `<div class="product-item">                               
                <h3>${title}</h3>
                <p>${price}</p>
                <button class="buy-btn">Купить</button>
            </div>`;

const renderPage = list => {
    const productsList = list.map(item => renderProduct(item.title, item.price)).join(''); //добавлен метод join, чтобы привести массив к строке, теперь в разметке нет запятых.
    document.querySelector('.products').innerHTML = productsList;
};

renderPage(products);