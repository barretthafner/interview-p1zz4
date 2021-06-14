const { Topping, Size, Sauce, PizzaOrderTopping } = require('../models/');

const PizzaOrderToppingController = {}

//Creates a new entry in the pizzaOrderTopping table
PizzaOrderToppingController.createPizzaOrderTopping = async (_req, res, next) => {
  const { toppings } = _req.body;
  const pizzaOrderId = res.locals.id;

  await toppings.forEach(id => {
    PizzaOrderTopping.create({
      toppingId : id,
      pizzaOrderId
    });
  });

  return await next();
}  


//queries the 'Size', 'Sauce' and 'Topping' tables and calculates total price
PizzaOrderToppingController.getPizzaOrderToppingPrice =  async (_req, res, next) => {
  const {size, sauce, toppings} = _req.body;
 
  const sizePrice = await Size.findAll( {raw: true, where: {id : size} ,
  attributes: ['price']});

  const saucePrice = await Sauce.findAll( {raw: true, where: {id : sauce} ,
    attributes: ['price']});

  let totalPrice = Number(saucePrice[0]['price']) + Number(sizePrice[0]['price']); 

  for (const topping of toppings) {
    let result = await Topping.findAll( {raw: true, where: {id : topping} ,
    attributes: ['price']});
    totalPrice += Number(result[0]['price']);
  }

  res.locals.price = totalPrice.toString();
  return await next();
} 


//queries the pizzaOrderTopping table and gets the favorite topping id
PizzaOrderToppingController.getFavoriteToppingId = async (_req, res, next) => {
  const { pizzaOrderIds } = res.locals;
  let toppingIds = [];
  

  // get the topping id's of every entry with that pizzaOrderId. Iterate through each result and push each 'toppingId' into the 'toppingIds' Array
  for (const i of pizzaOrderIds) {
   const result = await PizzaOrderTopping.findAll( {raw: true, where: {pizzaOrderId: i} ,
      attributes: ['toppingId']});

    await result.forEach(topping => {
      toppingIds.push(topping.toppingId);
    });
  }

  // find the mode of the toppingIds Array 
  const cache = {};
  let mode = 0;
  let favoriteToppingId;

  for (let i = 0; i < toppingIds.length; i++) {
    const num = toppingIds[i];
    cache[num] = (cache[num] || 0) + 1;
    if (cache[num] > mode || (cache[num] === mode )) {
      mode = cache[num];
      favoriteToppingId = num;
    }
  }

  res.locals.favoriteToppingId = favoriteToppingId;
  return await next();
}



module.exports = {PizzaOrderToppingController};