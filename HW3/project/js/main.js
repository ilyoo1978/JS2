const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
    constructor(container = '.products') {
        this.data = [];
        this.container = container;
        this.productsAll = [];
        this._getProducts()
            .then(() => {
                this._render()
            });
    }
    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .then(data => {
                this.data = [...data];
            })
            .catch(error => console.log(error));
    }
    calcSum() {
        return this.productsAll.reduce((accum, item) => accum += item.price, 0);
    }
    _render() {
        const block = document.querySelector(this.container);
        for (let product of this.data) {
            const prod = new ProductItem(product);
            this.productsAll.push(prod);
            block.insertAdjacentHTML('beforeend', prod.render());
        };
        block.addEventListener('click', (evt) => {
            if (evt.target.tagName == 'BUTTON') {
                cart.addToCart(+evt.target.id)
            }
        });
    }
}


class ProductItem {
    constructor(product, img = `https://placehold.it/200x150`) {
        this.product_name = product.product_name;
        this.price = product.price;
        this.id_product = product.id_product;
        this.img = img
    }

    render() {
        return `<div class="product-item">
                  <img src="${this.img}" alt="${this.product_name}">
                  <div class="desc">
                      <h3>${this.product_name}</h3>
                      <p>${this.price}</p>
                      <button class="buy-btn" id="${this.id_product}">Купить</button>
                  </div>
              </div>`
    }
}

class Cart {
    constructor() {
        this.data = {};
        this.cartItems = [];
        this._getData()
            .then(() => {
                this._render()
            });
        this._addListener()
    }
    _addListener() {
        const cart = document.querySelector('.cart');
        cart.addEventListener('click', evt => {
            if (evt.target.tagName == 'BUTTON') {
                this.deleteFromCart(+evt.target.id.substring(5));
            }
        })
        document.querySelector('.btn-cart').addEventListener('click', ()=>{
            if(cart.className == 'cart hidden'){
                cart.className = 'cart';
            }else{
                cart.className = 'cart hidden';
            }
        })
    }
    _getData() {
        return fetch(`${API}/getBasket.json`)
            .then((result) => result.json())
            .then((data) => {
                this.data = JSON.parse(JSON.stringify(data));
            });
    }
    _render() {
        this.cartItems = [];
        this.data.contents.forEach((item) => {
            if(item.quantity>0){
                this.cartItems.push(new CartItem(item))
            }
        });
        const cart = document.querySelector('.cart');
        cart.innerHTML = '';
        this.cartItems.forEach((product) => {
            cart.insertAdjacentHTML('afterbegin', product._render())
        });
        // Дальше будем обращаться к кнопкам "Корзина", "Купить" и 'удалить'...
    }
    _getRequestToCartAdd(id) {

        return fetch(`${API}/deleteFromBasket.json`) //временно вставил неправильную ссылку
            .then(result => result.json())
            .then((response) => {
                if (response.result === 1) {
                    console.log(`ответ положительный, товар ${id} в корзине, оформляйте`);
                    return true;
                }
            })
            .catch(() => false);
    }
    _getRequestToCartDelete(id) {

        return fetch(`${API}/deleteFromBasket.json`)
            .then(result => result.json())
            .then((response) => {
                if (response.result === 1) {
                    console.log(`ответ положительный, единица товара ${id} удалена из корзины, оформляйте`);
                    return true;
                }
            })
            .catch(() => false);
    }
    addToCart(id) {
        this._getRequestToCartAdd(id)
            .then((response) => { //этот код наверное надо в отдельный метод фигачить...
                console.log(response);
                for (let item of this.data.contents) {
                    if (item.id_product == id) {
                        item.quantity += 1;
                        return
                    }
                }
            })
            .then(() => {
                this._render();
            });

    }
    deleteFromCart(id) {
        this._getRequestToCartDelete(id)
            .then((response) => {
                console.log(response);
                for (let item of this.data.contents) {
                    if (item.id_product == id) {
                        item.quantity -= 1;
                        return
                    }
                }
            })
            .then(() => {
                this._render()
            });
    }


} //ушел спать, много чего надо изменить, а ещё больше доделать...

class CartItem {
    constructor(item) {
        this.product_name = item.product_name;
        this.price = item.price;
        this.id = item.id_product;
        this.quantity = item.quantity;

        // тут ещё продолжим, пока пилим разметку
    }
    _render() { //разметку тоже допилим
        return `<div class="cart-item">
            <img src="https://placehold.it/60x50" alt="${this.product_name}">
                  <div class="cart-item-description">
                      <span>${this.product_name}</span>
                      <span>${this.quantity} шт.</span>
                      <p>${this.price}</p>
                  </div>
                  <button class="delete-from-cart-btn" id="cart_${this.id}">удалить</button>
        </div>`;
    }
}

const products = new ProductsList();
const cart = new Cart();