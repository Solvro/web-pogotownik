"use client";

import GoogleMapReact from "google-map-react";

import { SKS_COORDINATES } from "@/config/constants";
import { env } from "@/env";

function Marker({ text }: { text: string; lat: number; lng: number }) {
  return <div>{text}</div>;
}

export function SimpleMap() {
  const [lat, lng] = SKS_COORDINATES;

  const defaultProps = {
    center: { lat, lng },
    zoom: 14,
  };

  return (
    <div className="absolute inset-0 h-screen w-screen">
      <GoogleMapReact
        bootstrapURLKeys={{ key: env.NEXT_PUBLIC_GOOGLE_MAPS_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Marker lat={lat} lng={lng} text="Strefa Kultury Studenckiej" />
      </GoogleMapReact>
    </div>
  );
}
