"use client"
import { useEffect, useMemo, useRef, useState } from "react"
import { GoogleMap, useLoadScript, Marker, useJsApiLoader, Autocomplete, DirectionsRenderer } from "@react-google-maps/api"
import { FaLocationArrow, FaTimes } from 'react-icons/fa'
import { Button } from "../ui/button"
import PageLoading from "../PageLoading"

const center = { lat :  23.7270478, lng : 90.4031032 }
const center2 = { lat :  23.8270468, lng : 90.4032032 }
const center3 = { lat :  23.7270468, lng : 90.3032032 }


export default function MapComponent({ setPlace }) { 
    const { isLoaded } = useLoadScript({
        googleMapsApiKey : 'AIzaSyDTvGsD7GScm_viq2ug7ndggHPLpqGajS0',
        libraries: ['places'],
      })
      
    const [map, setMap] = useState(null)
    const [location, setLocation] = useState("")
    const [marker, setMarker] = useState(center)
    const [markers, setMarkers] = useState([center, center2, center3]);
    const originRef = useRef()
    if (!isLoaded) {
        return <div><PageLoading /></div>
      }
    const handleSelectClick = async () => {
        try {
            const geocoder = new window.google.maps.Geocoder();
            const result = await new Promise((resolve, reject) => {
            geocoder.geocode({ address: location }, (results, status) => {
                if (status === 'OK' && results.length > 0) {
                    resolve(results[0].geometry.location);
                  } else {
                        reject(new Error('Location not found'));
                    }
                })
            })
            center.lat = result.lat()
            center.lng = result.lng();
            setMarker({ lat: result.lat(), lng: result.lng() })
            map.panTo({ lat: result.lat(), lng: result.lng() });
            map.setZoom(15);
            
        } catch (error) {
            console.error('Error geocoding location:', error);
        }
    };

    const handleMarkerDragEnd = (event) => {
      const newMarkerPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setMarker(newMarkerPosition);
      setMarkers(prev => [...prev, newMarkerPosition])
    };
    function handleDone() {
      setPlace(marker)
    }

  return (
    <div className="w-full h-screen bg-white">
        <div className="my-8 flex items-center justify-center w-full px-16 mx-16 space-x-6 text-lg">
            <Autocomplete>
                <input type="text" name="name" placeholder="Enter Your Location" className="w-full bg-white  rounded-md border border-gray-400 py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp" value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    ref={originRef}
                />
            </Autocomplete>
            <div className="flex space-x-4">
                <Button onClick={handleSelectClick} className="bg-[#2c7749] text-lg">Select </Button>
                <Button onClick={handleDone} className="bg-[#156c86] text-lg">Done </Button>
            </div>
        </div>


       <div className="flex items-center justify-center rounded-lg">
        <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: '60%', height: '800px', alignItems: 'center', justifyContent: 'center' }}
            options={{
              mapTypeControl: true,
              fullscreenControl: true,
              zoomControl : true,
            }}
            onLoad={map => setMap(map)}
          >
              {/* <Marker position={center} draggable={true} onDragEnd={(event) => handleMarkerDragEnd(event)} /> */}
              
              {
                markers.map((m, index) => <Marker position={m} key={index} draggable={true} onDragEnd={(event) => handleMarkerDragEnd(event)} />)
              }
    
          </GoogleMap>
       </div>
    </div>
  )
}
