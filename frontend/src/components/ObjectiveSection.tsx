import { Slider } from "@/shared/ui/slider.tsx";

interface ObjectiveSectionProps {
  objective: number;
  onObjectiveChange: (value: number) => void;
}

export const ObjectiveSection = ({ objective, onObjectiveChange }: ObjectiveSectionProps) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-4 md:p-8 max-w-full">
      <h2 className="text-xl font-semibold mb-6">Objective</h2>
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 bg-purpleCustom text-white px-6 py-3 rounded-2xl text-2xl font-bold">
            <span>{objective} PLN</span>
          </div>
        </div>
        <div className="px-4">
          <Slider
            value={[objective]}
            onValueChange={(value) => onObjectiveChange(value[0])}
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
  );
};