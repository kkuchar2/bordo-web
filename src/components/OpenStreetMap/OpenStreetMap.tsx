import React, { useCallback, useEffect, useState } from 'react';

import * as L from 'leaflet';
import { LatLngTuple } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

function ChangeView({ center, zoom } : { center: LatLngTuple, zoom: number }) {
    const map = useMap();
    map.flyTo(center, zoom);
    return null;
}

const OpenStreetMap = () => {
    const [currentLocation, setCurrentLocation] = useState<LatLngTuple | null>([52.22977, 21.01178]);

    useEffect(() => {
        const currentLocation = localStorage.getItem('currentLocation');
        if (currentLocation) {
            setCurrentLocation(JSON.parse(currentLocation));
        }
    }, []);

    const onLocateButtonClick = useCallback(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setCurrentLocation([position.coords.latitude, position.coords.longitude]);
            localStorage.setItem('currentLocation', JSON.stringify([position.coords.latitude, position.coords.longitude]));
        }, (error) => {
            console.log('error', error);
        }, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
    }, []);

    if (!currentLocation) {
        return null;
    }

    return <div className={'relative h-full w-full'}>
        <button
            className={'absolute bottom-[50px] right-[50px] z-[1] h-[50px] w-[50px] rounded-md bg-red-500'}
            onClick={onLocateButtonClick} />
        <MapContainer
            className={'h-full w-full'}
            attributionControl={false}
            center={currentLocation}
            fadeAnimation={true}
            zoom={13}
            scrollWheelZoom={true}>
            <ChangeView center={currentLocation} zoom={13} />
            <TileLayer
                attribution={'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}
                url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
            />
            <Marker position={currentLocation} icon={L.icon({
                iconUrl: 'http://localhost:3002/images/marker-icon.png',
                iconSize: [25, 40],
                iconAnchor: [20, 40],
                popupAnchor: [0, -40]
            })}>
                {/* <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup> */
                }
                <Popup className={'rounded-0 bg-blue-200'}>
                    <div className={'bg-red-200'}>
                        {'A pretty CSS3 popup. '}<br /> {'Easily customizable.'}
                    </div>
                </Popup>
            </Marker>
        </MapContainer>
    </div>;
};

export default OpenStreetMap;