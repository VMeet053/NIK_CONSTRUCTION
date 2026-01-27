import { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';
import AdminTable from '../../components/AdminTable';
import AdminPageHeader from '../../components/AdminPageHeader';

export default function AdminHero() {
  const { heroContent, updateHeroContent, addHeroContent, deleteHeroContent, updateImage, uploadFile } = useContent();
  const { showToast } = useToast();
  const { confirm } = useConfirm();
  const [editingHero, setEditingHero] = useState(null);

  const handleAdd = () => {
    setEditingHero({
      src: '',
      alt: '',
      text: '',
      description: ''
    });
  };

  const handleDelete = async (item) => {
    if (await confirm('Are you sure you want to delete this slide?')) {
      try {
        deleteHeroContent(item.id);
        showToast('Slide deleted successfully', 'success');
      } catch (error) {
        console.error(error);
        showToast('Failed to delete slide', 'error');
      }
    }
  };

  const handleHeroEdit = (item) => {
    setEditingHero({ ...item });
  };

  const handleHeroSave = async (e) => {
    e.preventDefault();
    try {
      let updatedHero = { ...editingHero };
      
      // Upload image if a new file was selected
      if (updatedHero.newFile) {
        const url = await uploadFile(updatedHero.newFile);
        updatedHero.src = url;
        delete updatedHero.newFile;
      }

      if (updatedHero.id) {
        updateHeroContent(updatedHero.id, updatedHero);
        showToast('Hero slide updated successfully', 'success');
      } else {
        addHeroContent(updatedHero);
        showToast('New hero slide added successfully', 'success');
      }
      
      setEditingHero(null);
    } catch (error) {
      console.error(error);
      showToast('Failed to save hero slide', 'error');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingHero(prev => ({
          ...prev,
          src: reader.result, // Show preview immediately
          newFile: file       // Store file for upload on save
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHeroImageUpload = async (e, item) => {
    const file = e.target.files[0];
    if (file) {
      try {
        await updateImage('heroContent', item.id, file);
        showToast('Hero image updated successfully', 'success');
      } catch (error) {
        showToast('Failed to update hero image', 'error');
      }
    }
  };

  const heroColumns = [
    { key: 'src', label: 'Image', type: 'image' },
    { key: 'alt', label: 'Alt Text' },
    { key: 'text', label: 'Headline' },
    { key: 'description', label: 'Subtext' },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Hero Carousel Management" 
        stats={`${heroContent.length} Slides`}
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
      >
        <button 
          onClick={handleAdd}
          className="px-4 py-2 bg-amber-500 text-black rounded-lg hover:bg-amber-400 transition-colors flex items-center gap-2 shadow-md font-bold"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Slide
        </button>
      </AdminPageHeader>

      <AdminTable 
        columns={heroColumns}
        data={heroContent}
        onEdit={handleHeroEdit}
        onDelete={handleDelete}
        onImageChange={(item) => document.getElementById(`hero-upload-${item.id}`).click()}
        actions={true}
      />
      {/* Hidden File Inputs for Hero Images */}
      {heroContent.map(item => (
        <input
          key={item.id}
          id={`hero-upload-${item.id}`}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleHeroImageUpload(e, item)}
        />
      ))}

      {/* Edit Hero Modal */}
      {editingHero && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg transform transition-all scale-100">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">
              {editingHero.id ? 'Edit Hero Slide' : 'Add New Hero Slide'}
            </h3>
            <form onSubmit={handleHeroSave} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Slide Image</label>
                <div className="space-y-3">
                  {editingHero.src && (
                    <div className="relative h-40 w-full overflow-hidden rounded-lg border border-gray-200">
                      <img src={editingHero.src} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editingHero.src}
                      onChange={(e) => setEditingHero({ ...editingHero, src: e.target.value })}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                      placeholder="Image URL"
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
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Headline Text</label>
                <input
                  type="text"
                  value={editingHero.text}
                  onChange={(e) => setEditingHero({ ...editingHero, text: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subtext (Description)</label>
                <textarea
                  value={editingHero.description || ''}
                  onChange={(e) => setEditingHero({ ...editingHero, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Alt Text</label>
                <input
                  type="text"
                  value={editingHero.alt}
                  onChange={(e) => setEditingHero({ ...editingHero, alt: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                />
              </div>
              <div className="flex justify-end gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setEditingHero(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-amber-500 text-black rounded-lg hover:bg-amber-400 font-bold shadow-md hover:shadow-lg transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}