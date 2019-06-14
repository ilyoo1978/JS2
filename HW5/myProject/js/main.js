const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        removeLinkJson: `/deleteFromBasket.json`,
        addLinkjson: `/addToBasket.json`,
        catalogUrl: '/catalogData.json',
        products: [],
        imgUrl: 'https://placehold.it/200x150',
        filterdProducts: [],
        cartUrl: `/getBasket.json`,
        cartData: {},
        cartList: [],
        cartImgUrl: `https://placehold.it/60x50`,
    },
    methods: {
        _getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error))
        },
        search() {
            let searchLine = new RegExp(`${event.target.value}`, 'i');
            this.filterdProducts = [];
            for (let item of this.products) {
                if (searchLine.test(item.product_name)) {
                    this.filterdProducts.push(item);
                }
            }
        },
        showHideCart() {
            document.querySelector('#cart').classList.toggle('hidden');
            if(event.target.innerText === 'Корзина'){
            	event.target.innerText = 'Свернуть корзину';
            }else{event.target.innerText = 'Корзина'};
        },
        addToCart(product) {
            this._getJson(`${API+this.addLinkjson}`)
                .then((response) => {
                    if (response.result === 1) {
                        let inCart = false;
                        for (let item of this.cartList) {
                            if (item.id_product === product.id_product) {
                                item.quantity++;
                                inCart = true;
                            }
                        }
                        if (!inCart) {
                            product.quantity = 1;
                            this.cartList.push(product);
                        }
                        this.cartList = this.cartList.slice();
                    }
                })
        },
        removeFromCart(product) {
            this._getJson(`${API+this.addLinkjson}`)
                .then(response => {
                    if (response.result === 1) {
                        for (let item of this.cartList) {
                            if (item.id_product === product.id_product) {
                                item.quantity--;
                            }
                        }
                        if (!product.quantity) {
                            this.cartList.splice(this.cartList.indexOf(product), 1);
                        }
                        this.cartList = this.cartList.slice();
                    }
                })

        }
    },
    mounted() {
        this._getJson(`${API+this.catalogUrl}`)
            .then(data => {
                for (let item of data) {
                    this.products.push(item);
                }
                return
            })
            .then(() => {
                this._getJson('getProducts.json')
                    .then(data => {
                        for (let item of data) {
                            this.products.push(item);
                        }
                        return
                    })
                    .then(() => {
                        this.filterdProducts = this.products;
                        this.products.forEach((item) => {});
                        this.filterdProducts = this.products.slice();
                    })
            });

        this._getJson(`${API + this.cartUrl}`)
            .then(data => {
                this.cartData = JSON.parse(JSON.stringify(data));
                this.cartList = this.cartData.contents.slice();
            })

    }
});