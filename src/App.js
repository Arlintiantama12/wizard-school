import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import About from './pages/About';
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import Spellbook from './pages/Spellbook';
import GuruPage from './pages/GuruPage';
import './styles/Dashboard.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="courses" element={<div className="empty-page">Halaman Kursus</div>} />
          <Route path="assignments" element={<div className="empty-page">Halaman Tugas</div>} />
          <Route path="progress" element={<div className="empty-page">Halaman Kemajuan</div>} />
          <Route path="spellbook" element={<Spellbook />} />
          <Route path="guru" element={<GuruPage />} />
          <Route path="potions" element={<div className="empty-page">Laboratorium Ramuan</div>} />
          <Route path="creatures" element={<div className="empty-page">Makhluk Ajaib</div>} />
          <Route path="houses" element={<div className="empty-page">Asrama Sekolah</div>} />
          <Route path="library" element={<div className="empty-page">Perpustakaan</div>} />
          <Route path="quidditch" element={<div className="empty-page">Lapangan Quidditch</div>} />
          <Route path="profile" element={<div className="empty-page">Profil Penyihir</div>} />
          <Route path="settings" element={<div className="empty-page">Pengaturan</div>} />
        </Route>
        <Route path="*" element={
          <div className="App">
            <Header />
            <main className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </main>
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;