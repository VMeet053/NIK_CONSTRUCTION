
import { useState, useEffect } from 'react';
import { useContent } from '../../context/ContentContext';
import { useToast } from '../../context/ToastContext';
import AdminPageHeader from '../../components/AdminPageHeader';

export default function AdminFooter() {
  const { footerContent, setFooterContent } = useContent();
  const { showToast } = useToast();
  
  // Local state for form handling
  const [formData, setFormData] = useState({
    companyName: '',
    description: '',
    operatingRegions: '',
    copyrightText: '',
    column1Title: '',
    column2Title: ''
  });

  // Initialize form data
  useEffect(() => {
    if (footerContent && Object.keys(footerContent).length > 0) {
      setFormData(prev => ({
        ...prev,
        ...footerContent
      }));
    }
  }, [footerContent]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await setFooterContent(formData);
      showToast('Footer content updated successfully', 'success');
    } catch (error) {
      console.error('Error saving content:', error);
      showToast('Failed to update content', 'error');
    }
  };

  if (!formData) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
       <AdminPageHeader 
        title="Footer Content" 
        stats="Manage Footer Text & Info"
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
      />

      <form onSubmit={handleSave} className="space-y-8 max-w-4xl mx-auto">
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 text-amber-800 border-b pb-2">Company Information</h2>
            <div className="grid gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                    <input 
                        type="text" 
                        value={formData.companyName || ''}
                        onChange={(e) => handleChange('companyName', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        placeholder="Kirti Construction"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea 
                        rows="3"
                        value={formData.description || ''}
                        onChange={(e) => handleChange('description', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        placeholder="Heritage conservation and architecture studio..."
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Operating Regions</label>
                    <input 
                        type="text" 
                        value={formData.operatingRegions || ''}
                        onChange={(e) => handleChange('operatingRegions', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        placeholder="Operating across South Asia, Middle East, and Europe"
                    />
                </div>
            </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 text-amber-800 border-b pb-2">Footer Columns & Copyright</h2>
            <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Column 1 Title (Studio)</label>
                        <input 
                            type="text" 
                            value={formData.column1Title || ''}
                            onChange={(e) => handleChange('column1Title', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                            placeholder="Studio"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Column 2 Title (Work)</label>
                        <input 
                            type="text" 
                            value={formData.column2Title || ''}
                            onChange={(e) => handleChange('column2Title', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                            placeholder="Work"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Copyright Text</label>
                    <input 
                        type="text" 
                        value={formData.copyrightText || ''}
                        onChange={(e) => handleChange('copyrightText', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        placeholder="© 2026 Kirti Construction. All rights reserved."
                    />
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
              Save Changes
            </button>
        </div>

      </form>
    </div>
  );
}
