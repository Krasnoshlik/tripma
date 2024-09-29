import { useState } from "react";
import { CardType } from "../PayAndConfirm";
import VisaLogo from "../../../assets/images/visa.png";
import MastercardLogo from "../../../assets/images/mc_sym_debit_pos_46_1x.png";

interface StateSets {
  setCard: (value: CardType) => void;
  setCardInfoModalOpen: (value: boolean) => void;
}

export default function CardModal({
  setCard,
  setCardInfoModalOpen,
}: StateSets) {
  const [errors, setErrors] = useState<CardType>({});

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  function CardInfoValidation() {
    const newErrors: CardType = {};

    const cardNumberRegex = /^\d{16}$/;
    const cvvRegex = /^\d{3}$/;

    const nameParts = cardName.trim().split(" ");

    if (!cardName.trim()) {
      newErrors.name = "Card holder name is required";
    } else if (nameParts.length < 2) {
      newErrors.name = "Name must contain at least two words";
    } else if (cardName.length < 6) {
      newErrors.name = "Name must be at least 6 characters long";
    }

    if (!cardNumberRegex.test(cardNumber)) {
      newErrors.number = "Card number must be 16 digits";
    }

    if (!expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
    }

    if (!cvvRegex.test(cvv)) {
      newErrors.cvv = "CVV must be 3 digits";
    }

    return newErrors;
  }

  const handleSaveCardInfo = () => {
    const validationErrors = CardInfoValidation();

    if (Object.keys(validationErrors).length === 0) {
      setCard({
        name: cardName,
        number: `•••• •••• •••• ${cardNumber.slice(-4)}`,
        date: expiryDate,
        cvv: cvv,
        type: +cardNumber.slice(0, 1) === 4 ? VisaLogo : MastercardLogo,
      });
      setCardInfoModalOpen(false);
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };
  return (
    <div className=" fixed top-0 left-0 w-screen h-screen bg-gray-500 bg-opacity-50 flex">
      <div className=" relative m-auto bg-white max-w-96 rounded-lg p-4 flex flex-col gap-4">
        <div className=" flex justify-between gap-10">
          <h3 className=" font-bold text-gray-500 text-2xl">
            Fill payment information
          </h3>
          <button onClick={() => setCardInfoModalOpen(false)}>x</button>
        </div>

        {/* Card Holder Name */}
        <label htmlFor="cardName" className="flex flex-col gap-1">
          Card holder name:
          <input
            type="text"
            className={`border ${
              errors.name ? "border-red-500" : "border-light-grey"
            } rounded-sm outline-none pl-2`}
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name}</span>
          )}
        </label>

        {/* Card Number */}
        <label htmlFor="cardNumber" className="flex flex-col gap-1">
          Card number:
          <input
            type="number"
            className={`border ${
              errors.number ? "border-red-500" : "border-light-grey"
            } rounded-sm outline-none pl-2`}
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          {errors.number && (
            <span className="text-red-500 text-sm">{errors.number}</span>
          )}
        </label>

        <div className="flex gap-5">
          {/* Expiry Date */}
          <label htmlFor="expiryDate" className="flex gap-2">
            Expiry date
            <input
              type="month"
              className={`border ${
                errors.expiryDate ? "border-red-500" : "border-light-grey"
              } rounded-sm outline-none pl-2 max-h-[30px] max-w-[140px]`}
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
            {errors.expiryDate && (
              <span className="text-red-500 text-sm">{errors.expiryDate}</span>
            )}
          </label>

          {/* CVV */}
          <label htmlFor="cvv" className="flex gap-2">
            CVV
            <input
              type="number"
              className={`border ${
                errors.cvv ? "border-red-500" : "border-light-grey"
              } rounded-sm outline-none text-sm pl-2 max-w-[50px] max-h-[30px]`}
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
            {errors.cvv && (
              <span className="text-red-500 text-sm">{errors.cvv}</span>
            )}
          </label>
        </div>

        {/* Save button */}
        <button
          className=" border border-light-grey"
          onClick={handleSaveCardInfo}
        >
          Save info
        </button>
      </div>
    </div>
  );
}
