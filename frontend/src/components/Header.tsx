import Logo from "@/shared/assets/ellipse.png";
import Link1 from "@/shared/assets/zuslink2.png";
import Link2 from "@/shared/assets/zuslink1.png";
import Login from "@/shared/assets/login.png";
import {useState} from "react";
import {RoutePaths} from "@/shared/config/routeConfig.tsx";
import {Link} from "react-router-dom";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header
                className="bg-gradient-to-r from-white via-gray-50 to-white shadow-lg border-b border-gray-100 h-20 flex justify-between items-center px-8 relative backdrop-blur-sm">
                <div className="flex gap-4 items-center group">
                    <div className="relative">
                        <Link to={RoutePaths.main}>
                            <img src={Logo} alt="logo"
                                 className="w-12 h-12 transition-transform duration-300 group-hover:scale-110"/>
                            <div
                                className="absolute inset-0 bg-greenCustom/20 rounded-full scale-0 group-hover:scale-125 transition-transform duration-300"></div>
                        </Link>

                    </div>
                    <h1 className="text-greenCustom text-4xl font-bold tracking-tight bg-gradient-to-r from-greenCustom to-purpleCustom bg-clip-text text-transparent">Zus</h1>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-8">
                    <div className="flex items-center gap-3">
                        <a className="group relative block border-2 border-purpleCustom/30 hover:border-purpleCustom p-3 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white/80 backdrop-blur-sm"
                           target="_blank"
                           href="https://www.zus.pl/o-zus/kontakt/obsluga-osob-z-niepelnosprawnosciami">
                            <img src={Link1} alt="link"
                                 className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"/>
                            <div
                                className="absolute inset-0 bg-gradient-to-r from-greenCustom/10 to-purpleCustom/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </a>
                        <a className="group relative block border-2 border-purpleCustom/30 hover:border-purpleCustom p-3 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white/80 backdrop-blur-sm"
                           href="https://www.zus.pl/o-zus/kontakt/obsluga-osob-z-niepelnosprawnosciami/informacje-dla-osob-nieslyszacych"
                           target="_blank">
                            <img src={Link2} alt="link"
                                 className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"/>
                            <div
                                className="absolute inset-0 bg-gradient-to-r from-greenCustom/10 to-purpleCustom/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </a>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            className="group flex gap-2 items-center px-6 py-3 bg-white text-greenCustom hover:text-white border-2 border-greenCustom/30 hover:border-greenCustom rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
                            <span className="relative z-10">Log in</span>
                            <img src={Login} alt="login"
                                 className="w-6 h-6 relative z-10 transition-transform duration-300 group-hover:rotate-12"/>
                            <div
                                className="absolute inset-0 bg-gradient-to-r from-greenCustom to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>

                        <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

                        <button
                            className="group px-6 py-3 text-lg font-semibold text-greenCustom hover:text-white bg-white border-2 border-greenCustom/30 hover:border-greenCustom rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
                            <span className="relative z-10">Continue as guest</span>
                            <div
                                className="absolute inset-0 bg-gradient-to-r from-greenCustom to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    </div>
                </div>

                {/* Burger Menu Button */}
                <button
                    className="lg:hidden flex flex-col gap-1.5 p-4 relative group rounded-xl hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <div
                        className={`w-7 h-0.5 bg-gradient-to-r from-greenCustom to-purpleCustom transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                    <div
                        className={`w-7 h-0.5 bg-gradient-to-r from-greenCustom to-purpleCustom transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                    <div
                        className={`w-7 h-0.5 bg-gradient-to-r from-greenCustom to-purpleCustom transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
                </button>
            </header>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 overflow-hidden transition-all duration-500 ${isMenuOpen ? 'fixed top-20 left-0 w-full h-[calc(100vh-5rem)] opacity-100 z-50' : 'max-h-0 opacity-0'}`}>
                <div className="px-8 py-8">
                    <div className="flex flex-col gap-6">
                        {/* Accessibility Links */}
                        <div className="flex items-center justify-center gap-3 pb-6 border-b border-gray-100">
                            <a className="group relative block border-2 border-purpleCustom/30 hover:border-purpleCustom p-3 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white/80 backdrop-blur-sm"
                               target="_blank"
                               href="https://www.zus.pl/o-zus/kontakt/obsluga-osob-z-niepelnosprawnosciami">
                                <img src={Link1} alt="link"
                                     className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"/>
                                <div
                                    className="absolute inset-0 bg-gradient-to-r from-greenCustom/10 to-purpleCustom/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </a>
                            <a className="group relative block border-2 border-purpleCustom/30 hover:border-purpleCustom p-3 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white/80 backdrop-blur-sm"
                               href="https://www.zus.pl/o-zus/kontakt/obsluga-osob-z-niepelnosprawnosciami/informacje-dla-osob-nieslyszacych"
                               target="_blank">
                                <img src={Link2} alt="link"
                                     className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"/>
                                <div
                                    className="absolute inset-0 bg-gradient-to-r from-greenCustom/10 to-purpleCustom/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </a>
                        </div>

                        {/* Login and Guest Buttons */}
                        <button
                            className="group flex gap-2 items-center justify-center px-6 py-4 bg-white text-greenCustom hover:text-white border-2 border-greenCustom/30 hover:border-greenCustom rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
                            <span className="relative z-10">Log in</span>
                            <img src={Login} alt="login"
                                 className="w-6 h-6 relative z-10 transition-transform duration-300 group-hover:rotate-12"/>
                            <div
                                className="absolute inset-0 bg-gradient-to-r from-greenCustom to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>

                        <button
                            className="group px-6 py-4 text-lg font-semibold text-greenCustom hover:text-white bg-white border-2 border-greenCustom/30 hover:border-greenCustom rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
                            <span className="relative z-10">Continue as guest</span>
                            <div
                                className="absolute inset-0 bg-gradient-to-r from-greenCustom to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}