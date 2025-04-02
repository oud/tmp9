import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IAdresse } from 'app/entities/adresse/adresse.model';
import { AdresseService } from 'app/entities/adresse/service/adresse.service';
import { IEmail } from 'app/entities/email/email.model';
import { EmailService } from 'app/entities/email/service/email.service';
import { ITelephone } from 'app/entities/telephone/telephone.model';
import { TelephoneService } from 'app/entities/telephone/service/telephone.service';
import { IPmEntreprise } from 'app/entities/pm-entreprise/pm-entreprise.model';
import { PmEntrepriseService } from 'app/entities/pm-entreprise/service/pm-entreprise.service';
import { PmEtablissementService } from '../service/pm-etablissement.service';
import { IPmEtablissement } from '../pm-etablissement.model';
import { PmEtablissementFormGroup, PmEtablissementFormService } from './pm-etablissement-form.service';

@Component({
  selector: 'jhi-pm-etablissement-update',
  templateUrl: './pm-etablissement-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class PmEtablissementUpdateComponent implements OnInit {
  isSaving = false;
  pmEtablissement: IPmEtablissement | null = null;

  adressesCollection: IAdresse[] = [];
  emailsCollection: IEmail[] = [];
  telephonesCollection: ITelephone[] = [];
  pmEntreprisesSharedCollection: IPmEntreprise[] = [];

  protected pmEtablissementService = inject(PmEtablissementService);
  protected pmEtablissementFormService = inject(PmEtablissementFormService);
  protected adresseService = inject(AdresseService);
  protected emailService = inject(EmailService);
  protected telephoneService = inject(TelephoneService);
  protected pmEntrepriseService = inject(PmEntrepriseService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: PmEtablissementFormGroup = this.pmEtablissementFormService.createPmEtablissementFormGroup();

  compareAdresse = (o1: IAdresse | null, o2: IAdresse | null): boolean => this.adresseService.compareAdresse(o1, o2);

  compareEmail = (o1: IEmail | null, o2: IEmail | null): boolean => this.emailService.compareEmail(o1, o2);

  compareTelephone = (o1: ITelephone | null, o2: ITelephone | null): boolean => this.telephoneService.compareTelephone(o1, o2);

  comparePmEntreprise = (o1: IPmEntreprise | null, o2: IPmEntreprise | null): boolean =>
    this.pmEntrepriseService.comparePmEntreprise(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pmEtablissement }) => {
      this.pmEtablissement = pmEtablissement;
      if (pmEtablissement) {
        this.updateForm(pmEtablissement);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pmEtablissement = this.pmEtablissementFormService.getPmEtablissement(this.editForm);
    if (pmEtablissement.id !== null) {
      this.subscribeToSaveResponse(this.pmEtablissementService.update(pmEtablissement));
    } else {
      this.subscribeToSaveResponse(this.pmEtablissementService.create(pmEtablissement));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPmEtablissement>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(pmEtablissement: IPmEtablissement): void {
    this.pmEtablissement = pmEtablissement;
    this.pmEtablissementFormService.resetForm(this.editForm, pmEtablissement);

    this.adressesCollection = this.adresseService.addAdresseToCollectionIfMissing<IAdresse>(
      this.adressesCollection,
      pmEtablissement.adresse,
    );
    this.emailsCollection = this.emailService.addEmailToCollectionIfMissing<IEmail>(this.emailsCollection, pmEtablissement.email);
    this.telephonesCollection = this.telephoneService.addTelephoneToCollectionIfMissing<ITelephone>(
      this.telephonesCollection,
      pmEtablissement.telephone,
    );
    this.pmEntreprisesSharedCollection = this.pmEntrepriseService.addPmEntrepriseToCollectionIfMissing<IPmEntreprise>(
      this.pmEntreprisesSharedCollection,
      pmEtablissement.pmEntreprise,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.adresseService
      .query({ filter: 'pmetablissement-is-null' })
      .pipe(map((res: HttpResponse<IAdresse[]>) => res.body ?? []))
      .pipe(
        map((adresses: IAdresse[]) =>
          this.adresseService.addAdresseToCollectionIfMissing<IAdresse>(adresses, this.pmEtablissement?.adresse),
        ),
      )
      .subscribe((adresses: IAdresse[]) => (this.adressesCollection = adresses));

    this.emailService
      .query({ filter: 'pmetablissement-is-null' })
      .pipe(map((res: HttpResponse<IEmail[]>) => res.body ?? []))
      .pipe(map((emails: IEmail[]) => this.emailService.addEmailToCollectionIfMissing<IEmail>(emails, this.pmEtablissement?.email)))
      .subscribe((emails: IEmail[]) => (this.emailsCollection = emails));

    this.telephoneService
      .query({ filter: 'pmetablissement-is-null' })
      .pipe(map((res: HttpResponse<ITelephone[]>) => res.body ?? []))
      .pipe(
        map((telephones: ITelephone[]) =>
          this.telephoneService.addTelephoneToCollectionIfMissing<ITelephone>(telephones, this.pmEtablissement?.telephone),
        ),
      )
      .subscribe((telephones: ITelephone[]) => (this.telephonesCollection = telephones));

    this.pmEntrepriseService
      .query()
      .pipe(map((res: HttpResponse<IPmEntreprise[]>) => res.body ?? []))
      .pipe(
        map((pmEntreprises: IPmEntreprise[]) =>
          this.pmEntrepriseService.addPmEntrepriseToCollectionIfMissing<IPmEntreprise>(pmEntreprises, this.pmEtablissement?.pmEntreprise),
        ),
      )
      .subscribe((pmEntreprises: IPmEntreprise[]) => (this.pmEntreprisesSharedCollection = pmEntreprises));
  }
}
