import { DepartingFlightsArrType } from '../../../store/types';
import { useNavigate } from 'react-router-dom';
import { setPickedFlight } from '../../../store/slices/flightSlice';
import { setPassengerSlice } from '../../../store/slices/passengerSlice';
import { useDispatch } from 'react-redux';
import { useUser } from '@clerk/clerk-react';
import { db } from '../../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export default function FlightDepartLine({ e }: { e: DepartingFlightsArrType }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSignedIn } = useUser();

  const handleSetPickedFlight = () => {
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

    if (isSignedIn && user) {
      const checkAndFetchUserInfo = async () => {
        const userDocRef = doc(db, "users", user.id);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();

          dispatch(setPassengerSlice({
            pFirstName: userData.firstName || '',
            pMiddleName: userData.middleName || '',
            pLastName: userData.lastName || '',
            suffix: userData.suffix || '',
            birthDate: userData.birthDate || '',
            pEmail: userData.email || '',
            pPhone: userData.phoneNumber || 0,
            pRedressPhone: userData.redressNumber || 0,
            pKnowPhone: userData.knownTravelerNumber || 0,
            pEmergencyFirstName: userData.emergencyContact?.firstName || '',
            pEmergencyLastName: userData.emergencyContact?.lastName || '',
            pEmergencyEmail: userData.emergencyContact?.email || '',
            pEmergencyPhone: userData.emergencyContact?.phoneNumber || 0,
          }));
          navigate("/flight/airplane-seat");
        } else {
          navigate("/flight/Passenger-Information");
        }
      };

      checkAndFetchUserInfo();
    } else {
      navigate("/flight/Passenger-Information");
    }
  };

  return (
    <div
      className='grid clas:grid-cols-5 grid-cols-3 gap-5 items-center text-gray-900 hover:cursor-pointer hover:bg-slate-50 rounded-lg'
      onClick={handleSetPickedFlight}
    >
      <div className='flex flex-col clas:flex-row gap-4 items-center'>
        <img src={e.img} alt="e image" className='w-[30px] h-[25px]' />
        <p className='text-light-grey'>{e.companyTitle}</p>
      </div>

      <p>{e.duration}</p>

      <p>{e.travelTime}</p>

      <div className=''>
        <p>{e.stop}</p>
        <p className='text-light-grey'>{e.stopTime}</p>
      </div>

      <p className=' flex justify-end'>$ {e.price}</p>
    </div>
  );
}
