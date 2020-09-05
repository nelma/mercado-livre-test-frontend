'use strict';

import axios from 'axios';

const API_URL = 'https://api.mercadolibre.com/sites/MLA';
const API_URL_CURRENCIES = 'https://api.mercadolibre.com/currencies/';

export default async (req, res) => {

  const {q} = req.query;
  try {
    if(q) {

      const urlCurrencies = `${API_URL_CURRENCIES}`;
      const currencies = await axios.get(urlCurrencies);
      
      let mapCurrencies = new Map();
      currencies.data.forEach(curr => {
        mapCurrencies.set(curr.id, curr);
      });
  
      const url = `${API_URL}/search?q=${q}`;
      const listItems = await axios.get(url);
  
      let items = [];
  
      if (listItems.data) {
        const { results } = listItems.data
  
        items = results.map((item) => {
          return {
            id: item.id,
            title: item.title,
            price: {
              currency: item.currency_id,
              amount: item.installments.amount,
              decimals: mapCurrencies.get(item.currency_id).decimal_places
            },
            picture: item.thumbnail,
            condition: item.condition,
            free_shipping: item.shipping.free_shipping,
          };
        });
      }
  
      res.json(items);
  
    } else {
      res.status(200).send({msg: 'Parâmetro obrigatório'})
    }
  } catch (error) {

    console.log(error);
    res.status(500).send({msg: 'Ocorreu um erro.'})
  }
  

}