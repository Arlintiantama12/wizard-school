import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import './OrdersDataTable.css';

// Data sampel untuk tabel - disimpan di luar komponen untuk menghindari re-render
const SAMPLE_DATA = [
  {
    id: 'W-001',
    nama: {
      name: 'Harry Potter',
      avatar: '/images/avatars/placeholder.png'
    },
    tag: {
      text: 'Penyihir',
      type: 'positive'
    },
    status: 'Aktif',
    level: 'Level 3',
    progress: 75,
    asrama: 'Gryffindor',
    saldo: {
      galleons: 10,
      sickles: 5,
      knuts: 20
    }
  },
  {
    id: 'W-002',
    nama: {
      name: 'Hermione Granger',
      avatar: '/images/avatars/placeholder.png'
    },
    tag: {
      text: 'Jenius',
      type: 'positive'
    },
    status: 'Aktif',
    level: 'Level 4',
    progress: 90,
    asrama: 'Gryffindor',
    saldo: {
      galleons: 15,
      sickles: 8,
      knuts: 5
    }
  },
  {
    id: 'W-003',
    nama: {
      name: 'Ron Weasley',
      avatar: '/images/avatars/placeholder.png'
    },
    tag: {
      text: 'Teman',
      type: 'positive'
    },
    status: 'Aktif',
    level: 'Level 2',
    progress: 60,
    asrama: 'Gryffindor',
    saldo: {
      galleons: 2,
      sickles: 3,
      knuts: 25
    }
  },
  {
    id: 'W-004',
    nama: {
      name: 'Draco Malfoy',
      avatar: '/images/avatars/placeholder.png'
    },
    tag: {
      text: 'Orang Kaya',
      type: 'rich'
    },
    status: 'Suspended',
    level: 'Level 3',
    progress: 70,
    asrama: 'Slytherin',
    saldo: {
      galleons: 50,
      sickles: 20,
      knuts: 0
    }
  },
  {
    id: 'W-005',
    nama: {
      name: 'Luna Lovegood',
      avatar: '/images/avatars/placeholder.png'
    },
    tag: {
      text: 'Unik',
      type: 'neutral'
    },
    status: 'Aktif',
    level: 'Level 2',
    progress: 55,
    asrama: 'Ravenclaw',
    saldo: {
      galleons: 6,
      sickles: 12,
      knuts: 18
    }
  },
  {
    id: 'W-006',
    nama: {
      name: 'Cedric Diggory',
      avatar: '/images/avatars/placeholder.png'
    },
    tag: {
      text: 'Panutan',
      type: 'positive'
    },
    status: 'Aktif',
    level: 'Level 4',
    progress: 85,
    asrama: 'Hufflepuff',
    saldo: {
      galleons: 12,
      sickles: 7,
      knuts: 3
    }
  }
];

// Fungsi helper untuk status badge - memisahkan logika dari render function
const getStatusClass = (status) => {
  switch(status) {
    case 'Aktif':
      return 'status-delivered';
    case 'Suspended':
      return 'status-pending';
    case 'Nonaktif':
      return 'status-processing';
    case 'Lulus':
      return 'status-shipped';
    default:
      return '';
  }
};

