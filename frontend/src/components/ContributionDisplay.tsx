interface ContributionDisplayProps {
  percentage: number;
}

export const ContributionDisplay = ({ percentage }: ContributionDisplayProps) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-4 md:p-6 lg:p-8 w-full lg:max-w-lg">
      <h2 className="text-lg md:text-xl font-semibold mb-6">
        Salary Contribution Needed for Pension Goal
      </h2>
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-48 h-48 md:w-56 md:h-56 bg-greenCustom rounded-full flex items-center justify-center text-white text-4xl md:text-5xl font-bold mx-auto">
            <span>{percentage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};