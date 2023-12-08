package com.crud.container.repositories;

import com.crud.container.models.ContainerModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContainerRepository extends JpaRepository<ContainerModel, Integer> {
}
