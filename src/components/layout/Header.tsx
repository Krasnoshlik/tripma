
import React from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '../../assets/images/logo.png';

const Header: React.FC = () => {
    return (
        <header className=' fixed top-0 left-0 right-0 py-6 px-4 w-full bg-white'>
            <div className=' max-w-6xl m-auto flex justify-between'>
            <Link to="/">
            <img src={LogoImage} alt="Logo image" className=' max-w-[107px]'/>
            </Link>
            
            <div className=' flex gap-4 font-medium'>
                <button className=' text-light-grey'>Sign in</button>
                <button className=' px-5 py-2 bg-mainC text-white rounded'>Sign up</button>
            </div>
            </div>
        </header>
    );
};

export default Header;
