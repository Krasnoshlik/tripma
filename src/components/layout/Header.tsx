import React from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '../../assets/images/logo.png';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const Header: React.FC = () => {
    return (
        <header className=' fixed top-0 left-0 right-0 py-6 px-4 w-full bg-white'>
            <div className=' max-w-6xl m-auto flex justify-between'>
                <Link to="/">
                    <img src={LogoImage} alt="Logo image" className=' max-w-[107px]'/>
                </Link>

                <div className=' flex gap-4 font-medium'>
                    <SignedOut>
                        <SignInButton>
                            <button className="bg-mainC border border-white hover:bg-white hover:text-mainC hover:border-mainC hover:shadow-lg ease-in-out duration-500 text-white font-bold py-2 px-4 rounded">
                                Sign In
                            </button>
                        </SignInButton>
                    </SignedOut>

                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </header>
    );
};

export default Header;
