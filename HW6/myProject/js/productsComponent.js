Vue.component('products', {
    data() {
        return {
            catalogUrl: `/catalogData.json`,
            filtered: [],
            products: [],
            imgCatalog: `https://placehold.it/200x150`,
            isError: false
        }
    },
    methods: {
        filter(userSearch) {
            console.log('hi!');
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            })
            .then(() => {
                this.$parent.getJson(`getProducts.json`)
                    .then(data => {
                        for (let el of data) {
                            this.products.push(el);
                            this.filtered.push(el);
                        }
                    })
                    .catch(error => {
                        this.isError = true;
                    });
            })
            .catch(error => {
                this.isError = true;
            });

    },
    template: `<div class="products">
               <error-msg v-if="isError" 
               :class="{errorcatalog: isError}"></error-msg>
               <product-item v-for="product of filtered" 
	           :key="product.id_product"
	           :product="product"
	           :img="imgCatalog"
	           ></product-item>
               </div>`
});
Vue.component('product-item', {
    props: ['product', 'img'],
    template: `<div class="product-item">
                   <img :src="img" :alt="product.product_name">
                   <div class="desc">
                       <h3>{{ product.product_name }}</h3>
                       <p>{{ product.price }}</p>
                       <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
                   </div>
               </div>`
});
Vue.component('error-msg', {
    template: `<div class="error-msg">
    		   <p>Something went wrong, try to refresh the page.</p>
    		   </div>`

})