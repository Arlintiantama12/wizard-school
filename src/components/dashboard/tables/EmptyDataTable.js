import React, { useEffect, useRef } from 'react';
// Menggunakan jQuery dari window karena sudah dimuat dari CDN
// CSS dan JS DataTables sudah dimuat dari CDN di index.html
import './EmptyDataTable.css';

const EmptyDataTable = () => {
  const tableRef = useRef(null);

  useEffect(() => {
    // Pastikan DOM sudah siap dan jQuery/DataTable sudah dimuat
    // Inisialisasi DataTable ketika komponen di-mount
    let dataTable;
    
    try {
      // Gunakan jQuery global yang sudah dimuat dari CDN
      const $ = window.jQuery;
      dataTable = $(tableRef.current).DataTable({
      responsive: true,
      data: [], // Data kosong
      columns: [
        { title: 'Nama' },
        { title: 'Asrama' },
        { title: 'Mata Pelajaran' },
        { title: 'Nilai' },
        { title: 'Status' },
        { title: 'Tanggal' },
        { title: 'Aksi' }
      ],
      language: {
        emptyTable: 'Tidak ada data tersedia dalam tabel',
        zeroRecords: 'Tidak ditemukan data yang sesuai',
        info: 'Menampilkan _START_ sampai _END_ dari _TOTAL_ entri',
        infoEmpty: 'Menampilkan 0 sampai 0 dari 0 entri',
        infoFiltered: '(disaring dari _MAX_ entri keseluruhan)',
        lengthMenu: 'Tampilkan _MENU_ entri',
        search: 'Cari:',
        paginate: {
          first: 'Pertama',
          last: 'Terakhir',
          next: 'Selanjutnya',
          previous: 'Sebelumnya'
        }
      }
    });
    } catch (error) {
      console.error('Error initializing DataTable:', error);
    }

    // Cleanup ketika komponen di-unmount
    return () => {
      if (dataTable) {
        dataTable.destroy();
      }
    };
  }, []);

  return (
    <div className="empty-datatable-container">
      <div className="datatable-header">
        <h2>Data Siswa</h2>
        <p>Halaman ini menampilkan tabel data siswa (kosong)</p>
      </div>
      <div className="datatable-wrapper">
        <table ref={tableRef} className="display wizard-datatable" width="100%"></table>
      </div>
    </div>
  );
};

export default EmptyDataTable;