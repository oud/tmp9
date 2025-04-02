package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Telephone;
import com.mycompany.myapp.service.dto.TelephoneDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Telephone} and its DTO {@link TelephoneDTO}.
 */
@Mapper(componentModel = "spring")
public interface TelephoneMapper extends EntityMapper<TelephoneDTO, Telephone> {}
