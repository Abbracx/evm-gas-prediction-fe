import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Button } from './ui/Button';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { useGas } from '../hooks/useGas';
import { gasApi } from '../services/api';
import { useApi } from '../hooks/useApi';
import type { TransactionEstimate } from '../types';

export const CostCalculator: React.FC = () => {
  const { state, dispatch } = useGas();
  const [gasLimit, setGasLimit] = useState('21000');
  const [gasPrice, setGasPrice] = useState('');
  const [selectedChain, setSelectedChain] = useState('ethereum');
  const [estimate, setEstimate] = useState<TransactionEstimate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { data: chains } = useApi(() => gasApi.getChains());

  React.useEffect(() => {
      if (chains) {
        dispatch({ type: 'SET_CHAINS', payload: chains });
      }
    }, [chains, dispatch]);

  const calculateCost = async () => {
    if (!gasLimit || isNaN(Number(gasLimit))) {
      setError('Please enter a valid gas limit');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const result = await gasApi.estimateTransactionCost({
        chain: selectedChain,
        gasLimit: Number(gasLimit),
        gasPrice: gasPrice ? Number(gasPrice) : undefined
      });
      setEstimate(result);
    } catch {
      setError('Failed to calculate cost');
    } finally {
      setLoading(false);
    }
  };

  const chainOptions = state.chains.map(chain => ({
    value: chain.id,
    label: `${chain.name} (${chain.symbol})`
  }));

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-4">Transaction Cost Calculator</h3>
      
      <div className="space-y-4">
        <Select
          label="Blockchain"
          value={selectedChain}
          onChange={(e) => setSelectedChain(e.target.value)}
          options={chainOptions}
        />
        
        <Input
          label="Gas Limit"
          type="number"
          value={gasLimit}
          onChange={(e) => setGasLimit(e.target.value)}
          placeholder="21000"
        />
        
        <Input
          label="Gas Price (Gwei) - Optional"
          type="number"
          value={gasPrice}
          onChange={(e) => setGasPrice(e.target.value)}
          placeholder="Uses current price if empty"
        />
        
        <Button onClick={calculateCost} disabled={loading} className="w-full">
          {loading ? <LoadingSpinner /> : 'Calculate Cost'}
        </Button>
       
        
        {error && <p className="text-red-600 text-sm">{error}</p>}
        
        {estimate && (
          <div className="mt-6 p-4 bg-primary-50 rounded-lg">
            <h4 className="font-semibold text-primary-900 mb-2">Estimated Cost</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Cost:</span>
                <span className="font-bold">{estimate.estimatedCost.toFixed(6)} {estimate.currency}</span>
              </div>
              <div className="flex justify-between">
                <span>Gas Price:</span>
                <span>{estimate.gasPrice} Gwei</span>
              </div>
              <div className="flex justify-between">
                <span>Gas Limit:</span>
                <span>{estimate.gasLimit.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
