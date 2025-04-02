import dayjs from 'dayjs/esm';

export interface IEmail {
  id: number;
  adresseEmail?: string | null;
  codeStatut?: string | null;
  dateStatut?: dayjs.Dayjs | null;
  codeUsageEmail?: string | null;
}

export type NewEmail = Omit<IEmail, 'id'> & { id: null };
