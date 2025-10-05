import bg from "@/shared/assets/bg.png";
import { DashboardHeader } from "@/components/DashboardHeader";
import { ObjectiveSection } from "@/components/ObjectiveSection";
import { UserDataForm } from "@/components/UserDataForm";
import { ContributionDisplay } from "@/components/ContributionDisplay";
import { PensionChart } from "@/components/PensionChart";
import { useDashboard } from "@/hooks/useDashboard";

export const DashboardPage = () => {
    const { objective, setObjective, analysisData, handleUserDataChange } = useDashboard();

    return (
        <div className="h-screen bg-cover bg-center bg-no-repeat p-4 md:p-8 overflow-hidden" style={{backgroundImage: `url(${bg})`}}>
            <DashboardHeader hasData={!!analysisData.percentage} />
            <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
                <div className="space-y-6 flex-1">
                    <ObjectiveSection objective={objective} onObjectiveChange={setObjective} />
                    <div className="flex flex-col lg:flex-row gap-6">
                        {analysisData.userData && (
                            <UserDataForm 
                                userData={analysisData.userData} 
                                onUserDataChange={handleUserDataChange} 
                            />
                        )}
                        {analysisData.percentage && (
                            <ContributionDisplay percentage={analysisData.percentage} />
                        )}
                    </div>
                </div>
                <div className="flex-1">
                    <PensionChart data={analysisData.data} />
                </div>
            </div>
        </div>
    );
};