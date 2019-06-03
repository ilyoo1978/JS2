class ProductsList {
    constructor(container = '.products'){
        this.data = [];
        this.container = container;
        this.productsAll = [];
        this.init();
    }
    init(){
        this._fetchProducts();
        this._render();
    }
    _fetchProducts(){
        this.data = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 30},
            {id: 3, title: 'Keyboard', price: 55},
            {id: 4, title: 'Gamepad', price: 65},
            {id: 5, title: 'Chair', price: 120, template: 1},
        ];
    }
    _render(){
        const block = document.querySelector(this.container);
        for (let product of this.data){
            const prod = new ProductItem(product);
            this.productsAll.push(prod);
            block.insertAdjacentHTML('beforeend', prod.render());
        }
    }
    calcTotal(){ // подсчет общей стоимости товаров.
        let total=0;
        for(let prod of this.productsAll){
            prod.price? total += prod.price: total=total;
        }
        console.log(`total price: ${total}`);
    }
}


class ProductItem {
    constructor(product, img = `https://placehold.it/200x150`) {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img
    }

    render(){
        return `<div class="product-item">
                  <img src="${this.img}" alt="${this.title}">
                  <div class="desc">
                      <h3>${this.title}</h3>
                      <p>${this.price}</p>
                      <button class="buy-btn">Купить</button>
                  </div>
              </div>`
    }
    addToCart(){}// добавить в корзину
}

class Cart {
    constructor(){
        this.cartList = []; //массив товаров добавленных в корзину
        this._calcTotal(); // цена ИТОГО...
    }
    _calcTotal(){}//подсчет общей стоимости
    render(){} // рендер HTML разметки корзины
    backToShop(){} //закрыть корзину и продолжить покупки
    makeOrder(){}// оформить заказ
}

class CartItem extends ProductItem{ //класс элемента корзины наследуется от ProductItem
    constructor(product){
        super(product.name, product.price, product.id);
        this.quantity = 1; //количество экземпляров
    }
    changeQuantity(){} // изменить кол-во
    deleteFromCart(){} // удалить из корзины
    render(){} // рендер DOM элемента
}

const products = new ProductsList();
products.calcTotal();


