package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.repository.AdresseRepository;
import com.mycompany.myapp.service.AdresseService;
import com.mycompany.myapp.service.dto.AdresseDTO;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Adresse}.
 */
@RestController
@RequestMapping("/api/adresses")
public class AdresseResource {

    private static final Logger LOG = LoggerFactory.getLogger(AdresseResource.class);

    private static final String ENTITY_NAME = "adresse";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AdresseService adresseService;

    private final AdresseRepository adresseRepository;

    public AdresseResource(AdresseService adresseService, AdresseRepository adresseRepository) {
        this.adresseService = adresseService;
        this.adresseRepository = adresseRepository;
    }

    /**
     * {@code POST  /adresses} : Create a new adresse.
     *
     * @param adresseDTO the adresseDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new adresseDTO, or with status {@code 400 (Bad Request)} if the adresse has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<AdresseDTO> createAdresse(@Valid @RequestBody AdresseDTO adresseDTO) throws URISyntaxException {
        LOG.debug("REST request to save Adresse : {}", adresseDTO);
        if (adresseDTO.getId() != null) {
            throw new BadRequestAlertException("A new adresse cannot already have an ID", ENTITY_NAME, "idexists");
        }
        adresseDTO = adresseService.save(adresseDTO);
        return ResponseEntity.created(new URI("/api/adresses/" + adresseDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, adresseDTO.getId().toString()))
            .body(adresseDTO);
    }

    /**
     * {@code PUT  /adresses/:id} : Updates an existing adresse.
     *
     * @param id the id of the adresseDTO to save.
     * @param adresseDTO the adresseDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated adresseDTO,
     * or with status {@code 400 (Bad Request)} if the adresseDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the adresseDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<AdresseDTO> updateAdresse(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody AdresseDTO adresseDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update Adresse : {}, {}", id, adresseDTO);
        if (adresseDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, adresseDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!adresseRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        adresseDTO = adresseService.update(adresseDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, adresseDTO.getId().toString()))
            .body(adresseDTO);
    }

    /**
     * {@code PATCH  /adresses/:id} : Partial updates given fields of an existing adresse, field will ignore if it is null
     *
     * @param id the id of the adresseDTO to save.
     * @param adresseDTO the adresseDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated adresseDTO,
     * or with status {@code 400 (Bad Request)} if the adresseDTO is not valid,
     * or with status {@code 404 (Not Found)} if the adresseDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the adresseDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<AdresseDTO> partialUpdateAdresse(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody AdresseDTO adresseDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update Adresse partially : {}, {}", id, adresseDTO);
        if (adresseDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, adresseDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!adresseRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<AdresseDTO> result = adresseService.partialUpdate(adresseDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, adresseDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /adresses} : get all the adresses.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of adresses in body.
     */
    @GetMapping("")
    public List<AdresseDTO> getAllAdresses(@RequestParam(name = "filter", required = false) String filter) {
        if ("pmentreprise-is-null".equals(filter)) {
            LOG.debug("REST request to get all Adresses where pmEntreprise is null");
            return adresseService.findAllWherePmEntrepriseIsNull();
        }

        if ("pmetablissement-is-null".equals(filter)) {
            LOG.debug("REST request to get all Adresses where pmEtablissement is null");
            return adresseService.findAllWherePmEtablissementIsNull();
        }
        LOG.debug("REST request to get all Adresses");
        return adresseService.findAll();
    }

    /**
     * {@code GET  /adresses/:id} : get the "id" adresse.
     *
     * @param id the id of the adresseDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the adresseDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<AdresseDTO> getAdresse(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Adresse : {}", id);
        Optional<AdresseDTO> adresseDTO = adresseService.findOne(id);
        return ResponseUtil.wrapOrNotFound(adresseDTO);
    }

    /**
     * {@code DELETE  /adresses/:id} : delete the "id" adresse.
     *
     * @param id the id of the adresseDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdresse(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete Adresse : {}", id);
        adresseService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
