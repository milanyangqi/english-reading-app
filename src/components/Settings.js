import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import './Settings.css';

function Settings({ settings, onUpdate, onClose }) {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleChange = (key, value) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    onUpdate(localSettings);
    onClose();
  };

  return (
    <div className="settings-overlay">
      <div className="settings-modal">
        <div className="settings-header">
          <h2>设置</h2>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        
        <div className="settings-content">
          <div className="setting-item">
            <label>字体大小</label>
            <div className="range-container">
              <input 
                type="range" 
                min="12" 
                max="24" 
                value={localSettings.fontSize} 
                onChange={(e) => handleChange('fontSize', parseInt(e.target.value))}
              />
              <span>{localSettings.fontSize}px</span>
            </div>
          </div>
          
          <div className="setting-item">
            <label>行间距</label>
            <div className="range-container">
              <input 
                type="range" 
                min="1" 
                max="2.5" 
                step="0.1" 
                value={localSettings.lineHeight} 
                onChange={(e) => handleChange('lineHeight', parseFloat(e.target.value))}
              />
              <span>{localSettings.lineHeight}</span>
            </div>
          </div>
          
          <div className="setting-item checkbox">
            <label>
              <input 
                type="checkbox" 
                checked={localSettings.showPhonetics} 
                onChange={(e) => handleChange('showPhonetics', e.target.checked)}
              />
              显示音标
            </label>
          </div>
          
          <div className="setting-item checkbox">
            <label>
              <input 
                type="checkbox" 
                checked={localSettings.autoPlayAudio} 
                onChange={(e) => handleChange('autoPlayAudio', e.target.checked)}
              />
              自动播放单词发音
            </label>
          </div>
        </div>
        
        <div className="settings-footer">
          <button className="cancel-button" onClick={onClose}>取消</button>
          <button className="save-button" onClick={handleSave}>保存</button>
        </div>
      </div>
    </div>
  );
}

export default Settings;