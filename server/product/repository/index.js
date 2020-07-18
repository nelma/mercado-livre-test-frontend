'use strict';

const axios = require('axios');
const API_URL = 'https://api.mercadolibre.com/sites/MLA';
const API_URL_CURRENCIES = 'https://api.mercadolibre.com/currencies/';
const API_URL_ITEM = 'https://api.mercadolibre.com/items';

class ProductService {
	listItems(query) {

		const url = `${API_URL}/search${query}`;
		console.log(url);

		return axios.get(`${API_URL}/search${query}`);
	}

	getItem(id) {
		const url = `${API_URL_ITEM}/${id}`;
		console.log(url);

		return axios.get(url);
		
	}

	getDescription(id) {
		const url = `${API_URL_ITEM}/${id}/description`;
		console.log(url);

		return axios.get(url);
	}

	getCurrency(id) {
		const url = `${API_URL_CURRENCIES}${id}`;
		console.log(url);

		return axios.get(url);
	}

	listCurrencies() {
		const url = `${API_URL_CURRENCIES}`;

		return axios.get(url);
	}
}

module.exports = new ProductService();
