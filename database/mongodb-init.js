// Script de inicialización de MongoDB para Registro de Clientes
// Ejecutar con: mongosh mongodb://localhost:27017/registro_clientes < mongodb-init.js

use registro_clientes;

// Eliminar colección existente (opcional, para reinicio limpio)
db.clientes.drop();

// Insertar datos de ejemplo
db.clientes.insertMany([
    {
        "_id": ObjectId("6a5385516df5942a6ee0b3ac"),
        "nombre": "ALVARO CARRILLO",
        "correo": "ALVARO@GMAIL.COM",
        "telefono": "3142567859"
    }
]);

// Crear índices para mejor rendimiento
db.clientes.createIndex({ "correo": 1 }, { unique: true });
db.clientes.createIndex({ "nombre": 1 });

print("Base de datos 'registro_clientes' inicializada correctamente.");
print("Clientes insertados: " + db.clientes.countDocuments());