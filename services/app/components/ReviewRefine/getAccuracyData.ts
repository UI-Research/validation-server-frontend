import notEmpty from '../../util/notEmpty';
import { ConfidentialDataResult } from '../context/ApiContext/queries/confidentialData';

export enum Columns {
  PRIVACY_ERROR = 'Privacy error',
  PRIVACY_COST = 'Privacy cost',
}
export interface AccuracyData {
  id: number;
  [Columns.PRIVACY_ERROR]: number | null | undefined;
  [Columns.PRIVACY_COST]: string;
  '10': number | null | undefined;
  '90': number | null | undefined;
}
interface ParsedAccuracy {
  accuracy: number;
  quantiles: number;
}

function getAccuracyDatum(datum: ConfidentialDataResult): AccuracyData {
  const parsed = JSON.parse(datum.accuracy) as ParsedAccuracy[];
  return {
    id: datum.run_id,
    [Columns.PRIVACY_ERROR]: parsed.find(a => a.quantiles === 0.5)?.accuracy,
    [Columns.PRIVACY_COST]: datum.privacy_budget_used,
    '10': parsed.find(a => a.quantiles === 0.1)?.accuracy,
    '90': parsed.find(a => a.quantiles === 0.9)?.accuracy,
  };
}
function getAccuracyData(data: ConfidentialDataResult[]): AccuracyData[] {
  return data
    .map(getAccuracyDatum)
    .sort(
      (a, b) =>
        Number(a[Columns.PRIVACY_COST]) - Number(b[Columns.PRIVACY_COST]),
    );
}

function getErrorVal(val: number | null | undefined, places = 1): string {
  if (notEmpty(val)) {
    // Round to one decimal place.
    const p = 10 ** places;
    const num = Math.round(val * p) / p;
    return num.toLocaleString();
  }
  return '';
}

export { getAccuracyDatum, getErrorVal };
export default getAccuracyData;
