import { useState, useEffect } from 'react';
import { useContent } from '../../context/ContentContext';
import { useToast } from '../../context/ToastContext';
import AdminPageHeader from '../../components/AdminPageHeader';

export default function AdminHomeGeneral() {
  const { homeGeneral, setHomeGeneral, uploadFile } = useContent();
  const { showToast } = useToast();
  
  // Local state for form handling
  const [formData, setFormData] = useState({
    hero: {
      established: '',
      subtitle: '',
      title: '',
      description1: '',
      description2: '',
      ctaButton: '',
      contactButton: '',
      philosophyTitle: '',
      philosophyQuote: '',
      philosophyImage: ''
    },
    portfolio: {
      subtitle: '',
      title: '',
      description: '',
      viewAllButton: ''
    },
    services: {
      subtitle: '',
      title: '',
      description: ''
    }
  });

  // Initialize form data
  useEffect(() => {
    if (homeGeneral && Object.keys(homeGeneral).length > 0) {
      setFormData(prev => ({
        ...prev,
        ...homeGeneral,
        hero: { ...prev.hero, ...homeGeneral.hero },
        portfolio: { ...prev.portfolio, ...homeGeneral.portfolio },
        services: { ...prev.services, ...homeGeneral.services }
      }));
    }
  }, [homeGeneral]);

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleImageUpload = async (e, section, field) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const url = await uploadFile(file);
      handleChange(section, field, url);
      showToast('Image uploaded successfully', 'success');
    } catch (error) {
      console.error('Error uploading image:', error);
      showToast('Failed to upload image', 'error');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await setHomeGeneral(formData);
      showToast('Home page content updated successfully', 'success');
    } catch (error) {
      console.error('Error saving content:', error);
      showToast('Failed to update content', 'error');
    }
  };

  if (!formData) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
       <AdminPageHeader 
        title="Home General Content" 
        stats="Manage Intro, Philosophy, CTA"
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
      />

      <form onSubmit={handleSave} className="space-y-8 max-w-5xl mx-auto">
        
        {/* Hero Overlay & Intro Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 text-amber-800 border-b pb-2">Hero & Intro Section</h2>
            <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Established Text</label>
                        <input 
                            type="text" 
                            value={formData.hero.established}
                            onChange={(e) => handleChange('hero', 'established', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Section Subtitle</label>
                        <input 
                            type="text" 
                            value={formData.hero.subtitle}
                            onChange={(e) => handleChange('hero', 'subtitle', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Main Title</label>
                    <input 
                        type="text" 
                        value={formData.hero.title}
                        onChange={(e) => handleChange('hero', 'title', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description Paragraph 1</label>
                    <textarea 
                        rows="2"
                        value={formData.hero.description1}
                        onChange={(e) => handleChange('hero', 'description1', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description Paragraph 2</label>
                    <textarea 
                        rows="2"
                        value={formData.hero.description2}
                        onChange={(e) => handleChange('hero', 'description2', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    />
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">CTA Button 1</label>
                        <input 
                            type="text" 
                            value={formData.hero.ctaButton}
                            onChange={(e) => handleChange('hero', 'ctaButton', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">CTA Button 2</label>
                        <input 
                            type="text" 
                            value={formData.hero.contactButton}
                            onChange={(e) => handleChange('hero', 'contactButton', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        />
                    </div>
                </div>
            </div>
        </div>

        {/* Philosophy Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 text-amber-800 border-b pb-2">Philosophy Section</h2>
            <div className="grid gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Section Title</label>
                    <input 
                        type="text" 
                        value={formData.hero.philosophyTitle}
                        onChange={(e) => handleChange('hero', 'philosophyTitle', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Philosophy Quote</label>
                    <textarea 
                        rows="2"
                        value={formData.hero.philosophyQuote}
                        onChange={(e) => handleChange('hero', 'philosophyQuote', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                    <div className="flex gap-4">
                        <input 
                            type="text" 
                            value={formData.hero.philosophyImage}
                            onChange={(e) => handleChange('hero', 'philosophyImage', e.target.value)}
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
                                onChange={(e) => handleImageUpload(e, 'hero', 'philosophyImage')}
                            />
                        </label>
                    </div>
                </div>
            </div>
        </div>

        {/* Portfolio Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 text-amber-800 border-b pb-2">Portfolio Section Text</h2>
            <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle</label>
                        <input 
                            type="text" 
                            value={formData.portfolio.subtitle}
                            onChange={(e) => handleChange('portfolio', 'subtitle', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                        <input 
                            type="text" 
                            value={formData.portfolio.title}
                            onChange={(e) => handleChange('portfolio', 'title', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea 
                        rows="2"
                        value={formData.portfolio.description}
                        onChange={(e) => handleChange('portfolio', 'description', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Button Text</label>
                    <input 
                        type="text" 
                        value={formData.portfolio.viewAllButton}
                        onChange={(e) => handleChange('portfolio', 'viewAllButton', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    />
                </div>
            </div>
        </div>

        {/* Services Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 text-amber-800 border-b pb-2">Services Section Text</h2>
            <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle</label>
                        <input 
                            type="text" 
                            value={formData.services.subtitle}
                            onChange={(e) => handleChange('services', 'subtitle', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                        <input 
                            type="text" 
                            value={formData.services.title}
                            onChange={(e) => handleChange('services', 'title', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea 
                        rows="2"
                        value={formData.services.description}
                        onChange={(e) => handleChange('services', 'description', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
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
              Save All Changes
            </button>
        </div>

      </form>
    </div>
  );
}