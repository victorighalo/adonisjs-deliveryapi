'use strict'

const Helpers = use('Helpers');
const locations = require(Helpers.publicPath('locations.json'));

class LocatitionController {

   index({ request, response }) {
     response.status(200).json({
       data:locations.data,
       message: 'Success'
     });
  }

}

module.exports = LocatitionController
