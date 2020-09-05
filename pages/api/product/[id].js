'use strict';

import axios from 'axios';

const API_URL_ITEM = 'https://api.mercadolibre.com/items';
const API_URL_CURRENCIES = 'https://api.mercadolibre.com/currencies';

export default async (req, res) => {

  try {
    const url = `${API_URL_ITEM}/${req.query.id}`;
    const { data } = await axios.get(url);
    let item = {}

    if(data) {

      const urlCurrency = `${API_URL_CURRENCIES}/${data.currency_id}`;
      const currency = await axios.get(urlCurrency);

      const urlDescription = `${API_URL_ITEM}/${req.query.id}/description`;
      const description = await axios.get(urlDescription);

      item = {
        id: data.id,
        title: data.title,
        price: {
          currency: data.currency_id,
          amount: data.price,
          decimals: currency.data.decimal_places 
        },
        picture: data.thumbnail,
        condition: data.condition,
        free_shipping: data.shipping.free_shipping,
        sold_quantity: data.sold_quantity,
        description: description.data.plain_text
      }
    }

    res.json(item);

  } catch (error) {
    console.log(error);

    res.status(500).send({msg: 'Ocorreu um erro ao buscar produtod por id'});
  }
}