'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
    'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

function getindfromid(idcar)  // get car index from carId
{
  for(var i = 0;i<cars.length;i++)
  {
    if(cars[i].id == idcar)
       return i;
  }
  return -1;
}

function getindfromrentalid(rentalid)
{
  for(var i = 0;i<rentals.length;i++)
  {
    if(rentals[i].id == rentalid)
       return i;
  }
  return -1;
}

function getprice(discount) // EXO 1 : discount == false,   EXO 2 : discount == true
{
  var jours = 0;     // nbr de jours de location ( eg. Paul Bismuth a loué une voiture pour la journée)
  var timeprice = 0; // prix à la journée
  var dist = 0;      // distance parcourue lors de la location
  var distprice = 0; // prix au km
  var option = 0;    // deductible option

  for(var i = 0;i< rentals.length;i++) // foreach rental get the price
  {
    jours = Math.abs(( new Date(rentals[i].returnDate) - new Date(rentals[i].pickupDate))/(24*60*60*1000)) +1;
    timeprice = cars[getindfromid(rentals[i].carId)].pricePerDay;
    dist = rentals[i].distance;
    distprice = cars[getindfromid(rentals[i].carId)].pricePerKm;
    if(rentals[i].options.deductibleReduction) option = 4 * jours;
    else option = 0;

    if(discount)  // Exercice 2
    {
      if(jours >10)
      {
          timeprice = 0.5 *timeprice;
      }
      else
      {
        if(jours > 4)
        {
          timeprice = 0.7 * timeprice ;
        }
        else
        {
          if(jours >1)
          {
            timeprice = 0.9 * timeprice;
          }
        }
      }
    }

    rentals[i].price = jours * timeprice + dist * distprice + option;
  }
}

function getCom() // Exercice 3          commission:30%
{
  var total = 0;
  for(var i = 0;i< rentals.length;i++) // foreach rental get the price
  {
    total = rentals[i].price;
    if(rentals[i].options.deductibleReduction)
      total = total-4;
    rentals[i].commission.insurance = 0.15 * total;
    rentals[i].commission.assistance = Math.abs(( new Date(rentals[i].returnDate) - new Date(rentals[i].pickupDate))/(24*60*60*1000)) +1;
    rentals[i].commission.drivy = rentals[i].commission.insurance - rentals[i].commission.assistance;
  }
}

function payActors()
{
  var option = 0;
  for(var i = 0;i<actors.length;i++)
  {
    if(rentals[getindfromrentalid(actors[i].rentalId)].options.deductibleReduction)
      option = 4 * (Math.abs(( new Date(rentals[i].returnDate) - new Date(rentals[i].pickupDate))/(24*60*60*1000)) +1);
    else
      option = 0;

    // driver
    actors[i].payment[0].amount = rentals[getindfromrentalid(actors[i].rentalId)].price;
    // owner
    actors[i].payment[1].amount = 0.7 * (rentals[getindfromrentalid(actors[i].rentalId)].price - option);
    // insurance
    actors[i].payment[2].amount = rentals[getindfromrentalid(actors[i].rentalId)].commission.insurance;
    // assistance
    actors[i].payment[3].amount = rentals[getindfromrentalid(actors[i].rentalId)].commission.assistance;
    // drivy
    actors[i].payment[4].amount =  rentals[getindfromrentalid(actors[i].rentalId)].commission.drivy + option;
  }
}

getprice(true); // exo1:false exo2:true
getCom();
payActors();


console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);
