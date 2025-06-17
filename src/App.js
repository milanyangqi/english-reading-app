import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import ReadingContent from './components/ReadingContent';
import WordDetail from './components/WordDetail';
import Header from './components/Header';
import TextInput from './components/TextInput';
import Settings from './components/Settings';

function App() {
  const [text, setText] = useState('');
  const [processedText, setProcessedText] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [wordDetails, setWordDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    fontSize: 16,
    lineHeight: 1.6,
    showPhonetics: true,
    autoPlayAudio: false
  });

  // 处理文本，将其分割成单词数组
  const processText = () => {
    if (!text.trim()) return;
    
    // 将文本分割成单词，保留标点符号
    const words = text.split(/\s+/).map(word => {
      // 去除单词前后的标点符号，但保留它们以便显示
      const punctuationBefore = word.match(/^[^\w\s]+/) ? word.match(/^[^\w\s]+/)[0] : '';
      const punctuationAfter = word.match(/[^\w\s]+$/) ? word.match(/[^\w\s]+$/)[0] : '';
      const cleanWord = word.replace(/^[^\w\s]+|[^\w\s]+$/g, '');
      
      return {
        original: word,
        clean: cleanWord.toLowerCase(),
        punctuationBefore,
        punctuationAfter,
        highlighted: false
      };
    });
    
    setProcessedText(words);
  };

  // 获取单词详情
  const fetchWordDetails = async (word) => {
    if (!word) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      setWordDetails(response.data[0]);
      
      // 如果设置了自动播放，则播放单词发音
      if (settings.autoPlayAudio && response.data[0].phonetics && response.data[0].phonetics.length > 0) {
        const audioUrl = response.data[0].phonetics.find(p => p.audio)?.audio;
        if (audioUrl) {
          const audio = new Audio(audioUrl);
          audio.play();
        }
      }
    } catch (err) {
      setError('无法获取单词详情，请稍后再试。');
      console.error('Error fetching word details:', err);
    } finally {
      setLoading(false);
    }
  };

  // 处理单词点击事件
  const handleWordClick = (word, index) => {
    // 更新高亮状态
    const updatedText = [...processedText];
    updatedText.forEach((w, i) => {
      w.highlighted = i === index;
    });
    setProcessedText(updatedText);
    
    setSelectedWord(word.clean);
    fetchWordDetails(word.clean);
  };

  // 播放单词发音
  const playAudio = () => {
    if (wordDetails && wordDetails.phonetics && wordDetails.phonetics.length > 0) {
      const audioUrl = wordDetails.phonetics.find(p => p.audio)?.audio;
      if (audioUrl) {
        const audio = new Audio(audioUrl);
        audio.play();
      }
    }
  };

  // 更新设置
  const updateSettings = (newSettings) => {
    setSettings({ ...settings, ...newSettings });
  };

  return (
    <div className="app">
      <Header onSettingsClick={() => setShowSettings(!showSettings)} />
      
      {showSettings && (
        <Settings 
          settings={settings} 
          onUpdate={updateSettings} 
          onClose={() => setShowSettings(false)} 
        />
      )}
      
      <div className="main-content">
        <div className="left-panel">
          <TextInput 
            text={text} 
            onTextChange={setText} 
            onGenerateClick={processText} 
          />
          
          {processedText.length > 0 && (
            <ReadingContent 
              words={processedText} 
              onWordClick={handleWordClick} 
              fontSize={settings.fontSize} 
              lineHeight={settings.lineHeight} 
            />
          )}
        </div>
        
        <div className="right-panel">
          {selectedWord && (
            <WordDetail 
              word={selectedWord} 
              details={wordDetails} 
              loading={loading} 
              error={error} 
              onPlayAudio={playAudio} 
              showPhonetics={settings.showPhonetics} 
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;