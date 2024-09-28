import React from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '../../assets/images/logo.png';
import AppStoreImage from '../../assets/images/appStore.png';
import GooglePlayIMage from '../../assets/images/googlePlay.png';
import FacebookImage from '../../assets/images/facebook.png';
import InstagramImage from '../../assets/images/instagram.png';
import TwitterImage from '../../assets/images/twitter.png';

const Footer: React.FC = () => {
    return (
        <footer className=' max-w-7xl m-auto px-3'>
            <div className=' text-light-grey flex flex-wrap justify-between gap-5'>

            <Link to="/">
            <img src={LogoImage} alt="Logo image" className=' max-w-[107px]'/>
            </Link>

            <div className='w-10/12 flex flex-wrap gap-5 justify-between '>

            <div className=' flex flex-col gap-2'>
                <Link to='/' className=' text-[#6E7491] font-bold'>About</Link>

                <Link to='/'>About Tripma</Link>
                <Link to='/'>How it works</Link>
                <Link to='/'>Careers</Link>
                <Link to='/'>Press</Link>
                <Link to='/'>Blog</Link>
            </div>

            <div className=' flex flex-col gap-2'>
                <Link to='/' className=' text-[#6E7491] font-bold'>Partner with us</Link>

                <Link to='/'>Partnership programs</Link>
                <Link to='/'>Affiliate program</Link>
                <Link to='/'>Connectivity partners</Link>
                <Link to='/'>Promotions and events</Link>
                <Link to='/'>Integrations</Link>
            </div>

            <div className=' flex flex-col gap-2'>
                <Link to='/' className=' text-[#6E7491] font-bold'>Support</Link>

                <Link to='/'>Help Center</Link>
                <Link to='/'>Contact us</Link>
                <Link to='/'>Privacy policy</Link>
                <Link to='/'>Terms of service</Link>
                <Link to='/'>Trust and safety</Link>
            </div>

            <div className=' flex flex-col gap-2'>
                <Link to='/' className=' text-[#6E7491] font-bold'>Get the app</Link>

                <Link to='/'>Tripma for Android</Link>
                <Link to='/'>Tripma for iOS</Link>
                <Link to='/'>Mobile site</Link>

                <Link to='/'>
                <img src={AppStoreImage} alt="app store" />
                </Link>
                <Link to='/'>
                <img src={GooglePlayIMage} alt="google play" />
                </Link>
            </div>
            </div>
            
            </div>

            <div className=' flex justify-between border-t mt-10 py-10'>
                <div className=' flex gap-5'>
                <Link to='/'>
                    <img src={FacebookImage} alt="facebook"/>
                    </Link>
                    <Link to='/'>
                    <img src={InstagramImage} alt="instagram"/>
                    </Link>
                    <Link to='/'>
                    <img src={TwitterImage} alt="twitter"/>
                    </Link>
                </div>

                <p className=' text-light-grey'>© 2020 Tripma incorporated</p>
            </div>
        </footer>
    );
};

export default Footer;