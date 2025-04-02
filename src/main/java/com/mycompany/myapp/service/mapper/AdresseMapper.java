package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Adresse;
import com.mycompany.myapp.service.dto.AdresseDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Adresse} and its DTO {@link AdresseDTO}.
 */
@Mapper(componentModel = "spring")
public interface AdresseMapper extends EntityMapper<AdresseDTO, Adresse> {}
