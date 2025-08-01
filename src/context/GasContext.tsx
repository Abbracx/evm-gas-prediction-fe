import React, { createContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { Chain, GasPrice } from '../types';

interface GasState {
  selectedChain: string;
  chains: Chain[];
  gasPrices: Record<string, GasPrice>;
  loading: boolean;
}

type GasAction = 
  | { type: 'SET_CHAINS'; payload: Chain[] }
  | { type: 'SET_SELECTED_CHAIN'; payload: string }
  | { type: 'SET_GAS_PRICE'; payload: { chain: string; price: GasPrice } }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: GasState = {
  selectedChain: 'ethereum',
  chains: [],
  gasPrices: {},
  loading: false,
};

const gasReducer = (state: GasState, action: GasAction): GasState => {
  switch (action.type) {
    case 'SET_CHAINS':
      return { ...state, chains: action.payload };
    case 'SET_SELECTED_CHAIN':
      return { ...state, selectedChain: action.payload };
    case 'SET_GAS_PRICE':
      return {
        ...state,
        gasPrices: { ...state.gasPrices, [action.payload.chain]: action.payload.price }
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const GasContext = createContext<{
  state: GasState;
  dispatch: React.Dispatch<GasAction>;
} | null>(null);

const GasProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gasReducer, initialState);
  
  return (
    <GasContext.Provider value={{ state, dispatch }}>
      {children}
    </GasContext.Provider>
  );
};

// const useGas = () => {
//   const context = useContext(GasContext);
//   if (!context) throw new Error('useGas must be used within GasProvider');
//   return context;
// };

export { GasProvider, GasContext };


