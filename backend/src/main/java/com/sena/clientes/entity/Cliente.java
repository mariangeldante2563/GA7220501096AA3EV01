package com.sena.clientes.entity;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Documento de MongoDB que representa un cliente.
 * 
 * Cada instancia de esta clase se guarda en la coleccion "clientes".
 */
@Document(collection = "clientes")
public class Cliente {

    // Identificador generado automaticamente por MongoDB.
    @Id
    private String id;

    // Nombre obligatorio, maximo 100 caracteres.
    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 100, message = "El nombre no puede superar los 100 caracteres")
    private String nombre;

    // Correo unico y con formato valido.
    @NotBlank(message = "El correo es obligatorio")
    @Email(message = "El correo debe tener un formato valido")
    @Size(max = 100)
    private String correo;

    // Telefono opcional, maximo 30 caracteres.
    @Size(max = 30, message = "El telefono no puede superar los 30 caracteres")
    private String telefono;

    // Constructores
    public Cliente() {
    }

    public Cliente(String nombre, String correo, String telefono) {
        this.nombre = nombre;
        this.correo = correo;
        this.telefono = telefono;
    }

    // Getters y Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

}
