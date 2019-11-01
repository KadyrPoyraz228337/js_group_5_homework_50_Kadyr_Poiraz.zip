class Product {
    constructor(title, calories) {
        this.title = title;
        this.calories = calories;
        this.caloriesPerGram = calories / 100;
    }
}

class Dish {
    constructor(title) {
        this.title = title;
        this.calories = 0;
        this.products = new Set([]);
    }
    addProduct(product, numberOfGrams) {
        const prdct = [product.title, numberOfGrams, product.calories];
        this.calories += numberOfGrams * product.caloriesPerGram;
        this.products.add(prdct);
    }
    getCalorieDishes() {
        return this.calories;
    }
}

class CaloriesCalculator {
    constructor() {
        this.dishes = {};
    }
    addDish(dish) {
        const dishTitle = dish.title;
        if(dish.title in this.dishes) {
            this.dishes[dishTitle][0] += 1;
        } else {
            const ingArr = dish.products;
            this.dishes[dishTitle] = [1, dish.calories, ingArr];
        }
    }
    getTotalCalories() {
        let calories = 0;
        for(let key in this.dishes) {
            calories += (this.dishes[key][0] * this.dishes[key][1]);
        }
        return calories;
    }
    getAllDishesInfo() {
        let receiptTitle;
        let receiptInfo = ``;
        for(let key in this.dishes) {
            const dish = this.dishes;
            receiptInfo += `${key} - ${dish[key][0]} порций, ${dish[key][1] * dish[key][0]}ккал: \n`;
            const ingr = dish[key][2];
            ingr.forEach(value => {
                receiptInfo += `    * ${value[0]}, ${value[1] * dish[key][0]}гр, ${value[2] * dish[key][0]}ккал \n`
            });
            receiptInfo += `\n`;
            // console.log(ingr);
        }
        return`
========================================

${receiptInfo}
========================================
        `
    }
}

const meat = new Product('Мясо', 158);
const rice = new Product('Рис', 130);
const onion = new Product('Лук', 40);
const carrot = new Product('Морковь', 41);
const soup = new Product('Соль', 2);

const plov = new Dish('Плов');

plov.addProduct(meat, 100);
plov.addProduct(rice, 150);
plov.addProduct(onion, 25);
plov.addProduct(carrot, 25);

const calculator = new CaloriesCalculator();
calculator.addDish(plov);
calculator.addDish(plov);
calculator.addDish(plov);

const totals = calculator.getAllDishesInfo();
console.log(totals);
