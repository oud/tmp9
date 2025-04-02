package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Adresse;
import com.mycompany.myapp.domain.Email;
import com.mycompany.myapp.domain.PmEntreprise;
import com.mycompany.myapp.domain.Telephone;
import com.mycompany.myapp.service.dto.AdresseDTO;
import com.mycompany.myapp.service.dto.EmailDTO;
import com.mycompany.myapp.service.dto.PmEntrepriseDTO;
import com.mycompany.myapp.service.dto.TelephoneDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link PmEntreprise} and its DTO {@link PmEntrepriseDTO}.
 */
@Mapper(componentModel = "spring")
public interface PmEntrepriseMapper extends EntityMapper<PmEntrepriseDTO, PmEntreprise> {
    @Mapping(target = "adresse", source = "adresse", qualifiedByName = "adresseId")
    @Mapping(target = "email", source = "email", qualifiedByName = "emailId")
    @Mapping(target = "telephone", source = "telephone", qualifiedByName = "telephoneId")
    PmEntrepriseDTO toDto(PmEntreprise s);

    @Named("adresseId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AdresseDTO toDtoAdresseId(Adresse adresse);

    @Named("emailId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    EmailDTO toDtoEmailId(Email email);

    @Named("telephoneId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    TelephoneDTO toDtoTelephoneId(Telephone telephone);
}
