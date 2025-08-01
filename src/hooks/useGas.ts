import { useContext } from 'react';
import { GasContext } from '../context/GasContext';

export const useGas = () => {
  const context = useContext(GasContext);
  if (!context) throw new Error('useGas must be used within GasProvider');
  return context;
};
