import BusinessSeatsImage from "../../../assets/images/BusinessSeats.png";

const BuisinessArr = [
  "Extended leg room",
  "First two checked bags free",
  "Priority boarding",
  "Personalized service",
  "Enhanced food and drink service",
  "Seats that recline 40%",
];

export default function BusinessSeats({ show }: { show: boolean }) {
  return (
    <div className="flex flex-col gap-5 max-w-[320px]">
      <img src={BusinessSeatsImage} alt="Seats image" />
      <div className=" flex gap-4">
        <h3>Business class</h3>
        {show && (
          <p className="bg-mainC rounded-lg text-white px-1">Selected</p>
        )}
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
  );
}
