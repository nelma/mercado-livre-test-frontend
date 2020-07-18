'use strict';

const ProductServiceRepository = require('../repository');
const { listCurrencies }=require('../repository');

class ProductService {

	async getItem(id) {
		try {

			const {data} = await ProductServiceRepository.getItem(id);
			
			let item = {}
			
			
			if(data) {
				const currency = await ProductServiceRepository.getCurrency(data.currency_id);
				const description = await ProductServiceRepository.getDescription(id);

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

			return {}
			
		} catch (error) {
			throw error;
		}
	}


	async listItems(query) {
		try {
			let params = `?q=${query}`;
			let items = [];

			const currencies = await listCurrencies();

			const listItems = await ProductServiceRepository.listItems(params);

			let mapCurrencies = new Map();
			currencies.data.forEach(curr => {
				mapCurrencies.set(curr.id, curr);
			});


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

			return items;
		} catch (error) {
			throw error;
		}
	}

	async listCurrencies() {
		const respCurrencies = await ProductServiceRepository.listCurrencies();
		
		try {
			return respCurrencies.data;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = new ProductService();
