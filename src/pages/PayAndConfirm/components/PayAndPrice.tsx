import { RootState } from "../../../store/store";

interface PayAndPriceProps {
    flightState: RootState['flight'];
  }
  
  export default function PayAndPrice({ flightState }: PayAndPriceProps) {
    return (
      <div className="flex flex-col gap-2 max-w-[400px]">
        <h2 className="font-bold text-gray-500 text-2xl">Person information</h2>
        <div>
          <h3 className="text-light-grey text-lg">
            {flightState.passenger.pFirstName} {flightState.passenger.pLastName}, {flightState.passenger.pEmail}, {flightState.passenger.pKnowPhone}
          </h3>
        </div>
        <div>
          <h2 className="font-bold text-gray-500 text-2xl mb-2">Price information</h2>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-light-grey">
              <p>Departing Flight</p>
              <p>${flightState.flight.PickedFlight.price}</p>
            </div>
            <div className="flex justify-between text-light-grey">
              <p>Baggage fees</p>
              <p>$0</p>
            </div>
            <div className="flex justify-between text-light-grey">
              <p>Seat upgrade (business)</p>
              <p>$200</p>
            </div>
            <div className="flex justify-between text-light-grey">
              <p>Subtotal</p>
              <p>${200 + flightState.flight.PickedFlight.price}</p>
            </div>
            <div className="flex justify-between text-light-grey">
              <p>Taxes (9.4%)</p>
              <p>
                ${((200 + flightState.flight.PickedFlight.price) * 0.094).toFixed()}
              </p>
            </div>
          </div>
          <div className="border-y py-2 mt-4 flex justify-between">
            <p>Subtotal</p>
            <p>
              ${200 + flightState.flight.PickedFlight.price + Number(((200 + flightState.flight.PickedFlight.price) * 0.094).toFixed())}
            </p>
          </div>
        </div>
      </div>
    );
  }
  
