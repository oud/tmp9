package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.AdresseTestSamples.*;
import static com.mycompany.myapp.domain.EmailTestSamples.*;
import static com.mycompany.myapp.domain.PmEntrepriseTestSamples.*;
import static com.mycompany.myapp.domain.PmEtablissementTestSamples.*;
import static com.mycompany.myapp.domain.TelephoneTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class PmEntrepriseTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PmEntreprise.class);
        PmEntreprise pmEntreprise1 = getPmEntrepriseSample1();
        PmEntreprise pmEntreprise2 = new PmEntreprise();
        assertThat(pmEntreprise1).isNotEqualTo(pmEntreprise2);

        pmEntreprise2.setId(pmEntreprise1.getId());
        assertThat(pmEntreprise1).isEqualTo(pmEntreprise2);

        pmEntreprise2 = getPmEntrepriseSample2();
        assertThat(pmEntreprise1).isNotEqualTo(pmEntreprise2);
    }

    @Test
    void adresseTest() {
        PmEntreprise pmEntreprise = getPmEntrepriseRandomSampleGenerator();
        Adresse adresseBack = getAdresseRandomSampleGenerator();

        pmEntreprise.setAdresse(adresseBack);
        assertThat(pmEntreprise.getAdresse()).isEqualTo(adresseBack);

        pmEntreprise.adresse(null);
        assertThat(pmEntreprise.getAdresse()).isNull();
    }

    @Test
    void emailTest() {
        PmEntreprise pmEntreprise = getPmEntrepriseRandomSampleGenerator();
        Email emailBack = getEmailRandomSampleGenerator();

        pmEntreprise.setEmail(emailBack);
        assertThat(pmEntreprise.getEmail()).isEqualTo(emailBack);

        pmEntreprise.email(null);
        assertThat(pmEntreprise.getEmail()).isNull();
    }

    @Test
    void telephoneTest() {
        PmEntreprise pmEntreprise = getPmEntrepriseRandomSampleGenerator();
        Telephone telephoneBack = getTelephoneRandomSampleGenerator();

        pmEntreprise.setTelephone(telephoneBack);
        assertThat(pmEntreprise.getTelephone()).isEqualTo(telephoneBack);

        pmEntreprise.telephone(null);
        assertThat(pmEntreprise.getTelephone()).isNull();
    }

    @Test
    void pmEtablissementListTest() {
        PmEntreprise pmEntreprise = getPmEntrepriseRandomSampleGenerator();
        PmEtablissement pmEtablissementBack = getPmEtablissementRandomSampleGenerator();

        pmEntreprise.addPmEtablissementList(pmEtablissementBack);
        assertThat(pmEntreprise.getPmEtablissementLists()).containsOnly(pmEtablissementBack);
        assertThat(pmEtablissementBack.getPmEntreprise()).isEqualTo(pmEntreprise);

        pmEntreprise.removePmEtablissementList(pmEtablissementBack);
        assertThat(pmEntreprise.getPmEtablissementLists()).doesNotContain(pmEtablissementBack);
        assertThat(pmEtablissementBack.getPmEntreprise()).isNull();

        pmEntreprise.pmEtablissementLists(new HashSet<>(Set.of(pmEtablissementBack)));
        assertThat(pmEntreprise.getPmEtablissementLists()).containsOnly(pmEtablissementBack);
        assertThat(pmEtablissementBack.getPmEntreprise()).isEqualTo(pmEntreprise);

        pmEntreprise.setPmEtablissementLists(new HashSet<>());
        assertThat(pmEntreprise.getPmEtablissementLists()).doesNotContain(pmEtablissementBack);
        assertThat(pmEtablissementBack.getPmEntreprise()).isNull();
    }
}
