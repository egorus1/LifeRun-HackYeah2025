type Gender = 'male' | 'female';

interface UserData {
  age: number;
  gender: Gender;
  salary: number;
  yearOfStarting: number;
  plannedYearOfRetirement: number;
  willingToSave: number;
}

interface UserDataFormProps {
  userData: UserData;
  onUserDataChange: (field: keyof UserData, value: string | number) => void;
}

export const UserDataForm = ({ userData, onUserDataChange }: UserDataFormProps) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-4 md:p-8 flex-1">
      <h2 className="text-xl font-semibold mb-6">User Data</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Age</label>
            <div className="w-full px-3 py-2 bg-gray-50 rounded-lg text-gray-700">
              {userData.age}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select 
              value={userData.gender} 
              onChange={(e) => onUserDataChange('gender', e.target.value as Gender)}
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
              value={userData.salary} 
              onChange={(e) => onUserDataChange('salary', Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Year of Starting</label>
            <input 
              type="number" 
              value={userData.yearOfStarting} 
              onChange={(e) => onUserDataChange('yearOfStarting', Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Planned Year of Retirement</label>
            <input 
              type="number" 
              value={userData.plannedYearOfRetirement} 
              onChange={(e) => onUserDataChange('plannedYearOfRetirement', Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Willing to Save (%)</label>
            <div className="w-full px-3 py-2 bg-gray-50 rounded-lg text-gray-700">
              {userData.willingToSave}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};