import React, { useEffect, useRef } from 'react';
import './OrdersDataTable.css';

const OrdersDataTable = () => {
  const tableRef = useRef(null);

  useEffect(() => {
    let dataTable;
    
    try {
      // Gunakan jQuery global yang sudah dimuat dari CDN
      const $ = window.jQuery;
      
      // Data sampel untuk tabel
      const sampleData = [
        {
          id: 1,
          product: {
            name: 'Classic tufted leather sofa',
            brand: 'Pixel',
            image: '/images/products/sofa.png'
          },
          category: 'Furniture',
          quantity: 1,
          customer: {
            name: 'Lucas Hayes',
            avatar: '/images/avatars/avatar1.png'
          },
          status: 'Shipped',
          price: '$1200.00',
          ordered_date: '2024-05-18'
        },
        {
          id: 2,
          product: {
            name: 'Rose Flower Pot',
            brand: 'Sonic',
            image: '/images/products/flower-pot.png'
          },
          category: 'Decoration',
          quantity: 2,
          customer: {
            name: 'Abigail Scott',
            avatar: '/images/avatars/avatar2.png'
          },
          status: 'Delivered',
          price: '$250.00',
          ordered_date: '2024-05-19'
        },
        {
          id: 3,
          product: {
            name: 'Leather Handbag',
            brand: 'Elite',
            image: '/images/products/handbag.png'
          },
          category: 'Fashion',
          quantity: 1,
          customer: {
            name: 'Mason Wallace',
            avatar: '/images/avatars/avatar3.png'
          },
          status: 'Processing',
          price: '$800.00',
          ordered_date: '2024-05-20'
        },
        {
          id: 4,
          product: {
            name: 'Polaroid Medium Camera',
            brand: 'Bright',
            image: '/images/products/camera.png'
          },
          category: 'Electronics',
          quantity: 3,
          customer: {
            name: 'Chloe Lewis',
            avatar: '/images/avatars/avatar4.png'
          },
          status: 'Pending',
          price: '$50.00',
          ordered_date: '2024-05-20'
        },
        {
          id: 5,
          product: {
            name: 'Digital Watch',
            brand: 'Nova',
            image: '/images/products/watch.png'
          },
          category: 'Fashion',
          quantity: 2,
          customer: {
            name: 'Henry Morgan',
            avatar: '/images/avatars/avatar5.png'
          },
          status: 'Shipped',
          price: '$100.00',
          ordered_date: '2024-05-21'
        }
      ];

      // Inisialisasi DataTables dengan konfigurasi custom
      dataTable = $(tableRef.current).DataTable({
        data: sampleData,
        columns: [
          { 
            // Kolom checkbox
            data: null,
            orderable: false,
            className: 'select-checkbox',
            defaultContent: '',
            render: function (data, type, row) {
              return '<input type="checkbox" class="row-checkbox">';
            }
          },
          { 
            // Kolom product
            data: 'product',
            render: function(data, type, row) {
              // Placeholder untuk gambar jika tidak ada
              const imgSrc = '/images/products/placeholder.png';
              return `
                <div class="product-cell">
                  <div class="product-image">
                    <img src="${imgSrc}" alt="${data.name}" />
                  </div>
                  <div class="product-info">
                    <div class="product-name">${data.name}</div>
                    <div class="product-brand">${data.brand}</div>
                  </div>
                </div>
              `;
            }
          },
          { data: 'category' },
          { data: 'quantity' },
          { 
            // Kolom customer
            data: 'customer',
            render: function(data, type, row) {
              // Placeholder untuk avatar jika tidak ada
              const avatarSrc = '/images/avatars/placeholder.png';
              return `
                <div class="customer-cell">
                  <img src="${avatarSrc}" alt="${data.name}" class="avatar" />
                  <span>${data.name}</span>
                </div>
              `;
            }
          },
          { 
            // Kolom status
            data: 'status',
            render: function(data, type, row) {
              let statusClass = '';
              
              // Menentukan kelas CSS berdasarkan status
              switch(data) {
                case 'Shipped':
                  statusClass = 'status-shipped';
                  break;
                case 'Delivered':
                  statusClass = 'status-delivered';
                  break;
                case 'Processing':
                  statusClass = 'status-processing';
                  break;
                case 'Pending':
                  statusClass = 'status-pending';
                  break;
                default:
                  statusClass = '';
              }
              
              return `<span class="status-badge ${statusClass}">${data}</span>`;
            }
          },
          { data: 'price' },
          { data: 'ordered_date' },
          { 
            // Kolom action
            data: null,
            orderable: false,
            render: function(data, type, row) {
              return `
                <div class="action-buttons">
                  <button class="btn-view" data-id="${row.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 16v-4"></path>
                      <path d="M12 8h.01"></path>
                    </svg>
                  </button>
                  <button class="btn-delete" data-id="${row.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              `;
            }
          }
        ],
        ordering: true,
        searching: true,
        paging: true,
        lengthChange: false,
        pageLength: 5,
        info: false,
        scrollX: false,
        language: {
          search: '',
          searchPlaceholder: 'Search Here',
          paginate: {
            previous: 'Prev',
            next: 'next'
          }
        },
        select: {
          style: 'multi',
          selector: 'td:first-child'
        },
        // Menambahkan custom DOM untuk search dan pagination
        dom: '<"table-header"<"table-title"><"table-filters"f>><"table-content"rt><"table-footer"<"table-info"i><"table-pagination"p>>',
        initComplete: function() {
          // Add title to the table
          $('.table-title').html('<h2>Recent Orders</h2>');
          
          // Hide the default search label
          $('.dataTables_filter label').contents().filter(function() {
            return this.nodeType === 3; // Node.TEXT_NODE
          }).remove();
        }
      });

      // Event handling untuk checkbox
      $(tableRef.current).on('change', '.row-checkbox', function() {
        const tr = $(this).closest('tr');
        if (this.checked) {
          tr.addClass('selected');
        } else {
          tr.removeClass('selected');
        }
      });

      // Add custom sort button
      $('.table-filters').append('<div class="sort-button"><button>Sort By <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></button></div>');

      // Customize search box
      $('.dataTables_filter input').attr('placeholder', 'Search Here');

      // Add pagination info
      $('.table-footer').prepend('<div class="entries-info">Showing 5 Entries <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></div>');

      // Add event handlers for action buttons
      $(tableRef.current).on('click', '.btn-view', function() {
        const id = $(this).data('id');
        console.log('View item with ID:', id);
      });

      $(tableRef.current).on('click', '.btn-delete', function() {
        const id = $(this).data('id');
        console.log('Delete item with ID:', id);
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
    <div className="orders-datatable-container">
      <div className="datatable-wrapper">
        <table ref={tableRef} className="display orders-table" width="100%">
          <thead>
            <tr>
              <th></th>
              <th>Product</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Price</th>
              <th>Ordered Date</th>
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

export default OrdersDataTable;