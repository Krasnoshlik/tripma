import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { DepartingFlightsArr } from '../../../../data/departingFlights';
import FlightDepartLine from "./FlightDepartLine";

export default function MainSection() {
  const FlightData = useSelector((state: RootState) => state.flight);

  console.log(FlightData)
  return (
  <section className=" max-w-7xl m-auto px-4">
    <div>
        <h3 className=" text-light-grey">Choose a <span className=" text-mainC">departing</span> flight</h3>

        <div>
            {
                DepartingFlightsArr.map((e, i) => {
                    return (
                        <FlightDepartLine key={i} e={e}/>
                    )
                })
            }
        </div>
    </div>
  </section>
  )
}
