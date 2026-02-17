import React, { useState } from 'react';
import './App.css';
import CampoNumerico from './components/CampoNumerico';
import BotonOperacion from './components/BotonOperacion';
import Resultado from './components/Resultado';

const OPERACIONES = [
  { id: 'suma',           simbolo: '+', label: 'Suma',           calculo: (a, b) => a + b },
  { id: 'resta',          simbolo: '−', label: 'Resta',          calculo: (a, b) => a - b },
  { id: 'multiplicacion', simbolo: '×', label: 'Multiplicación', calculo: (a, b) => a * b },
  { id: 'division',       simbolo: '÷', label: 'División',       calculo: (a, b) => b !== 0 ? a / b : null },
];

function App() {
  const [valorA, setValorA] = useState('');
  const [valorB, setValorB] = useState('');
  const [operacionActiva, setOperacionActiva] = useState(null);

  const operacionSeleccionada = OPERACIONES.find(op => op.id === operacionActiva) || null;

  const calcularResultado = () => {
    if (!operacionSeleccionada) return { valor: null, error: null };
    const a = parseFloat(valorA);
    const b = parseFloat(valorB);
    if (valorA === '' || valorB === '') return { valor: null, error: null };
    if (isNaN(a) || isNaN(b))           return { valor: null, error: 'Valores inválidos' };
    const res = operacionSeleccionada.calculo(a, b);
    if (res === null)                    return { valor: null, error: 'División por cero' };
    return { valor: res, error: null };
  };

  const { valor: resultado, error } = calcularResultado();

  return (
    <div className="app-wrapper">
      <div className="calc-card">

        {/* Cabecera */}
        <header className="calc-header">
          <span className="calc-tag">REACT + BOOTSTRAP</span>
          <h1 className="calc-title">Calculadora</h1>
          <p className="calc-subtitle">Operaciones aritméticas básicas</p>
        </header>

        {/* Inputs A y B */}
        <div className="calc-inputs">
          <CampoNumerico
            label="A"
            valor={valorA}
            onChange={setValorA}
          />
          <div className="inputs-divider">
            {operacionSeleccionada
              ? <span className="divider-op">{operacionSeleccionada.simbolo}</span>
              : <span className="divider-dots">···</span>
            }
          </div>
          <CampoNumerico
            label="B"
            valor={valorB}
            onChange={setValorB}
          />
        </div>

        {/* Botones de operación */}
        <div className="calc-ops">
          <p className="ops-label">Selecciona operación</p>
          <div className="row g-2">
            {OPERACIONES.map(op => (
              <div className="col-6 col-sm-3" key={op.id}>
                <BotonOperacion
                  operacion={op}
                  activo={operacionActiva === op.id}
                  onClick={() => setOperacionActiva(op.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Resultado */}
        <Resultado
          valorA={valorA}
          valorB={valorB}
          resultado={resultado}
          error={error}
          operacion={operacionSeleccionada}
        />

      </div>
    </div>
  );
}

export default App;
