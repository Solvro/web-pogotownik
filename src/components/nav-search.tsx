"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import { toast } from "sonner";

import { useMap } from "@/hooks/use-map";

import { NavCenterLocation } from "./nav-center-location";
import { ButtonGroup } from "./ui/button-group";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

const MAX_SEARCH_ATTEMPTS = 3;
const SEARCH_ATTEMPT_DELAY_MS = 100;

async function getCoordsFromAddress(address: string) {
  // If the user just navigated to the map, the might not be mounted yet
  // Try up to three times to wait for it to be ready
  for (let attempt = 0; attempt < MAX_SEARCH_ATTEMPTS; attempt++) {
    try {
      const results = await geocodeByAddress(address);
      const { lat, lng } = await getLatLng(results[0]);
      return { lat, lng };
    } catch {
      await new Promise((resolve) =>
        setTimeout(resolve, SEARCH_ATTEMPT_DELAY_MS),
      );
    }
  }
  toast.error("Nie znaleziono lokalizacji");
  return null;
}

export function NavSearch() {
  const [inputValue, setInputValue] = useState("");
  const { setCenter, setZoom } = useMap();
  const [pendingSearch, setPendingSearch] = useState<string | null>(null);
  const pathname = usePathname();
  const segments = pathname.split("/");
  const firstSegment = segments[1];
  const router = useRouter();

  useEffect(() => {
    if (firstSegment !== "map" || pendingSearch == null) {
      return;
    }

    async function performSearch(search: string) {
      const coords = await getCoordsFromAddress(search);
      if (coords !== null) {
        setCenter({ lat: coords.lat, lng: coords.lng });
        setZoom(14);
      }
    }

    void performSearch(pendingSearch);
    setPendingSearch(null);
  }, [firstSegment, pendingSearch, setCenter, setZoom]);

  function handleSearch() {
    if (firstSegment !== "map") {
      router.push("/map");
    }
    if (inputValue.trim()) {
      setPendingSearch(inputValue);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <ButtonGroup className="w-full [--radius:9999rem]">
      <ButtonGroup className="w-full">
        <InputGroup className="bg-white">
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value);
            }}
            onKeyDown={handleKeyDown}
            placeholder={"Dokąd się wybierasz?"}
          />
        </InputGroup>
      </ButtonGroup>
      <ButtonGroup>
        <NavCenterLocation />
      </ButtonGroup>
    </ButtonGroup>
  );
}
