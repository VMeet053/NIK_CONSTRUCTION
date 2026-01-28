
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EditModal({ isOpen, onClose, onSave, data, fields, title }) {
  const [formData, setFormData] = useState(data || {});

  useEffect(() => {
    setFormData(data || {});
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
            <h2 className="text-xl font-bold text-gray-800">{title || 'Edit Item'}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                ) : field.type === 'gallery' ? (
                  <div className="space-y-3">
                    <textarea
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Comma-separated image URLs"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                    <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg border border-gray-300 inline-flex items-center justify-center transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium text-gray-600">Upload Images</span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          if (files.length) {
                            Promise.all(
                              files.map(async (file) => {
                                const fd = new FormData();
                                fd.append('image', file);
                                const resp = await fetch('http://localhost:5000/api/upload', { method: 'POST', body: fd });
                                if (!resp.ok) throw new Error('Upload failed');
                                const data = await resp.json();
                                return data.url;
                              })
                            ).then((urls) => {
                              const existing = (formData[field.name] || '')
                                .split(',')
                                .map((s) => s.trim())
                                .filter((s) => s.length > 0);
                              const merged = [...existing, ...urls];
                              setFormData((prev) => ({ ...prev, [field.name]: merged.join(',') }));
                            }).catch(() => {
                              // no-op: keep state unchanged on failure
                            });
                          }
                        }}
                      />
                    </label>
                    {(formData[field.name] || '')
                      .split(',')
                      .map((s) => s.trim())
                      .filter((s) => s.length > 0).length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {(formData[field.name] || '')
                          .split(',')
                          .map((s) => s.trim())
                          .filter((s) => s.length > 0)
                          .map((u, idx) => (
                            <div key={idx} className="relative h-24 w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center">
                              <img src={u} alt="Preview" className="h-full w-full object-cover" />
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                ) : field.type === 'image' ? (
                    <div className="space-y-3">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                name={field.name}
                                value={formData[field.name] || ''}
                                onChange={handleChange}
                                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                                placeholder="Image URL or upload"
                            />
                            <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg border border-gray-300 flex items-center justify-center transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                <span className="text-sm font-medium text-gray-600">Upload</span>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const fd = new FormData();
                                            fd.append('image', file);
                                            fetch('http://localhost:5000/api/upload', { method: 'POST', body: fd })
                                              .then(resp => resp.json())
                                              .then(data => {
                                                if (data?.url) {
                                                  setFormData(prev => ({ ...prev, [field.name]: data.url }));
                                                }
                                              })
                                              .catch(() => {});
                                        }
                                    }}
                                />
                            </label>
                        </div>
                        {formData[field.name] && (String(formData[field.name]).startsWith('http') || String(formData[field.name]).startsWith('data:image')) && (
                            <div className="relative h-32 w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center">
                                <img 
                                    src={formData[field.name]} 
                                    alt="Preview" 
                                    className="max-h-full max-w-full object-contain" 
                                />
                            </div>
                        )}
                    </div>
                ) : (
                  <input
                    type={field.type || 'text'}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                )}
              </div>
            ))}
            
            <div className="pt-4 flex justify-end gap-3">
              <button 
                type="button" 
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-4 py-2 text-sm font-bold text-black bg-amber-500 rounded-lg hover:bg-amber-400 transition-colors shadow-md"
              >
                Save Changes
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
