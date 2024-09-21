import { useState } from "react";
import ArrowToRightImage from "../../assets/images/arrow-to-right.png";
import EconomySeatsImage from "../../assets/images/EconomySeats.png";
import BusinessSeatsImage from "../../assets/images/BusinessSeats.png";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setSeat } from "../../store/slices/flightSlice";
import PlaneWithSeats from "./components/PlaneWithSeats";

const EconomyArr = [
  "Built-in entertainment system",
  "Complimentary snacks and drinks",
  "One free carry-on and personal item",
];
const BuisinessArr = [
  "Extended leg room",
  "First two checked bags free",
  "Priority boarding",
  "Personalized service",
  "Enhanced food and drink service",
  "Seats that recline 40%",
];

function convertDurationToMinutes(duration: string) {
  const hoursMatch = duration.match(/(\d+)h/);
  const minutesMatch = duration.match(/(\d+)m/);

  const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
  const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;

  return hours * 60 + minutes;
}

function calculateLandingTime(
  DateFlight: number,
  duration: string,
  stopTime: string
) {
  const departureDate = new Date(DateFlight);
  const flightDurationMinutes = convertDurationToMinutes(duration);
  const stopDurationMinutes = stopTime ? convertDurationToMinutes(stopTime) : 0;
  const totalTravelMinutes = flightDurationMinutes + stopDurationMinutes;
  const landingDate = new Date(
    departureDate.getTime() + totalTravelMinutes * 60000
  );

  return {
    departure: departureDate.toLocaleString(),
    landing: landingDate.toLocaleString(),
  };
}

export default function SelectYourSeat() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const flightState = useSelector((state: RootState) => state.flight);
  const { FromWhereFlight, ToWhereFlight, DateFlight, PickedFlight } =
    flightState.flight;
  const { duration, stopTime } = PickedFlight;
  const { departure, landing } = calculateLandingTime(
    DateFlight,
    duration,
    stopTime
  );

  const [pickedSeat, setPickedSeat] = useState("");

  const handleSaveAndClose = () => {
    dispatch(setSeat(pickedSeat));
    navigate("/flight/airplane-seat/pay-and-confirm")
  };

  return (
    <main className="max-w-7xl m-auto mt-[100px] mb-20 px-4 flex justify-between">
      {/* left plane section */}
      <PlaneWithSeats setPickedSeat={setPickedSeat} pickedSeat={pickedSeat} />
      {/* right details section */}
      <div className="border flex flex-col">
        <div className="w-full bg-gray-900 text-white p-5 flex">
          <div className="flex gap-5 items-center font-medium">
            <p className="max-w-48">{FromWhereFlight}</p>
            <img
              src={ArrowToRightImage}
              alt="arrow right"
              className="w-[20px] h-[16px]"
            />
            <p className="max-w-48 mr-2">{ToWhereFlight}</p>
          </div>

          <div className="bg-mainC -my-5 px-4 flex flex-col items-center justify-center">
            <p className=" w-max">{departure}</p>
            <p className=" text-gray-300 text-sm self-start">Departing</p>
          </div>

          <div className="px-3 flex flex-col items-center justify-center">
            <p className="w-max">{landing}</p>
            <p className="text-gray-300 text-sm self-start">Arriving</p>
          </div>
        </div>

        {/* seats type details section */}
        <div className="flex justify-between p-10 text-light-grey font-medium">
          <div className="flex flex-col gap-5 max-w-[320px]">
            <img src={EconomySeatsImage} alt="Seats image" />
            <h3>Economy</h3>
            <p>
              Rest and recharge during your flight with extended leg room,
              personalized service, and a multi-course meal service.
            </p>
            <span className="w-10 h-[2px] bg-mainC rounded-xl"></span>
            <ul>
              {EconomyArr.map((e, i) => {
                return (
                  <li className="flex gap-4 items-center" key={i}>
                    <span className="block w-[10px] h-[10px] bg-mainC rounded-full"></span>
                    <p>{e}</p>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex flex-col gap-5 max-w-[320px]">
            <img src={BusinessSeatsImage} alt="Seats image" />
            <div className=" flex gap-4">
              <h3>Business class</h3>
              <p className="bg-mainC rounded-lg text-white px-1">Selected</p>
            </div>
            <p>
              Rest and recharge during your flight with extended leg room,
              personalized service, and a multi-course meal service.
            </p>
            <span className="w-10 h-[2px] bg-[#5CD6C0] rounded-xl"></span>
            <ul>
              {BuisinessArr.map((e, i) => {
                return (
                  <li className="flex gap-4 items-center" key={i}>
                    <span className="block w-[10px] h-[10px] bg-[#5CD6C0] rounded-full"></span>
                    <p>{e}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* passenger details and save and close section */}
        <div className="border-t bg-[#cbd4e630] h-full py-4 px-6 flex justify-between items-center">
          <div className="flex gap-10">
            <div>
              <h3 className="text-light-grey">Passenger 1</h3>
              <p className="font-semibold text-gray-600 text-lg">
                {flightState.passenger.pFirstName +
                  " " +
                  flightState.passenger.pLastName}
              </p>
            </div>

            <div>
              <h3 className="text-light-grey">Seat number</h3>
              <p className="font-semibold text-gray-600 text-lg">
                {pickedSeat || "Not selected"}
              </p>
            </div>
          </div>

          <button
            className="border px-5 py-3 rounded border-mainC text-mainC"
            onClick={handleSaveAndClose}
          >
            Save and close
          </button>
        </div>
      </div>
    </main>
  );
}
