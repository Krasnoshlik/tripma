import { motion } from "framer-motion";
import VisaLogo from "../../../assets/images/visa.png";
import { CardType } from "../PayAndConfirm";

interface PaymentCardProps {
    card: CardType;
    setCardInfoModalOpen: (value: boolean) => void;
  }

export default function PaymentCard({card,setCardInfoModalOpen}:PaymentCardProps) {
  return (
    <div className=" flex flex-col gap-2 max-w-[300px]">
                <h2 className=" font-bold text-gray-500 text-2xl">Payment method</h2>
                <h2 className=" text-sm text-light-grey">
                  (hover card below to see CVV and click to change information)
                </h2>

                <div
                  className="relative w-[300px] h-[188px] group perspective hover:cursor-pointer"
                  onClick={() => setCardInfoModalOpen(true)}
                >
                  <motion.div
                    className="absolute inset-0 w-full h-full"
                    style={{
                      transformStyle: "preserve-3d",
                      perspective: 1000,
                    }}
                    whileHover={{ rotateY: 180 }}
                    transition={{ duration: 0.8 }}
                  >
                    {/* Front Side */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#EB568C] to-[#ED5E76] rounded-2xl w-full h-full px-6 py-7 font-semibold text-lg text-[#F6F6FE] flex justify-between items-center"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(0deg)",
                      }}
                    >
                      <div className="h-full flex flex-col justify-between items-start">
                        <img
                          src={card.type}
                          alt="card type"
                          className={`' ' ${card.type === VisaLogo ? "h-5" : "h-14"}`}
                        />
                        <div>
                          <h3>{card.name}</h3>
                          <h3>{card.number}</h3>
                        </div>
                      </div>
                      <h3 className=" self-end">{card.date}</h3>
                    </motion.div>

                    {/* Back Side */}
                    <motion.div
                      className="absolute inset-0 bg-gray-200 rounded-2xl w-full h-full px-6 py-7 bg-gradient-to-r from-[#EB568C] to-[#ED5E76] font-semibold text-lg text-[#F6F6FE] flex justify-center items-center"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <h3>CVV : {card.cvv}</h3>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
  )
}
