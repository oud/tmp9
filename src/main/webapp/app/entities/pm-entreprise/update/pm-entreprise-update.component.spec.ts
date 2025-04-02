import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IAdresse } from 'app/entities/adresse/adresse.model';
import { AdresseService } from 'app/entities/adresse/service/adresse.service';
import { IEmail } from 'app/entities/email/email.model';
import { EmailService } from 'app/entities/email/service/email.service';
import { ITelephone } from 'app/entities/telephone/telephone.model';
import { TelephoneService } from 'app/entities/telephone/service/telephone.service';
import { IPmEntreprise } from '../pm-entreprise.model';
import { PmEntrepriseService } from '../service/pm-entreprise.service';
import { PmEntrepriseFormService } from './pm-entreprise-form.service';

import { PmEntrepriseUpdateComponent } from './pm-entreprise-update.component';

describe('PmEntreprise Management Update Component', () => {
  let comp: PmEntrepriseUpdateComponent;
  let fixture: ComponentFixture<PmEntrepriseUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let pmEntrepriseFormService: PmEntrepriseFormService;
  let pmEntrepriseService: PmEntrepriseService;
  let adresseService: AdresseService;
  let emailService: EmailService;
  let telephoneService: TelephoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PmEntrepriseUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(PmEntrepriseUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PmEntrepriseUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    pmEntrepriseFormService = TestBed.inject(PmEntrepriseFormService);
    pmEntrepriseService = TestBed.inject(PmEntrepriseService);
    adresseService = TestBed.inject(AdresseService);
    emailService = TestBed.inject(EmailService);
    telephoneService = TestBed.inject(TelephoneService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call adresse query and add missing value', () => {
      const pmEntreprise: IPmEntreprise = { id: 18362 };
      const adresse: IAdresse = { id: 31795 };
      pmEntreprise.adresse = adresse;

      const adresseCollection: IAdresse[] = [{ id: 31795 }];
      jest.spyOn(adresseService, 'query').mockReturnValue(of(new HttpResponse({ body: adresseCollection })));
      const expectedCollection: IAdresse[] = [adresse, ...adresseCollection];
      jest.spyOn(adresseService, 'addAdresseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ pmEntreprise });
      comp.ngOnInit();

      expect(adresseService.query).toHaveBeenCalled();
      expect(adresseService.addAdresseToCollectionIfMissing).toHaveBeenCalledWith(adresseCollection, adresse);
      expect(comp.adressesCollection).toEqual(expectedCollection);
    });

    it('should call email query and add missing value', () => {
      const pmEntreprise: IPmEntreprise = { id: 18362 };
      const email: IEmail = { id: 20273 };
      pmEntreprise.email = email;

      const emailCollection: IEmail[] = [{ id: 20273 }];
      jest.spyOn(emailService, 'query').mockReturnValue(of(new HttpResponse({ body: emailCollection })));
      const expectedCollection: IEmail[] = [email, ...emailCollection];
      jest.spyOn(emailService, 'addEmailToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ pmEntreprise });
      comp.ngOnInit();

      expect(emailService.query).toHaveBeenCalled();
      expect(emailService.addEmailToCollectionIfMissing).toHaveBeenCalledWith(emailCollection, email);
      expect(comp.emailsCollection).toEqual(expectedCollection);
    });

    it('should call telephone query and add missing value', () => {
      const pmEntreprise: IPmEntreprise = { id: 18362 };
      const telephone: ITelephone = { id: 29884 };
      pmEntreprise.telephone = telephone;

      const telephoneCollection: ITelephone[] = [{ id: 29884 }];
      jest.spyOn(telephoneService, 'query').mockReturnValue(of(new HttpResponse({ body: telephoneCollection })));
      const expectedCollection: ITelephone[] = [telephone, ...telephoneCollection];
      jest.spyOn(telephoneService, 'addTelephoneToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ pmEntreprise });
      comp.ngOnInit();

      expect(telephoneService.query).toHaveBeenCalled();
      expect(telephoneService.addTelephoneToCollectionIfMissing).toHaveBeenCalledWith(telephoneCollection, telephone);
      expect(comp.telephonesCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const pmEntreprise: IPmEntreprise = { id: 18362 };
      const adresse: IAdresse = { id: 31795 };
      pmEntreprise.adresse = adresse;
      const email: IEmail = { id: 20273 };
      pmEntreprise.email = email;
      const telephone: ITelephone = { id: 29884 };
      pmEntreprise.telephone = telephone;

      activatedRoute.data = of({ pmEntreprise });
      comp.ngOnInit();

      expect(comp.adressesCollection).toContainEqual(adresse);
      expect(comp.emailsCollection).toContainEqual(email);
      expect(comp.telephonesCollection).toContainEqual(telephone);
      expect(comp.pmEntreprise).toEqual(pmEntreprise);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPmEntreprise>>();
      const pmEntreprise = { id: 16964 };
      jest.spyOn(pmEntrepriseFormService, 'getPmEntreprise').mockReturnValue(pmEntreprise);
      jest.spyOn(pmEntrepriseService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pmEntreprise });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pmEntreprise }));
      saveSubject.complete();

      // THEN
      expect(pmEntrepriseFormService.getPmEntreprise).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(pmEntrepriseService.update).toHaveBeenCalledWith(expect.objectContaining(pmEntreprise));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPmEntreprise>>();
      const pmEntreprise = { id: 16964 };
      jest.spyOn(pmEntrepriseFormService, 'getPmEntreprise').mockReturnValue({ id: null });
      jest.spyOn(pmEntrepriseService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pmEntreprise: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pmEntreprise }));
      saveSubject.complete();

      // THEN
      expect(pmEntrepriseFormService.getPmEntreprise).toHaveBeenCalled();
      expect(pmEntrepriseService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPmEntreprise>>();
      const pmEntreprise = { id: 16964 };
      jest.spyOn(pmEntrepriseService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pmEntreprise });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(pmEntrepriseService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareAdresse', () => {
      it('should forward to adresseService', () => {
        const entity = { id: 31795 };
        const entity2 = { id: 16957 };
        jest.spyOn(adresseService, 'compareAdresse');
        comp.compareAdresse(entity, entity2);
        expect(adresseService.compareAdresse).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareEmail', () => {
      it('should forward to emailService', () => {
        const entity = { id: 20273 };
        const entity2 = { id: 30632 };
        jest.spyOn(emailService, 'compareEmail');
        comp.compareEmail(entity, entity2);
        expect(emailService.compareEmail).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareTelephone', () => {
      it('should forward to telephoneService', () => {
        const entity = { id: 29884 };
        const entity2 = { id: 17258 };
        jest.spyOn(telephoneService, 'compareTelephone');
        comp.compareTelephone(entity, entity2);
        expect(telephoneService.compareTelephone).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
