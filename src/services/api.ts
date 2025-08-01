import axios from 'axios';
import type { Chain, GasPrice, HistoricalData, TransactionEstimate } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const gasApi = {
    
  getChains: (): Promise<Chain[]> => 
    api.get('/gas/chains').then(res => res.data),
  
  getCurrentGasPrice: (chain: string): Promise<GasPrice> =>
    api.get(`/gas/current/${chain}`).then(res => res.data),
  
  getHistoricalData: (chain: string, days: number = 7): Promise<HistoricalData[]> =>
    api.get(`/gas/history/${chain}?days=${days}`).then(res => res.data),
  
  estimateTransactionCost: (params: {
    chain?: string;
    gasLimit: number;
    gasPrice?: number;
  }): Promise<TransactionEstimate> =>
    api.get('/gas/estimate', { params }).then(res => res.data),
};
