console.log("Welcome to our restaurant!");
const rmenu={
    "Food": "Biryani, Pulao, Alu Paratha with Chaii, Haleem, Macrooni and Daal",
    "Dessert": "Custard, Ice cream, coffee, chocolate",
    "fruits": "Apple, Orange, Banana"
}
let order= prompt("Place your order here");
switch(order){
    case "Food":
        alert(rmenu["Food"]);
        break;
    case "Dessert":
        alert (rmenu["Dessert"]);
        break;
    case "Fruits":
        alert (rmenu["Fruits"]);
}