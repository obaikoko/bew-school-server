export type NextTerm = {
  id: string;
  session: string;
  term: string;
  level: string;
  reOpeningDate: Date;
  busFee: number | null;
  nextTermFee: number;
  otherCharges: number | null;
};
