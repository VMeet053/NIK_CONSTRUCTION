import { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import AdminTable from '../../components/AdminTable';

export default function Dashboard() {
  const { heroContent, updateHeroContent, stats, updateStats, updateImage } = useContent();
  const [editingHero, setEditingHero] = useState(null);
  const [editingStat, setEditingStat] = useState(null);

  // --- Hero Section Handlers ---
  const handleHeroEdit = (item) => {
    setEditingHero({ ...item });
  };

  const handleHeroSave = (e) => {
    e.preventDefault();
    updateHeroContent(editingHero.id, editingHero);
    setEditingHero(null);
  };

  const handleHeroImageUpload = (e, item) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateImage('hero', item.id, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const heroColumns = [
    { key: 'src', label: 'Image', type: 'image' },
    { key: 'alt', label: 'Alt Text' },
    { key: 'text', label: 'Headline' },
  ];

  // --- Stats Section Handlers ---
  const handleStatEdit = (item) => {
    setEditingStat({ ...item });
  };

  const handleStatSave = (e) => {
    e.preventDefault();
    updateStats(editingStat.id, editingStat);
    setEditingStat(null);
  };

  const statColumns = [
    { key: 'number', label: 'Number' },
    { key: 'label', label: 'Label' },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-3xl font-bold text-indigo-900 mb-8">Dashboard Overview</h2>
        
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-indigo-800">Hero Carousel</h3>
          </div>
          
          <AdminTable 
            columns={heroColumns}
            data={heroContent}
            onEdit={handleHeroEdit}
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
        </div>

        {/* Stats Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Company Stats</h3>
          </div>
          
          <AdminTable 
            columns={statColumns}
            data={stats}
            onEdit={handleStatEdit}
            actions={true}
          />
        </div>
      </div>

      {/* Edit Hero Modal */}
      {editingHero && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
            <h3 className="text-2xl font-bold mb-6">Edit Hero Slide</h3>
            <form onSubmit={handleHeroSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Headline Text</label>
                <input
                  type="text"
                  value={editingHero.text}
                  onChange={(e) => setEditingHero({ ...editingHero, text: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue focus:border-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
                <input
                  type="text"
                  value={editingHero.alt}
                  onChange={(e) => setEditingHero({ ...editingHero, alt: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue focus:border-blue"
                />
              </div>
              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setEditingHero(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue text-white rounded-md hover:bg-blue/90 font-bold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Stat Modal */}
      {editingStat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
            <h3 className="text-2xl font-bold mb-6">Edit Statistic</h3>
            <form onSubmit={handleStatSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number</label>
                <input
                  type="text"
                  value={editingStat.number}
                  onChange={(e) => setEditingStat({ ...editingStat, number: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue focus:border-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                <input
                  type="text"
                  value={editingStat.label}
                  onChange={(e) => setEditingStat({ ...editingStat, label: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue focus:border-blue"
                />
              </div>
              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setEditingStat(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue text-white rounded-md hover:bg-blue/90 font-bold"
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
