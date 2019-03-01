'use strict'

const Helpers = use('Helpers');
const locations = require(Helpers.publicPath('locations.json'));
const { validate } = use('Validator');
const valRules = {
  from: 'required|number',
  to: 'required|number',
  weight: 'required|number'
}

class CostController {
  async calculate({ request, response }){
    const validation = await validate(request.all(), valRules)
    if (validation.fails()) {
   return response.status(400).json(validation.messages())
 }else{
   let cost = await this.calculateCost(request.body.from, request.body.to, request.body.weight)
  response.status(200).json({"price": cost, "message": "Success"})
 }
  }

  async calculateCost(from, to, weight){
    //Declare base variables
    let distanceCost = 0;
    let distance;
    let from_zone = null;
    let to_zone = null;
    let sameAreaCost = 0;
    let perKgPrice = 200;
    let perKmPrice = 50;
    let finalCost = 0;
    let x1,x2,y1,y2;

    //Emulate Google locations API latitudes and longitudes
    const zoneCosts = [
      {"zone": 1, "price": 1000, "coord_x" : 9, "coord_y" : 80},
      {"zone": 2, "price": 2000, "coord_x" : 79, "coord_y" : 60},
      {"zone": 3, "price": 3000, "coord_x" : 98, "coord_y" : 8}
    ];

    //Set Request Zones
    locations.data.map( location => {
      location.id == from ? from_zone = location.zone : false;
      location.id == to ? to_zone = location.zone : false;
    })

    //Set X and Y Axis
    zoneCosts.map( zoneCost => {
      if(to_zone == zoneCost.zone){
        x1 = zoneCost.coord_x;
        y1 = zoneCost.coord_y;
      }
      if(from_zone == zoneCost.zone){
        x2 = zoneCost.coord_x;
        y2 = zoneCost.coord_y;
      }

    })

    //Calculate distance
    if(from_zone == to_zone){
      //Check if request is same zone
      //Then return the fixed price
      distanceCost = sameAreaCost;
    }else{
      //Else calculate based on zones latitude and longitude by kilometers
      distance = (this.calculateDistance(this.calculateDistanceX(x1, x2) + this.calculateDistanceY(y1, y2) ) );
      distanceCost =  (distance * perKmPrice);
    }
    finalCost = distanceCost + (weight * perKgPrice);
    return finalCost;
  }

  calculateDistanceX(x1, x2){
    return Math.pow(2, (x2 - x1))
  }

  calculateDistanceY(y1, y2){
    let coordY = (y2 - y1)^2;
    return coordY;
  }

  calculateDistance(distance){
    return (distance)^0.5;
  }

}

module.exports = CostController
