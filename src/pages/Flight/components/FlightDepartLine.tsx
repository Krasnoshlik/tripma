import React from 'react';

import { DepartingFlightsArrType } from '../../../store/types';
import { Link } from 'react-router-dom';
import { setPickedFlight } from '../../../store/slices/flightSlice';
import { useDispatch } from 'react-redux';

export default function FlightDepartLine({e}:{e: DepartingFlightsArrType}) {
  const dispatch = useDispatch();

  function handleSetPickedFlight() {
    dispatch(
      setPickedFlight({
        img: e.img,
        companyTitle: e.companyTitle,
        travelTime: e.travelTime,
        price: e.price,
        duration: e.duration,
        stop: e.stop,
        stopTime: e.stopTime,
      })
    );
  }

  return (
    <Link to="/flight/Passenger-Information" onClick={handleSetPickedFlight}>
    <div className=' grid grid-cols-5 gap-5 items-center text-gray-900 hover:cursor-pointer hover:bg-slate-50 rounded-lg'    
    >
      <div className=' flex gap-4 items-center'>
      <img src={e.img} alt="e image" className=' w-[30px] h-[25px]'/>
      <p className=' text-light-grey'>{e.companyTitle}</p>
      </div>

      <p>{e.duration}</p>

      <p>{e.travelTime}</p>

      <div>
        <p>{e.stop}</p>
        <p  className=' text-light-grey'>{e.stopTime}</p>
      </div>

      <p className=''>$ {e.price}</p>
    </div>
    </Link>
  )
}
