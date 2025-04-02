import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { TelephoneService } from '../service/telephone.service';
import { ITelephone } from '../telephone.model';
import { TelephoneFormService } from './telephone-form.service';

import { TelephoneUpdateComponent } from './telephone-update.component';

describe('Telephone Management Update Component', () => {
  let comp: TelephoneUpdateComponent;
  let fixture: ComponentFixture<TelephoneUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let telephoneFormService: TelephoneFormService;
  let telephoneService: TelephoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TelephoneUpdateComponent],
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
      .overrideTemplate(TelephoneUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TelephoneUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    telephoneFormService = TestBed.inject(TelephoneFormService);
    telephoneService = TestBed.inject(TelephoneService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const telephone: ITelephone = { id: 17258 };

      activatedRoute.data = of({ telephone });
      comp.ngOnInit();

      expect(comp.telephone).toEqual(telephone);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITelephone>>();
      const telephone = { id: 29884 };
      jest.spyOn(telephoneFormService, 'getTelephone').mockReturnValue(telephone);
      jest.spyOn(telephoneService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ telephone });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: telephone }));
      saveSubject.complete();

      // THEN
      expect(telephoneFormService.getTelephone).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(telephoneService.update).toHaveBeenCalledWith(expect.objectContaining(telephone));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITelephone>>();
      const telephone = { id: 29884 };
      jest.spyOn(telephoneFormService, 'getTelephone').mockReturnValue({ id: null });
      jest.spyOn(telephoneService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ telephone: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: telephone }));
      saveSubject.complete();

      // THEN
      expect(telephoneFormService.getTelephone).toHaveBeenCalled();
      expect(telephoneService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITelephone>>();
      const telephone = { id: 29884 };
      jest.spyOn(telephoneService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ telephone });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(telephoneService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
