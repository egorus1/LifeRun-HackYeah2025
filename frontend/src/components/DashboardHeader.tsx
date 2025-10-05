interface DashboardHeaderProps {
  hasData: boolean;
}

export const DashboardHeader = ({ hasData }: DashboardHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6 md:mb-8">
      <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard</h1>
      {hasData && (
        <button
          onClick={() => window.print()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold transition-colors"
        >
          Download Report
        </button>
      )}
    </div>
  );
};