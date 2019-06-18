const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {},
    methods: {
        getJson(url) {
            if ((Math.floor(Math.random() * 3 + 1)) === 1) { //генерируем ошибку с вероятностью 1/3
                url += 'error';
            }
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                    return error;
                })
        }
    }
});