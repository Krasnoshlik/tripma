import EconomySeatsImage from "../../../assets/images/EconomySeats.png";

const EconomyArr = [
    "Built-in entertainment system",
    "Complimentary snacks and drinks",
    "One free carry-on and personal item",
];

export default function EconomySeats() {
  return (
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
  )
}
