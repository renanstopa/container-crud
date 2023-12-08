package com.crud.container.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@Table(name = "container")
public class ContainerModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @NotNull(message = "Loaded can't be null")
    @Column(name = "loaded")
    private Integer loaded;

    @NotEmpty(message = "Content can't be empty")
    @Column(name = "content")
    private String content;

}
