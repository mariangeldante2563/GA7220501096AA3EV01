package com.sena.clientes.repository;

import com.sena.clientes.entity.Cliente;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositorio de acceso a datos para el documento Cliente en MongoDB.
 * 
 * Al heredar de MongoRepository, Spring Data MongoDB genera automaticamente
 * las implementaciones de los metodos CRUD basicos.
 */
@Repository
public interface ClienteRepository extends MongoRepository<Cliente, String> {
    // No se requieren metodos adicionales para los objetivos de la guia.
    // Si en el futuro se necesita una busqueda por nombre, se puede agregar:
    // List<Cliente> findByNombreContaining(String nombre);
}
