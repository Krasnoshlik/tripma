import HawaiiImage from '../src/assets/images/aircompany.png';
import JapanImage from '../src/assets/images/aircompany2.png';
import SomeImage from '../src/assets/images/aircompany3.png';
import DeltaImage from '../src/assets/images/aircompany4.png';
import QantasImage from '../src/assets/images/aircompany5.png';

export const DepartingFlightsArr: {
    img: string,
    companyTitle: string,
    travelTime: string,
    price: number,
    duration: string,
}[] = [
    {
        img: HawaiiImage,
        companyTitle: 'Hawaiian Airlines',
        travelTime: '7:00AM - 4:15PM',
        price: 624,
        duration: '16h 45m',
    },
    {
        img: JapanImage,
        companyTitle: 'Japan Airlines',
        travelTime: '7:35 AM - 12:15 PM',
        price: 663,
        duration: '18h 22m',
    },
    {
        img: HawaiiImage,
        companyTitle: 'Hawaiian Airlines',
        travelTime: '8:20 AM - 2:15 PM',
        price: 690,
        duration: '18h 04m',
    },
    {
        img: DeltaImage,
        companyTitle: 'Delta',
        travelTime: '9:47 AM - 4:15 PM',
        price: 756,
        duration: '18h 52m',
    },
    {
        img: SomeImage,
        companyTitle: 'Hawaiian Airlines',
        travelTime: '11:15 AM - 7:45 PM',
        price: 837,
        duration: '16h 05m',
    },
    {
        img: QantasImage,
        companyTitle: 'Qantas Airlines',
        travelTime: '10:55 AM - 8:15 PM',
        price: 839,
        duration: '15h 45m',
    },
] 