import type { ReactNode } from "react";

export interface Coordinates {
  lat: number;
  lng: number;
}

export type SynchronousReactNode = Exclude<ReactNode, Promise<ReactNode>>;

export interface MarkerProps {
  lat: number;
  lng: number;
}
