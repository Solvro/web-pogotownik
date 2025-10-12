"use client";

import { Search } from "lucide-react";
import React, { useState } from "react";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";

import { useMap } from "@/hooks/use-map";

import { NavCenterLocation } from "./nav-center-location";
import { ButtonGroup } from "./ui/button-group";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

const getCoordsFromAddress = async (address: string) => {
  try {
    const results = await geocodeByAddress(address);
    const { lat, lng } = await getLatLng(results[0]);
    return { lat, lng };
  } catch (error) {
    console.error("Error getting coordinates:", error);
    return null;
  }
};

export function NavSearch() {
  const [inputValue, setInputValue] = useState("");
  const { setCenter, setZoom } = useMap();

  const handleSearch = async () => {
    if (inputValue.trim()) {
      const coords = await getCoordsFromAddress(inputValue);
      if (coords !== null) {
        setCenter({ lat: coords.lat, lng: coords.lng });
        setZoom(14);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      void handleSearch();
    }
  };

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
