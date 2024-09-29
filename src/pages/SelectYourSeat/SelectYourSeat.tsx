import { useEffect, useState } from "react";
import ArrowToRightImage from "../../assets/images/arrow-to-right.png";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setSeat } from "../../store/slices/flightSlice";
import PlaneWithSeats from "./components/PlaneWithSeats";
import EconomySeats from "./components/EconomySeats";
import BusinessSeats from "./components/BusinessSeats";
import { motion } from "framer-motion";

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
  const navigate = useNavigate();
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
  const [pickedClass, setPickedClass] = useState(false);
  const [openAirplane, setOpenAirplane] = useState(false);

  const handleSaveAndClose = () => {
    dispatch(setSeat(pickedSeat));
    navigate("/flight/airplane-seat/pay-and-confirm");
  };

  useEffect(() => {
    if (pickedSeat.length !== 0) {
      setOpenAirplane(false);
    }
  },[pickedSeat])

  return (
    <main className="max-w-7xl m-auto mt-[100px] mb-20 px-4 flex justify-center clas:justify-between">
      {/* left plane section */}
      <div className=" hidden clas:block clas:self-end">
        <PlaneWithSeats setPickedSeat={setPickedSeat} pickedSeat={pickedSeat} />
      </div>
      {/* right details section */}
      <div className="border flex flex-col">
        <div className="w-full bg-gray-900 text-white p-5 flex flex-col clas:flex-row gap-8">
          <div className="w-full flex gap-2 clas:gap-5 items-center font-medium justify-between">
            <p className="max-w-48 text-sm clas:text-base">{FromWhereFlight}</p>
            <img
              src={ArrowToRightImage}
              alt="arrow right"
              className="w-[20px] h-[16px]"
            />
            <p className="max-w-48 mr-2 text-sm clas:text-base">{ToWhereFlight}</p>
          </div>

          <div className="w-full flex bg-mainC rounded-lg py-3 justify-between">
            <div className=" px-4 flex flex-col items-center justify-center">
              <p className=" w-max">{departure}</p>
              <p className=" text-gray-300 text-sm">
                Departing
              </p>
            </div>

            <div className=" px-3 flex flex-col items-center justify-center">
              <p className="w-max">{landing}</p>
              <p className="text-gray-300 text-sm ">Arriving</p>
            </div>
          </div>
        </div>

        {/* seats type details section */}
        <div className="flex justify-center clas:justify-between p-10 text-light-grey font-medium">
          <div className=" clas:hidden">
            {pickedClass ? <EconomySeats /> : <BusinessSeats show={false} />}
          </div>
          <div className=" hidden clas:flex clas:justify-between clas:w-full">
            <EconomySeats />
            <BusinessSeats show={true} />
          </div>
        </div>

        <div className=" self-center flex gap-5 mb-2 clas:hidden">
          <button
            className=" border px-2 py-1 rounded border-mainC text-mainC"
            onClick={() => setPickedClass(true)}
          >
            Business class
          </button>
          <button
            className=" border px-2 py-1 rounded border-mainC text-mainC"
            onClick={() => setPickedClass(false)}
          >
            Economy class
          </button>
        </div>

        {/* passenger details and save and close section */}
        <div className="border-t bg-[#cbd4e630] h-full py-4 px-6 flex justify-between items-center">
          <div className="flex gap-2 clas:gap-10">
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

          {pickedSeat.length !== 0 ? (
            <button
              className="border px-3 py-2 text-sm rounded border-mainC text-mainC"
              onClick={handleSaveAndClose}
            >
              Save and close
            </button>
          ) : (
            <p className=" text-mainC">Please select seat</p>
          )}
        </div>
      </div>
      {!openAirplane && (
        <div className="fixed bottom-5 right-5">
          <button
            className="bg-mainC text-white p-3 rounded-lg"
            onClick={() => setOpenAirplane(true)}
          >
            Open airplane
          </button>
        </div>
      )}

      {openAirplane && (
        <motion.div
          className="fixed bottom-0"
          initial={{ y: "100vh" }}
          animate={{ y: 0 }}
          exit={{ y: "100vh" }}
          transition={{ duration: 0.5 }}
        >
          <PlaneWithSeats
            setPickedSeat={setPickedSeat}
            pickedSeat={pickedSeat}
          />
        </motion.div>
      )}
    </main>
  );
}
