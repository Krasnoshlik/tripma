import Image1 from '../src/assets/images/hotels/image1.png';
import Image2 from '../src/assets/images/hotels/image2.png';
import Image3 from '../src/assets/images/hotels/image3.png';
import Image4 from '../src/assets/images/hotels/image4.png';
import { HotelsArrType } from './types.ds';


export const HotelsArr: HotelsArrType[] = [
    {
        img: Image1,
        title: 'Ryokan Japan',
        price: 439,
        disc: 'Enjoy views of the garden from your room',
    },
    {
        img: Image2,
        title: 'Bessho SASA',
        price: 529,
        disc: 'Japanese ryokan with private onsen bath',
    },
    {
        img: Image3,
        title: 'HOTEL THE FLAG 大阪市',
        price: 139,
        disc: 'Modern hotel in the heart of Osaka',
    },
    {
        img: Image4,
        title: '9 Hours Shinjuku',
        price: 59,
        disc: 'A convenient capsule hotel at Shinjuku station',
    },
]