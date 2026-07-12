package com.sena.clientes.service;

import com.sena.clientes.entity.Cliente;
import com.sena.clientes.repository.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Capa de logica de negocio para la gestion de clientes.
 * 
 * Aqui se centralizan las reglas de negocio (validaciones de existencia,
 * manejo de errores, etc.) antes de tocar la base de datos.
 * 
 * Se inyecta el repositorio por constructor (buena practica) en lugar
 * de usar @Autowired por campo.
 */
@Service
public class ClienteService {

    private final ClienteRepository repository;

    public ClienteService(ClienteRepository repository) {
        this.repository = repository;
    }

    /**
     * Registra un nuevo cliente en la base de datos.
     */
    public Cliente guardar(Cliente cliente) {
        return repository.save(cliente);
    }

    /**
     * Retorna todos los clientes registrados.
     */
    public List<Cliente> listar() {
        return repository.findAll();
    }

    /**
     * Busca un cliente por su id. Retorna Optional para forzar el manejo
     * del caso "no encontrado" en el controller.
     */
    public Optional<Cliente> buscar(String id) {
        return repository.findById(id);
    }

    /**
     * Actualiza un cliente existente. Verificamos que el cliente exista
     * antes de actualizarlo; si no existe, se retorna Optional vacio
     * para que el controller responda con 404.
     */
    public Optional<Cliente> actualizar(String id, Cliente datosNuevos) {
        return repository.findById(id).map(clienteExistente -> {
            clienteExistente.setNombre(datosNuevos.getNombre());
            clienteExistente.setCorreo(datosNuevos.getCorreo());
            clienteExistente.setTelefono(datosNuevos.getTelefono());
            return repository.save(clienteExistente);
        });
    }

    /**
     * Elimina un cliente por su id. Devuelve true si se elimino,
     * false si el cliente no existia.
     */
    public boolean eliminar(String id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

}
