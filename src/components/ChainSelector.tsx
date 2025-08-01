import React from 'react';
import { useGas } from '../hooks/useGas'
import { gasApi } from '../services/api';
import { useApi } from '../hooks/useApi';

export const ChainSelector: React.FC = () => {
  const { state, dispatch } = useGas();
  const { data: chains } = useApi(() => gasApi.getChains());
    console.log(state.chains);

    React.useEffect(() => {
    if (chains) {
      dispatch({ type: 'SET_CHAINS', payload: chains });
    }
  }, [chains, dispatch]);


  return (
    <select
      value={state.selectedChain}
      onChange={(e) => dispatch({ type: 'SET_SELECTED_CHAIN', payload: e.target.value })}
      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
    >
      {state.chains.length === 0 && (
        <option value="">Loading chains...</option>
      )}
      {state.chains.map((chain) => (
        <option key={chain.id} value={chain.id}>
          {chain.name} ({chain.symbol})
        </option>
      ))}
    </select>
  );
};
