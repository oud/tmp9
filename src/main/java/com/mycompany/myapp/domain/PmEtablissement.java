package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;

/**
 * A PmEtablissement.
 */
@Entity
@Table(name = "pm_etablissement")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class PmEtablissement implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "id_etablissement_rpg", nullable = false)
    private String idEtablissementRPG;

    @NotNull
    @Column(name = "code_partenaire_distributeur", nullable = false)
    private String codePartenaireDistributeur;

    @NotNull
    @Column(name = "numero_siret_siege", nullable = false)
    private String numeroSiretSiege;

    @NotNull
    @Column(name = "code_etat", nullable = false)
    private String codeEtat;

    @NotNull
    @Column(name = "libelle_etat", nullable = false)
    private String libelleEtat;

    @NotNull
    @Column(name = "code_categorie_personne", nullable = false)
    private String codeCategoriePersonne;

    @NotNull
    @Column(name = "libelle_categorie_personne", nullable = false)
    private String libelleCategoriePersonne;

    @NotNull
    @Column(name = "code_type", nullable = false)
    private String codeType;

    @NotNull
    @Column(name = "date_creation_juridique", nullable = false)
    private String dateCreationJuridique;

    @NotNull
    @Column(name = "date_etat", nullable = false)
    private String dateEtat;

    @NotNull
    @Column(name = "date_fermeture_juridique", nullable = false)
    private String dateFermetureJuridique;

    @NotNull
    @Column(name = "code_idcc", nullable = false)
    private String codeIDCC;

    @NotNull
    @Column(name = "code_tranche_effectif", nullable = false)
    private String codeTrancheEffectif;

    @NotNull
    @Column(name = "libelle_tranche_effectif", nullable = false)
    private String libelleTrancheEffectif;

    @NotNull
    @Column(name = "date_cessation_activite", nullable = false)
    private String dateCessationActivite;

    @NotNull
    @Column(name = "date_effectif_officiel", nullable = false)
    private String dateEffectifOfficiel;

    @NotNull
    @Column(name = "effectif_officiel", nullable = false)
    private String effectifOfficiel;

    @NotNull
    @Column(name = "code_motif_cessation_activite", nullable = false)
    private String codeMotifCessationActivite;

    @NotNull
    @Column(name = "siret", nullable = false)
    private String siret;

    @NotNull
    @Column(name = "code_type_etablissement", nullable = false)
    private String codeTypeEtablissement;

    @NotNull
    @Column(name = "libelle_enseigne", nullable = false)
    private String libelleEnseigne;

    @NotNull
    @Column(name = "code_nic", nullable = false)
    private String codeNIC;

    @JsonIgnoreProperties(value = { "pmEntreprise", "pmEtablissement" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    private Adresse adresse;

    @JsonIgnoreProperties(value = { "pmEntreprise", "pmEtablissement" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    private Email email;

    @JsonIgnoreProperties(value = { "pmEntreprise", "pmEtablissement" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    private Telephone telephone;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "adresse", "email", "telephone", "pmEtablissementLists" }, allowSetters = true)
    private PmEntreprise pmEntreprise;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public PmEtablissement id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdEtablissementRPG() {
        return this.idEtablissementRPG;
    }

    public PmEtablissement idEtablissementRPG(String idEtablissementRPG) {
        this.setIdEtablissementRPG(idEtablissementRPG);
        return this;
    }

    public void setIdEtablissementRPG(String idEtablissementRPG) {
        this.idEtablissementRPG = idEtablissementRPG;
    }

    public String getCodePartenaireDistributeur() {
        return this.codePartenaireDistributeur;
    }

    public PmEtablissement codePartenaireDistributeur(String codePartenaireDistributeur) {
        this.setCodePartenaireDistributeur(codePartenaireDistributeur);
        return this;
    }

    public void setCodePartenaireDistributeur(String codePartenaireDistributeur) {
        this.codePartenaireDistributeur = codePartenaireDistributeur;
    }

    public String getNumeroSiretSiege() {
        return this.numeroSiretSiege;
    }

    public PmEtablissement numeroSiretSiege(String numeroSiretSiege) {
        this.setNumeroSiretSiege(numeroSiretSiege);
        return this;
    }

    public void setNumeroSiretSiege(String numeroSiretSiege) {
        this.numeroSiretSiege = numeroSiretSiege;
    }

    public String getCodeEtat() {
        return this.codeEtat;
    }

    public PmEtablissement codeEtat(String codeEtat) {
        this.setCodeEtat(codeEtat);
        return this;
    }

    public void setCodeEtat(String codeEtat) {
        this.codeEtat = codeEtat;
    }

    public String getLibelleEtat() {
        return this.libelleEtat;
    }

    public PmEtablissement libelleEtat(String libelleEtat) {
        this.setLibelleEtat(libelleEtat);
        return this;
    }

    public void setLibelleEtat(String libelleEtat) {
        this.libelleEtat = libelleEtat;
    }

    public String getCodeCategoriePersonne() {
        return this.codeCategoriePersonne;
    }

    public PmEtablissement codeCategoriePersonne(String codeCategoriePersonne) {
        this.setCodeCategoriePersonne(codeCategoriePersonne);
        return this;
    }

    public void setCodeCategoriePersonne(String codeCategoriePersonne) {
        this.codeCategoriePersonne = codeCategoriePersonne;
    }

    public String getLibelleCategoriePersonne() {
        return this.libelleCategoriePersonne;
    }

    public PmEtablissement libelleCategoriePersonne(String libelleCategoriePersonne) {
        this.setLibelleCategoriePersonne(libelleCategoriePersonne);
        return this;
    }

    public void setLibelleCategoriePersonne(String libelleCategoriePersonne) {
        this.libelleCategoriePersonne = libelleCategoriePersonne;
    }

    public String getCodeType() {
        return this.codeType;
    }

    public PmEtablissement codeType(String codeType) {
        this.setCodeType(codeType);
        return this;
    }

    public void setCodeType(String codeType) {
        this.codeType = codeType;
    }

    public String getDateCreationJuridique() {
        return this.dateCreationJuridique;
    }

    public PmEtablissement dateCreationJuridique(String dateCreationJuridique) {
        this.setDateCreationJuridique(dateCreationJuridique);
        return this;
    }

    public void setDateCreationJuridique(String dateCreationJuridique) {
        this.dateCreationJuridique = dateCreationJuridique;
    }

    public String getDateEtat() {
        return this.dateEtat;
    }

    public PmEtablissement dateEtat(String dateEtat) {
        this.setDateEtat(dateEtat);
        return this;
    }

    public void setDateEtat(String dateEtat) {
        this.dateEtat = dateEtat;
    }

    public String getDateFermetureJuridique() {
        return this.dateFermetureJuridique;
    }

    public PmEtablissement dateFermetureJuridique(String dateFermetureJuridique) {
        this.setDateFermetureJuridique(dateFermetureJuridique);
        return this;
    }

    public void setDateFermetureJuridique(String dateFermetureJuridique) {
        this.dateFermetureJuridique = dateFermetureJuridique;
    }

    public String getCodeIDCC() {
        return this.codeIDCC;
    }

    public PmEtablissement codeIDCC(String codeIDCC) {
        this.setCodeIDCC(codeIDCC);
        return this;
    }

    public void setCodeIDCC(String codeIDCC) {
        this.codeIDCC = codeIDCC;
    }

    public String getCodeTrancheEffectif() {
        return this.codeTrancheEffectif;
    }

    public PmEtablissement codeTrancheEffectif(String codeTrancheEffectif) {
        this.setCodeTrancheEffectif(codeTrancheEffectif);
        return this;
    }

    public void setCodeTrancheEffectif(String codeTrancheEffectif) {
        this.codeTrancheEffectif = codeTrancheEffectif;
    }

    public String getLibelleTrancheEffectif() {
        return this.libelleTrancheEffectif;
    }

    public PmEtablissement libelleTrancheEffectif(String libelleTrancheEffectif) {
        this.setLibelleTrancheEffectif(libelleTrancheEffectif);
        return this;
    }

    public void setLibelleTrancheEffectif(String libelleTrancheEffectif) {
        this.libelleTrancheEffectif = libelleTrancheEffectif;
    }

    public String getDateCessationActivite() {
        return this.dateCessationActivite;
    }

    public PmEtablissement dateCessationActivite(String dateCessationActivite) {
        this.setDateCessationActivite(dateCessationActivite);
        return this;
    }

    public void setDateCessationActivite(String dateCessationActivite) {
        this.dateCessationActivite = dateCessationActivite;
    }

    public String getDateEffectifOfficiel() {
        return this.dateEffectifOfficiel;
    }

    public PmEtablissement dateEffectifOfficiel(String dateEffectifOfficiel) {
        this.setDateEffectifOfficiel(dateEffectifOfficiel);
        return this;
    }

    public void setDateEffectifOfficiel(String dateEffectifOfficiel) {
        this.dateEffectifOfficiel = dateEffectifOfficiel;
    }

    public String getEffectifOfficiel() {
        return this.effectifOfficiel;
    }

    public PmEtablissement effectifOfficiel(String effectifOfficiel) {
        this.setEffectifOfficiel(effectifOfficiel);
        return this;
    }

    public void setEffectifOfficiel(String effectifOfficiel) {
        this.effectifOfficiel = effectifOfficiel;
    }

    public String getCodeMotifCessationActivite() {
        return this.codeMotifCessationActivite;
    }

    public PmEtablissement codeMotifCessationActivite(String codeMotifCessationActivite) {
        this.setCodeMotifCessationActivite(codeMotifCessationActivite);
        return this;
    }

    public void setCodeMotifCessationActivite(String codeMotifCessationActivite) {
        this.codeMotifCessationActivite = codeMotifCessationActivite;
    }

    public String getSiret() {
        return this.siret;
    }

    public PmEtablissement siret(String siret) {
        this.setSiret(siret);
        return this;
    }

    public void setSiret(String siret) {
        this.siret = siret;
    }

    public String getCodeTypeEtablissement() {
        return this.codeTypeEtablissement;
    }

    public PmEtablissement codeTypeEtablissement(String codeTypeEtablissement) {
        this.setCodeTypeEtablissement(codeTypeEtablissement);
        return this;
    }

    public void setCodeTypeEtablissement(String codeTypeEtablissement) {
        this.codeTypeEtablissement = codeTypeEtablissement;
    }

    public String getLibelleEnseigne() {
        return this.libelleEnseigne;
    }

    public PmEtablissement libelleEnseigne(String libelleEnseigne) {
        this.setLibelleEnseigne(libelleEnseigne);
        return this;
    }

    public void setLibelleEnseigne(String libelleEnseigne) {
        this.libelleEnseigne = libelleEnseigne;
    }

    public String getCodeNIC() {
        return this.codeNIC;
    }

    public PmEtablissement codeNIC(String codeNIC) {
        this.setCodeNIC(codeNIC);
        return this;
    }

    public void setCodeNIC(String codeNIC) {
        this.codeNIC = codeNIC;
    }

    public Adresse getAdresse() {
        return this.adresse;
    }

    public void setAdresse(Adresse adresse) {
        this.adresse = adresse;
    }

    public PmEtablissement adresse(Adresse adresse) {
        this.setAdresse(adresse);
        return this;
    }

    public Email getEmail() {
        return this.email;
    }

    public void setEmail(Email email) {
        this.email = email;
    }

    public PmEtablissement email(Email email) {
        this.setEmail(email);
        return this;
    }

    public Telephone getTelephone() {
        return this.telephone;
    }

    public void setTelephone(Telephone telephone) {
        this.telephone = telephone;
    }

    public PmEtablissement telephone(Telephone telephone) {
        this.setTelephone(telephone);
        return this;
    }

    public PmEntreprise getPmEntreprise() {
        return this.pmEntreprise;
    }

    public void setPmEntreprise(PmEntreprise pmEntreprise) {
        this.pmEntreprise = pmEntreprise;
    }

    public PmEtablissement pmEntreprise(PmEntreprise pmEntreprise) {
        this.setPmEntreprise(pmEntreprise);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PmEtablissement)) {
            return false;
        }
        return getId() != null && getId().equals(((PmEtablissement) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PmEtablissement{" +
            "id=" + getId() +
            ", idEtablissementRPG='" + getIdEtablissementRPG() + "'" +
            ", codePartenaireDistributeur='" + getCodePartenaireDistributeur() + "'" +
            ", numeroSiretSiege='" + getNumeroSiretSiege() + "'" +
            ", codeEtat='" + getCodeEtat() + "'" +
            ", libelleEtat='" + getLibelleEtat() + "'" +
            ", codeCategoriePersonne='" + getCodeCategoriePersonne() + "'" +
            ", libelleCategoriePersonne='" + getLibelleCategoriePersonne() + "'" +
            ", codeType='" + getCodeType() + "'" +
            ", dateCreationJuridique='" + getDateCreationJuridique() + "'" +
            ", dateEtat='" + getDateEtat() + "'" +
            ", dateFermetureJuridique='" + getDateFermetureJuridique() + "'" +
            ", codeIDCC='" + getCodeIDCC() + "'" +
            ", codeTrancheEffectif='" + getCodeTrancheEffectif() + "'" +
            ", libelleTrancheEffectif='" + getLibelleTrancheEffectif() + "'" +
            ", dateCessationActivite='" + getDateCessationActivite() + "'" +
            ", dateEffectifOfficiel='" + getDateEffectifOfficiel() + "'" +
            ", effectifOfficiel='" + getEffectifOfficiel() + "'" +
            ", codeMotifCessationActivite='" + getCodeMotifCessationActivite() + "'" +
            ", siret='" + getSiret() + "'" +
            ", codeTypeEtablissement='" + getCodeTypeEtablissement() + "'" +
            ", libelleEnseigne='" + getLibelleEnseigne() + "'" +
            ", codeNIC='" + getCodeNIC() + "'" +
            "}";
    }
}
