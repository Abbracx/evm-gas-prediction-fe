import React from 'react';
import { CostCalculator } from '../components/CostCalculator';

export const Calculator: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Transaction Cost Calculator</h2>
    <div className="max-w-md">
      <CostCalculator />
    </div>
  </div>
);
