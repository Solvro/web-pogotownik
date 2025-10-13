import type { Coordinates } from "@/types/app";

/** Obtains the user's current location using the Geolocation API. */
export const getCurrentLocation = async (): Promise<Coordinates> =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coordinates: Coordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        resolve(coordinates);
      },
      reject,
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
    );
  });
