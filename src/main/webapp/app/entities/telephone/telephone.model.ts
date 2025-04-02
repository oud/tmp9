import dayjs from 'dayjs/esm';

export interface ITelephone {
  id: number;
  codePaysISO?: string | null;
  codeTypeTelephone?: string | null;
  dateDerniereModification?: dayjs.Dayjs | null;
  codeIndicatifPays?: string | null;
  numeroTelephone?: string | null;
  codeStatut?: string | null;
  dateStatut?: string | null;
  codeUsageTelephone?: string | null;
}

export type NewTelephone = Omit<ITelephone, 'id'> & { id: null };
