import React from 'react';
import { Card } from './ui/Card';
import type { GasPrice } from '../types';

interface GasPriceCardProps {
  gasPrice: GasPrice;
  loading?: boolean;
}

export const GasPriceCard: React.FC<GasPriceCardProps> = ({ gasPrice, loading }) => {
  if (loading) {
    return (
      <Card>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-4 capitalize">{gasPrice.chain} Gas Prices</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
          <span className="text-green-700 font-medium">Safe</span>
          <span className="text-green-800 font-bold">{gasPrice.safe} Gwei</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
          <span className="text-yellow-700 font-medium">Standard</span>
          <span className="text-yellow-800 font-bold">{gasPrice.standard} Gwei</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
          <span className="text-red-700 font-medium">Fast</span>
          <span className="text-red-800 font-bold">{gasPrice.fast} Gwei</span>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-4">
        Updated: {new Date(gasPrice.timestamp).toLocaleString()}
      </p>
    </Card>
  );
};
