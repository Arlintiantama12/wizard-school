import React from 'react';
import '../styles/Spellbook.css';

function Spellbook() {
  return (
    <div className="spellbook-container">
      <header className="spellbook-header">
        <h1>Buku Mantera</h1>
        <p className="spellbook-subtitle">Halaman ini masih dalam pengembangan</p>
      </header>
      
      <div className="spellbook-content-empty">
        <div className="empty-state">
          <div className="empty-icon"></div>
          <h2>Fitur Buku Mantera</h2>
          <p>Halaman ini akan menampilkan daftar mantera yang dapat dipelajari di sekolah sihir. Fitur ini masih dalam tahap pengembangan.</p>
        </div>
      </div>
    </div>
  );
}

export default Spellbook;