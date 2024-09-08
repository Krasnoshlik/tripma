import HawaiiImage from '../src/assets/images/aircompany.png';
import JapanImage from '../src/assets/images/aircompany2.png';
import SomeImage from '../src/assets/images/aircompany3.png';
import DeltaImage from '../src/assets/images/aircompany4.png';
import QantasImage from '../src/assets/images/aircompany5.png';

import { DepartingFlightsArrType } from '../src/store/types';

export const DepartingFlightsArr: DepartingFlightsArrType[] = [
    {
        img: HawaiiImage,
        companyTitle: 'Hawaiian Airlines',
        travelTime: '7:00AM - 4:15PM',
        price: 624,
        duration: '16h 45m',
        stop: '1 stop',
        stopTime: '2h 45m in HNL',
    },
    {
        img: JapanImage,
        companyTitle: 'Japan Airlines',
        travelTime: '7:35 AM - 12:15 PM',
        price: 663,
        duration: '18h 22m',
        stop: '1 stop',
        stopTime: '50m in HKG',
    },
    {
        img: HawaiiImage,
        companyTitle: 'Hawaiian Airlines',
        travelTime: '8:20 AM - 2:15 PM',
        price: 690,
        duration: '18h 04m',
        stop: '1 stop',
        stopTime: '1h 50m in PVG',
    },
    {
        img: DeltaImage,
        companyTitle: 'Delta',
        travelTime: '9:47 AM - 4:15 PM',
        price: 756,
        duration: '18h 52m',
        stop: '1 stop',
        stopTime: '4h 05m in ICN',
    },
    {
        img: SomeImage,
        companyTitle: 'Hawaiian Airlines',
        travelTime: '11:15 AM - 7:45 PM',
        price: 837,
        duration: '16h 05m',
        stop: 'Nonstop',
        stopTime: '',
    },
    {
        img: QantasImage,
        companyTitle: 'Qantas Airlines',
        travelTime: '10:55 AM - 8:15 PM',
        price: 839,
        duration: '15h 45m',
        stop: 'Nonstop',
        stopTime: '',
    },
] 