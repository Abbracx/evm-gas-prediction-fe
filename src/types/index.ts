export interface Chain {
    id: string;
    name: string;
    symbol: string;
}
  
export interface GasPrice {
    chain: string;
    safe: number;
    standard: number;
    fast: number;
    timestamp: string;
}
  
export interface HistoricalData {
    chain: string;
    date: string;
    avgGasPrice: number;
    minGasPrice: number;
    maxGasPrice: number;
}
  
export interface TransactionEstimate {
    estimatedCost: number;
    currency: string;
    gasPrice: number;
    gasLimit: number;
    chain: string;
}
  