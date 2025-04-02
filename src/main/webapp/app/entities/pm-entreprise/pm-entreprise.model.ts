import dayjs from 'dayjs/esm';
import { IAdresse } from 'app/entities/adresse/adresse.model';
import { IEmail } from 'app/entities/email/email.model';
import { ITelephone } from 'app/entities/telephone/telephone.model';

export interface IPmEntreprise {
  id: number;
  idEntrepriseRPG?: string | null;
  codePartenaireDistributeur?: string | null;
  numeroSiretSiege?: string | null;
  codeEtat?: string | null;
  libelleEtat?: string | null;
  codeCategoriePersonne?: string | null;
  libelleCategoriePersonne?: string | null;
  codeType?: string | null;
  dateCreationJuridique?: dayjs.Dayjs | null;
  dateEtat?: dayjs.Dayjs | null;
  dateFermetureJuridique?: dayjs.Dayjs | null;
  codeTrancheEffectif?: string | null;
  libelleTrancheEffectif?: string | null;
  dateCessationActivite?: dayjs.Dayjs | null;
  dateEffectifOfficiel?: dayjs.Dayjs | null;
  effectifOfficiel?: string | null;
  codeMotifCessationActivite?: string | null;
  siren?: string | null;
  codeFormeJuridique?: string | null;
  raisonSociale?: string | null;
  codeCategorieJuridique?: string | null;
  codeIDCC?: string | null;
  codeAPE?: string | null;
  adresse?: Pick<IAdresse, 'id'> | null;
  email?: Pick<IEmail, 'id'> | null;
  telephone?: Pick<ITelephone, 'id'> | null;
}

export type NewPmEntreprise = Omit<IPmEntreprise, 'id'> & { id: null };
