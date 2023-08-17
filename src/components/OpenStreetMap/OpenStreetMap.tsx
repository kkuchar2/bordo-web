import React, { useEffect, useState } from 'react';

import { LatLngTuple } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

const OpenStreetMap = () => {
    const [currentLocation, setCurrentLocation] = useState<LatLngTuple>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const pickedUpLocation = [position.coords.latitude, position.coords.longitude];

            console.log(pickedUpLocation);

            setCurrentLocation(pickedUpLocation);
        });
    }, []);

    console.log('currentLocation', currentLocation);

    if (!currentLocation) {
        return null;
    }

    return <MapContainer
        className={'h-full w-full'}
        center={currentLocation}
        zoom={13}
        scrollWheelZoom={true}>
        <TileLayer
            attribution={'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}
            url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
        />
        <Marker position={currentLocation}>
            <Popup>
                {'A pretty CSS3 popup. '}<br /> {'Easily customizable.'}
            </Popup>
        </Marker>
    </MapContainer>;
};

export default OpenStreetMap;