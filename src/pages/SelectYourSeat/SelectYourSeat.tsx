"use client";
import { useState } from "react";
import ImageWithSeats from "../../assets/images/Plane.png";
import ArrowToRightImage from "../../assets/images/arrow-to-right.png";
import EconomySeatsImage from "../../assets/images/EconomySeats.png";
import BusinessSeatsImage from "../../assets/images/BusinessSeats.png";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import SeatButtonInner from "./components/SeatButtonInner";
import { useDispatch } from "react-redux";
import { setSeat } from "../../store/slices/flightSlice";

function convertDurationToMinutes(duration: string) {
  const hoursMatch = duration.match(/(\d+)h/);
  const minutesMatch = duration.match(/(\d+)m/);

  const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
  const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;

  return hours * 60 + minutes;
}

function calculateLandingTime(DateFlight: number, duration: string, stopTime: string) {
  const departureDate = new Date(DateFlight);
  const flightDurationMinutes = convertDurationToMinutes(duration);
  const stopDurationMinutes = stopTime ? convertDurationToMinutes(stopTime) : 0;
  const totalTravelMinutes = flightDurationMinutes + stopDurationMinutes;
  const landingDate = new Date(departureDate.getTime() + totalTravelMinutes * 60000);

  return {
    departure: departureDate.toLocaleString(),
    landing: landingDate.toLocaleString(),
  };
}

