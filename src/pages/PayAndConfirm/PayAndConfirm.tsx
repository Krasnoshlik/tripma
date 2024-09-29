import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import VisaLogo from "../../assets/images/visa.png";
import { HotelsArr } from '../../../data/hotels';
import FlightMap from '../../assets/images/FlightMap.png';
import GenerateTicketPng from "../../node/pngGenerator.ts";
import PaymentCard from "./components/PaymentCard.tsx";
import CardModal from "./components/CardModal.tsx";
import PayAndPrice from "./components/PayAndPrice.tsx";

export interface CardType {
  expiryDate?: string;
  number?: string;
  date?: string;
  name?: string;
  cvv?: string;
  type?: string;
}

export default function PayAndConfirm() {
  const flightState = useSelector((state: RootState) => state.flight);
  const passenger = useSelector((state: RootState) => state.passenger.passenger);

  const [card, setCard] = useState<CardType>({
    number: "••••••••••••••••",
    date: "••/••",
    name: "Card holder name",
    cvv: "•••",
    type: VisaLogo,
  });

  const [cardInfoModalOpen, setCardInfoModalOpen] = useState(false);

  const handleGenerateTicket = () => {
    GenerateTicketPng(passenger, flightState.flight);
  };

  return (
    <main className="max-w-7xl m-auto mt-[100px] mb-20 px-4 flex flex-col gap-4 items-center clas:justify-between clas:flex-row ">
      {/*left section*/}
      <section className=" max-w-[768px] flex flex-col gap-8 justify-between">
        <div className=" flex flex-col gap-2">
          <h2 className=" font-bold text-mainC text-2xl">
            Bon voyage, {flightState.passenger.pFirstName}
          </h2>
          <p className=" text-light-grey text-lg">
            Thank you for booking your travel with Tripma! Below is a summary of
            your trip to Narita airport in Tokyo, Japan. We’ve sent a copy of
            your booking confirmation to your email address. You can also find
            this page again in
            <span className="font-bold text-mainC"> My trips. </span>
          </p>
        </div>

        <div className=" flex flex-col gap-2">
          <h2 className=" font-bold text-gray-500 text-2xl">Flight summary</h2>
          <div className=" border p-2 rounded-md">
            <div className=" grid grid-cols-5 gap-5 items-center text-gray-900 rounded-lg">
              <div className=" flex gap-4 items-center">
                <img
                  src={flightState.flight.PickedFlight.img}
                  alt="e image"
                  className=" w-[30px] h-[25px]"
                />
                <p className=" text-light-grey">
                  {flightState.flight.PickedFlight.companyTitle}
                </p>
              </div>

              <p>{flightState.flight.PickedFlight.duration}</p>

              <p>{flightState.flight.PickedFlight.travelTime}</p>

              <div>
                <p>{flightState.flight.PickedFlight.stop}</p>
                <p className=" text-light-grey">
                  {flightState.flight.PickedFlight.stopTime}
                </p>
              </div>

              <p className="">$ {flightState.flight.PickedFlight.price}</p>
            </div>
          </div>
        </div>

          <div className=" flex flex-col small:flex-row gap-5 justify-between">
              <PayAndPrice flightState={flightState}/>

              <PaymentCard card={card} setCardInfoModalOpen={setCardInfoModalOpen}/>

          </div>

        <div>
          <button className=" border rounded-lg p-2 border-mainC text-mainC" onClick={handleGenerateTicket}>
            Download ticket
          </button>
        </div>

        <div>
          <h3 className=" font-bold text-gray-500 text-2xl mb-2">Flight Route</h3>

          <img src={FlightMap} alt="" />
        </div>
      </section>

      {/* Modal for card */}
      {cardInfoModalOpen && (
        <CardModal setCard={setCard} setCardInfoModalOpen={setCardInfoModalOpen}/>
      )}

      <aside>
        <ul className=" flex flex-wrap clas:flex-col gap-5 justify-center">
        {
          HotelsArr.map((e,i) => {
            return (
              <li
            key={i}
            className=" rounded-xl flex flex-col overflow-hidden shadow-md min-w-[260px] max-w-[350px] clas:max-w-[400px]"
          >
            <img src={e.img} alt="card image" />

            <div className=" flex flex-wrap justify-between py-4 px-6">
              <div>
                <div className=" flex gap-1">
                  <h3 className=" text-light-grey text-sm">{e.title}</h3>
                </div>
                <p className=" text-[#7C8DB0] text-sm">{e.disc}</p>
              </div>

              <div className=" text-[#6E7491]">$ {e.price}</div>
            </div>
          </li>
            )
          })
        }
        </ul>
      </aside>
    </main>
  );
}
