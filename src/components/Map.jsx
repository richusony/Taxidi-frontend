import React from 'react';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster"

const Map = ({ latitude, longitude, vehicles }) => {
    const markers = [
        {
            geocode: [48.86, 2.3522],
            popUp: "hello1"
        },
        {
            geocode: [48.85, 2.3522],
            popUp: "hello2"
        },
        {
            geocode: [48.84, 2.3522],
            popUp: "hello3"
        },
    ]

    return (
        <MapContainer center={[latitude, longitude]} zoom={13} className='h-full rounded'>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            />

            <MarkerClusterGroup>
                {
                   vehicles?.length > 0 && vehicles.map((marker) => (
                        <Marker position={[marker?.latitude, marker?.longitude]}>
                            <Popup>{marker?.model}</Popup>
                        </Marker>
                    ))
                }
            </MarkerClusterGroup>
        </MapContainer>
    )
}

export default React.memo(Map)