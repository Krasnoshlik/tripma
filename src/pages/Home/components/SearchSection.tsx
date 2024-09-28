import FromAirplaineImage from "../../../assets/images/fromAirplane.png";
import ToAirplaineImage from "../../../assets/images/toAirplane.png";
import personImage from "../../../assets/images/person.png";
import { useState, useEffect } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { setFlight } from "../../../store/slices/flightSlice";
import { useDispatch } from "react-redux";
import { FlightTypes } from "../../../store/types";
import { useNavigate } from "react-router-dom";
import { db } from '../../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default function SearchSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dateToday = new Date();

  const [personCount, setPersonCount] = useState<number>(1);
  const [fromLocation, setFromLocation] = useState<FlightTypes | null>(null);
  const [toLocation, setToLocation] = useState<FlightTypes | null>(null);
  const [takeDate, setTakeDate] = useState<number | Date>(dateToday);
  const [errorsOnSubmit, setErrorsOnSubmit] = useState<string[]>([]);
  const [flightsArr, setFlightsArr] = useState<FlightTypes[]>([]);

  useEffect(() => {
    const fetchFlights = async () => {
      const querySnapshot = await getDocs(collection(db, "flights"));
      const flights: FlightTypes[] = [];
      querySnapshot.forEach((doc) => {
        const flightData = doc.data() as FlightTypes;
        flights.push({ id: doc.id, ...flightData });
      });
      setFlightsArr(flights);
    };

    fetchFlights();
  }, []);

  const handleFromSelect = (item: FlightTypes) => {
    setFromLocation(item);
    setErrorsOnSubmit((prev) => prev.filter((error) => error !== 'From'));
  };

  const handleToSelect = (item: FlightTypes) => {
    setToLocation(item);
    setErrorsOnSubmit((prev) => prev.filter((error) => error !== 'Where'));
  };

  const validateFields = () => {
    const errors: string[] = [];
    const today = dateToday.setHours(0, 0, 0, 0);
    const selectedDate = new Date(takeDate).setHours(0, 0, 0, 0);
  
    if (fromLocation === null) errors.push('From');
    if (toLocation === null) errors.push('Where');
    if (selectedDate < today) errors.push('Date');
  
    setErrorsOnSubmit(errors);
    return errors.length === 0;
  };

  const handleSearchFlight = () => {
    if (validateFields() && fromLocation && toLocation) {
      dispatch(
        setFlight({
          FromWhereFlight: fromLocation.name,
          ToWhereFlight: toLocation.name,
          DateFlight: +takeDate,
          PersonsFlight: personCount,
          PickedFlight: {
            img: '',
            companyTitle: '',
            travelTime: '',
            price: 0,
            duration: '',
            stop: '',
            stopTime: '',
          },
          Seat: '',
        })
      );
      navigate("/flight");
    }
  };

  const commonInputStyle = {
    padding: "0px",
    width: "100%",
    background: "transparent",
    border: "none",
    outline: "none",
    boxShadow: "none",
    backgroundColor: "white",
    color: "#7C8DB0",
    clearIconMargin: "0 2px 0 0",
    clearIconVisibility: "visible",
    searchIconMargin: "0",
    height: "42px",
    zIndex: 1,
    position: "relative",
  };

  const autoCompleteDropdownStyleFirst = {
    zIndex: 9999,
    position: "fixed",
    backgroundColor: "#fff",
  };
  const autoCompleteDropdownStyleSecond = {
    zIndex: 100,
    position: "fixed",
    backgroundColor: "#fff",
  };

  const wrapperStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    paddingLeft: "0px",
    borderRight: "none",
  };

  const filteredFromLocations: FlightTypes[] = flightsArr.filter(
    (flight) => flight.name !== toLocation?.name
  );
  const filteredToLocations: FlightTypes[] = flightsArr.filter(
    (flight) => flight.name !== fromLocation?.name
  );

  return (
    <section className="mainPage w-full h-[700px]">
      <div className="max-w-7xl m-auto flex flex-col gap-20 items-center pt-[100px] text-center">
        <h3 className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent text-[50px] clas:text-[80px] font-bold max-w-[600px] leading-[110%]">
          It's more than just a trip
        </h3>

        <div className="shadow-lg rounded border border-gray-200 bg-white flex flex-col items-center gap-4 pb-2 clas:pb-0 clas:flex-row">
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
                styling={{ ...commonInputStyle, ...autoCompleteDropdownStyleFirst }}
              />
              {errorsOnSubmit.includes('From') && (
                <div className=" relative">
                  <div className=" absolute -z-40">
                  <p className="text-red-500">Choose from where to travel</p>
                  </div>
                </div>
              )}
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
                styling={{ ...commonInputStyle, ...autoCompleteDropdownStyleSecond }}
              />
              {errorsOnSubmit.includes('Where') && (
                <div className=" relative">
                  <div className=" absolute -z-40">
                <p className="text-red-500">Choose where to travel</p>
                </div>
                </div>
              )}
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
              onChange={(e) => setTakeDate(new Date(e.target.value))}
            />
            {errorsOnSubmit.includes('Date') && (
              <div className=" relative -left-[200px] top-[22px]">
                  <div className=" absolute w-[200px]">
              <p className="text-red-500">Choose a valid date</p>
              </div>
              </div>
            )}
          </div>

          <div className=" flex">

          {/* Person count input */}
          <div className="flex items-center px-2">
            <img
              src={personImage}
              alt="input image"
              className="max-w-[28px] max-h-[28px] mr-1"
            />
            <div className="flex gap-1 items-center">
              <button
                onClick={() => setPersonCount(personCount > 1 ? personCount - 1 : 1)}
                className="bg-mainC text-white w-[20px] h-[20px] flex items-center justify-center rounded-lg"
              >
                -
              </button>
              <p className="text-lg font-bold text-mainC">{personCount}</p>
              <button
                onClick={() => setPersonCount(personCount < 9 ? personCount + 1 : personCount)}
                className="bg-mainC text-white w-[20px] h-[20px] flex items-center justify-center rounded-lg"
              >
                +
              </button>
            </div>
          </div>

          {/* Search button */}
          <button
            className="h-[44px] px-4 rounded bg-mainC text-white border border-white hover:bg-white hover:text-mainC hover:border-mainC hover:shadow-lg ease-in-out duration-500"
            onClick={handleSearchFlight}
          >
            Search
          </button>

          </div>
        </div>
      </div>
    </section>
  );
}
