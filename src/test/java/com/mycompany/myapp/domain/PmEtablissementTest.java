package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.AdresseTestSamples.*;
import static com.mycompany.myapp.domain.EmailTestSamples.*;
import static com.mycompany.myapp.domain.PmEntrepriseTestSamples.*;
import static com.mycompany.myapp.domain.PmEtablissementTestSamples.*;
import static com.mycompany.myapp.domain.TelephoneTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PmEtablissementTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PmEtablissement.class);
        PmEtablissement pmEtablissement1 = getPmEtablissementSample1();
        PmEtablissement pmEtablissement2 = new PmEtablissement();
        assertThat(pmEtablissement1).isNotEqualTo(pmEtablissement2);

        pmEtablissement2.setId(pmEtablissement1.getId());
        assertThat(pmEtablissement1).isEqualTo(pmEtablissement2);

        pmEtablissement2 = getPmEtablissementSample2();
        assertThat(pmEtablissement1).isNotEqualTo(pmEtablissement2);
    }

    @Test
    void adresseTest() {
        PmEtablissement pmEtablissement = getPmEtablissementRandomSampleGenerator();
        Adresse adresseBack = getAdresseRandomSampleGenerator();

        pmEtablissement.setAdresse(adresseBack);
        assertThat(pmEtablissement.getAdresse()).isEqualTo(adresseBack);

        pmEtablissement.adresse(null);
        assertThat(pmEtablissement.getAdresse()).isNull();
    }

    @Test
    void emailTest() {
        PmEtablissement pmEtablissement = getPmEtablissementRandomSampleGenerator();
        Email emailBack = getEmailRandomSampleGenerator();

        pmEtablissement.setEmail(emailBack);
        assertThat(pmEtablissement.getEmail()).isEqualTo(emailBack);

        pmEtablissement.email(null);
        assertThat(pmEtablissement.getEmail()).isNull();
    }

    @Test
    void telephoneTest() {
        PmEtablissement pmEtablissement = getPmEtablissementRandomSampleGenerator();
        Telephone telephoneBack = getTelephoneRandomSampleGenerator();

        pmEtablissement.setTelephone(telephoneBack);
        assertThat(pmEtablissement.getTelephone()).isEqualTo(telephoneBack);

        pmEtablissement.telephone(null);
        assertThat(pmEtablissement.getTelephone()).isNull();
    }

    @Test
    void pmEntrepriseTest() {
        PmEtablissement pmEtablissement = getPmEtablissementRandomSampleGenerator();
        PmEntreprise pmEntrepriseBack = getPmEntrepriseRandomSampleGenerator();

        pmEtablissement.setPmEntreprise(pmEntrepriseBack);
        assertThat(pmEtablissement.getPmEntreprise()).isEqualTo(pmEntrepriseBack);

        pmEtablissement.pmEntreprise(null);
        assertThat(pmEtablissement.getPmEntreprise()).isNull();
    }
}
