'use strict';

const ProductService = require('../service');
const GenericErrorHandler = require('../../utils/errors');

const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'info';

class ProductController {

  async getItem(req, res) {

    try {
      logger.info(
				`req.id=${req.correlationId()}, class=ProductController, M=getItems`
      );
      
      const resp = await ProductService.getItem(req.params.id);
      
			res.json({msg: 'OK'});
		} catch (error) {
			GenericErrorHandler.handle(error, req.correlationId(), res);
		}
  }

  async listItems(req, res) {
    try {
			logger.info(
				`req.id=${req.correlationId()}, class=ProductController, M=getItems`
			);

      const resp = await ProductService.listItems(req.query.q);
      
			res.json(resp);
		} catch (error) {
			GenericErrorHandler.handle(error, req.correlationId(), res);
		}
  }
}

module.exports = new ProductController();