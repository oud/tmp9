import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITelephone } from '../telephone.model';
import { TelephoneService } from '../service/telephone.service';
import { TelephoneFormGroup, TelephoneFormService } from './telephone-form.service';

@Component({
  selector: 'jhi-telephone-update',
  templateUrl: './telephone-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TelephoneUpdateComponent implements OnInit {
  isSaving = false;
  telephone: ITelephone | null = null;

  protected telephoneService = inject(TelephoneService);
  protected telephoneFormService = inject(TelephoneFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TelephoneFormGroup = this.telephoneFormService.createTelephoneFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ telephone }) => {
      this.telephone = telephone;
      if (telephone) {
        this.updateForm(telephone);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const telephone = this.telephoneFormService.getTelephone(this.editForm);
    if (telephone.id !== null) {
      this.subscribeToSaveResponse(this.telephoneService.update(telephone));
    } else {
      this.subscribeToSaveResponse(this.telephoneService.create(telephone));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITelephone>>): void {
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

  protected updateForm(telephone: ITelephone): void {
    this.telephone = telephone;
    this.telephoneFormService.resetForm(this.editForm, telephone);
  }
}
