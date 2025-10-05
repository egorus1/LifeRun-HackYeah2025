import {Slider} from "@/shared/ui/slider.tsx";
import {useEffect, useState} from "react";
import {updateObjective, updateUserData} from "@/shared/api/user/user.ts";
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import bg from "@/shared/assets/bg.png";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const DashboardPage = () => {
    const [objective, setObjective] = useState(() => {
        const saved = localStorage.getItem('objective');
        return saved ? Number(saved) : 1000;
    });
    const [analysisData, setAnalysisData] = useState<{ percentage: number | null; data: any, userData: any }>({
        percentage: null,
        data: null,
        userData: null
    });
    const handleUserDataChange = (field: string, value: any) => {
        const newUserData = { ...analysisData.userData, [field]: value };
        setAnalysisData(prev => ({
            ...prev,
            userData: newUserData
        }));
        
        clearTimeout(window.userDataTimeout);
        window.userDataTimeout = setTimeout(async () => {
            try {
                await updateUserData(newUserData);
                if (field === 'salary' || field === 'yearOfStarting' || field === 'plannedYearOfRetirement') {
                    const data = await updateObjective(objective);
                    setAnalysisData(prev => ({ ...prev, ...data }));
                }
            } catch (error) {
                console.error(error);
            }
        }, 500);
    };

    useEffect(() => {
        localStorage.setItem('objective', objective.toString());

        const timeoutId = setTimeout(async () => {
            try {
                const data = await updateObjective(objective);
                setAnalysisData(data);
            } catch (error) {
                console.error(error);
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [objective]);



    return (
        <div className="h-screen bg-cover bg-center bg-no-repeat p-4 md:p-8 overflow-hidden" style={{backgroundImage: `url(${bg})`}}>
            <div className="flex justify-between items-center mb-6 md:mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard</h1>
                {analysisData.percentage && (
                    <button
                        onClick={() => window.print()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold transition-colors"
                    >
                        Download Report
                    </button>
                )}
            </div>
            <div className={"flex flex-col lg:flex-row lg:justify-between gap-6"}>
                <div className="space-y-6 flex-1">
                    <div className="bg-white rounded-3xl shadow-lg p-4 md:p-8 max-w-full">
                        <h2 className="text-xl font-semibold mb-6">Objective</h2>

                        <div className="space-y-6">
                            <div className="text-center">
                                <div
                                    className="inline-flex items-center gap-3 bg-purpleCustom text-white px-6 py-3 rounded-2xl text-2xl font-bold">
                                    <span>{objective} PLN</span>
                                </div>
                            </div>

                            <div className="px-4">
                                <Slider
                                    value={[objective]}
                                    onValueChange={(value) => setObjective(value[0])}
                                    min={1000}
                                    max={50000}
                                    step={100}
                                    className="w-full"
                                />
                                <div className="flex justify-between text-sm text-gray-500 mt-2">
                                    <span>0 PLN</span>
                                    <span>50,000 PLN</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="bg-white rounded-3xl shadow-lg p-4 md:p-8 flex-1">
                            <h2 className="text-xl font-semibold mb-6">User Data</h2>
                            {analysisData.userData && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Age</label>
                                            <div className="w-full px-3 py-2 bg-gray-50 rounded-lg text-gray-700">
                                                {analysisData.userData.age}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Gender</label>
                                            <select 
                                                value={analysisData.userData.gender} 
                                                onChange={(e) => handleUserDataChange('gender', e.target.value)}
                                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Salary</label>
                                            <input 
                                                type="number" 
                                                value={analysisData.userData.salary} 
                                                onChange={(e) => handleUserDataChange('salary', Number(e.target.value))}
                                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Year of Starting</label>
                                            <input 
                                                type="number" 
                                                value={analysisData.userData.yearOfStarting} 
                                                onChange={(e) => handleUserDataChange('yearOfStarting', Number(e.target.value))}
                                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Planned Year of Retirement</label>
                                            <input 
                                                type="number" 
                                                value={analysisData.userData.plannedYearOfRetirement} 
                                                onChange={(e) => handleUserDataChange('plannedYearOfRetirement', Number(e.target.value))}
                                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Willing to Save (%)</label>
                                            <div className="w-full px-3 py-2 bg-gray-50 rounded-lg text-gray-700">
                                                {analysisData.userData.willingToSave}%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        {analysisData && (
                            <div className="bg-white rounded-3xl shadow-lg p-4 md:p-8 w-full lg:max-w-lg">
                                <h2 className="text-lg md:text-xl font-semibold mb-6">Salary Contribution Needed for Pension Goal</h2>
                                <div className="space-y-6">
                                    {analysisData.percentage && (
                                        <div className="text-center">
                                            <div className="w-48 h-48 md:w-56 md:h-56 bg-greenCustom rounded-full flex items-center justify-center text-white text-4xl md:text-5xl font-bold mx-auto">
                                                <span>{analysisData.percentage}%</span>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex-1">
                    <div className="bg-white rounded-3xl shadow-lg p-4 md:p-8 h-full">
                        <h2 className="text-xl font-semibold mb-6">Pension Analysis</h2>
                        <div className="h-64 md:h-96">
                            {analysisData.data ? (
                                <Bar
                                    data={analysisData.data}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        scales: {
                                            x: {
                                                stacked: true
                                            },
                                            y: {
                                                stacked: true
                                            }
                                        }
                                    }}
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-500">
                                    Загрузка данных...
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}