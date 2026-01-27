import { useState, useEffect } from 'react';
import { useContent } from '../../context/ContentContext';
import { useToast } from '../../context/ToastContext';
import AdminPageHeader from '../../components/AdminPageHeader';

export default function AdminProjectsGeneral() {
  const { projectsPageContent, updateProjectsPageContent, uploadFile, loading } = useContent();
  const { showToast } = useToast();
  
  // Local state for form handling
  const [formData, setFormData] = useState({});

  // Initialize form data
  useEffect(() => {
    if (projectsPageContent) {
      setFormData(projectsPageContent);
    }
  }, [projectsPageContent]);

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleImageUpload = async (section, field, e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const url = await uploadFile(file);
        handleChange(section, field, url);
      } catch (error) {
        console.error("Upload error:", error);
        showToast('Image upload failed', 'error');
      }
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Loop through sections and update context
    Object.keys(formData).forEach(section => {
      updateProjectsPageContent(section, formData[section]);
    });
    showToast('Projects page content updated successfully', 'success');
  };

  if (loading && !formData?.hero) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
       <AdminPageHeader 
        title="Projects Page General Content" 
        stats="Manage Hero Section"
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>}
      />

      <form onSubmit={handleSave} className="space-y-8 max-w-5xl mx-auto">
        
        {/* Hero Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 text-amber-800 border-b pb-2">Hero Section</h2>
            <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle</label>
                        <input 
                            type="text" 
                            value={formData.hero?.subtitle || ''}
                            onChange={(e) => handleChange('hero', 'subtitle', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                        <input 
                            type="text" 
                            value={formData.hero?.title || ''}
                            onChange={(e) => handleChange('hero', 'title', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea 
                        rows="2"
                        value={formData.hero?.description || ''}
                        onChange={(e) => handleChange('hero', 'description', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Background Image URL</label>
                    <div className="flex gap-4">
                        <input 
                            type="text" 
                            value={formData.hero?.image || ''}
                            onChange={(e) => handleChange('hero', 'image', e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
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
                                onChange={(e) => handleImageUpload('hero', 'image', e)}
                            />
                        </label>
                    </div>
                </div>
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