const OptimizedOrdersDataTable = () => {
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);
  const tableInitialized = useRef(false);

  // Definisi kolom yang tidak berubah - menggunakan useMemo untuk mencegah redefinisi pada setiap render
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
    { data: 'level' },
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
      // Kolom Asrama
      data: 'asrama',
      render: function(data, type, row) {
        // Untuk sorting dan tipe lainnya, kembalikan text saja
        if (type !== 'display') {
          return data;
        }
        
        // Untuk display, kita render dengan warna yang sesuai berdasarkan asrama
        let asramaClass = '';
        switch(data.toLowerCase()) {
          case 'gryffindor':
            asramaClass = 'asrama-gryffindor';
            break;
          case 'slytherin':
            asramaClass = 'asrama-slytherin';
            break;
          case 'hufflepuff':
            asramaClass = 'asrama-hufflepuff';
            break;
          case 'ravenclaw':
            asramaClass = 'asrama-ravenclaw';
            break;
          default:
            asramaClass = 'asrama-other';
        }
        
        return `<span class="asrama-badge ${asramaClass}">${data}</span>`;
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

  // Konfigurasi DataTable diextract ke dalam useMemo
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
    deferRender: true, // Meningkatkan performa dengan merender hanya baris yang terlihat
    stateSave: false, // Diubah menjadi false untuk mencegah masalah lainnya
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

  // Handler untuk tombol view - dioptimalkan dengan useCallback
  const handleViewClick = useCallback((event) => {
    const button = event.currentTarget;
    const id = button.dataset.id;
    console.log('View item with ID:', id);
  }, []);

  // Handler untuk tombol edit - dioptimalkan dengan useCallback
  const handleEditClick = useCallback((event) => {
    const button = event.currentTarget;
    const id = button.dataset.id;
    console.log('Edit item with ID:', id);
  }, []);

  // Handler untuk tombol delete - dioptimalkan dengan useCallback
  const handleDeleteClick = useCallback((event) => {
    const button = event.currentTarget;
    const id = button.dataset.id;
    console.log('Delete item with ID:', id);
  }, []);



  // Handler untuk tombol sort - dioptimalkan dengan useCallback
  const handleSortButtonClick = useCallback(() => {
    // Implementasi fungsi sort
    console.log('Sort button clicked');
  }, []);

  useEffect(() => {
    // Sekali inisialisasi - mencegah multiple initialization
    if (tableInitialized.current) return;
    
    try {
      // Cache jQuery reference
      const $ = window.jQuery;
      if (!$) throw new Error('jQuery is not loaded');
      
      // Inisialisasi DataTable
      dataTableRef.current = $(tableRef.current).DataTable(dataTableConfig);
      tableInitialized.current = true;
      
      // Custom layout components hanya dibuat sekali setelah inisialisasi
      // Add title to the table with Tambah Murid button
      $('.table-title').html(`
        <div class="title-with-button">
          <h2>Daftar Murid</h2>
          <button id="tambahMuridBtn" class="tambah-murid-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Tambah Murid
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
      
      // Attach event handlers - menggunakan delegasi event untuk performance
      // Satu event handler untuk semua tombol view
      $(tableRef.current).on('click', '.btn-view', handleViewClick);
      
      // Satu event handler untuk semua tombol edit
      $(tableRef.current).on('click', '.btn-edit', handleEditClick);
      
      // Satu event handler untuk semua tombol delete
      $(tableRef.current).on('click', '.btn-delete', handleDeleteClick);
      
      
      // Event handler untuk tombol sort
      $('.sort-button button').on('click', handleSortButtonClick);
      
      // Event handler untuk tombol Tambah Murid
      $('#tambahMuridBtn').on('click', function() {
        console.log('Tambah Murid button clicked');
        alert('Form tambah murid akan ditampilkan di sini');
        // Di sini Anda bisa menampilkan modal form atau navigasi ke halaman tambah murid
      });
      
      // Tunggu sampai DataTable sepenuhnya siap
      setTimeout(() => {
        try {
          // Update styling
          if (dataTableRef.current) {
            $('.dataTables_info').addClass('entries-info');
          }
        } catch (e) {
          console.warn('Error setting up table styling:', e);
        }
      }, 500); // Wait for DataTable to fully initialize
      
    } catch (error) {
      console.error('Error initializing DataTable:', error);
    }

    // Cleanup when component unmounts
    return () => {
      try {
        // Cache jQuery reference
        const $ = window.jQuery;
        if (!$) return;
        
        // Detach all event handlers
        if (tableRef.current) {
          $(tableRef.current).off('click', '.btn-view');
          $(tableRef.current).off('click', '.btn-edit');
          $(tableRef.current).off('click', '.btn-delete');
          $('.sort-button button').off('click');
          $('#tambahMuridBtn').off('click');
        }
        
        // Destroy DataTable
        if (dataTableRef.current) {
          try {
            dataTableRef.current.off('draw'); // Remove draw event first
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
  }, [dataTableConfig, handleViewClick, handleEditClick, handleDeleteClick, handleSortButtonClick]);

  // Fungsi publik untuk refresh data - bisa diexpose ke parent component
  const refreshData = useCallback((newData = SAMPLE_DATA) => {
    if (dataTableRef.current && tableInitialized.current) {
      dataTableRef.current.clear();
      dataTableRef.current.rows.add(newData);
      dataTableRef.current.draw();
    }
  }, []);



  return (
    <div className="orders-datatable-container">
      <div className="datatable-wrapper">
        <table ref={tableRef} className="display orders-table" width="100%">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Murid</th>
              <th>Tag</th>
              <th>Status</th>
              <th>Level</th>
              <th>Progress</th>
              <th>Asrama</th>
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

// Expose public methods
export default OptimizedOrdersDataTable;