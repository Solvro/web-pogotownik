export interface DefibrillatorFeature {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
  properties: {
    "@osm_type": string;
    "@osm_id": number;
    "@osm_version"?: number;
    phone?: string;
    access?: string;
    indoor?: string;
    emergency: string;
    opening_hours?: string;
    "emergency:phone"?: string;
    check_date?: string;
    "defibrillator:location"?: string;
    "defibrillator:location:pl"?: string;
    "defibrillator:location:en"?: string;
    level?: string;
  };
}

export interface DefibrillatorCollection {
  type: "FeatureCollection";
  features: DefibrillatorFeature[];
}

export interface DefibrillatorInsert {
  osmId: string;
  osmType: string;
  osmVersion?: number;
  location: string; // PostGIS geography point format: "POINT(longitude latitude)"
  access?: string;
  indoor?: string;
  emergency: string;
  phone?: string;
  openingHours?: string;
  emergencyPhone?: string;
  defibrillatorLocation?: string;
  defibrillatorLocationPl?: string;
  defibrillatorLocationEn?: string;
  level?: string;
  checkDate?: string;
}

export interface DefibrillatorSelect extends DefibrillatorInsert {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
