import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor?: string;
    borderWidth?: number;
  }>;
}

interface PensionChartProps {
  data: ChartData | null;
}

export const PensionChart = ({ data }: PensionChartProps) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-4 md:p-8 h-full">
      <h2 className="text-xl font-semibold mb-6">Pension Analysis</h2>
      <div className="h-64 md:h-96">
        {data ? (
          <Bar
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: { stacked: true },
                y: { stacked: true }
              }
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Loading data...
          </div>
        )}
      </div>
    </div>
  );
};