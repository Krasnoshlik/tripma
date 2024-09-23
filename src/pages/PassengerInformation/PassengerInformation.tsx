import React, { useState } from "react";
import bagsImage from "../../assets/images/bags.png";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setPassengerSlice } from "../../store/slices/passengerSlice";
import { useNavigate } from "react-router";
import { useUser } from '@clerk/clerk-react';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../../firebaseConfig'

export default function PersonInformation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for handling inputs
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [suffix, setSuffix] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [redressNumber, setRedressNumber] = useState("");
  const [knownTravelerNumber, setKnownTravelerNumber] = useState("");

  // Emergency contact state
  const [emergencyFirstName, setEmergencyFirstName] = useState("");
  const [emergencyLastName, setEmergencyLastName] = useState("");
  const [emergencyEmail, setEmergencyEmail] = useState("");
  const [emergencyPhoneNumber, setEmergencyPhoneNumber] = useState("");
  const { isSignedIn, user } = useUser();

  // Checkbox state for autofill
  const [autofillEmergencyContact, setAutofillEmergencyContact] = useState(false);

  const [bagsCounter, setBagsCounter] = useState(1);

  const pickedFlightFromPreviousPage = useSelector(
    (state: RootState) => state.flight.flight.PickedFlight
  );

  // Validation errors
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    dateOfBirth: false,
    email: false,
    phoneNumber: false,
    knownTravelerNumber: false,
    emergencyFirstName: false,
    emergencyLastName: false,
    emergencyEmail: false,
    emergencyPhoneNumber: false,
  });

  // Validation function
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhoneNumber = (phone: string) => /^\+?\d{12}$/.test(phone);
  const validateName = (name: string) => /^[A-Za-z][A-Za-z\s-]{1,}$/.test(name);

  const validateForm = () => {
    const newErrors = {
      firstName: !firstName.trim() || !validateName(firstName),
      lastName: !lastName.trim() || !validateName(lastName),
      dateOfBirth: !dateOfBirth.trim(),
      email: !email.trim() || !validateEmail(email),
      phoneNumber: !phoneNumber.trim() || !validatePhoneNumber(phoneNumber),
      knownTravelerNumber: !knownTravelerNumber.trim() || !validatePhoneNumber(knownTravelerNumber),
      emergencyFirstName: !emergencyFirstName.trim() || !validateName(emergencyFirstName),
      emergencyLastName: !emergencyLastName.trim() || !validateName(emergencyLastName),
      emergencyEmail: !emergencyEmail.trim() || !validateEmail(emergencyEmail),
      emergencyPhoneNumber: !emergencyPhoneNumber.trim() || !validatePhoneNumber(emergencyPhoneNumber),
    };
  
    setErrors(newErrors);
  
    // Return true if no errors
    return !Object.values(newErrors).some((error) => error);
  };

  // Handle form submission
  const handleFormSubmit = () => {
    if (validateForm()) {
      dispatch(
        setPassengerSlice({
          pFirstName: firstName,
          pMiddleName: middleName || "",
          pLastName: lastName,
          suffix: suffix || "",
          birthDate: dateOfBirth,
          pEmail: email,
          pPhone: +phoneNumber,
          pRedressPhone: +redressNumber || 0,
          pKnowPhone: +knownTravelerNumber,
          pEmergencyFirstName: emergencyFirstName,
          pEmergencyLastName: emergencyLastName,
          pEmergencyEmail: emergencyEmail,
          pEmergencyPhone: +emergencyPhoneNumber,
        })
      );
      navigate("/flight/airplane-seat");
      console.log("Form submitted successfully!");
    } else {
      console.log("Validation failed. Please check the required fields.");
    }
  };

  const handleSaveInformationOnAccount = async () => {
    if (validateForm() && user) {
      try {
        const userDocRef = doc(db, "users", user.id);
        await setDoc(userDocRef, {
          firstName,
          middleName,
          lastName,
          suffix,
          birthDate: dateOfBirth,
          email,
          phoneNumber,
          redressNumber,
          knownTravelerNumber,
          emergencyContact: {
            firstName: emergencyFirstName,
            lastName: emergencyLastName,
            email: emergencyEmail,
            phoneNumber: emergencyPhoneNumber,
          }
        }, { merge: true });
  
        console.log("User information saved successfully!");
      } catch (error) {
        console.error("Error saving user information:", error);
      }
    } else {
      console.log("Validation failed or user is not signed in. Please check the required fields.");
    }
  };


  const handleAutofillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setAutofillEmergencyContact(isChecked);

    if (isChecked) {
      setEmergencyFirstName(firstName);
      setEmergencyLastName(lastName);
      setEmergencyEmail(email);
      setEmergencyPhoneNumber(phoneNumber);
    } else {
      setEmergencyFirstName("");
      setEmergencyLastName("");
      setEmergencyEmail("");
      setEmergencyPhoneNumber("");
    }
  };

  return (
    <main className=" max-w-7xl m-auto mt-[100px] mb-20 px-4 h-screen">
      <h3 className=" text-mainC font-bold text-xl">Passenger information</h3>
      <p className=" text-gray-400 max-w-[680px]">
        Enter the required information for each traveler and be sure that it
        exactly matches the government-issued ID presented at the airport.
      </p>

      <section className=" flex justify-between">
        {/* left section/ form */}
        <div className=" flex flex-col gap-5 max-w-[660px]">
          <h3 className=" text-gray-600">Passenger 1 (Adult)</h3>

          {/* Passenger 1 information */}
          <div className=" flex flex-col gap-4">
            <div className=" flex gap-6">
              <input
                type="text"
                placeholder="First name*"
                className={`text-[#7C8DB0] border p-2 rounded outline-none ${
                  errors.firstName ? "border-red-500" : "border-[#light-grey]"
                }`}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Middle"
                className=" text-[#7C8DB0] border border-[#light-grey] p-2 rounded outline-none"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last name*"
                className={`text-[#7C8DB0] border p-2 rounded outline-none ${
                  errors.lastName ? "border-red-500" : "border-[#light-grey]"
                }`}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className=" flex gap-6">
              <input
                type="text"
                placeholder="Suffix"
                className=" text-[#7C8DB0] border border-[#light-grey] p-2 rounded outline-none"
                value={suffix}
                onChange={(e) => setSuffix(e.target.value)}
              />
              <input
                type="date"
                placeholder="Date of birth*"
                className={`text-[#7C8DB0] border p-2 rounded outline-none ${
                  errors.dateOfBirth ? "border-red-500" : "border-[#light-grey]"
                }`}
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
          </div>

          <div className=" flex flex-col gap-4">
            <div className=" flex gap-6">
              <input
                type="email"
                placeholder="Email address*"
                className={`text-[#7C8DB0] border p-2 rounded outline-none ${
                  errors.email ? "border-red-500" : "border-[#light-grey]"
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="tel"
                inputMode="tel"
                placeholder="Phone number*"
                className={`text-[#7C8DB0] border p-2 rounded outline-none ${
                  errors.phoneNumber ? "border-red-500" : "border-[#light-grey]"
                }`}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className=" flex gap-6">
              <input
                type="text"
                placeholder="Redress number"
                className="text-[#7C8DB0] border border-[#light-grey] p-2 rounded w-[300px] outline-none"
                value={redressNumber}
                onChange={(e) => setRedressNumber(e.target.value)}
              />
              <input
                type="tel"
                inputMode="tel"
                placeholder="Known traveller number*"
                className={`text-[#7C8DB0] border p-2 rounded outline-none ${
                  errors.knownTravelerNumber
                    ? "border-red-500"
                    : "border-[#light-grey]"
                }`}
                value={knownTravelerNumber}
                onChange={(e) => setKnownTravelerNumber(e.target.value)}
              />
            </div>
          </div>

          {/* Emergency contact */}
          <h3 className=" text-gray-600">Emergency contact information</h3>
          <label className=" flex items-center gap-2">
            <input
              type="checkbox"
              checked={autofillEmergencyContact}
              onChange={handleAutofillChange}
              className="w-4 h-4"
            />
            <span>Same as Passenger 1</span>
          </label>
          <div className=" flex flex-col gap-4">
            <div className=" flex gap-6">
              <input
                type="text"
                placeholder="First name*"
                className={`text-[#7C8DB0] border p-2 rounded outline-none ${
                  errors.emergencyFirstName ? "border-red-500" : "border-[#light-grey]"
                }`}
                value={emergencyFirstName}
                onChange={(e) => setEmergencyFirstName(e.target.value)}
                disabled={autofillEmergencyContact}
              />
              <input
                type="text"
                placeholder="Last name*"
                className={`text-[#7C8DB0] border p-2 rounded outline-none ${
                  errors.emergencyLastName ? "border-red-500" : "border-[#light-grey]"
                }`}
                value={emergencyLastName}
                onChange={(e) => setEmergencyLastName(e.target.value)}
                disabled={autofillEmergencyContact}
              />
            </div>
            <div className=" flex gap-6">
              <input
                type="email"
                placeholder="Email address*"
                className={`text-[#7C8DB0] border p-2 rounded outline-none ${
                  errors.emergencyEmail ? "border-red-500" : "border-[#light-grey]"
                }`}
                value={emergencyEmail}
                onChange={(e) => setEmergencyEmail(e.target.value)}
                disabled={autofillEmergencyContact}
              />
              <input
                type="tel"
                inputMode="tel"
                placeholder="Phone number*"
                className={`text-[#7C8DB0] border p-2 rounded outline-none ${
                  errors.emergencyPhoneNumber ? "border-red-500" : "border-[#light-grey]"
                }`}
                value={emergencyPhoneNumber}
                onChange={(e) => setEmergencyPhoneNumber(e.target.value)}
                disabled={autofillEmergencyContact}
              />
            </div>
          </div>

          <h3 className=" text-gray-600">Bag information</h3>
          <p className=" text-light-grey">
            Each passenger is allowed one free carry-on bag and one personal
            item. First checked bag for each passenger is also free. Second bag
            check fees are waived for loyalty program members. See the{" "}
            <span className=" text-mainC">full bag policy.</span>
          </p>

          <div className=" text-light-grey flex flex-col gap-2">
            <h3>Checked bags:</h3>
            <div className=" flex gap-2">
              <button
                className=" text-mainC bg-[#FAFAFA] rounded px-2 font-bold"
                onClick={() =>
                  bagsCounter > 1
                    ? setBagsCounter(bagsCounter - 1)
                    : bagsCounter
                }
              >
                -
              </button>
              <p>{bagsCounter}</p>
              <button
                className=" text-mainC bg-[#FAFAFA] rounded px-2 font-bold"
                onClick={() =>
                  bagsCounter < 9
                    ? setBagsCounter(bagsCounter + 1)
                    : bagsCounter
                }
              >
                +
              </button>
            </div>

            {isSignedIn && (
            <button className=" border border-mainC rounded self-start p-2 mt-5 bg-gradient-to-r from-emerald-50 to-purple-50"
            onClick={handleSaveInformationOnAccount}
            >
              Save information on account
            </button>)}
          </div>
        </div>

        {/* right section flight picked */}
        <div className=" text-gray-900 flex flex-col gap-5 font-medium">
          <div className=" flex gap-8 border p-4 rounded-lg">
            <img
              src={pickedFlightFromPreviousPage.img}
              alt="picked flight image"
              className=" max-w-10 max-h-9"
            />
            <h3>{pickedFlightFromPreviousPage.companyTitle}</h3>

            <div className=" flex flex-col gap-2 justify-between">
              <p className=" self-end">
                {pickedFlightFromPreviousPage.duration}
              </p>
              <p>{pickedFlightFromPreviousPage.travelTime}</p>
              <p className=" self-end text-light-grey">
                {pickedFlightFromPreviousPage.stopTime}
              </p>
            </div>
          </div>

          <div className=" self-end flex flex-col items-end gap-3">
            <div className=" flex gap-10">
              <h3>Subtotal</h3>
              <p>$503</p>
            </div>

            <div className=" flex gap-10">
              <h3>Taxes and Fees</h3>
              <p>$121</p>
            </div>

            <div className=" flex gap-10">
              <h3>Total</h3>
              <p>$624</p>
            </div>
          </div>

          <button
            className=" self-end px-5 py-2 bg-[#CBD4E6] text-light-grey border border-light-grey rounded-lg"
            onClick={handleFormSubmit}
          >
            Select seats
          </button>

          <img src={bagsImage} alt="" />
        </div>
      </section>
    </main>
  );
}
