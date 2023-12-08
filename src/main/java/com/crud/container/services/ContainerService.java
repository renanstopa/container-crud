package com.crud.container.services;

import com.crud.container.models.ContainerModel;
import com.crud.container.repositories.ContainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContainerService {

    @Autowired private ContainerRepository containerRepository;

    public ContainerModel save(ContainerModel containerModel) {
        return containerRepository.save(containerModel);
    }

    public List<ContainerModel> findAll(Integer page) {
        return  containerRepository.findAll(Pageable.ofSize(2).withPage(page)).getContent();
    }

    public ContainerModel findById(Integer id) {
        return containerRepository.findById(id).get();
    }

    public void delete(Integer id) {
        containerRepository.deleteById(id);
    }
}
