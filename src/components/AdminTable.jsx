import React from 'react';

export default function AdminTable({ 
  columns, 
  data, 
  onEdit, 
  onDelete, 
  onImageChange, 
  actions = true 
}) {
  return (
    <div className="w-full overflow-hidden rounded-xl bg-white shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-indigo-500 text-white">
            <tr>
              {columns.map((col) => (
                <th key={col.key} scope="col" className="px-6 py-4 font-semibold text-base tracking-wide">
                  {col.label}
                </th>
              ))}
              {actions && (
                <th scope="col" className="px-6 py-4 font-semibold text-base tracking-wide text-right">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-indigo-100">
            {data.length > 0 ? (
              data.map((item, idx) => (
                <tr key={item.id || idx} className={`transition-colors hover:bg-indigo-50/60 ${idx % 2 === 0 ? 'bg-white' : 'bg-indigo-50/30'}`}>
                  {columns.map((col) => (
                    <td key={`${item.id}-${col.key}`} className="px-6 py-4 align-middle text-gray-700">
                      {col.render ? (
                        col.render(item[col.key], item)
                      ) : col.type === 'image' ? (
                        <div className="relative h-12 w-20 overflow-hidden rounded-md shadow-sm">
                          <img 
                            src={item[col.key]} 
                            alt="Preview" 
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="max-w-xs truncate font-medium">
                          {item[col.key]}
                        </div>
                      )}
                    </td>
                  ))}
                  
                  {actions && (
                    <td className="px-6 py-4 text-right align-middle">
                      <div className="flex justify-end gap-3">
                        {onImageChange && (
                          <button
                            onClick={() => onImageChange(item)}
                            className="p-2 text-green-600 hover:text-green-900 hover:bg-green-50 rounded-full transition-colors"
                            title="Change Image"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </button>
                        )}
                        {onEdit && (
                          <button
                            onClick={() => onEdit(item)}
                            className="p-2 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded-full transition-colors"
                            title="Edit"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(item)}
                            className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-full transition-colors"
                            title="Delete"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-8 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
