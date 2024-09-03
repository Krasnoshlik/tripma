"use client"
import FromAirplaineImage from '../../assets/images/fromAirplane.png';
import ToAirplaineImage from '../../assets/images/toAirplane.png';
import personImage from '../../assets/images/person.png';
import { useState } from 'react';
import { flightsArr } from '../../../data/flights';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

export default function Home() {
  const [personCount, setPersonCount] = useState(1);
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);

  const handleFromSelect = (item) => {
    setFromLocation(item);
  };

  const handleToSelect = (item) => {
    setToLocation(item);
  };

  const commonInputStyle = {
    padding: '0px',
    width: '100%',
    background: 'transparent',
    border: 'none', 
    outline: 'none',
    boxShadow: 'none', 
    hoverBackgroundColor: 'transparent',
    color: '#7C8DB0',
    clearIconMargin: '0 2px 0 0',
    clearIconVisibility: 'visible',
    searchIconMargin: '0',
    height: '42px',
  };

  const wrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '0px',
    borderRight: 'none',
  };

  return (
    <main className=" mt-[70px]">
      <section className=" mainPage w-full h-[700px]">
        <div className=" max-w-7xl m-auto flex flex-col gap-20 items-center pt-[100px] text-center">
          <h3 className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent text-[80px] font-bold max-w-[600px] leading-[110%]">
            It's more than just a trip
          </h3>

          <div className=" shadow-lg rounded border border-gray-200 bg-white flex">
            {/* From where autocomplete input */}
            <div style={wrapperStyle} className="flex items-center border-r">
              <img src={FromAirplaineImage} alt="input image" className=' max-w-[28px] max-h-[28px] ml-2'/>
              <div className="w-[220px]">
                <ReactSearchAutocomplete
                  items={flightsArr}
                  onSelect={handleFromSelect}
                  placeholder="From where?"
                  fuseOptions={{ keys: ["name", "abr"] }} 
                  resultStringKeyName="name" 
                  showIcon={false}
                  styling={{
                    ...commonInputStyle,
                  }}
                />
              </div>
            </div>


            {/* Where to autocomplete input */}
            <div style={wrapperStyle} className="flex items-center">
              <img src={ToAirplaineImage} alt="input image" className=' max-w-[28px] max-h-[28px] ml-2'/>
              <div className="w-[220px]">
                <ReactSearchAutocomplete
                  items={flightsArr}
                  onSelect={handleToSelect}
                  placeholder="Where to?"
                  fuseOptions={{ keys: ["name", "abr"] }}
                  resultStringKeyName="name" 
                  showIcon={false} 
                  styling={{
                    ...commonInputStyle,
                  }}
                />
              </div>
            </div>

            {/* Date input */}
            <div className='flex items-center'>
              <input
                type="date"
                name="date"
                id="date"
                className="py-2 px-4 outline-none border-x border-gray-200 text-light-grey"
                defaultValue={new Date().toISOString().slice(0, 10)}
              />
            </div>

            {/* Person count input */}
            <div className=' flex items-center px-2'>
              <img src={personImage} alt="input image" className=' max-w-[28px] max-h-[28px] mr-1'/>
              <div className=' flex gap-1 items-center'>
                <button
                  onClick={() => setPersonCount(personCount > 1 ? personCount - 1 : 1)}
                  className=' bg-mainC text-white w-[20px] h-[20px] flex items-center justify-center rounded-lg'
                >-</button>
                <p className=' text-lg font-bold text-mainC'>
                  {personCount}
                </p>
                <button
                  onClick={() => setPersonCount(personCount < 9 ? personCount + 1 : personCount)}
                  className=' bg-mainC text-white w-[20px] h-[20px] flex items-center justify-center rounded-lg'
                >+</button>
              </div>
            </div>

            <button className=" h-[42px] px-4 rounded bg-mainC text-white">Search</button>
          </div>
        </div>
      </section>
    </main>
  );
}
