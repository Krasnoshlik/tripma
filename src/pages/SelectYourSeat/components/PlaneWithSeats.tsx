import React, { Dispatch, SetStateAction } from "react";
import ImageWithSeats from "../../../assets/images/Plane.png";
import SeatButtonInner from "./SeatButtonInner";

export default function PlaneWithSeats({
  pickedSeat,
  setPickedSeat,
}: {
  pickedSeat: string;
  setPickedSeat: Dispatch<SetStateAction<string>>;
}) {
  const handleSeatClick = (seat: string) => {
    setPickedSeat(seat);
  };

  return (
    <div>
      <img src={ImageWithSeats} alt="Plane" />
      <div className="relative">
        <div className="absolute bottom-[42px] left-[58px] flex flex-col gap-5">
          <div className="flex gap-[47px]">
            <div className="flex gap-[8.5px]">
              <button onClick={() => handleSeatClick("1A")}>
                <SeatButtonInner seat="1A" pickedSeat={pickedSeat} />
              </button>
              <button onClick={() => handleSeatClick("1B")}>
                <SeatButtonInner seat="1B" pickedSeat={pickedSeat} />
              </button>
            </div>

            <div className="flex gap-[8.5px]">
              <button onClick={() => handleSeatClick("1C")}>
                <SeatButtonInner seat="1C" pickedSeat={pickedSeat} />
              </button>
              <button onClick={() => handleSeatClick("1D")}>
                <SeatButtonInner seat="1D" pickedSeat={pickedSeat} />
              </button>
            </div>
          </div>

          <div className="flex gap-[47px]">
            <div className="flex gap-[8.5px]">
              <button onClick={() => handleSeatClick("2A")}>
                <SeatButtonInner seat="2A" pickedSeat={pickedSeat} />
              </button>
              <button onClick={() => handleSeatClick("2B")}>
                <SeatButtonInner seat="2B" pickedSeat={pickedSeat} />
              </button>
            </div>

            <div className="flex gap-[8.5px]">
              <button onClick={() => handleSeatClick("2C")}>
                <SeatButtonInner seat="2C" pickedSeat={pickedSeat} />
              </button>
              <button onClick={() => handleSeatClick("2D")}>
                <SeatButtonInner seat="2D" pickedSeat={pickedSeat} />
              </button>
            </div>
          </div>

          <div className="flex gap-[47px]">
            <div className="flex gap-[8.5px]">
              <button onClick={() => handleSeatClick("3A")}>
                <SeatButtonInner seat="3A" pickedSeat={pickedSeat} />
              </button>
              <button onClick={() => handleSeatClick("3B")}>
                <SeatButtonInner seat="3B" pickedSeat={pickedSeat} />
              </button>
            </div>

            <div className="flex gap-[8.5px]">
              <button onClick={() => handleSeatClick("3C")}>
                <SeatButtonInner seat="3C" pickedSeat={pickedSeat} />
              </button>
              <button onClick={() => handleSeatClick("3D")}>
                <SeatButtonInner seat="3D" pickedSeat={pickedSeat} />
              </button>
            </div>
          </div>

          <div className="flex gap-[47px]">
            <div className="flex gap-[8.5px]">
              <button onClick={() => handleSeatClick("4A")}>
                <SeatButtonInner seat="4A" pickedSeat={pickedSeat} />
              </button>
              <button onClick={() => handleSeatClick("4B")}>
                <SeatButtonInner seat="4B" pickedSeat={pickedSeat} />
              </button>
            </div>

            <div className="flex gap-[8.5px]">
              <button onClick={() => handleSeatClick("4C")}>
                <SeatButtonInner seat="4C" pickedSeat={pickedSeat} />
              </button>
              <button onClick={() => handleSeatClick("4D")}>
                <SeatButtonInner seat="4D" pickedSeat={pickedSeat} />
              </button>
            </div>
          </div>

          <div className="flex gap-[47px]">
            <div className="flex gap-[8.5px]">
              <button onClick={() => handleSeatClick("5A")}>
                <SeatButtonInner seat="5A" pickedSeat={pickedSeat} />
              </button>
              <button onClick={() => handleSeatClick("5B")}>
                <SeatButtonInner seat="5B" pickedSeat={pickedSeat} />
              </button>
            </div>

            <div className="flex gap-[8.5px]">
              <button onClick={() => handleSeatClick("5C")}>
                <SeatButtonInner seat="5C" pickedSeat={pickedSeat} />
              </button>
              <button onClick={() => handleSeatClick("5D")}>
                <SeatButtonInner seat="5D" pickedSeat={pickedSeat} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
