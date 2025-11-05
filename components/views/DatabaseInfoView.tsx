
import React from 'react';

const codeExample = `
// Este código se ejecutaría en un servidor Backend (p. ej. Node.js), NO en el navegador.

const Firebird = require('node-firebird');

// Configuración de la conexión a tu base de datos Firebird
const options = {
  host: '127.0.0.1',
  port: 3050,
  database: '/path/to/your/database.fdb',
  user: 'SYSDBA',
  password: 'masterkey'
};

// Creación de una ruta API para obtener los vehículos
app.get('/api/vehiculos', (req, res) => {
  Firebird.attach(options, (err, db) => {
    if (err) {
      return res.status(500).json({ error: 'Error al conectar a la base de datos' });
    }

    // Ejecutar una consulta SQL
    db.query('SELECT MATRICULA, FECHA_ENTRADA, TIPO FROM VEHICULOS_ACTUALES', (err, result) => {
      if (err) {
        db.detach();
        return res.status(500).json({ error: 'Error en la consulta' });
      }

      // Enviar los resultados al frontend
      res.json(result);
      db.detach();
    });
  });
});
`;

const DatabaseInfoView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-secondary p-8 rounded-xl shadow-lg">
        <h3 className="text-2xl font-semibold mb-4 text-text-primary border-b border-highlight pb-4">
          Conexión con la Base de Datos Firebird
        </h3>
        <p className="text-text-secondary mb-6">
          Una pregunta muy importante es: ¿cómo conectamos esta interfaz a una base de datos Firebird? Por razones de seguridad y arquitectura, las aplicaciones web que se ejecutan en el navegador (frontend) no pueden conectarse directamente a una base de datos. Hacerlo expondría tus credenciales y sería un riesgo de seguridad enorme.
        </p>

        <h4 className="text-xl font-semibold text-accent mb-3">La Arquitectura Correcta: Cliente-Servidor</h4>
        <p className="text-text-secondary mb-4">
          La comunicación se realiza a través de un intermediario llamado <strong>Backend</strong> o <strong>API</strong>. Este es un servidor que tú controlas, el cual es el único que tiene permiso para hablar con la base de datos.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4 bg-primary p-4 rounded-lg">
            <div className="text-center">
                <p className="text-lg font-bold">1. Frontend (Este Panel)</p>
                <p className="text-sm text-text-secondary">El usuario interactúa aquí</p>
            </div>
            <span className="text-2xl font-mono text-accent">→</span>
            <div className="text-center">
                <p className="text-lg font-bold">2. Backend API (Servidor)</p>
                <p className="text-sm text-text-secondary">Gestiona la lógica y se conecta a la BD</p>
            </div>
             <span className="text-2xl font-mono text-accent">→</span>
            <div className="text-center">
                <p className="text-lg font-bold">3. Base de Datos Firebird</p>
                <p className="text-sm text-text-secondary">Almacena los datos de forma segura</p>
            </div>
        </div>
      </div>

      <div className="bg-secondary p-8 rounded-xl shadow-lg">
        <h4 className="text-xl font-semibold text-accent mb-3">Ejemplo Conceptual del Código del Backend</h4>
        <p className="text-text-secondary mb-4">
          Así es como se vería un ejemplo simple de código en tu servidor (usando Node.js con una librería como 'node-firebird') para obtener la lista de vehículos y enviarla a este panel.
        </p>
        <pre className="bg-primary p-4 rounded-lg overflow-x-auto">
          <code className="text-sm text-cyan-300 font-mono">
            {codeExample.trim()}
          </code>
        </pre>
        <p className="text-text-secondary mt-4 text-sm">
          En resumen: el frontend (este panel) llamaría a una URL como `https://tuservidor.com/api/vehiculos` y el backend se encargaría de obtener los datos de Firebird y devolverlos en un formato que el panel pueda entender (normalmente JSON).
        </p>
      </div>
    </div>
  );
};

export default DatabaseInfoView;
