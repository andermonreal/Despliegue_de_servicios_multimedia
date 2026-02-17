import React from 'react';
import './CampoNumerico.css';

function CampoNumerico({ label, valor, onChange }) {
  return (
    <div className="campo-wrapper">
      <label className="campo-label">{label}</label>
      <input
        type="number"
        className="campo-input"
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0"
        step="any"
      />
    </div>
  );
}

export default CampoNumerico;
