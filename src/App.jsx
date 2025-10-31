import React, { useState, useEffect } from 'react';
import { BookOpen, Brain, Trophy, BarChart3, Home, Play, CheckCircle, XCircle, Star, Volume2, Shuffle } from 'lucide-react';
import WritingPractice from './components/WritingPractice';

// ============= DADOS =============
import hiraganaData from './data/hiraganaData.json';
import katakanaData from './data/katakanaData.json';
import kanjiData from './data/kanjiData.json';
import hiraganaWords from './data/hiraganaWords.json';
import katakanaWords from './data/katakanaWords.json';

const data = {
  hiraganaData,
  katakanaData,
  kanjiData,
  hiraganaWords,
  katakanaWords
};

// Componente de Card de Palavra
const WordCard = ({ word, romaji, meaning, type, progress }) => {
  const wordKey = `word-${type}-${word}`;
  const wordProgress = progress[wordKey];
  const accuracy = wordProgress ? Math.round((wordProgress.correct / wordProgress.attempts) * 100) : 0;
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-all">
      <div className="text-center">
        <div className="text-4xl font-bold mb-3 text-indigo-600">{word}</div>
        <div className="text-lg font-semibold text-gray-700 mb-1">{romaji}</div>
        <div className="text-sm text-gray-600">{meaning}</div>
        
        {wordProgress && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>{wordProgress.attempts}×</span>
              <span>{accuracy}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-green-500 h-1.5 rounded-full transition-all"
                style={{ width: `${accuracy}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de Card de Caractere
const CharacterCard = ({ char, romaji, meaning, reading, examples, type, progress, onPractice }) => {
  const charKey = `${type}-${char}`;
  const charProgress = progress[charKey];
  const accuracy = charProgress ? Math.round((charProgress.correct / charProgress.attempts) * 100) : 0;
  
  return (
    <div
      onClick={() => onPractice && onPractice()}
      className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-all cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onPractice && onPractice(); }}
    >
      <div className="text-center">
        <div className="text-5xl font-bold mb-3 text-indigo-600">{char}</div>
        <div className="text-xl font-semibold text-gray-700 mb-1">{romaji}</div>
        {meaning && <div className="text-sm text-gray-600 mb-2">{meaning}</div>}
        {reading && <div className="text-xs text-gray-500 mb-2">{reading}</div>}
        
        {charProgress && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>{charProgress.attempts}×</span>
              <span>{accuracy}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-green-500 h-1.5 rounded-full transition-all"
                style={{ width: `${accuracy}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de Quiz
const QuizComponent = ({ selectedType, onExit, userProgress, saveProgress }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [quizDirection, setQuizDirection] = useState('char-to-romaji');

  useEffect(() => {
    generateQuestion();
  }, [selectedType, quizDirection]);

  const getCurrentData = () => {
    switch (selectedType) {
      case 'hiragana': return hiraganaData;
      case 'katakana': return katakanaData;
      case 'kanji': return kanjiData;
      case 'hiragana-words': return hiraganaWords;
      case 'katakana-words': return katakanaWords;
      default: return hiraganaData;
    }
  };

  const isWordQuiz = selectedType.includes('words');

  const generateQuestion = () => {
    const data = getCurrentData();
    const randomItem = data[Math.floor(Math.random() * data.length)];
    
    const wrongOptions = [];
    while (wrongOptions.length < 3) {
      const wrongItem = data[Math.floor(Math.random() * data.length)];
      let answer;
      
      if (isWordQuiz) {
        if (quizDirection === 'char-to-romaji') {
          answer = wrongItem.meaning;
        } else {
          answer = wrongItem.word;
        }
      } else {
        if (quizDirection === 'char-to-romaji') {
          answer = selectedType === 'kanji' ? wrongItem.meaning : wrongItem.romaji;
        } else {
          answer = wrongItem.char;
        }
      }
      
      const itemIdentifier = isWordQuiz ? wrongItem.word : wrongItem.char;
      const randomIdentifier = isWordQuiz ? randomItem.word : randomItem.char;
      
      if (itemIdentifier !== randomIdentifier && !wrongOptions.includes(answer)) {
        wrongOptions.push(answer);
      }
    }
    
    let correctAnswer, questionDisplay;
    if (isWordQuiz) {
      if (quizDirection === 'char-to-romaji') {
        questionDisplay = randomItem.word;
        correctAnswer = randomItem.meaning;
      } else {
        questionDisplay = randomItem.meaning;
        correctAnswer = randomItem.word;
      }
    } else {
      if (quizDirection === 'char-to-romaji') {
        questionDisplay = randomItem.char;
        correctAnswer = selectedType === 'kanji' ? randomItem.meaning : randomItem.romaji;
      } else {
        questionDisplay = selectedType === 'kanji' ? randomItem.meaning : randomItem.romaji;
        correctAnswer = randomItem.char;
      }
    }
    
    const options = [...wrongOptions, correctAnswer].sort(() => Math.random() - 0.5);
    
    setCurrentQuestion({
      item: randomItem,
      options,
      correctAnswer,
      questionDisplay
    });
    setUserAnswer('');
    setFeedback(null);
  };

  const checkAnswer = () => {
    if (!userAnswer) return;
    
    const isCorrect = userAnswer === currentQuestion.correctAnswer;
    setFeedback({ correct: isCorrect, answer: currentQuestion.correctAnswer });
    
    const newScore = {
      correct: score.correct + (isCorrect ? 1 : 0),
      total: score.total + 1
    };
    setScore(newScore);

    const itemKey = isWordQuiz 
      ? `word-${selectedType}-${currentQuestion.item.word}`
      : `${selectedType}-${currentQuestion.item.char}`;
    
    const newProgress = { ...userProgress };
    if (!newProgress[itemKey]) {
      newProgress[itemKey] = { attempts: 0, correct: 0, lastReview: Date.now() };
    }
    newProgress[itemKey].attempts += 1;
    if (isCorrect) newProgress[itemKey].correct += 1;
    newProgress[itemKey].lastReview = Date.now();
    
    saveProgress(newProgress);

    setTimeout(() => {
      generateQuestion();
    }, 2000);
  };

  const toggleDirection = () => {
    setQuizDirection(prev => 
      prev === 'char-to-romaji' ? 'romaji-to-char' : 'char-to-romaji'
    );
    setScore({ correct: 0, total: 0 });
  };

  const getQuizTitle = () => {
    switch(selectedType) {
      case 'hiragana': return 'Hiragana';
      case 'katakana': return 'Katakana';
      case 'kanji': return 'Kanji';
      case 'hiragana-words': return 'Palavras em Hiragana';
      case 'katakana-words': return 'Palavras em Katakana';
      default: return selectedType;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Quiz de {getQuizTitle()}</h2>
          <div className="text-right">
            <div className="text-3xl font-bold text-indigo-600">
              {score.correct}/{score.total}
            </div>
            <div className="text-sm text-gray-600">
              {score.total > 0 ? `${Math.round((score.correct / score.total) * 100)}%` : '0%'}
            </div>
          </div>
        </div>

        <button
          onClick={toggleDirection}
          className="w-full mb-6 bg-purple-100 hover:bg-purple-200 text-purple-700 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <Shuffle className="w-5 h-5" />
          Modo: {quizDirection === 'char-to-romaji' 
            ? (isWordQuiz ? 'Palavra → Significado' : 'Símbolo → Leitura')
            : (isWordQuiz ? 'Significado → Palavra' : 'Leitura → Símbolo')
          }
        </button>

        {currentQuestion && (
          <div>
            <div className="text-center mb-8">
              <div className={`font-bold mb-6 ${
                quizDirection === 'char-to-romaji' 
                  ? 'text-6xl text-indigo-600 animate-pulse' 
                  : 'text-3xl text-gray-700'
              }`}>
                {currentQuestion.questionDisplay}
              </div>
              <p className="text-xl text-gray-700">
                {quizDirection === 'char-to-romaji' 
                  ? (isWordQuiz ? 'Qual é o significado?' : selectedType === 'kanji' ? 'Qual é o significado?' : 'Como se lê?')
                  : (isWordQuiz ? 'Qual é a palavra?' : 'Qual é o símbolo?')
                }
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setUserAnswer(option)}
                  disabled={feedback !== null}
                  className={`p-4 rounded-lg font-semibold transition-all ${
                    quizDirection === 'romaji-to-char' && !isWordQuiz ? 'text-4xl' : 'text-lg'
                  } ${
                    quizDirection === 'romaji-to-char' && isWordQuiz ? 'text-2xl' : ''
                  } ${
                    userAnswer === option
                      ? feedback
                        ? feedback.correct
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : 'bg-indigo-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  } ${feedback && option === currentQuestion.correctAnswer ? 'ring-4 ring-green-400' : ''}`}
                >
                  {option}
                </button>
              ))}
            </div>

            {!feedback && (
              <button
                onClick={checkAnswer}
                disabled={!userAnswer}
                className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Verificar Resposta
              </button>
            )}

            {feedback && (
              <div className={`p-6 rounded-lg flex items-center gap-4 ${
                feedback.correct ? 'bg-green-100 border-2 border-green-500' : 'bg-red-100 border-2 border-red-500'
              }`}>
                {feedback.correct ? (
                  <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
                )}
                <div>
                  <p className={`font-bold text-lg ${feedback.correct ? 'text-green-800' : 'text-red-800'}`}>
                    {feedback.correct ? 'Correto!' : 'Incorreto!'}
                  </p>
                  {!feedback.correct && (
                    <p className="text-gray-700">
                      A resposta correta é: <span className={`font-bold ${
                        quizDirection === 'romaji-to-char' ? 'text-2xl' : ''
                      }`}>{feedback.answer}</span>
                    </p>
                  )}
                </div>
              </div>
            )}

            <button
              onClick={onExit}
              className="w-full mt-4 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Voltar ao Estudo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de Estatísticas
const StatsComponent = ({ userProgress, onStartQuiz }) => {
  const stats = Object.entries(userProgress).reduce((acc, [key, data]) => {
    const type = key.split('-')[0];
    if (!acc[type]) {
      acc[type] = { attempts: 0, correct: 0, total: 0 };
    }
    acc[type].attempts += data.attempts;
    acc[type].correct += data.correct;
    acc[type].total += 1;
    return acc;
  }, {});

  const getWeakCharacters = () => {
    return Object.entries(userProgress)
      .filter(([_, data]) => {
        const accuracy = data.attempts > 0 ? (data.correct / data.attempts) * 100 : 0;
        return accuracy < 60 && data.attempts >= 3;
      })
      .sort((a, b) => {
        const accA = a[1].correct / a[1].attempts;
        const accB = b[1].correct / b[1].attempts;
        return accA - accB;
      })
      .slice(0, 18);
  };

  const weakCharacters = getWeakCharacters();

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Suas Estatísticas</h2>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {['hiragana', 'katakana', 'kanji'].map(type => {
          const stat = stats[type] || { attempts: 0, correct: 0, total: 0 };
          const accuracy = stat.attempts > 0 ? Math.round((stat.correct / stat.attempts) * 100) : 0;
          
          return (
            <div key={type} className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 capitalize">{type}</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Caracteres:</span>
                  <span className="font-bold text-indigo-600">{stat.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tentativas:</span>
                  <span className="font-bold text-indigo-600">{stat.attempts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Acertos:</span>
                  <span className="font-bold text-green-600">{accuracy}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all"
                    style={{ width: `${accuracy}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Items que Precisam de Revisão</h3>
          <p className="text-sm text-gray-600 mb-4">Itens com menos de 60% de acertos</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {weakCharacters.map(([key, data]) => {
              const isWord = key.startsWith('word-');
              let displayData;
              
              if (isWord) {
                const parts = key.split('-');
                const wordType = parts[1] + '-' + parts[2];
                const wordText = parts.slice(3).join('-');
                displayData = wordType === 'hiragana-words' 
                  ? hiraganaWords.find(w => w.word === wordText)
                  : katakanaWords.find(w => w.word === wordText);
              } else {
                const [type, char] = key.split('-');
                displayData = type === 'hiragana' ? hiraganaData.find(c => c.char === char) :
                              type === 'katakana' ? katakanaData.find(c => c.char === char) :
                              kanjiData.find(c => c.char === char);
              }
              
              const accuracy = Math.round((data.correct / data.attempts) * 100);
              
              return displayData ? (
                <div key={key} className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-3 text-center">
                  <div className={`font-bold text-gray-800 mb-1 ${isWord ? 'text-2xl' : 'text-4xl'}`}>
                    {isWord ? displayData.word : displayData.char}
                  </div>
                  <div className="text-xs text-gray-600 mb-1">
                    {isWord ? displayData.meaning : displayData.romaji}
                  </div>
                  <div className="text-xs text-red-600 font-semibold">{accuracy}%</div>
                </div>
              ) : null;
            })}
          </div>
          {weakCharacters.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              Excelente! Você não tem itens que precisam de revisão urgente.
            </p>
          )}
        </div>

      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-8 mt-8 text-white text-center">
        <Star className="w-12 h-12 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Continue Praticando!</h3>
        <p className="text-indigo-100 mb-4">
          Você já praticou {Object.keys(userProgress).length} caracteres diferentes
        </p>
        <button
          onClick={onStartQuiz}
          className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
        >
          Fazer um Quiz Agora
        </button>
      </div>
    </div>
  );
};

// ============= COMPONENTE PRINCIPAL =============
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedType, setSelectedType] = useState('hiragana');
  const [quizMode, setQuizMode] = useState(false);
  const [userProgress, setUserProgress] = useState({});
  const [loading, setLoading] = useState(true);

// estados
const [practiceOpen, setPracticeOpen] = useState(false);
const [practiceChar, setPracticeChar] = useState(null);
const [practiceRomaji, setPracticeRomaji] = useState(null);
const [practiceExamples, setPracticeExamples] = useState([]);

// função para abrir (recebe examples)
const openPractice = (char, romaji, examples = []) => {
  setPracticeChar(char);
  setPracticeRomaji(romaji || '');
  setPracticeExamples(examples);
  setPracticeOpen(true);
};

const closePractice = () => {
  setPracticeOpen(false);
  setPracticeChar(null);
  setPracticeRomaji(null);
  setPracticeExamples([]);
};


  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const result = await window.storage.get('user-progress');
      if (result) {
        setUserProgress(JSON.parse(result.value));
      }
    } catch (error) {
      console.log('Primeiro acesso');
    } finally {
      setLoading(false);
    }
  };

  const saveProgress = async (newProgress) => {
    try {
      await window.storage.set('user-progress', JSON.stringify(newProgress));
      setUserProgress(newProgress);
    } catch (error) {
      console.error('Erro ao salvar:', error);
    }
  };

  const getCurrentData = () => {
    switch (selectedType) {
      case 'hiragana': return hiraganaData;
      case 'katakana': return katakanaData;
      case 'kanji': return kanjiData;
      case 'hiragana-words': return hiraganaWords;
      case 'katakana-words': return katakanaWords;
      default: return hiraganaData;
    }
  };

  const isWordMode = selectedType.includes('words');

  const startQuiz = () => {
    setQuizMode(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
            <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              日本語を学ぼう
            </h1>
            <nav className="flex gap-2 sm:gap-4">
              <button
                onClick={() => { setCurrentPage('home'); setQuizMode(false); }}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-semibold transition-colors ${
                  currentPage === 'home' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline">Início</span>
              </button>
              <button
                onClick={() => { setCurrentPage('learn'); setQuizMode(false); }}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-semibold transition-colors ${
                  currentPage === 'learn' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <BookOpen className="w-5 h-5" />
                <span className="hidden sm:inline">Estudar</span>
              </button>
              <button
                onClick={() => { setCurrentPage('stats'); setQuizMode(false); }}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-semibold transition-colors ${
                  currentPage === 'stats' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                <span className="hidden sm:inline">Estatísticas</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {quizMode ? (
          <QuizComponent 
            selectedType={selectedType}
            onExit={() => { setQuizMode(false); setCurrentPage('learn'); }}
            userProgress={userProgress}
            saveProgress={saveProgress}
          />
        ) : currentPage === 'home' ? (
          <div className="text-center py-12">
            <h1 className="text-5xl font-bold text-indigo-600 mb-6">
              Aprenda Japonês
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Domine Hiragana, Katakana e Kanji com quizzes interativos bidirecionais
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <button
                onClick={() => { setCurrentPage('learn'); setSelectedType('hiragana'); }}
                className="bg-gradient-to-br from-pink-500 to-pink-600 text-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                <BookOpen className="w-12 h-12 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Hiragana</h2>
                <p className="text-pink-100">71 caracteres + exemplos</p>
              </button>
              
              <button
                onClick={() => { setCurrentPage('learn'); setSelectedType('katakana'); }}
                className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                <BookOpen className="w-12 h-12 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Katakana</h2>
                <p className="text-blue-100">71 caracteres + exemplos</p>
              </button>
              
              <button
                onClick={() => { setCurrentPage('learn'); setSelectedType('kanji'); }}
                className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                <BookOpen className="w-12 h-12 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Kanji</h2>
                <p className="text-purple-100">54 kanjis básicos</p>
              </button>
            </div>

            <div className="mt-12 p-6 bg-indigo-50 rounded-2xl max-w-2xl mx-auto">
              <Trophy className="w-8 h-8 mx-auto mb-3 text-indigo-600" />
              <h3 className="text-xl font-bold text-indigo-900 mb-2">Seu Progresso</h3>
              <p className="text-indigo-700">
                {Object.keys(userProgress).length} caracteres praticados
              </p>
            </div>
          </div>
        ) : currentPage === 'learn' ? (
          <div>
            <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => setSelectedType('hiragana')}
                  className={`px-5 py-2.5 rounded-lg font-semibold transition-all ${
                    selectedType === 'hiragana'
                      ? 'bg-pink-500 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Hiragana
                </button>
                <button
                  onClick={() => setSelectedType('hiragana-words')}
                  className={`px-5 py-2.5 rounded-lg font-semibold transition-all ${
                    selectedType === 'hiragana-words'
                      ? 'bg-pink-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Palavras ひらがな
                </button>
                <button
                  onClick={() => setSelectedType('katakana')}
                  className={`px-5 py-2.5 rounded-lg font-semibold transition-all ${
                    selectedType === 'katakana'
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Katakana
                </button>
                <button
                  onClick={() => setSelectedType('katakana-words')}
                  className={`px-5 py-2.5 rounded-lg font-semibold transition-all ${
                    selectedType === 'katakana-words'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Palavras カタカナ
                </button>
                <button
                  onClick={() => setSelectedType('kanji')}
                  className={`px-5 py-2.5 rounded-lg font-semibold transition-all ${
                    selectedType === 'kanji'
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Kanji
                </button>
              </div>
              
              <button
                onClick={startQuiz}
                className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                Iniciar Quiz
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {isWordMode ? (
                getCurrentData().map((item, index) => (
                  <WordCard
                    key={index}
                    word={item.word}
                    romaji={item.romaji}
                    meaning={item.meaning}
                    type={selectedType}
                    progress={userProgress}
                  />
                ))
              ) : (
                getCurrentData().map((item, index) => (
                  <CharacterCard
                    key={index}
                    char={item.char}
                    romaji={item.romaji}
                    meaning={item.meaning}
                    reading={item.reading}
                    examples={item.examples}
                    type={selectedType}
                    progress={userProgress}
                    onPractice={() => openPractice(item.char, item.romaji, item.examples)}
                  />
                ))
              )}
            </div>
          </div>
        ) : currentPage === 'stats' ? (
          <StatsComponent 
            userProgress={userProgress}
            onStartQuiz={() => { setCurrentPage('learn'); startQuiz(); }}
          />
        ) : null}

        {practiceOpen && (
          <WritingPractice
            char={practiceChar}
            romaji={practiceRomaji}
            examples={practiceExamples}
            onClose={closePractice}
          />
        )}


      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600">
          <p className="mb-2">Sistema de Aprendizado de Japonês com Repetição Espaçada</p>
          <p className="text-sm">
            <span className="font-bold">頑張って!</span> (Ganbare! - Boa sorte!)
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;