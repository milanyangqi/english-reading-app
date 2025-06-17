import React from 'react';
import { FaCog } from 'react-icons/fa';
import './Header.css';

function Header({ onSettingsClick }) {
  return (
    <header className="header">
      <div className="logo">
        <img src="/logo.svg" alt="英文阅读学习" className="logo-image" />
        <h1>英文阅读学习网站</h1>
      </div>
      <div className="subtitle">Leader's Talk 单词积累 | 听口训练</div>
      <button className="settings-button" onClick={onSettingsClick}>
        <FaCog /> 设置
      </button>
    </header>
  );
}

export default Header;