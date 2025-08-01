import React, { useEffect } from 'react';
import { GasPriceCard } from '../components/GasPriceCard';
import { ChainSelector } from '../components/ChainSelector';
import { useGas } from '../hooks/useGas';
import { gasApi } from '../services/api';
import { useApi } from '../hooks/useApi';

export const Dashboard: React.FC = () => {
  const { state, dispatch } = useGas();
  const { data: chains } = useApi(() => gasApi.getChains());
  const { data: gasPrice, loading } = useApi(
    () => gasApi.getCurrentGasPrice(state.selectedChain),
    [state.selectedChain]
  );

  useEffect(() => {
    if (chains) {
      dispatch({ type: 'SET_CHAINS', payload: chains });
    }
  }, [chains, dispatch]);

  useEffect(() => {
    if (gasPrice) {
      dispatch({ 
        type: 'SET_GAS_PRICE', 
        payload: { chain: state.selectedChain, price: gasPrice } 
      });
    }
  }, [gasPrice, state.selectedChain, dispatch]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gas Price Dashboard</h2>
        <ChainSelector />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gasPrice && <GasPriceCard gasPrice={gasPrice} loading={loading} />}
      </div>
    </div>
  );
};
