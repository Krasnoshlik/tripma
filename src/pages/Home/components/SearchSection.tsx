"use client"
import FromAirplaineImage from "../../../assets/images/fromAirplane.png";
import ToAirplaineImage from "../../../assets/images/toAirplane.png";
import personImage from "../../../assets/images/person.png";
import { useState } from "react";
import { flightsArr } from "../../../../data/flights";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { setFlight } from "../../../store/slices/flightSlice";
import { useDispatch } from "react-redux";
import { FlightTypes } from "../../../store/types";
import { useNavigate } from "react-router-dom";

export default function SearchSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State with proper types
  const [personCount, setPersonCount] = useState<number>(1);
  const [fromLocation, setFromLocation] = useState<FlightTypes | null>(null);
  const [toLocation, setToLocation] = useState<FlightTypes | null>(null);
  const [takeDate, setTakedate] = useState<number | null>(null);

  // Handle selecting the "From" location
  const handleFromSelect = (item: FlightTypes) => {
    setFromLocation(item);
  };

  // Handle selecting the "To" location
  const handleToSelect = (item: FlightTypes) => {
    setToLocation(item);
  };

  // Function to log missing fields
  function HandleAllFieldsFull(a: FlightTypes | null, b: FlightTypes | null, c: number | null): void {
    if (a === null) console.log("From where not inputted!");
    if (b === null) console.log("Where to not inputted!");
    if (c === null) console.log("Please enter the date!");
  }

  // Function to handle searching the flight
  function handleSearchFlight(): void {
    if (fromLocation === null || toLocation === null || takeDate === null) {
      HandleAllFieldsFull(fromLocation, toLocation, takeDate);
    } else {
      dispatch(
        setFlight({
          FromWhereFlight: fromLocation.name,
          ToWhereFlight: toLocation.name,
          DateFlight: takeDate,
          PersonsFlight: personCount,
        })
      );
      navigate("/flight");
    }
  }

  const commonInputStyle = {
    padding: "0px",
    width: "100%",
    background: "transparent",
    border: "none",
    outline: "none",
    boxShadow: "none",
    backgroundColor: "transparent",
    color: "#7C8DB0",
    clearIconMargin: "0 2px 0 0",
    clearIconVisibility: "visible",
    searchIconMargin: "0",
    height: "42px",
  };

  const wrapperStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    paddingLeft: "0px",
    borderRight: "none",
  };

  // Filtered arrays to prevent selecting the same option in both inputs
  const filteredFromLocations: FlightTypes[] = flightsArr.filter(
    (flight) => flight.name !== toLocation?.name
  );
  const filteredToLocations: FlightTypes[] = flightsArr.filter(
    (flight) => flight.name !== fromLocation?.name
  );

  return (
    <section className="mainPage w-full h-[700px]">
      <div className="max-w-7xl m-auto flex flex-col gap-20 items-center pt-[100px] text-center">
        <h3 className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent text-[80px] font-bold max-w-[600px] leading-[110%]">
          It's more than just a trip
        </h3>

        <div className="shadow-lg rounded border border-gray-200 bg-white flex">
          {/* From where autocomplete input */}
          <div style={wrapperStyle} className="flex items-center border-r">
            <img
              src={FromAirplaineImage}
              alt="input image"
              className="max-w-[28px] max-h-[28px] ml-2"
            />
            <div className="w-[220px]">
              <ReactSearchAutocomplete
                items={filteredFromLocations}
                onSelect={handleFromSelect}
                placeholder="From where?"
                fuseOptions={{ keys: ["name", "abr"] }}
                resultStringKeyName="name"
                showIcon={false}
                styling={{
                  ...commonInputStyle,
                }}
              />
            </div>
          </div>

          {/* Where to autocomplete input */}
          <div style={wrapperStyle} className="flex items-center">
            <img
              src={ToAirplaineImage}
              alt="input image"
              className="max-w-[28px] max-h-[28px] ml-2"
            />
            <div className="w-[220px]">
              <ReactSearchAutocomplete
                items={filteredToLocations}
                onSelect={handleToSelect}
                placeholder="Where to?"
                fuseOptions={{ keys: ["name", "abr"] }}
                resultStringKeyName="name"
                showIcon={false}
                styling={{
                  ...commonInputStyle,
                }}
              />
            </div>
          </div>

          {/* Date input */}
          <div className="flex items-center">
            <input
              type="date"
              name="date"
              id="date"
              className="py-2 px-4 outline-none border-x border-gray-200 text-light-grey"
              defaultValue={new Date().toISOString().slice(0, 10)}
              onChange={(e) => setTakedate(Number(new Date(e.target.value).getTime()))}
            />
          </div>

          {/* Person count input */}
          <div className="flex items-center px-2">
            <img
              src={personImage}
              alt="input image"
              className="max-w-[28px] max-h-[28px] mr-1"
            />
            <div className="flex gap-1 items-center">
              <button
                onClick={() =>
                  setPersonCount(personCount > 1 ? personCount - 1 : 1)
                }
                className="bg-mainC text-white w-[20px] h-[20px] flex items-center justify-center rounded-lg"
              >
                -
              </button>
              <p className="text-lg font-bold text-mainC">{personCount}</p>
              <button
                onClick={() =>
                  setPersonCount(personCount < 9 ? personCount + 1 : personCount)
                }
                className="bg-mainC text-white w-[20px] h-[20px] flex items-center justify-center rounded-lg"
              >
                +
              </button>
            </div>
          </div>

          {/* Search button */}
          <button
            className="h-[44px] px-4 rounded bg-mainC text-white"
            onClick={handleSearchFlight}
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
