import React from 'react';
import { Card } from './ui/Card';
import type { HistoricalData } from '../types';

interface HistoricalChartProps {
  data: HistoricalData[];
  loading?: boolean;
}

export const HistoricalChart: React.FC<HistoricalChartProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <Card>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </Card>
    );
  }

  if (!data.length) {
    return (
      <Card>
        <p className="text-gray-500 text-center py-8">No historical data available</p>
      </Card>
    );
  }

  const maxPrice = Math.max(...data.map(d => d.maxGasPrice));
  const minPrice = Math.min(...data.map(d => d.minGasPrice));
  const range = maxPrice - minPrice || 1;

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-4">Historical Gas Prices</h3>
      
      <div className="space-y-4">
        {/* Simple bar chart */}
        <div className="h-64 flex items-end space-x-2 border-b border-gray-200 pb-2">
          {data.slice(-14).map((item, index) => {
            const height = ((item.avgGasPrice - minPrice) / range) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-primary-500 rounded-t"
                  style={{ height: `${Math.max(height, 5)}%` }}
                  title={`${new Date(item.date).toLocaleDateString()}: ${item.avgGasPrice} Gwei`}
                />
                <span className="text-xs text-gray-500 mt-1 transform -rotate-45 origin-left">
                  {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
            );
          })}
        </div>

        {/* Data table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Date</th>
                <th className="text-right py-2">Min</th>
                <th className="text-right py-2">Avg</th>
                <th className="text-right py-2">Max</th>
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 10).map((item, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-2">{new Date(item.date).toLocaleDateString()}</td>
                  <td className="text-right py-2">{item.minGasPrice.toFixed(1)} Gwei</td>
                  <td className="text-right py-2 font-medium">{item.avgGasPrice.toFixed(1)} Gwei</td>
                  <td className="text-right py-2">{item.maxGasPrice.toFixed(1)} Gwei</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};
