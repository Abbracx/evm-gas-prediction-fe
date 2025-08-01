import React from 'react';
import { useGas } from '../hooks/useGas';

export const ChainSelector: React.FC = () => {
  const { state, dispatch } = useGas();

  return (
    <select
      value={state.selectedChain}
      onChange={(e) => dispatch({ type: 'SET_SELECTED_CHAIN', payload: e.target.value })}
      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
    >
      {state.chains.map((chain) => (
        <option key={chain.id} value={chain.id}>
          {chain.name} ({chain.symbol})
        </option>
      ))}
    </select>
  );
};
