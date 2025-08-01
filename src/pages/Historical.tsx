import React, { useState } from 'react';
import { HistoricalChart } from '../components/HistoricalChart';
import { ChainSelector } from '../components/ChainSelector';
import { Select } from '../components/ui/Select';
import { useGas } from '../hooks/useGas';
import { useApi } from '../hooks/useApi';
import { gasApi } from '../services/api';

export const Historical: React.FC = () => {
  const { state } = useGas();
  const [days, setDays] = useState('7');
  
  const { data: historicalData, loading } = useApi(
    () => gasApi.getHistoricalData(state.selectedChain, Number(days)),
    [state.selectedChain, days]
  );

  const dayOptions = [
    { value: '7', label: '7 Days' },
    { value: '14', label: '14 Days' },
    { value: '30', label: '30 Days' },
    { value: '90', label: '90 Days' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Historical Gas Data</h2>
        <div className="flex space-x-4">
          <Select
            value={days}
            onChange={(e) => setDays(e.target.value)}
            options={dayOptions}
          />
          <ChainSelector />
        </div>
      </div>
      
      <HistoricalChart data={historicalData || []} loading={loading} />
    </div>
  );
};
