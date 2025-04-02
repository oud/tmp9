import dayjs from 'dayjs/esm';

export interface IAdresse {
  id: number;
  codePaysISO?: string | null;
  codePostal?: string | null;
  dateDerniereModification?: dayjs.Dayjs | null;
  libelleCommune?: string | null;
  ligne1?: string | null;
  ligne2?: string | null;
  ligne3?: string | null;
  ligne4?: string | null;
  ligne5?: string | null;
  ligne6?: string | null;
  ligne7?: string | null;
  nombreCourriersPND?: string | null;
  codeUsageAdresse?: string | null;
}

export type NewAdresse = Omit<IAdresse, 'id'> & { id: null };
