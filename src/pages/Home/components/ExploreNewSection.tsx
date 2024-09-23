import { ExploreNewAdventuresArr, ExploreNewPlacessArr } from '../../../../data/exploreNew';

export default function ExploreNewSection() {

  return (
    <section className=' max-w-7xl m-auto px-4 flex flex-col gap-5 mb-20'>
        <div className=' flex justify-between'>
        <h3 className=' text-light-grey font-medium'>Find your next adventure with these <span className=' text-mainC'>flight deals</span></h3>
        <a href="/" className=' text-light-grey hover:text-mainC'> All -&gt;</a>
        </div>

        <div className=' flex flex-col gap-10'>
        <div className=' flex gap-10'>
            {
                ExploreNewAdventuresArr.map((e,i) => {
                    if(i !== 3) 
                    return(
                        <div key={i} className=' rounded-xl flex flex-col overflow-hidden shadow-md'>
                            <img src={e.img} alt="card image" />

                            <div className=' flex justify-between py-4 px-6'>
                                <div>
                                    <div className=' flex gap-1'>
                                        <h3 className=' text-light-grey'>{e.title}</h3>
                                        <h3 className=' text-mainC'>{e.city}</h3>
                                    </div>
                                    <p className=' text-[#7C8DB0]'>{e.dis}</p>
                                </div>

                                <div className=' text-[#6E7491]'>$ {e.price}</div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        <div className=' rounded-xl flex flex-col overflow-hidden shadow-md'>
                            <img src={ExploreNewAdventuresArr[3].img} alt="card image" />

                            <div className=' flex justify-between py-4 px-6'>
                                <div>
                                    <div className=' flex gap-1'>
                                        <h3 className=' text-light-grey'>{ExploreNewAdventuresArr[3].title}</h3>
                                        <h3 className=' text-mainC'>{ExploreNewAdventuresArr[3].city}</h3>
                                    </div>
                                    <p className=' text-[#7C8DB0]'>{ExploreNewAdventuresArr[3].dis}</p>
                                </div>

                                <div className=' text-[#6E7491]'>$ {ExploreNewAdventuresArr[3].price}</div>
                            </div>
                        </div>
        </div>

        <div className=' flex justify-between mt-20'>
        <h3 className=' text-light-grey font-medium'>Explore unique <span className=' text-[#5CD6C0]'>places to stay</span></h3>
        <a href="/" className=' text-light-grey hover:text-[#5CD6C0]'> All -&gt;</a>
        </div>

        <div className=' flex gap-10'>
            {
                ExploreNewPlacessArr.map((e,i) => {
                    return (
                        <div key={i} className=' rounded-xl flex flex-col overflow-hidden shadow-md max-w-[410px]'>
                            <img src={e.img} alt="card image" className=' h-[350px]'/>

                            <div className=' py-4 px-6'>
                                <div>
                                    <div className=' flex gap-1'>
                                        <h3 className=' text-light-grey'>{e.title}</h3>
                                        <h3 className=' text-[#5CD6C0]'>{e.city}</h3>
                                    </div>
                                    <p className=' text-[#7C8DB0]'>{e.dis}</p>
                                </div>

                            </div>
                        </div>
                    )
                })
            }
        </div>
    </section>
  )
}
