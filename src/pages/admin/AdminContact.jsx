import { useState, useEffect } from 'react';
import { useContent } from '../../context/ContentContext';
import { useToast } from '../../context/ToastContext';
import AdminPageHeader from '../../components/AdminPageHeader';

export default function AdminContact() {
  const { contactInfo, setContactInfo, contactPageContent, updateContactPageContent } = useContent();
  const { showToast } = useToast();
  
  const [formData, setFormData] = useState(null);
  const [pageContentData, setPageContentData] = useState(null);

  useEffect(() => {
    if (contactInfo) {
      setFormData(contactInfo);
    }
  }, [contactInfo]);

  useEffect(() => {
    if (contactPageContent) {
      setPageContentData({
        ...contactPageContent,
        hero: { 
          title: '', 
          subtitle: '', 
          description: '', 
          image: '', 
          ...(contactPageContent.hero || {}) 
        }
      });
    }
  }, [contactPageContent]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddressChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };

  const handlePageContentChange = (section, field, value) => {
    setPageContentData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setContactInfo(formData);
    // Update page content
    Object.keys(pageContentData).forEach(section => {
      updateContactPageContent(section, pageContentData[section]);
    });
    showToast('Contact information updated successfully', 'success');
  };

  if (!formData || !pageContentData) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <AdminPageHeader 
        title="Contact Information" 
        stats="Manage Info & Page Content"
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
      />

      <form onSubmit={handleSave} className="space-y-8 max-w-4xl mx-auto">
        
        {/* Hero Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 text-amber-800 border-b pb-2">Hero Section</h2>
            <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle</label>
                        <input 
                            type="text" 
                            value={pageContentData.hero.subtitle}
                            onChange={(e) => handlePageContentChange('hero', 'subtitle', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                        <input 
                            type="text" 
                            value={pageContentData.hero.title}
                            onChange={(e) => handlePageContentChange('hero', 'title', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea 
                        rows="2"
                        value={pageContentData.hero.description}
                        onChange={(e) => handlePageContentChange('hero', 'description', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Background Image</label>
                    <div className="flex gap-4">
                        <input 
                            type="text" 
                            value={pageContentData.hero.image}
                            onChange={(e) => handlePageContentChange('hero', 'image', e.target.value)}
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
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            handlePageContentChange('hero', 'image', reader.result);
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                        </label>
                    </div>
                    {pageContentData.hero.image && (
                        <div className="mt-4 relative h-40 w-full overflow-hidden rounded-lg border border-gray-200">
                            <img 
                                src={pageContentData.hero.image} 
                                alt="Hero Background Preview" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-6 text-amber-800 border-b pb-2">Contact Details</h2>
          <div className="grid gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
              <input 
                type="text" 
                value={formData.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp Number</label>
              <input 
                type="text" 
                value={formData.whatsapp || ''}
                onChange={(e) => handleChange('whatsapp', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                placeholder="e.g. 919724167680"
              />
              <p className="text-xs text-gray-500 mt-1">Enter number with country code, no spaces or symbols (e.g. 919724167680).</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp Default Message</label>
              <textarea 
                rows="2"
                value={formData.whatsappMessage || ''}
                onChange={(e) => handleChange('whatsappMessage', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                placeholder="Hello, I would like to inquire about your services."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input 
                type="text" 
                value={formData.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Timings</label>
              <input 
                type="text" 
                value={formData.timings || ''}
                onChange={(e) => handleChange('timings', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-6 text-amber-800 border-b pb-2">Office Address</h2>
          <div className="grid gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Line 1 (Street)</label>
              <input 
                type="text" 
                value={formData.address?.line1 || ''}
                onChange={(e) => handleAddressChange('line1', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Line 2 (City, Zip)</label>
              <input 
                type="text" 
                value={formData.address?.line2 || ''}
                onChange={(e) => handleAddressChange('line2', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Google Maps Embed URL</label>
              <input 
                type="text" 
                value={formData.mapUrl || ''}
                onChange={(e) => handleChange('mapUrl', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                placeholder="https://www.google.com/maps/embed?..."
              />
              <p className="text-xs text-gray-500 mt-1">Paste the 'src' value from Google Maps Embed code.</p>
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
