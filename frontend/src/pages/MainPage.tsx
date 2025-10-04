import {Link} from "react-router-dom";
import {RoutePaths} from "@/shared/config/routeConfig.tsx";

export const MainPage = () => {
    return (
        <div
            className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-bgColor/20 flex items-center px-8 py-16">
            <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
                {/* Left Content */}
                <div className="space-y-12">
                    <div className="relative">
                        <h1 className="text-7xl lg:text-8xl xl:text-9xl font-bold leading-tight">
                            <span
                                className="bg-gradient-to-r from-greenCustom via-purpleCustom to-orangeCustom bg-clip-text text-transparent">
                                Welcome
                            </span>
                            <br/>
                            <span className="text-gray-800">to your</span>
                            <br/>
                            <span
                                className="bg-gradient-to-r from-purpleCustom to-greenCustom bg-clip-text text-transparent">
                                future
                            </span>
                        </h1>
                        <div
                            className="absolute -bottom-4 left-0 w-3/4 h-3 bg-gradient-to-r from-greenCustom/30 via-purpleCustom/30 to-orangeCustom/30 rounded-full"></div>
                    </div>

                    <div className="space-y-6">
                        <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed">
                            Imagine it's <span className="font-bold text-greenCustom">2060</span>. You've worked,
                            traveled, and survived all the adulting chaos…
                        </p>
                        <p className="text-lg lg:text-xl text-gray-600">
                            Now you finally have the <span className="font-semibold text-purpleCustom">freedom to live wherever you want</span>.
                            Somewhere that makes your future self grin every morning.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to={RoutePaths.quiz} className="group">
                            <button
                                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-greenCustom to-green-600 text-white font-semibold text-lg rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden">
                                <span className="relative z-10">Tell us about yourself</span>
                                <div
                                    className="absolute inset-0 bg-gradient-to-r from-green-600 to-greenCustom opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Right Content */}
                <div className="space-y-6">
                    <div className="relative group">
                        <div
                            className="w-full h-80 bg-gradient-to-br from-greenCustom/20 via-purpleCustom/20 to-orangeCustom/20 rounded-3xl backdrop-blur-sm border border-white/20 shadow-2xl transition-transform duration-500 group-hover:scale-105">
                            <div
                                className="absolute inset-4 bg-gradient-to-br from-white/40 to-transparent rounded-2xl">
                                <div className="p-8 h-full flex flex-col justify-center items-center text-center">
                                    <div
                                        className="w-20 h-20 bg-gradient-to-r from-greenCustom to-purpleCustom rounded-full mb-6 animate-pulse"></div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Discover Your Perfect
                                        Place</h3>
                                    <p className="text-gray-600">AI-powered location matching based on your
                                        lifestyle</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="group">
                            <div
                                className="h-48 bg-gradient-to-br from-greenCustom/15 to-bgColor/30 rounded-2xl backdrop-blur-sm border border-white/20 shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2">
                                <div className="p-6 h-full flex flex-col justify-center items-center text-center">
                                    <div
                                        className="w-12 h-12 bg-gradient-to-r from-greenCustom to-purpleCustom rounded-lg mb-4"></div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Smart Analysis</h4>
                                    <p className="text-sm text-gray-600">Advanced algorithms</p>
                                </div>
                            </div>
                        </div>
                        <div className="group">
                            <div
                                className="h-48 bg-gradient-to-br from-orangeCustom/20 to-yellow-300/30 rounded-2xl backdrop-blur-sm border border-white/20 shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2">
                                <div className="p-6 h-full flex flex-col justify-center items-center text-center">
                                    <div
                                        className="w-12 h-12 bg-gradient-to-r from-orangeCustom to-yellow-400 rounded-lg mb-4"></div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Personalized</h4>
                                    <p className="text-sm text-gray-600">Just for you</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}