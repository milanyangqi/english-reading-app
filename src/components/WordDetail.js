import React from 'react';
import { FaVolumeUp } from 'react-icons/fa';
import './WordDetail.css';

function WordDetail({ word, details, loading, error, onPlayAudio, showPhonetics }) {
  if (loading) {
    return (
      <div className="word-detail">
        <div className="loading"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="word-detail">
        <div className="error">{error}</div>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="word-detail">
        <div className="no-details">选择单词查看详细信息</div>
      </div>
    );
  }

  // 获取音标
  const phonetic = details.phonetic || 
    (details.phonetics && details.phonetics.length > 0 ? 
      details.phonetics.find(p => p.text)?.text : '');

  // 获取音频URL
  const audioUrl = details.phonetics && details.phonetics.length > 0 ?
    details.phonetics.find(p => p.audio)?.audio : '';

  return (
    <div className="word-detail">
      <div className="word-header">
        <h2>{details.word}</h2>
        {audioUrl && (
          <button className="audio-button" onClick={onPlayAudio}>
            <FaVolumeUp />
          </button>
        )}
      </div>
      
      {showPhonetics && phonetic && (
        <div className="phonetic">{phonetic}</div>
      )}
      
      <div className="meanings">
        {details.meanings && details.meanings.map((meaning, index) => (
          <div key={index} className="meaning">
            <div className="part-of-speech">{meaning.partOfSpeech}</div>
            
            {meaning.definitions && meaning.definitions.map((def, defIndex) => (
              <div key={defIndex} className="definition">
                <div className="definition-text">{def.definition}</div>
                {def.example && (
                  <div className="example">例句: "{def.example}"</div>
                )}
                {def.synonyms && def.synonyms.length > 0 && (
                  <div className="synonyms">
                    <span>同义词: </span>
                    {def.synonyms.slice(0, 5).join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WordDetail;