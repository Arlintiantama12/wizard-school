import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import '../OrdersDataTable.css';
import './GuruDataTable.css';

// Data sampel untuk tabel guru
const SAMPLE_DATA = [
  {
    id: 'G-001',
    nama: {
      name: 'Albus Dumbledore',
      avatar: '/images/avatars/placeholder.png'
    },
    kepalaAsrama: null, // Tidak menjadi kepala asrama 
    status: 'Aktif',
    tugas: ['Kepala Sekolah', 'Pengajar Transfigurasi'],
    sertifikat: {
      count: 12,
      level: 'Senior'
    },
    progress: 100,
    saldo: {
      galleons: 500,
      sickles: 50,
      knuts: 25
    },
    tag: {
      text: 'Sangat Ahli',
      type: 'positive'
    }
  },
  {
    id: 'G-002',
    nama: {
      name: 'Minerva McGonagall',
      avatar: '/images/avatars/placeholder.png'
    },
    kepalaAsrama: 'Gryffindor',
    status: 'Aktif',
    tugas: ['Wakil Kepala Sekolah', 'Pengajar Transfigurasi'],
    sertifikat: {
      count: 10,
      level: 'Senior'
    },
    progress: 95,
    saldo: {
      galleons: 350,
      sickles: 40,
      knuts: 10
    },
    tag: {
      text: 'Ahli',
      type: 'positive'
    }
  },
  {
    id: 'G-003',
    nama: {
      name: 'Severus Snape',
      avatar: '/images/avatars/placeholder.png'
    },
    kepalaAsrama: 'Slytherin',
    status: 'Aktif',
    tugas: ['Pengajar Ramuan', 'Ahli Ramuan'],
    sertifikat: {
      count: 8,
      level: 'Senior'
    },
    progress: 90,
    saldo: {
      galleons: 320,
      sickles: 30,
      knuts: 5
    },
    tag: {
      text: 'Tegas',
      type: 'neutral'
    }
  },
  {
    id: 'G-004',
    nama: {
      name: 'Filius Flitwick',
      avatar: '/images/avatars/placeholder.png'
    },
    kepalaAsrama: 'Ravenclaw',
    status: 'Aktif',
    tugas: ['Pengajar Mantra', 'Juara Duel'],
    sertifikat: {
      count: 9,
      level: 'Senior'
    },
    progress: 92,
    saldo: {
      galleons: 310,
      sickles: 25,
      knuts: 15
    },
    tag: {
      text: 'Cerdas',
      type: 'positive'
    }
  },
  {
    id: 'G-005',
    nama: {
      name: 'Pomona Sprout',
      avatar: '/images/avatars/placeholder.png'
    },
    kepalaAsrama: 'Hufflepuff',
    status: 'Aktif',
    tugas: ['Pengajar Herbologi', 'Ahli Tanaman'],
    sertifikat: {
      count: 7,
      level: 'Senior'
    },
    progress: 88,
    saldo: {
      galleons: 290,
      sickles: 35,
      knuts: 20
    },
    tag: {
      text: 'Rajin',
      type: 'positive'
    }
  },
  {
    id: 'G-006',
    nama: {
      name: 'Rubeus Hagrid',
      avatar: '/images/avatars/placeholder.png'
    },
    kepalaAsrama: null,
    status: 'Aktif',
    tugas: ['Pengajar Pemeliharaan Satwa Gaib', 'Penjaga Binatang'],
    sertifikat: {
      count: 3,
      level: 'Junior'
    },
    progress: 65,
    saldo: {
      galleons: 150,
      sickles: 20,
      knuts: 30
    },
    tag: {
      text: 'Setengah Raksasa',
      type: 'neutral'
    }
  },
  {
    id: 'G-007',
    nama: {
      name: 'Sybill Trelawney',
      avatar: '/images/avatars/placeholder.png'
    },
    kepalaAsrama: null,
    status: 'Aktif',
    tugas: ['Pengajar Ramalan', 'Peramal'],
    sertifikat: {
      count: 4,
      level: 'Menengah'
    },
    progress: 70,
    saldo: {
      galleons: 180,
      sickles: 15,
      knuts: 40
    },
    tag: {
      text: 'Mediumship',
      type: 'neutral'
    }
  },
  {
    id: 'G-008',
    nama: {
      name: 'Remus Lupin',
      avatar: '/images/avatars/placeholder.png'
    },
    kepalaAsrama: null,
    status: 'Nonaktif',
    tugas: ['Pengajar Pertahanan Terhadap Ilmu Hitam'],
    sertifikat: {
      count: 6,
      level: 'Menengah'
    },
    progress: 80,
    saldo: {
      galleons: 200,
      sickles: 25,
      knuts: 15
    },
    tag: {
      text: 'Manusia Serigala',
      type: 'negative'
    }
  }
];

