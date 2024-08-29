import React from 'react';
import { Icon } from 'leaflet';
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster"
import MarkerCustomIcon from "../assets/images/markerCustomIcon.png";
import MarkerCustomCarIcon from "../assets/images/carCustomIcon.png";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = ({ latitude, longitude, vehicles }) => {

    const customIcon = new Icon({
        iconUrl: MarkerCustomIcon,
        iconSize: [38, 38]
    });

    const customCarIcon = new Icon({
        iconUrl: MarkerCustomCarIcon,
        iconSize: [38, 38]
    });

console.log(latitude, longitude, "map")
    return (
        <MapContainer center={[latitude, longitude]} zoom={13} className='h-full rounded'>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            />

            <MarkerClusterGroup>
                {
                    vehicles?.length > 0 && vehicles.map((marker) => (
                        <Marker key={marker._id} position={[marker?.location?.coordinates[1], marker?.location?.coordinates[0]]}>
                            <Popup>{marker?.model}</Popup>
                        </Marker>
                    ))
                }
            </MarkerClusterGroup>

            <Marker icon={customIcon} position={[latitude, longitude]}>
                <Popup>{"You"}</Popup>
            </Marker>
        </MapContainer>
    )
}

export default React.memo(Map)