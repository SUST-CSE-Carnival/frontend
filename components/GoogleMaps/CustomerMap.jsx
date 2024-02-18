"use client"
import { useEffect, useRef, useState } from "react"
import { GoogleMap, useLoadScript, DirectionsRenderer } from "@react-google-maps/api"

export default function CustomerMap({ center, userLocation }) { 

    const { isLoaded } = useLoadScript({
        googleMapsApiKey : process.env.NEXT_PUBLIC_MAP_API_KEY,
        libraries: ['places'],
        })
    const [map, setMap] = useState(null)
    const [directions, setDirections] = useState(null);
    const originRef = useRef()

    useEffect(() => {
        calculateDirections()
       }, [isLoaded]) 

    async function calculateDirections() {
        const directionsService = new google.maps.DirectionsService()
        await directionsService.route(
            {
                destination: new google.maps.LatLng(parseFloat(userLocation.latitude), parseFloat(userLocation.longitude)),
                origin: new google.maps.LatLng(parseFloat(center.lat), parseFloat(center.lng)),
                travelMode: 'WALKING',
                },
                (result, status) => {
                if (status === 'OK') {
                    setDirections(result);
                } else {
                    console.error('Directions request failed:', status);
                    }
                }
            );
        };
    if (!isLoaded) {
        return <div><p className="skeleton-text">Loading...</p></div>
        }
    
  return (
    <div className="w-full flex items-center h-[600px]">
       <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            mapTypeControl: false,
            fullscreenControl: false,
            zoomControl : false,
          }}
          onLoad={map => setMap(map)}
        >
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
    </div>
  )
}
