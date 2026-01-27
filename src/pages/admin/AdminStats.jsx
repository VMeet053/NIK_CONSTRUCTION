import { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { useToast } from '../../context/ToastContext';
import AdminTable from '../../components/AdminTable';
import AdminPageHeader from '../../components/AdminPageHeader';

export default function AdminStats() {
  const { stats, updateStats } = useContent();
  const { showToast } = useToast();
  const [editingStat, setEditingStat] = useState(null);

  const handleStatEdit = (item) => {
    setEditingStat({ ...item });
  };

  const handleStatSave = (e) => {
    e.preventDefault();
    try {
      updateStats(editingStat.id, editingStat);
      setEditingStat(null);
      showToast('Statistic updated successfully', 'success');
    } catch (error) {
      showToast('Failed to update statistic', 'error');
    }
  };

  const statColumns = [
    { key: 'number', label: 'Number' },
    { key: 'label', label: 'Label' },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Company Stats Management" 
        stats={`${stats.length} Stats Displayed`}
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
      />
      
      <AdminTable 
        columns={statColumns}
        data={stats}
        onEdit={handleStatEdit}
        actions={true}
      />

      {/* Edit Stat Modal */}
      {editingStat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg transform transition-all scale-100">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Edit Statistic</h3>
            <form onSubmit={handleStatSave} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Number</label>
                <input
                  type="text"
                  value={editingStat.number}
                  onChange={(e) => setEditingStat({ ...editingStat, number: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Label</label>
                <input
                  type="text"
                  value={editingStat.label}
                  onChange={(e) => setEditingStat({ ...editingStat, label: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                />
              </div>
              <div className="flex justify-end gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setEditingStat(null)}
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