// Fungsi helper untuk status badge
const getStatusClass = (status) => {
  switch(status) {
    case 'Aktif':
      return 'status-delivered';
    case 'Nonaktif':
      return 'status-processing';
    case 'Cuti':
      return 'status-pending';
    case 'Pensiun':
      return 'status-shipped';
    default:
      return '';
  }
};

const getAsramaClass = (asrama) => {
  if (!asrama) return 'asrama-other';
  
  switch(asrama.toLowerCase()) {
    case 'gryffindor':
      return 'asrama-gryffindor';
    case 'slytherin':
      return 'asrama-slytherin';
    case 'hufflepuff':
      return 'asrama-hufflepuff';
    case 'ravenclaw':
      return 'asrama-ravenclaw';
    default:
      return 'asrama-other';
  }
};

const getSertifikatClass = (count) => {
  if (count >= 10) return 'sertifikat-senior';
  if (count >= 5) return 'sertifikat-menengah';
  return 'sertifikat-junior';
};

const GuruDataTable = () => {
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);
  const tableInitialized = useRef(false);

  // Handler untuk klik pada tugas
  const handleTugasClick = useCallback((event) => {
    const tugasItem = event.currentTarget;
    const guruId = tugasItem.dataset.id;
    const tugasName = tugasItem.dataset.tugas;
    
    console.log(`Guru ID: ${guruId}, Tugas: ${tugasName}`);
    alert(`Menuju ke halaman tugas: ${tugasName} untuk guru dengan ID ${guruId}`);
    // Di sini nantinya bisa navigasi ke halaman tugas
  }, []);

  // Definisi kolom
  const columns = useMemo(() => [
    { data: 'id' },
    { 
      // Kolom nama
      data: 'nama',
      render: function(data, type, row) {
        // Jika tipe adalah display atau filter, kita perlu merender HTML untuk display
        if (type === 'display' || type === 'filter') {
          const avatarSrc = '/images/avatars/placeholder.png';
          return `
            <div class="customer-cell">
              <img src="${avatarSrc}" alt="${data.name}" class="avatar" />
              <span>${data.name}</span>
            </div>
          `;
        }
        // Untuk sorting dan tipe lainnya, kembalikan nama saja
        return data.name;
      }
    },
    { 
      // Kolom Tag
      data: 'tag',
      render: function(data, type, row) {
        // Untuk sorting dan tipe lainnya, kembalikan text saja
        if (type !== 'display') {
          return data.text;
        }
        
        // Untuk display, kita render dengan partikel berdasarkan tipe
        let tagClass = '';
        switch(data.type) {
          case 'positive':
            tagClass = 'tag-positive';
            break;
          case 'negative':
            tagClass = 'tag-negative';
            break;
          case 'rich':
            tagClass = 'tag-rich';
            break;
          default:
            tagClass = 'tag-neutral';
        }
        
        // Render tag dengan partikel
        // Untuk tipe rich, kita tambahkan partikel ekstra
        const extraParticles = data.type === 'rich' ? `
          <span class="particle p6"></span>
          <span class="particle p7"></span>
          <span class="particle p8"></span>
        ` : '';
        
        return `
          <div class="tag-container ${tagClass}">
            <span class="tag-text">${data.text}</span>
            <div class="tag-particles">
              <span class="particle p1"></span>
              <span class="particle p2"></span>
              <span class="particle p3"></span>
              <span class="particle p4"></span>
              <span class="particle p5"></span>
              ${extraParticles}
            </div>
          </div>
        `;
      }
    },
    { 
      // Kolom Kepala Asrama
      data: 'kepalaAsrama',
      render: function(data, type, row) {
        if (type !== 'display') {
          return data || '';
        }
        
        if (!data) {
          return '<span class="asrama-badge asrama-other">-</span>';
        }
        
        const asramaClass = getAsramaClass(data);
        return `<span class="asrama-badge ${asramaClass}">${data}</span>`;
      }
    },
    { 
      // Kolom status
      data: 'status',
      render: function(data, type, row) {
        // Hanya render HTML untuk display
        if (type === 'display') {
          const statusClass = getStatusClass(data);
          return `<span class="status-badge ${statusClass}">${data}</span>`;
        }
        // Kembalikan text mentah untuk sorting dan filter
        return data;
      }
    },
    {
      // Kolom Tugas
      data: 'tugas',
      render: function(data, type, row) {
        if (type !== 'display') {
          return data.join(', ');
        }
        
        return `
          <div class="tugas-list">
            ${data.map(tugas => `<div class="tugas-item tugas-clickable" data-id="${row.id}" data-tugas="${tugas}">${tugas}</div>`).join('')}
          </div>
        `;
      }
    },
    { 
      // Kolom Sertifikat
      data: 'sertifikat',
      render: function(data, type, row) {
        if (type !== 'display') {
          return data.count;
        }
        
        const sertifikatClass = getSertifikatClass(data.count);
        return `
          <div class="sertifikat-badge ${sertifikatClass}">
            <span class="sertifikat-count">${data.count}</span>
            <span class="sertifikat-level">${data.level}</span>
          </div>
        `;
      }
    },
    { 
      // Kolom Progress
      data: 'progress',
      render: function(data, type, row) {
        // Hanya render HTML untuk display
        if (type === 'display') {
          return `
            <div class="progress-bar-container">
              <div class="progress-bar" style="width: ${data}%"></div>
              <span class="progress-text">${data}%</span>
            </div>
          `;
        }
        // Kembalikan nilai numerik untuk sorting
        return data;
      }
    },
    { 
      // Kolom Saldo
      data: 'saldo',
      render: function(data, type, row) {
        // Jika tipe adalah display, kita render dengan ikon
        if (type === 'display') {
          return `
            <div class="currency-container">
              <div class="currency-item">
                <span class="currency-icon galleon">G</span>
                <span class="currency-value">${data.galleons}</span>
              </div>
              <div class="currency-item">
                <span class="currency-icon sickle">S</span>
                <span class="currency-value">${data.sickles}</span>
              </div>
              <div class="currency-item">
                <span class="currency-icon knut">P</span>
                <span class="currency-value">${data.knuts}</span>
              </div>
            </div>
          `;
        }
        // Untuk sorting, kita konversi semua ke knuts (17 sickle = 1 galleon, 29 knuts = 1 sickle)
        const totalKnuts = (data.galleons * 17 * 29) + (data.sickles * 29) + data.knuts;
        return totalKnuts;
      }
    },
    { 
      // Kolom action
      data: null,
      orderable: false,
      render: function(data, type, row) {
        if (type === 'display') {
          return `
            <div class="action-buttons">
              <button class="btn-view" data-id="${row.id}" title="View">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
              <button class="btn-edit" data-id="${row.id}" title="Edit">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
              <button class="btn-delete" data-id="${row.id}" title="Delete">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          `;
        }
        return '';
      }
    }
  ], []);

  // Konfigurasi DataTable
  const dataTableConfig = useMemo(() => ({
    data: SAMPLE_DATA,
    columns,
    ordering: true,
    searching: true,
    paging: true,
    lengthChange: true,
    lengthMenu: [3, 6, 10, 25, 50],
    pageLength: 3,
    info: true,
    scrollX: false,
    deferRender: true,
    stateSave: false,
    language: {
      search: '',
      searchPlaceholder: 'Cari di sini...',
      paginate: {
        previous: 'Sebelumnya',
        next: 'Selanjutnya'
      },
      lengthMenu: 'Tampilkan _MENU_ data',
      zeroRecords: 'Tidak ada data yang ditemukan',
      info: 'Menampilkan _START_ sampai _END_ dari _TOTAL_ data',
      infoEmpty: 'Menampilkan 0 sampai 0 dari 0 data',
      infoFiltered: '(difilter dari _MAX_ total data)'
    },
    dom: '<"table-header"<"table-title"><"table-filters"lf>><"table-content"rt><"table-footer"<"table-pagination"ip>>',
  }), [columns]);

  // Event handlers
  const handleViewClick = useCallback((event) => {
    const button = event.currentTarget;
    const id = button.dataset.id;
    console.log('View guru with ID:', id);
  }, []);

  const handleEditClick = useCallback((event) => {
    const button = event.currentTarget;
    const id = button.dataset.id;
    console.log('Edit guru with ID:', id);
  }, []);

  const handleDeleteClick = useCallback((event) => {
    const button = event.currentTarget;
    const id = button.dataset.id;
    console.log('Delete guru with ID:', id);
  }, []);

  const handleSortButtonClick = useCallback(() => {
    console.log('Sort button clicked');
  }, []);

  const handleTambahGuruClick = useCallback(() => {
    console.log('Tambah Guru button clicked');
    alert('Form tambah guru akan ditampilkan di sini');
  }, []);

  useEffect(() => {
    // Mencegah multiple initialization
    if (tableInitialized.current) return;
    
    try {
      // Cache jQuery reference
      const $ = window.jQuery;
      if (!$) throw new Error('jQuery is not loaded');
      
      // Inisialisasi DataTable
      dataTableRef.current = $(tableRef.current).DataTable(dataTableConfig);
      tableInitialized.current = true;
      
      // Custom layout components
      $('.table-title').html(`
        <div class="title-with-button">
          <h2>Daftar Guru</h2>
          <button id="tambahGuruBtn" class="tambah-guru-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Tambah Guru
          </button>
        </div>
      `);
      
      // Hide the default search label
      $('.dataTables_filter label').contents().filter(function() {
        return this.nodeType === 3; // Node.TEXT_NODE
      }).remove();
      
      // Add custom sort button
      $('.table-filters').append(
        '<div class="sort-button"><button>Urut Berdasarkan <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></button></div>'
      );
      
      // Customize search box
      $('.dataTables_filter input').attr('placeholder', 'Cari di sini...');
      
      // Attach event handlers
      $(tableRef.current).on('click', '.btn-view', handleViewClick);
      $(tableRef.current).on('click', '.btn-edit', handleEditClick);
      $(tableRef.current).on('click', '.btn-delete', handleDeleteClick);
      $(tableRef.current).on('click', '.tugas-clickable', handleTugasClick);
      $('.sort-button button').on('click', handleSortButtonClick);
      $('#tambahGuruBtn').on('click', handleTambahGuruClick);
      
      // Update styling
      setTimeout(() => {
        try {
          if (dataTableRef.current) {
            $('.dataTables_info').addClass('entries-info');
          }
        } catch (e) {
          console.warn('Error setting up table styling:', e);
        }
      }, 500);
      
    } catch (error) {
      console.error('Error initializing DataTable:', error);
    }

    // Cleanup when component unmounts
    return () => {
      try {
        const $ = window.jQuery;
        if (!$) return;
        
        // Detach event handlers
        if (tableRef.current) {
          $(tableRef.current).off('click', '.btn-view');
          $(tableRef.current).off('click', '.btn-edit');
          $(tableRef.current).off('click', '.btn-delete');
          $(tableRef.current).off('click', '.tugas-clickable');
          $('.sort-button button').off('click');
          $('#tambahGuruBtn').off('click');
        }
        
        // Destroy DataTable
        if (dataTableRef.current) {
          try {
            dataTableRef.current.off('draw');
          } catch (e) {
            console.warn('Error removing draw event:', e);
          }
          
          try {
            dataTableRef.current.destroy();
          } catch (e) {
            console.warn('Error destroying DataTable:', e);
          }
          
          dataTableRef.current = null;
        }
        
      } catch (error) {
        console.error('Error cleaning up DataTable:', error);
      } finally {
        tableInitialized.current = false;
      }
    };
  }, [dataTableConfig, handleViewClick, handleEditClick, handleDeleteClick, handleTugasClick, handleSortButtonClick, handleTambahGuruClick]);

  return (
    <div className="orders-datatable-container">
      <div className="datatable-wrapper">
        <table ref={tableRef} className="display orders-table" width="100%">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Guru</th>
              <th>Tag</th>
              <th>Kepala Asrama</th>
              <th>Status</th>
              <th>Tugas</th>
              <th>Sertifikat</th>
              <th>Progress</th>
              <th>Saldo</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Data will be populated by DataTables */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GuruDataTable;