import React, { useEffect, useState } from 'react';

// Função para carregar JSON dinamicamente
async function loadJSON(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Erro ao carregar ${path}`);
  return await response.json();
}

const JapaneseDataLoader = ({ onDataLoaded }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        // Carrega todos os arquivos JSON em paralelo
        const [hiraganaWords, katakanaWords, hiraganaData, katakanaData, kanjiData] = await Promise.all([
          loadJSON('/data/hiraganaWords.json'),
          loadJSON('/data/katakanaWords.json'),
          loadJSON('/data/hiragana.json'),
          loadJSON('/data/katakana.json'),
          loadJSON('/data/kanji.json'),
        ]);

        // Envia os dados para o componente pai
        onDataLoaded({
          hiraganaWords,
          katakanaWords,
          hiraganaData,
          katakanaData,
          kanjiData,
        });

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    loadData();
  }, [onDataLoaded]);

  if (loading) return <p>Carregando dados...</p>;
  if (error) return <p>Erro ao carregar dados: {error}</p>;
  return null;
};

export default JapaneseDataLoader;
