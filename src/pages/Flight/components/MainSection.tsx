import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { DepartingFlightsArr } from '../../../../data/departingFlights';
import FlightDepartLine from "./FlightDepartLine";
import EarthMApImage from '../../../assets/images/earth-map.png';
import PriceGridImage from '../../../assets/images/price-grid.png';
import PriceHistoryImage from '../../../assets/images/price-history.png';

export default function MainSection() {
  const FlightData = useSelector((state: RootState) => state.flight);

  console.log(FlightData)
  return (
  <section className=" max-w-7xl m-auto px-4 mb-20">
    <div className=" flex gap-5">

    <div className=" flex flex-col gap-5">
        <h3 className=" text-light-grey">Choose a <span className=" text-mainC">departing</span> flight</h3>

        <div className=" border p-4 rounded-xl">
            {
                DepartingFlightsArr.map((e, i) => {
                    return (
                        <div>
                        {
                            i !== 0 && <span className=" block h-[1px] w-full bg-gray-200 my-2"></span> 
                        }
                        <FlightDepartLine key={i} e={e}/>
                        </div>
                    )
                })
            }
        </div>
            <img src={EarthMApImage} alt="map image" />
    </div>

    <div className=" text-[#6E7491] max-w-[400px] flex flex-col gap-5">
        <div className=" flex flex-col gap-5">
            <h4 className=" font-medium">Price grid</h4>
            <img src={PriceGridImage} alt="price grid"/>
        </div>
        <div className=" flex flex-col gap-5">
            <h4 className=" font-medium">Price history</h4>
            <img src={PriceHistoryImage} alt="price grid"/>
        </div>

        <div className=" flex flex-col gap-5">
            <div className=" flex gap-5">
            <h4>Price rating</h4>
            <p className=" bg-green-500 text-white rounded-md px-2">Buy soon</p>
            </div>
            
            <p>We recommend booking soon. The average cost of this flight is $750, but could rise 18% to $885 in two weeks.
               <br /> <span className=" text-light-grey">Tripma analyzes thousands of flights, prices, and trends to ensure you get the best deal.</span>
            </p>
        </div>
    </div>

    </div>
  </section>
  )
}
