import React from 'react';
import './ReadingContent.css';

function ReadingContent({ words, onWordClick, fontSize, lineHeight }) {
  return (
    <div className="reading-content">
      <h2>阅读内容</h2>
      <div 
        className="content" 
        style={{ 
          fontSize: `${fontSize}px`, 
          lineHeight: lineHeight 
        }}
      >
        {words.map((word, index) => (
          <span key={index} className="word-container">
            {word.punctuationBefore}
            <span 
              className={`word ${word.highlighted ? 'highlighted' : ''}`}
              onClick={() => onWordClick(word, index)}
            >
              {word.clean}
            </span>
            {word.punctuationAfter}
            {/* 如果单词后面有标点符号且不是句号、问号、感叹号，则不添加空格 */}
            {(!word.punctuationAfter || /[.!?]/.test(word.punctuationAfter)) ? ' ' : ''}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ReadingContent;