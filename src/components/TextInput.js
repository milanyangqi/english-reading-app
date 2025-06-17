import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './TextInput.css';

function TextInput({ text, onTextChange, onGenerateClick }) {
  return (
    <div className="text-input">
      <h2>输入英文文本</h2>
      <textarea
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="在此输入或粘贴英文文本..."
        rows={6}
      />
      <div className="actions">
        <button 
          className="generate-button" 
          onClick={onGenerateClick}
          disabled={!text.trim()}
        >
          <FaSearch /> 生成阅读
        </button>
        <button 
          className="clear-button" 
          onClick={() => onTextChange('')}
          disabled={!text.trim()}
        >
          清空
        </button>
      </div>
      <div className="sample-texts">
        <h3>示例文本</h3>
        <div className="sample-buttons">
          <button onClick={() => onTextChange('You praised China\'s advancement in artificial intelligence and highlighting breakthroughs such as AI as evidence. And I believe what you said originally was, and I quote here, China surprises us with innovations.')}>
            示例 1
          </button>
          <button onClick={() => onTextChange('The rapid development of artificial intelligence has transformed various industries, creating new opportunities and challenges for businesses worldwide.')}>
            示例 2
          </button>
          <button onClick={() => onTextChange('Learning a new language requires consistent practice and exposure to authentic materials. Reading, listening, speaking, and writing are all essential skills to develop.')}>
            示例 3
          </button>
        </div>
      </div>
    </div>
  );
}

export default TextInput;