export default function SelectYourSeat() {
  const dispatch = useDispatch();
  const flightState = useSelector((state: RootState) => state.flight);
  const { FromWhereFlight, ToWhereFlight, DateFlight, PickedFlight } = flightState.flight;
  const { duration, stopTime } = PickedFlight;
  const { departure, landing } = calculateLandingTime(DateFlight, duration, stopTime);

  const [pickedSeat, setPickedSeat] = useState("");

  const handleSeatClick = (seat: string ) => {
    setPickedSeat(seat);
  };

  const handleSaveAndClose = () => {
    dispatch(setSeat(pickedSeat))
  }

  return (
    <main className="max-w-7xl m-auto mt-[100px] mb-20 px-4 flex justify-between">
      {/* left plane section */}
      <div>
        <img src={ImageWithSeats} alt="Plane" />
        <div className="relative">
          <div className="absolute bottom-[42px] left-[58px] flex flex-col gap-5">
            <div className="flex gap-[47px]">
              <div className="flex gap-[8.5px]">
                <button onClick={() => handleSeatClick("1A")}>
                  <SeatButtonInner seat="1A" pickedSeat={pickedSeat}/>
                </button>
                <button onClick={() => handleSeatClick("1B")}>
                  <SeatButtonInner seat="1B" pickedSeat={pickedSeat}/>
                </button>
              </div>

              <div className="flex gap-[8.5px]">
                <button onClick={() => handleSeatClick("1C")}>
                  <SeatButtonInner seat="1C" pickedSeat={pickedSeat}/>
                </button>
                <button onClick={() => handleSeatClick("1D")}>
                  <SeatButtonInner seat="1D" pickedSeat={pickedSeat}/>
                </button>
              </div>
            </div>

            <div className="flex gap-[47px]">
              <div className="flex gap-[8.5px]">
                <button onClick={() => handleSeatClick("2A")}>
                  <SeatButtonInner seat="2A" pickedSeat={pickedSeat}/>
                </button>
                <button onClick={() => handleSeatClick("2B")}>
                  <SeatButtonInner seat="2B" pickedSeat={pickedSeat}/>
                </button>
              </div>

              <div className="flex gap-[8.5px]">
                <button onClick={() => handleSeatClick("2C")}>
                  <SeatButtonInner seat="2C" pickedSeat={pickedSeat}/>
                </button>
                <button onClick={() => handleSeatClick("2D")}>
                  <SeatButtonInner seat="2D" pickedSeat={pickedSeat}/>
                </button>
              </div>
            </div>

            <div className="flex gap-[47px]">
              <div className="flex gap-[8.5px]">
                <button onClick={() => handleSeatClick("3A")}>
                  <SeatButtonInner seat="3A" pickedSeat={pickedSeat}/>
                </button>
                <button onClick={() => handleSeatClick("3B")}>
                  <SeatButtonInner seat="3B" pickedSeat={pickedSeat}/>
                </button>
              </div>

              <div className="flex gap-[8.5px]">
                <button onClick={() => handleSeatClick("3C")}>
                  <SeatButtonInner seat="3C" pickedSeat={pickedSeat}/>
                </button>
                <button onClick={() => handleSeatClick("3D")}>
                  <SeatButtonInner seat="3D" pickedSeat={pickedSeat}/>
                </button>
              </div>
            </div>

            <div className="flex gap-[47px]">
              <div className="flex gap-[8.5px]">
                <button onClick={() => handleSeatClick("4A")}>
                  <SeatButtonInner seat="4A" pickedSeat={pickedSeat}/>
                </button>
                <button onClick={() => handleSeatClick("4B")}>
                  <SeatButtonInner seat="4B" pickedSeat={pickedSeat}/>
                </button>
              </div>

              <div className="flex gap-[8.5px]">
                <button onClick={() => handleSeatClick("4C")}>
                  <SeatButtonInner seat="4C" pickedSeat={pickedSeat}/>
                </button>
                <button onClick={() => handleSeatClick("4D")}>
                  <SeatButtonInner seat="4D" pickedSeat={pickedSeat}/>
                </button>
              </div>
            </div>

            <div className="flex gap-[47px]">
              <div className="flex gap-[8.5px]">
                <button onClick={() => handleSeatClick("5A")}>
                  <SeatButtonInner seat="5A" pickedSeat={pickedSeat}/>
                </button>
                <button onClick={() => handleSeatClick("5B")}>
                  <SeatButtonInner seat="5B" pickedSeat={pickedSeat}/>
                </button>
              </div>

              <div className="flex gap-[8.5px]">
                <button onClick={() => handleSeatClick("5C")}>
                  <SeatButtonInner seat="5C" pickedSeat={pickedSeat}/>
                </button>
                <button onClick={() => handleSeatClick("5D")}>
                  <SeatButtonInner seat="5D" pickedSeat={pickedSeat}/>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* right details section */}
      <div className="border flex flex-col">
        <div className="w-full bg-gray-900 text-white p-5 flex">
          <div className="flex gap-5 items-center font-medium">
            <p className="max-w-48">{FromWhereFlight}</p>
            <img src={ArrowToRightImage} alt="arrow right" className="w-[20px] h-[16px]" />
            <p className="max-w-48">{ToWhereFlight}</p>
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
              Rest and recharge during your flight with extended leg room, personalized service,
              and a multi-course meal service.
            </p>
            <span className="w-10 h-[2px] bg-mainC rounded-xl"></span>
            <div>
              <div className="flex gap-4 items-center">
                <span className="block w-[10px] h-[10px] bg-mainC rounded-full"></span>
                <p>Built-in entertainment system</p>
              </div>

              <div className="flex gap-4 items-center">
                <span className="block w-[10px] h-[10px] bg-mainC rounded-full"></span>
                <p>Complimentary snacks and drinks</p>
              </div>

              <div className="flex gap-4 items-center">
                <span className="block w-[10px] h-[10px] bg-mainC rounded-full"></span>
                <p>One free carry-on and personal item</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 max-w-[320px]">
            <img src={BusinessSeatsImage} alt="Seats image" />
            <div className=" flex gap-4">
            <h3>Business class</h3>
            <p className="bg-mainC rounded-lg text-white px-1">Selected</p>
            </div>
            <p>
              Rest and recharge during your flight with extended leg room, personalized service, and
              a multi-course meal service.
            </p>
            <span className="w-10 h-[2px] bg-[#5CD6C0] rounded-xl"></span>
            <div>
              <div className="flex gap-4 items-center">
                <span className="block w-[10px] h-[10px] bg-[#5CD6C0] rounded-full"></span>
                <p>Extended leg room</p>
              </div>

              <div className="flex gap-4 items-center">
                <span className="block w-[10px] h-[10px] bg-[#5CD6C0] rounded-full"></span>
                <p>First two checked bags free</p>
              </div>

              <div className="flex gap-4 items-center">
                <span className="block w-[10px] h-[10px] bg-[#5CD6C0] rounded-full"></span>
                <p>Priority boarding</p>
              </div>

              <div className="flex gap-4 items-center">
                <span className="block w-[10px] h-[10px] bg-[#5CD6C0] rounded-full"></span>
                <p>Personalized service</p>
              </div>

              <div className="flex gap-4 items-center">
                <span className="block w-[10px] h-[10px] bg-[#5CD6C0] rounded-full"></span>
                <p>Enhanced food and drink service</p>
              </div>

              <div className="flex gap-4 items-center">
                <span className="block w-[10px] h-[10px] bg-[#5CD6C0] rounded-full"></span>
                <p>Seats that recline 40%</p>
              </div>
            </div>
          </div>
        </div>

        {/* passenger details and save and close section */}
        <div className="border-t bg-[#cbd4e630] h-full py-4 px-6 flex justify-between items-center">
          <div className="flex gap-10">
            <div>
              <h3 className="text-light-grey">Passenger 1</h3>
              <p className="font-semibold text-gray-600 text-lg">
                {flightState.passenger.pFirstName + " " + flightState.passenger.pLastName}
              </p>
            </div>

            <div>
              <h3 className="text-light-grey">Seat number</h3>
              <p className="font-semibold text-gray-600 text-lg">{pickedSeat || "Not selected"}</p>
            </div>
          </div>

          <button className="border px-5 py-3 rounded border-mainC text-mainC"
          onClick={handleSaveAndClose}
          >Save and close</button>
        </div>
      </div>
    </main>
  );
}
