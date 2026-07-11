"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in Leaflet + Next.js
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// A custom mechanic icon
const mechanicIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapProps {
  center: [number, number];
  zoom: number;
  markers?: Array<{ lat: number; lng: number; isMechanic?: boolean; title?: string }>;
}

export default function Map({ center, zoom, markers }: MapProps) {
  return (
    <MapContainer center={center} zoom={zoom} style={{ height: "100%", width: "100%" }} zoomControl={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* User Location */}
      <Marker position={center} icon={customIcon}>
        <Popup>Your current location</Popup>
      </Marker>
      
      {/* Mechanics */}
      {markers?.map((marker, i) => (
        <Marker key={i} position={[marker.lat, marker.lng]} icon={marker.isMechanic ? mechanicIcon : customIcon}>
          {marker.title && <Popup>{marker.title}</Popup>}
        </Marker>
      ))}
    </MapContainer>
  );
}
