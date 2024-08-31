import React from 'react';
import { Icon } from 'leaflet';
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster"
import MarkerCustomIcon from "../assets/images/markerCustomIcon.png";
import MarkerCustomCarIcon from "../assets/images/carCustomIcon.png";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from 'react-router-dom';

const Map = ({ latitude, longitude, vehicles, tripStarts, tripEnds }) => {
    const navigate = useNavigate();

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
                            <Popup><h1 onClick={()=> navigate(`/car-details/${marker.vehicleRegistrationNumber}?startDate=${tripStarts}&endDate=${tripEnds}`)} className='text-center cursor-pointer hover:text-[#593CFB]'>{marker?.model}</h1></Popup>
                        </Marker>
                    ))
                }
            </MarkerClusterGroup>

            <Marker icon={customIcon} position={[latitude, longitude]}>
                <Popup><h1 onClick={()=>navigate("")} className='text-center'>You</h1></Popup>
            </Marker>
        </MapContainer>
    )
}

export default React.memo(Map)