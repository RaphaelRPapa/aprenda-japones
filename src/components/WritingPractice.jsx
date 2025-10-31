// src/components/WritingPractice.jsx
import React, { useRef, useEffect, useState } from 'react';
import { Eye, EyeOff, RefreshCw, X } from 'lucide-react';

const WritingPractice = ({ char, romaji, examples = [], onClose }) => {
  const guideRef = useRef(null);     // canvas de guia (baixo)
  const drawRef = useRef(null);      // canvas de desenho (cima)
  const [isDrawing, setIsDrawing] = useState(false);
  const [showGuide, setShowGuide] = useState(true);

  const strokeWidth = 8; // espessura do traço do usuário (ajuste aqui)

  // configura os dois canvases para devicePixelRatio
  const setupCanvases = () => {
    const ratio = window.devicePixelRatio || 1;
    const size = 300;
    const visualW = size;
    const visualH = size;

    [guideRef.current, drawRef.current].forEach((canvas) => {
      if (!canvas) return;
      canvas.style.width = `${visualW}px`;
      canvas.style.height = `${visualH}px`;
      canvas.width = visualW * ratio;
      canvas.height = visualH * ratio;
      const ctx = canvas.getContext('2d');
      ctx.scale(ratio, ratio);
      // Padrões por canvas:
      if (canvas === drawRef.current) {
        ctx.lineWidth = strokeWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = '#6366f1';
      }
    });

    drawGuide(); // desenha guia (no canvas guide)
    clearDrawing(false); // limpa o canvas de desenho (sem focar)
  };

  useEffect(() => {
    setupCanvases();
    window.addEventListener('resize', setupCanvases);
    return () => window.removeEventListener('resize', setupCanvases);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // redesenha o guia sem tocar no desenho do usuário
  const drawGuide = () => {
    const canvas = guideRef.current;
    if (!canvas) return;
    const ratio = window.devicePixelRatio || 1;
    const ctx = canvas.getContext('2d');

    // Limpa o canvas de guia
    const visualW = canvas.width / ratio;
    const visualH = canvas.height / ratio;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Grade
    ctx.save();
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(visualW / 2, 0);
    ctx.lineTo(visualW / 2, visualH);
    ctx.moveTo(0, visualH / 2);
    ctx.lineTo(visualW, visualH / 2);
    ctx.stroke();

    // Caractere guia (se estiver visível)
    if (showGuide) {
      ctx.font = '160px serif';
      ctx.fillStyle = '#f3f4f6';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(char, visualW / 2, visualH / 2);
    }

    ctx.restore();
  };

  // limpa apenas o canvas de desenho (mantendo o guide)
  const clearDrawing = (focus = true) => {
    const canvas = drawRef.current;
    if (!canvas) return;
    const ratio = window.devicePixelRatio || 1;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // recria as propriedades do traço (porque limpar pode resetar contexto)
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#6366f1';
    if (focus) canvas.focus();
  };

  // obter posição relativa (mouse ou touch) baseada no tamanho visual
  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    if (e.touches && e.touches[0]) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  // Handlers de desenho (aplicam ao canvas drawRef)
  const startDrawing = (e) => {
    e.preventDefault();
    const canvas = drawRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { x, y } = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = drawRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { x, y } = getPos(e, canvas);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = (e) => {
    e && e.preventDefault();
    setIsDrawing(false);
  };

  // quando muda showGuide, apenas redesenha o guia (não limpa desenho)
  useEffect(() => {
    drawGuide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showGuide, char]);

  // fechar com ESC
  useEffect(() => {
    const onKey = (ev) => {
      if (ev.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white rounded-lg shadow-xl w-[380px] max-w-full p-4 border-2 border-green-50">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h4 className="text-lg font-bold text-gray-800">Pratique: {romaji}</h4>
            <div className="text-sm text-gray-600">{char}</div>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* área dos canvases empilhados */}
        <div className="relative mx-auto w-[300px] h-[300px]">
          {/* canvas guia (embaixo) */}
          <canvas
            ref={guideRef}
            className="absolute inset-0 w-full h-full rounded-lg bg-white pointer-events-none"
            width={300}
            height={300}
            aria-hidden="true"
          />

          {/* canvas de desenho (acima) */}
          <canvas
            ref={drawRef}
            className="absolute inset-0 w-full h-full rounded-lg bg-transparent cursor-crosshair"
            width={300}
            height={300}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            tabIndex={0}
            aria-label={`Área para praticar escrita do caractere ${char}`}
          />
        </div>

        {/* controles */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => setShowGuide((s) => !s)}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            {showGuide ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showGuide ? 'Ocultar' : 'Mostrar'}
          </button>

          <button
            onClick={() => clearDrawing()}
            className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Limpar
          </button>
        </div>

        {/* exemplos aparecem junto com a tela de desenhar */}
        {Array.isArray(examples) && examples.length > 0 && (
          <div className="mt-4 text-sm text-gray-700 space-y-2">
            <div className="font-semibold text-gray-800">Exemplos</div>
            <ul className="list-disc ml-5 space-y-1">
              {examples.map((ex, i) => (
                <li key={i} className="break-words">
                  {ex.word && (
                    <span className="font-medium text-indigo-600">{ex.word}</span>
                  )}
                  {ex.romaji && (
                    <span className="text-gray-600"> ({ex.romaji})</span>
                  )}
                  {ex.meaning && (
                    <span className="text-gray-800"> – {ex.meaning}</span>
                  )}
                  {!ex.word && typeof ex === 'string' && ex}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default WritingPractice;
