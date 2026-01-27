import { useState, useEffect } from 'react';
import { useContent } from '../../context/ContentContext';
import { useToast } from '../../context/ToastContext';
import AdminPageHeader from '../../components/AdminPageHeader';

export default function AdminAbout() {
  const { aboutContent, setAboutContent } = useContent();
  const { showToast } = useToast();
  
  // Local state for form handling
  const [formData, setFormData] = useState(null);

  // Initialize form data when aboutContent is available
  useEffect(() => {
    if (aboutContent) {
      setFormData(aboutContent);
    }
  }, [aboutContent]);

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleValueChange = (index, field, value) => {
    const newValues = [...formData.values];
    newValues[index] = { ...newValues[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      values: newValues
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setAboutContent(formData);
    showToast('About page content updated successfully', 'success');
  };

  if (!formData) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
       <AdminPageHeader 
        title="About Page Content" 
        stats="Manage Hero, Philosophy & Founder"
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
      />

      <form onSubmit={handleSave} className="space-y-8 max-w-5xl mx-auto">
        
        {/* Hero Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 text-amber-800 border-b pb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.923 2.489a1 1 0 01-1.874.695L11.055 15H8.944l-.874 2.184a1 1 0 01-1.874-.695L7.22 15H5a2 2 0 01-2-2V5zm6.5 7.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" clipRule="evenodd" />
                </svg>
                Hero Section
            </h2>
            <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                        <input 
                            type="text" 
                            value={formData.hero?.title || ''}
                            onChange={(e) => handleChange('hero', 'title', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle</label>
                        <input 
                            type="text" 
                            value={formData.hero?.subtitle || ''}
                            onChange={(e) => handleChange('hero', 'subtitle', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea 
                        rows="3"
                        value={formData.hero?.description || ''}
                        onChange={(e) => handleChange('hero', 'description', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                    />
                </div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Background Image</label>
                    <div className="flex gap-4">
                        <input 
                            type="text" 
                            value={formData.hero?.image || ''}
                            onChange={(e) => handleChange('hero', 'image', e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                            placeholder="Enter image URL or upload"
                        />
                        <label className="cursor-pointer bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2 whitespace-nowrap">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            Upload
                            <input 
                                type="file" 
                                className="hidden" 
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            handleChange('hero', 'image', reader.result);
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                        </label>
                    </div>
                    {formData.hero.image && (
                        <div className="mt-4 relative h-40 w-full overflow-hidden rounded-lg border border-gray-200">
                            <img 
                                src={formData.hero.image} 
                                alt="Hero Background Preview" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </div>
            </div>

        {/* Philosophy Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 text-amber-800 border-b pb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                Philosophy Section
            </h2>
            <div className="grid gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                    <input 
                        type="text" 
                        value={formData.philosophy.title}
                        onChange={(e) => handleChange('philosophy', 'title', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Paragraph 1</label>
                    <textarea 
                        rows="3"
                        value={formData.philosophy.paragraph1}
                        onChange={(e) => handleChange('philosophy', 'paragraph1', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Paragraph 2</label>
                    <textarea 
                        rows="3"
                        value={formData.philosophy.paragraph2}
                        onChange={(e) => handleChange('philosophy', 'paragraph2', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                    />
                </div>
            </div>
        </div>

        {/* Founder Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 text-amber-800 border-b pb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
                Founder Quote
            </h2>
            <div className="grid gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Quote</label>
                    <textarea 
                        rows="2"
                        value={formData.founder.quote}
                        onChange={(e) => handleChange('founder', 'quote', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name & Title</label>
                    <input 
                        type="text" 
                        value={formData.founder.name}
                        onChange={(e) => handleChange('founder', 'name', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Founder Image</label>
                    <div className="flex gap-4">
                        <input 
                            type="text" 
                            value={formData.founder.image || ''}
                            onChange={(e) => handleChange('founder', 'image', e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                            placeholder="Enter image URL or upload"
                        />
                        <label className="cursor-pointer bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2 whitespace-nowrap">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            Upload
                            <input 
                                type="file" 
                                className="hidden" 
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            handleChange('founder', 'image', reader.result);
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                        </label>
                    </div>
                    {formData.founder.image && (
                        <div className="mt-4 relative h-40 w-40 overflow-hidden rounded-full border border-gray-200 mx-auto">
                            <img 
                                src={formData.founder.image} 
                                alt="Founder" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* Values Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 text-amber-800 border-b pb-2 flex items-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                </svg>
                Core Values
            </h2>
            <div className="grid gap-6">
                {formData.values?.map((val, index) => (
                    <div key={val.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h3 className="font-semibold text-gray-700 mb-3">Value {index + 1}</h3>
                        <div className="grid gap-4">
                             <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                                <input 
                                    type="text" 
                                    value={val.title || ''}
                                    onChange={(e) => handleValueChange(index, 'title', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                <textarea 
                                    rows="2"
                                    value={val.desc || ''}
                                    onChange={(e) => handleValueChange(index, 'desc', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Icon / Image</label>
                                <div className="flex gap-4">
                                    <input 
                                        type="text" 
                                        value={val.image || ''}
                                        onChange={(e) => handleValueChange(index, 'image', e.target.value)}
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                                        placeholder="Enter image URL or upload"
                                    />
                                    <label className="cursor-pointer bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2 whitespace-nowrap">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                        </svg>
                                        Upload
                                        <input 
                                            type="file" 
                                            className="hidden" 
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        handleValueChange(index, 'image', reader.result);
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                    </label>
                                </div>
                                {val.image && (
                                    <div className="mt-4 relative h-20 w-20 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                                        <img 
                                            src={val.image} 
                                            alt="Preview" 
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="flex justify-end pt-4 sticky bottom-6">
             <button
              type="submit"
              className="px-8 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Save All Changes
            </button>
        </div>

      </form>
    </div>
  );
}