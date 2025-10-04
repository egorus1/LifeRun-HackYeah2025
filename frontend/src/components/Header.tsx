import Logo from "@/shared/assets/ellipse.png";
import Link1 from "@/shared/assets/zuslink2.png";
import Link2 from "@/shared/assets/zuslink1.png";
import Login from "@/shared/assets/login.png";
import {useState} from "react";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className={"bg-[#fff] h-30 flex justify-between items-center px-8 relative"}>
                <div className={"flex gap-3 items-center"}>
                    <img src={Logo} alt="logo" className={"w-15 h-15"}/>
                    <h1 className={"text-greenCustom text-3xl"}>Zus</h1>
                </div>

                {/* Desktop Menu */}
                <div className={"hidden lg:flex items-center gap-5"}>
                    <div className={"flex items-center gap-2"}>
                        <a className={"block border-2 border-[#3F416E] p-2 rounded-lg"} target={"_blank"}
                           href={"https://www.zus.pl/o-zus/kontakt/obsluga-osob-z-niepelnosprawnosciami"}>
                            <img src={Link1} alt="link" className={"w-10 h-10"}/>
                        </a>
                        <a className={"block border-2 border-[#3F416E] p-2 rounded-lg"}
                           href={"https://www.zus.pl/o-zus/kontakt/obsluga-osob-z-niepelnosprawnosciami/informacje-dla-osob-nieslyszacych"}
                           target={"_blank"}>
                            <img src={Link2} alt="link" className={"w-10 h-10"}/>
                        </a>
                    </div>
                    <div className={"flex items-center"}>
                        <button className={"flex gap-1 items-center text-greenCustom relative text-2xl group"}>
                            <span> Log in</span>
                            <img src={Login} alt="login" className={"w-10 h-10 inline-block"}/>
                            <div
                                className="absolute -bottom-2 left-0 w-full h-2 bg-greenCustom rounded-[10px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </button>
                        <div className="w-[5px] h-10 bg-black mx-2"></div>
                        <button className={"text-2xl relative group"}>
                            Continue as guest
                            <div
                                className="absolute -bottom-2 left-0 w-full h-2 bg-greenCustom rounded-[10px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </button>
                    </div>
                </div>

                {/* Burger Menu Button */}
                <button
                    className="lg:hidden flex flex-col gap-1 p-3 relative"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? (
                        <>
                            <div
                                className="w-8 h-1 bg-greenCustom rotate-45 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                            <div
                                className="w-8 h-1 bg-greenCustom -rotate-45 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                        </>
                    ) : (
                        <>
                            <div className="w-8 h-1 bg-greenCustom"></div>
                            <div className="w-8 h-1 bg-greenCustom"></div>
                            <div className="w-8 h-1 bg-greenCustom"></div>
                        </>
                    )}
                </button>
            </header>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden bg-white border-t border-gray-200 overflow-hidden transition-all duration-300 ${isMenuOpen ? 'fixed top-30 left-0 w-full h-[calc(100vh-7.5rem)] opacity-100 z-50' : 'max-h-0 opacity-0'}`}>
                <div className="px-8 py-6">
                    <div className="flex flex-col gap-4">
                        <button className="text-xl text-greenCustom py-2 border-b border-gray-100 relative group">
                            Register
                            <div
                                className="absolute -bottom-2 left-0 w-full h-1 bg-greenCustom rounded-[10px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </button>
                        <button className="text-xl text-greenCustom py-2 border-b border-gray-100 relative group">
                            Login
                            <div
                                className="absolute -bottom-2 left-0 w-full h-1 bg-greenCustom rounded-[10px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </button>
                        <button className="text-xl text-greenCustom py-2 border-b border-gray-100 relative group">
                            Preferences
                            <div
                                className="absolute -bottom-2 left-0 w-full h-1 bg-greenCustom rounded-[10px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </button>
                        <button className="text-xl text-greenCustom py-2 relative group">
                            Contact Us
                            <div
                                className="absolute -bottom-2 left-0 w-full h-1 bg-greenCustom rounded-[10px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}