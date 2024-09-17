import React from "react";
import ImageWithSeats from "../../assets/images/Plane.png";
import ArrowToRightImage from "../../assets/images/arrow-to-right.png";
import ChevronImage from "../../assets/images/chevron.png";
import EconomySeatsImage from "../../assets/images/EconomySeats.png";
import BusinessSeatsImage from "../../assets/images/BusinessSeats.png";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

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
  const flightState = useSelector((state: RootState) => state.flight);
  const { FromWhereFlight, ToWhereFlight, DateFlight, PickedFlight } =
    flightState.flight;
  const { duration, stopTime } = PickedFlight;
  const { departure, landing } = calculateLandingTime(
    DateFlight,
    duration,
    stopTime
  );

  return (
    <main className="max-w-7xl m-auto mt-[100px] mb-20 px-4 flex justify-between">
      {/* left plane section */}
      <div>
        <img src={ImageWithSeats} alt="Plane" />
      </div>

      {/* right details section */}
      <div className=" border">
        <div className="w-full bg-gray-900 text-white p-5 flex">
          <div className="flex gap-5 items-center font-medium">
            <p className="max-w-48">{FromWhereFlight}</p>
            <img
              src={ArrowToRightImage}
              alt="arrow right"
              className="w-[20px] h-[16px]"
            />
            <p className="max-w-48">{ToWhereFlight}</p>
          </div>

          <div className="bg-mainC -my-5 px-4 flex flex-col items-center justify-center">
            <p className=" w-max">{departure}</p>
            <p>Departing</p>
          </div>

          <div className=" px-3 flex flex-col items-center justify-center">
            <p className=" w-max">{landing}</p>
            <p>Arriving:</p>
          </div>
        </div>

        {/* seats type details section */}
        <div className=" flex justify-between p-10 text-light-grey font-medium">

          <div className=" flex flex-col gap-5 max-w-[320px]">
            <img src={EconomySeatsImage} alt="Seats image" />
            <div className=" flex gap-4">
              <h3>Economy</h3>
              <p className=" bg-mainC rounded-lg text-white px-1">Selected</p>
            </div>
            <p>
              Rest and recharge during your flight with extended leg room,
              personalized service, and a multi-course meal service
            </p>
            <span className=" w-10 h-[2px] bg-mainC rounded-xl"></span>
            <div>

              <div className=" flex gap-4 items-center">
                <span className="block w-[10px] h-[10px] bg-mainC rounded-full"></span>
                <p>Built-in entertainment system</p>
              </div>

              <div className=" flex gap-4 items-center">
                <span className="block w-[10px] h-[10px] bg-mainC rounded-full"></span>
                <p>Complimentary snacks and drinks</p>
              </div>

              <div className=" flex gap-4 items-center">
                <span className="block w-[10px] h-[10px] bg-mainC rounded-full"></span>
                <p>One free carry-on and personal item</p>
              </div>

            </div>
          </div>

          <div className=" flex flex-col gap-5 max-w-[320px]">
            <img src={BusinessSeatsImage} alt="Seats image" />
              <h3>Business class</h3>
            <p>
            Rest and recharge during your flight with extended leg room, personalized service, and a multi-course meal service
            </p>
            <span className=" w-10 h-[2px] bg-[#5CD6C0] rounded-xl"></span>
            <div>

              <div className=" flex gap-4 items-center">
                <span className="block w-[10px] h-[10px] bg-[#5CD6C0] rounded-full"></span>
                <p>Extended leg room</p>
              </div>

              <div className=" flex gap-4 items-center">
                <span className="block w-[10px] h-[10px] bg-[#5CD6C0] rounded-full"></span>
                <p>First two checked bags free</p>
              </div>

              <div className=" flex gap-4 items-center">
                <span className="block w-[10px] h-[10px] bg-[#5CD6C0] rounded-full"></span>
                <p>Priority boarding</p>
              </div>

              <div className=" flex gap-4 items-center">
                <span className="block w-[10px] h-[10px] bg-[#5CD6C0] rounded-full"></span>
                <p>Personalized service</p>
              </div>

              <div className=" flex gap-4 items-center">
                <span className="block w-[10px] h-[10px] bg-[#5CD6C0] rounded-full"></span>
                <p>Enhanced food and drink service</p>
              </div>

              <div className=" flex gap-4 items-center">
                <span className="block w-[10px] h-[10px] bg-[#5CD6C0] rounded-full"></span>
                <p>Seats that recline 40% </p>
              </div>
          </div>
          </div>

        </div>
      </div>
    </main>
  );
}
