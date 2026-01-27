import React, { useState, useMemo } from 'react';

export default function AdminTable({ 
  columns, 
  data, 
  onEdit, 
  onDelete, 
  onImageChange, 
  actions = true,
  searchable = false,
  filters = [], // Array of { key: 'category', label: 'Category', options: ['Residential', 'Commercial'] }
  itemsPerPage = 10
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page or other states if needed when data changes, but for now simple filter
  
  const filteredData = useMemo(() => {
    return data.filter(item => {
      // 1. Search Filter
      if (searchable && searchTerm) {
        const lowerTerm = searchTerm.toLowerCase();
        const matchesSearch = columns.some(col => {
          const val = item[col.key];
          if (val == null) return false;
          return String(val).toLowerCase().includes(lowerTerm);
        });
        if (!matchesSearch) return false;
      }

      // 2. Dropdown Filters
      for (const filter of filters) {
        const activeValue = activeFilters[filter.key];
        if (activeValue && activeValue !== 'All') {
          if (item[filter.key] !== activeValue) {
            return false;
          }
        }
      }

      return true;
    });
  }, [data, searchTerm, activeFilters, columns, searchable, filters]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (key, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  return (
    <div className="w-full space-y-4">
      {/* Search and Filters Bar */}
      {(searchable || filters.length > 0) && (
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          
          {/* Search Input */}
          {searchable && (
            <div className="relative w-full sm:w-72">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}

          {/* Filters */}
          {filters.length > 0 && (
            <div className="flex gap-3 flex-wrap w-full sm:w-auto">
              {filters.map((filter) => (
                <select
                  key={filter.key}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm bg-white cursor-pointer"
                  value={activeFilters[filter.key] || 'All'}
                  onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                >
                  <option value="All">All {filter.label}s</option>
                  {filter.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Table Container */}
      <div className="w-full overflow-hidden rounded-xl bg-white shadow-xl border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-amber-500 text-black">
              <tr>
                {columns.map((col) => (
                  <th key={col.key} scope="col" className="px-6 py-4 font-semibold text-base tracking-wide whitespace-nowrap first:rounded-tl-xl">
                    {col.label}
                  </th>
                ))}
                {actions && (
                  <th scope="col" className="px-6 py-4 font-semibold text-base tracking-wide text-right last:rounded-tr-xl">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedData.length > 0 ? (
                paginatedData.map((item, idx) => (
                  <tr 
                    key={item.id || idx}  
                    className="transition-colors hover:bg-amber-50/50 bg-white"
                  >
                    {columns.map((col) => (
                      <td key={`${item.id}-${col.key}`} className="px-6 py-4 align-middle text-gray-700">
                        {col.render ? (
                          col.render(item[col.key], item)
                        ) : col.type === 'image' ? (
                          <div className="relative h-12 w-20 overflow-hidden rounded-lg shadow-sm border border-gray-200 group bg-gray-50">
                            {item[col.key] ? (
                              <img 
                                src={item[col.key]} 
                                alt="Preview" 
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full w-full text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="max-w-xs truncate font-medium text-gray-600">
                            {item[col.key]}
                          </div>
                        )}
                      </td>
                    ))}
                    
                    {actions && (
                      <td className="px-6 py-4 text-right align-middle">
                        <div className="flex justify-end gap-2">
                          {onImageChange && (
                            <button
                              onClick={() => onImageChange(item)}
                              className="p-2 text-amber-600 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors"
                              title="Change Image"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </button>
                          )}
                          {onEdit && (
                            <button
                              onClick={() => onEdit(item)}
                              className="p-2 text-amber-600 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          )}
                          {onDelete && (
                            <button
                              onClick={() => onDelete(item)}
                              className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-12 text-center text-gray-400 bg-white">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-lg font-medium">No data found</span>
                      <span className="text-sm">Try adjusting your search or filters</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {filteredData.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50 gap-4">
            <div className="text-sm text-gray-500 font-medium">
              Showing <span className="text-gray-900 font-bold">{((currentPage - 1) * itemsPerPage) + 1}</span> to <span className="text-gray-900 font-bold">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> of <span className="text-gray-900 font-bold">{filteredData.length}</span> entries
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-gray-600 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Logic to show pages around current page could be complex, keeping it simple for now or centered
                  let pageNum = i + 1;
                  if (totalPages > 5) {
                    if (currentPage > 3) {
                       pageNum = currentPage - 3 + i;
                    }
                    if (pageNum > totalPages) pageNum = totalPages - (4 - i);
                  }
                  
                  // Simple range for now: 1..totalPages if small, otherwise handled by scrolling or logic
                  // Let's use a simpler safe range logic for robustness
                  
                  // Re-calculating proper range
                  let startPage = Math.max(1, currentPage - 2);
                  let endPage = Math.min(totalPages, startPage + 4);
                  if (endPage - startPage < 4) {
                     startPage = Math.max(1, endPage - 4);
                  }
                  
                  const pages = [];
                  for(let p = startPage; p <= endPage; p++) pages.push(p);
                  return pages;
                })[0].map(pageNum => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-lg text-sm font-bold flex items-center justify-center transition-all ${
                      currentPage === pageNum
                        ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                        : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50 hover:border-amber-300'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-gray-600 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
