package com.crud.container.controllers;

import com.crud.container.models.ContainerModel;
import com.crud.container.services.ContainerService;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
import java.util.List;

@RestController
@RequestMapping("/container")
public class ContainerController {

    @Autowired private ContainerService containerService;

    @PostMapping("")
    public ResponseEntity<ContainerModel> create(@Valid @RequestBody ContainerModel containerModel){
        return new ResponseEntity<ContainerModel>(containerService.save(containerModel), HttpStatus.CREATED);
    }

    @GetMapping("")
    public ResponseEntity<List<ContainerModel>> findAll(@RequestParam(value = "page", required = false, defaultValue = "0") Integer page){
        return new ResponseEntity<List<ContainerModel>>(containerService.findAll(page), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContainerModel> findById(@PathVariable("id") Integer id){
        return new ResponseEntity<ContainerModel>(containerService.findById(id), HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ContainerModel> update(@PathVariable("id") Integer id, @Valid @RequestBody ContainerModel containerModel){
        var container = containerService.findById(id);
        BeanUtils.copyProperties(containerModel, container);
        container.setId(id);
        return new ResponseEntity<ContainerModel>(containerService.save(container), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public HttpStatus delete(@PathVariable("id") Integer id){
        containerService.delete(id);
        return HttpStatus.OK;
    }
}
