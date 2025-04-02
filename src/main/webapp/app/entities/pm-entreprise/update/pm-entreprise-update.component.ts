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
import { PmEntrepriseService } from '../service/pm-entreprise.service';
import { IPmEntreprise } from '../pm-entreprise.model';
import { PmEntrepriseFormGroup, PmEntrepriseFormService } from './pm-entreprise-form.service';

@Component({
  selector: 'jhi-pm-entreprise-update',
  templateUrl: './pm-entreprise-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class PmEntrepriseUpdateComponent implements OnInit {
  isSaving = false;
  pmEntreprise: IPmEntreprise | null = null;

  adressesCollection: IAdresse[] = [];
  emailsCollection: IEmail[] = [];
  telephonesCollection: ITelephone[] = [];

  protected pmEntrepriseService = inject(PmEntrepriseService);
  protected pmEntrepriseFormService = inject(PmEntrepriseFormService);
  protected adresseService = inject(AdresseService);
  protected emailService = inject(EmailService);
  protected telephoneService = inject(TelephoneService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: PmEntrepriseFormGroup = this.pmEntrepriseFormService.createPmEntrepriseFormGroup();

  compareAdresse = (o1: IAdresse | null, o2: IAdresse | null): boolean => this.adresseService.compareAdresse(o1, o2);

  compareEmail = (o1: IEmail | null, o2: IEmail | null): boolean => this.emailService.compareEmail(o1, o2);

  compareTelephone = (o1: ITelephone | null, o2: ITelephone | null): boolean => this.telephoneService.compareTelephone(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pmEntreprise }) => {
      this.pmEntreprise = pmEntreprise;
      if (pmEntreprise) {
        this.updateForm(pmEntreprise);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pmEntreprise = this.pmEntrepriseFormService.getPmEntreprise(this.editForm);
    if (pmEntreprise.id !== null) {
      this.subscribeToSaveResponse(this.pmEntrepriseService.update(pmEntreprise));
    } else {
      this.subscribeToSaveResponse(this.pmEntrepriseService.create(pmEntreprise));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPmEntreprise>>): void {
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

  protected updateForm(pmEntreprise: IPmEntreprise): void {
    this.pmEntreprise = pmEntreprise;
    this.pmEntrepriseFormService.resetForm(this.editForm, pmEntreprise);

    this.adressesCollection = this.adresseService.addAdresseToCollectionIfMissing<IAdresse>(this.adressesCollection, pmEntreprise.adresse);
    this.emailsCollection = this.emailService.addEmailToCollectionIfMissing<IEmail>(this.emailsCollection, pmEntreprise.email);
    this.telephonesCollection = this.telephoneService.addTelephoneToCollectionIfMissing<ITelephone>(
      this.telephonesCollection,
      pmEntreprise.telephone,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.adresseService
      .query({ filter: 'pmentreprise-is-null' })
      .pipe(map((res: HttpResponse<IAdresse[]>) => res.body ?? []))
      .pipe(
        map((adresses: IAdresse[]) => this.adresseService.addAdresseToCollectionIfMissing<IAdresse>(adresses, this.pmEntreprise?.adresse)),
      )
      .subscribe((adresses: IAdresse[]) => (this.adressesCollection = adresses));

    this.emailService
      .query({ filter: 'pmentreprise-is-null' })
      .pipe(map((res: HttpResponse<IEmail[]>) => res.body ?? []))
      .pipe(map((emails: IEmail[]) => this.emailService.addEmailToCollectionIfMissing<IEmail>(emails, this.pmEntreprise?.email)))
      .subscribe((emails: IEmail[]) => (this.emailsCollection = emails));

    this.telephoneService
      .query({ filter: 'pmentreprise-is-null' })
      .pipe(map((res: HttpResponse<ITelephone[]>) => res.body ?? []))
      .pipe(
        map((telephones: ITelephone[]) =>
          this.telephoneService.addTelephoneToCollectionIfMissing<ITelephone>(telephones, this.pmEntreprise?.telephone),
        ),
      )
      .subscribe((telephones: ITelephone[]) => (this.telephonesCollection = telephones));
  }
}
