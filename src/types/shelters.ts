export interface SheltersResponse {
  objectIdFieldName: string;
  uniqueIdField: {
    name: string;
    isSystemMaintained: boolean;
  };
  globalIdFieldName: string;
  geometryType: string;
  spatialReference: {
    wkid: number;
    latestWkid: number;
  };
  fields: unknown[]; // Pole fields jest puste w przykładzie, więc używam unknown[]
  features: ShelterFeature[];
}

export interface ShelterFeature {
  attributes: ShelterAttributes;
  geometry: {
    x: number;
    y: number;
  };
}

export interface ShelterAttributes {
  ObjectID: number;
  Rodzaj_inw: string;
  Możliwoś: string;
  Powierzchn: number;
  Pojemnoś_: number;
  Subiektywn: number;
  Rodzaj_obi: string;
  Przeznacze: string;
  Województ: string;
  Powiat: string;
  Adres: string;
  x: number;
  y: number;
  ObjectId2: number;
  Gmina: string | null;
  Miejscowosc: string | null;
}

export interface SheltersData {
  id: number;
  address: string;
  capacity: number;
  area: number;
  type: string;
  buildingType: string;
  purpose: string;
}
