import React from 'react';
import './Header.css';

const Header = ({ sotrInputValue, setSortInputValue }) => {
  return (
    <header className="header">
      <div className="header__container container">
        <div style={{ position: 'relative' }}>
          <i className="fa-solid fa-magnifying-glass header__icon"></i>
          <input
            value={sotrInputValue}
            onChange={(e) => setSortInputValue(e.target.value)}
            type="text"
            placeholder="Search todo list"
            className="header__input"
          />
        </div>
        <h1 className="header__title">TODO-LIST</h1>
      </div>
    </header>
  );
};

export default Header;
