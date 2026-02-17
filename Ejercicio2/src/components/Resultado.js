import React from 'react';
import './Resultado.css';

function formatearNumero(num) {
  if (Number.isInteger(num)) return num.toString();
  // Máximo 8 decimales, sin trailing zeros
  return parseFloat(num.toFixed(8)).toString();
}

function Resultado({ valorA, valorB, resultado, error, operacion }) {
  const sinDatos   = valorA === '' || valorB === '' || !operacion;
  const tieneError = !!error;
  const tieneValor = resultado !== null && !tieneError;

  const estadoClase = tieneError
    ? 'resultado--error'
    : tieneValor
      ? 'resultado--valor'
      : 'resultado--vacio';

  return (
    <div className={`resultado-box ${estadoClase}`}>

      {/* Etiqueta superior */}
      <div className="resultado-header">
        <span className="resultado-tag">
          {tieneError ? 'error' : 'resultado'}
        </span>
        {operacion && !sinDatos && (
          <span className="resultado-expr">
            {valorA} {operacion.simbolo} {valorB} =
          </span>
        )}
      </div>

      {/* Número principal */}
      <div className="resultado-display">
        {tieneError && <span className="resultado-valor resultado-valor--error">{error}</span>}
        {tieneValor && <span className="resultado-valor">{formatearNumero(resultado)}</span>}
        {!tieneError && !tieneValor && (
          <span className="resultado-placeholder">
            {!operacion ? 'Elige una operación' : 'Introduce los valores'}
          </span>
        )}
      </div>

      {/* Barra de estado inferior */}
      {tieneValor && (
        <div className="resultado-footer">
          <span>{operacion.label}</span>
          <span className="resultado-footer-op">{operacion.simbolo}</span>
        </div>
      )}
    </div>
  );
}

export default Resultado;
