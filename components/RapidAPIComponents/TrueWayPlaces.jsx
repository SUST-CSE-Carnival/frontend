import { Axios } from 'axios'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { stringify } from 'postcss'

export default function TrueWayPlaces() {
    const url = 'https://trueway-places.p.rapidapi.com'
    const [dataByLocation, setData] = useState(null)

    useEffect(() => {
        fetch(`${url}/FindPlacesNearby?location=23.723221,90.40&type=cafe&radius=180&language=en`, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'd1be66f88emsh0f94820bd9e70f1p12ab1bjsnc657e4841b5e',
                    'X-RapidAPI-Host': 'trueway-places.p.rapidapi.com'
                },

            }).then(response => response.json())
            .then(data => setData(data))
        }, [])   
  return (
    <div>
      {JSON.stringify(dataByLocation)}
    </div>
  )
}

// Types : 

// airport
// amusement_park
// aquarium
// art_gallery
// atm
// bakery
// bank
// bar
// beauty_salon
// bicycle_store
// book_store
// bowling
// bus_station
// cafe
// campground
// car_dealer
// car_rental
// car_repair
// car_wash
// casino
// cemetery
// church
// cinema
// city_hall
// clothing_store
// convenience_store
// courthouse
// dentist
// department_store
// doctor
// electrician
// electronics_store
// embassy
// fire_station
// flowers_store
// funeral_service
// furniture_store
// gas_station
// government_office
// grocery_store
// gym
// hairdressing_salon
// hardware_store
// home_goods_store
// hospital
// insurance_agency
// jewelry_store
// laundry
// lawyer
// library
// liquor_store
// locksmith
// lodging
// mosque
// museum
// night_club
// park
// parking
// pet_store
// pharmacy
// plumber
// police_station
// post_office
// primary_school
// rail_station
// real_estate_agency
// restaurant
// rv_park
// school
// secondary_school
// shoe_store
// shopping_center
// spa
// stadium
// storage
// store
// subway_station
// supermarket
// synagogue
// taxi_stand
// temple
// tourist_attraction
// train_station
// transit_station
// travel_agency
// university
// veterinarian
// zoo