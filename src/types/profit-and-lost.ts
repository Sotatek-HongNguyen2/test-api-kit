import { Moment } from 'moment';

export enum FilterType {
  Last_7_DAYS = 0,
  Last_30_DAYS = 1,
  CUSTOM_RANGE = 2,
}

export type DateRangeOption = {
  id: number;
  label: string;
  value: number;
};

export type RangeValue = [Moment | null, Moment | null] | null;
