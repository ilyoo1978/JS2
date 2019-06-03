class Burger {
    constructor() {
        this.big = document.getElementById('big').checked; //true = Big, false = small
        this.cheese = document.getElementById('cheese').checked;
        this.potato = document.getElementById('potato').checked;
        this.salad = document.getElementById('salad').checked;
        this.mayo = document.getElementById('mayo').checked;
        this.spices = document.getElementById('spice').checked;
        this.calories = this._calculateCalories();
        this.price = this._calculatePrice();
        this.calc();
    }
    _calculateCalories() {
        this.big ? this.calories = 40 : this.calories = 20;
        this.cheese ? this.calories += 20 : this.calories;
        this.salad ? this.calories += 5 : this.calories;
        this.potato ? this.calories += 10 : this.calories;
        this.mayo ? this.calories += 5 : this.calories;
        return this.calories;
    }
    _calculatePrice() {
        this.big ? this.price = 100 : this.price = 50;
        this.cheese ? this.price += 10 : this.price;
        this.salad ? this.price += 20 : this.price;
        this.potato ? this.price += 15 : this.price;
        this.spices ? this.price += 15 : this.price;
        this.mayo ? this.price += 20 : this.price;
        return this.price;
    }
    calc() {
        this.big = document.getElementById('big').checked; //true = Big, false = small
        this.cheese = document.getElementById('cheese').checked;
        this.potato = document.getElementById('potato').checked;
        this.salad = document.getElementById('salad').checked;
        this.mayo = document.getElementById('mayo').checked;
        this.spices = document.getElementById('spice').checked;
        this.calories = this._calculateCalories();
        this.price = this._calculatePrice();
        document.getElementById('price').innerText = `Price = ${this.price}`;
        document.getElementById('calories').innerText = `Calories = ${this.calories}`

    }
}
window.onload = () => {
    const burger = new Burger;
    document.getElementById('myForm').addEventListener('click', () => {
        burger.calc()
    });
    
}