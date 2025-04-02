import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'tmp9App.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'pm-entreprise',
    data: { pageTitle: 'tmp9App.pmEntreprise.home.title' },
    loadChildren: () => import('./pm-entreprise/pm-entreprise.routes'),
  },
  {
    path: 'adresse',
    data: { pageTitle: 'tmp9App.adresse.home.title' },
    loadChildren: () => import('./adresse/adresse.routes'),
  },
  {
    path: 'telephone',
    data: { pageTitle: 'tmp9App.telephone.home.title' },
    loadChildren: () => import('./telephone/telephone.routes'),
  },
  {
    path: 'email',
    data: { pageTitle: 'tmp9App.email.home.title' },
    loadChildren: () => import('./email/email.routes'),
  },
  {
    path: 'pm-etablissement',
    data: { pageTitle: 'tmp9App.pmEtablissement.home.title' },
    loadChildren: () => import('./pm-etablissement/pm-etablissement.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
