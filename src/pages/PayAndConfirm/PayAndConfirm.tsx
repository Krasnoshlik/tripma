import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import VisaLogo from "../../assets/images/visa.png";
import MastercardLogo from "../../assets/images/mc_sym_debit_pos_46_1x.png";
import { motion } from "framer-motion";
import { HotelsArr } from '../../../data/hotels';
import FlightMap from '../../assets/images/FlightMap.png';
import GenerateTicketPng from "../../node/pngGenerator.ts";

interface CardErrors {
  name?: string;
  number?: string;
  expiryDate?: string;
  cvv?: string;
}

export default function PayAndConfirm() {
  const flightState = useSelector((state: RootState) => state.flight);
  const passenger = useSelector((state: RootState) => state.passenger.passenger);

  const [card, setCard] = useState({
    number: "••••••••••••••••",
    date: "••/••",
    name: "Card holder name",
    cvv: "•••",
    type: VisaLogo,
  });

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const [cardInfoModalOpen, setCardInfoModalOpen] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    number?: string;
    expiryDate?: string;
    cvv?: string;
  }>({});

  function CardInfoValidation() {
    const newErrors: CardErrors = {};

    const cardNumberRegex = /^\d{16}$/;
    const cvvRegex = /^\d{3}$/;

    const nameParts = cardName.trim().split(" ");

    if (!cardName.trim()) {
      newErrors.name = "Card holder name is required";
    } else if (nameParts.length < 2) {
      newErrors.name = "Name must contain at least two words";
    } else if (cardName.length < 6) {
      newErrors.name = "Name must be at least 6 characters long";
    }

    if (!cardNumberRegex.test(cardNumber)) {
      newErrors.number = "Card number must be 16 digits";
    }

    if (!expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
    }

    if (!cvvRegex.test(cvv)) {
      newErrors.cvv = "CVV must be 3 digits";
    }

    return newErrors;
  }

  const handleSaveCardInfo = () => {
    const validationErrors = CardInfoValidation();

    if (Object.keys(validationErrors).length === 0) {
      setCard({
        name: cardName,
        number: `•••• •••• •••• ${cardNumber.slice(-4)}`,
        date: expiryDate,
        cvv: cvv,
        type: +cardNumber.slice(0, 1) === 4 ? VisaLogo : MastercardLogo,
      });
      setCardInfoModalOpen(false);
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const handleGenerateTicket = () => {
    GenerateTicketPng(passenger, flightState.flight);
  };

  return (
    <main className="max-w-7xl m-auto mt-[100px] mb-20 px-4 flex justify-between">
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

          <div className=" flex gap-5 justify-between">
              <div className=" flex flex-col gap-2 max-w-[400px]">
                <h2 className=" font-bold text-gray-500 text-2xl">
                  Person information
                </h2>
                <div>
                  <h3 className=" text-light-grey text-lg">
                    {flightState.passenger.pFirstName}{" "}
                    {flightState.passenger.pLastName}, {flightState.passenger.pEmail},
                    {flightState.passenger.pKnowPhone}
                  </h3>
                </div>
                <div>
                  <h2 className=" font-bold text-gray-500 text-2xl mb-2">
                    Price information
                  </h2>
                  <div className=" flex flex-col gap-1">
                    <div className=" flex justify-between text-light-grey">
                      <p>Departing Flight</p>
                      <p>${flightState.flight.PickedFlight.price}</p>
                    </div>
                    <div className=" flex justify-between text-light-grey">
                      <p>Baggage fees</p>
                      <p>$0</p>
                    </div>
                    <div className=" flex justify-between text-light-grey">
                      <p>Seat upgrade (business)</p>
                      <p>$ 200</p>
                    </div>
                    <div className=" flex justify-between text-light-grey">
                      <p>Subtotal</p>
                      <p>$ {200 + flightState.flight.PickedFlight.price}</p>
                    </div>
                    <div className=" flex justify-between text-light-grey">
                      <p>Taxes (9.4%)</p>
                      <p>
                        ${" "}
                        {(
                          (200 + flightState.flight.PickedFlight.price) *
                          0.094
                        ).toFixed()}
                      </p>
                    </div>
                  </div>
                  <div className=" border-y py-2 mt-4 flex justify-between">
                    <p>Subtotal</p>
                    <p>
                      ${" "}
                      {200 +
                        flightState.flight.PickedFlight.price +
                        +(
                          (200 + flightState.flight.PickedFlight.price) *
                          0.094
                        ).toFixed()}
                    </p>
                  </div>
                </div>
              </div>

              <div className=" flex flex-col gap-2 max-w-[300px]">
                <h2 className=" font-bold text-gray-500 text-2xl">Payment method</h2>
                <h2 className=" text-sm text-light-grey">
                  (hover card below to see CVV and click to change information)
                </h2>

                <div
                  className="relative w-[300px] h-[188px] group perspective hover:cursor-pointer"
                  onClick={() => setCardInfoModalOpen(true)}
                >
                  <motion.div
                    className="absolute inset-0 w-full h-full"
                    style={{
                      transformStyle: "preserve-3d",
                      perspective: 1000,
                    }}
                    whileHover={{ rotateY: 180 }}
                    transition={{ duration: 0.8 }}
                  >
                    {/* Front Side */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#EB568C] to-[#ED5E76] rounded-2xl w-full h-full px-6 py-7 font-semibold text-lg text-[#F6F6FE] flex justify-between items-center"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(0deg)",
                      }}
                    >
                      <div className="h-full flex flex-col justify-between items-start">
                        <img
                          src={card.type}
                          alt="card type"
                          className={`' ' ${card.type === VisaLogo ? "h-5" : "h-14"}`}
                        />
                        <div>
                          <h3>{card.name}</h3>
                          <h3>{card.number}</h3>
                        </div>
                      </div>
                      <h3 className=" self-end">{card.date}</h3>
                    </motion.div>

                    {/* Back Side */}
                    <motion.div
                      className="absolute inset-0 bg-gray-200 rounded-2xl w-full h-full px-6 py-7 bg-gradient-to-r from-[#EB568C] to-[#ED5E76] font-semibold text-lg text-[#F6F6FE] flex justify-center items-center"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <h3>CVV : {card.cvv}</h3>
                    </motion.div>
                  </motion.div>
                </div>
              </div>

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
        <div className=" fixed top-0 left-0 w-screen h-screen bg-gray-500 bg-opacity-50 flex">
          <div className=" relative m-auto bg-white max-w-96 rounded-lg p-4 flex flex-col gap-4">
            <div className=" flex justify-between gap-10">
              <h3 className=" font-bold text-gray-500 text-2xl">
                Fill payment information
              </h3>
              <button onClick={() => setCardInfoModalOpen(false)}>x</button>
            </div>

            {/* Card Holder Name */}
            <label htmlFor="cardName" className="flex flex-col gap-1">
              Card holder name:
              <input
                type="text"
                className={`border ${
                  errors.name ? "border-red-500" : "border-light-grey"
                } rounded-sm outline-none pl-2`}
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name}</span>
              )}
            </label>

            {/* Card Number */}
            <label htmlFor="cardNumber" className="flex flex-col gap-1">
              Card number:
              <input
                type="number"
                className={`border ${
                  errors.number ? "border-red-500" : "border-light-grey"
                } rounded-sm outline-none pl-2`}
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              {errors.number && (
                <span className="text-red-500 text-sm">{errors.number}</span>
              )}
            </label>

            <div className="flex gap-5">
              {/* Expiry Date */}
              <label htmlFor="expiryDate" className="flex gap-2">
                Expiry date
                <input
                  type="month"
                  className={`border ${
                    errors.expiryDate ? "border-red-500" : "border-light-grey"
                  } rounded-sm outline-none pl-2 max-h-[30px] max-w-[140px]`}
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
                {errors.expiryDate && (
                  <span className="text-red-500 text-sm">
                    {errors.expiryDate}
                  </span>
                )}
              </label>

              {/* CVV */}
              <label htmlFor="cvv" className="flex gap-2">
                CVV
                <input
                  type="number"
                  className={`border ${
                    errors.cvv ? "border-red-500" : "border-light-grey"
                  } rounded-sm outline-none text-sm pl-2 max-w-[50px] max-h-[30px]`}
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
                {errors.cvv && (
                  <span className="text-red-500 text-sm">{errors.cvv}</span>
                )}
              </label>
            </div>

            {/* Save button */}
            <button
              className=" border border-light-grey"
              onClick={handleSaveCardInfo}
            >
              Save info
            </button>
          </div>
        </div>
      )}

      <aside>
        <ul className=" flex flex-col gap-5">
        {
          HotelsArr.map((e,i) => {
            return (
              <li
            key={i}
            className=" rounded-xl flex flex-col overflow-hidden shadow-md"
          >
            <img src={e.img} alt="card image" />

            <div className=" flex justify-between py-4 px-6">
              <div>
                <div className=" flex gap-1">
                  <h3 className=" text-light-grey">{e.title}</h3>
                </div>
                <p className=" text-[#7C8DB0]">{e.disc}</p>
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
