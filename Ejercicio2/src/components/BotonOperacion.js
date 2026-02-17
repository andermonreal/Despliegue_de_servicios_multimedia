import React from 'react';
import './BotonOperacion.css';

function BotonOperacion({ operacion, activo, onClick }) {
  return (
    <button
      className={`op-btn${activo ? ' op-btn--activo' : ''}`}
      onClick={onClick}
      aria-pressed={activo}
      title={operacion.label}
    >
      <span className="op-btn__simbolo">{operacion.simbolo}</span>
      <span className="op-btn__label">{operacion.label}</span>
    </button>
  );
}

export default BotonOperacion;
