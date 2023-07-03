exports.favoriteTopping = `
  select t.* 
  from (
    select 
      count(pot.toppingId) as totalOrdersWithTopping, 
      pot.toppingId
    from pizzaorder as po
    left join pizzaordertopping as pot on po.id = pot.pizzaOrderId
    where po.email = :email
    group by pot.toppingId
  ) as summary
  left join Topping as t on t.id = summary.toppingId
  order by totalOrdersWithTopping desc
`;
