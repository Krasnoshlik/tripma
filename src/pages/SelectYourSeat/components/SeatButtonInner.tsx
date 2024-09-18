
export default function SeatButtonInner({seat,pickedSeat}:{seat: string, pickedSeat: string}) {
  return (
    <div className={` w-[30px] h-[40px] ${pickedSeat === seat ? 'bg-[#5CD6C0]' : ''} rounded-[4px]`}></div>
  )
}
