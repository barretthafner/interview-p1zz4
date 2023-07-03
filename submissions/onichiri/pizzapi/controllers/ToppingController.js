const { Topping } = require('../models');

const ToppingController = {};

//query the toppings table and return the name of the topping given the id 
ToppingController.getTopping = async (_req, res, next) => {

  const { favoriteToppingId } = res.locals;

  const favoriteTopping = await Topping.findAll({raw: true, where: {id: favoriteToppingId} ,
    attributes: ['name']});
  
  res.locals.favoriteTopping = favoriteTopping[0].name;
  return await next();
}

module.exports = { ToppingController };