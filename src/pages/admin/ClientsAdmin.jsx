import React from 'react';
import { useContent } from '../../context/ContentContext';
import AdminTable from '../../components/AdminTable';

export default function ClientsAdmin() {
  const { clients, updateClient, deleteClient, addClient, updateImage } = useContent();

  const columns = [
    { key: 'logo', label: 'Logo', type: 'image' },
    { key: 'name', label: 'Name' },
  ];

  const handleImageChange = (item) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        updateImage('clients', item.id, file);
      }
    };
    input.click();
  };

  const handleEdit = (item) => {
    const newName = prompt("Enter new client name:", item.name);
    if (newName !== null) {
      updateClient(item.id, { name: newName });
    }
  };

  const handleDelete = (item) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      deleteClient(item.id);
    }
  };

  const handleAdd = () => {
    const name = prompt("Enter client name:");
    if (name) {
      addClient({
        name,
        logo: 'https://via.placeholder.com/150'
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Clients Management</h2>
        <button 
          onClick={handleAdd}
          className="bg-blue text-white px-4 py-2 rounded-lg hover:bg-blue/90 transition-colors"
        >
          Add Client
        </button>
      </div>
      
      <AdminTable 
        columns={columns} 
        data={clients} 
        onEdit={handleEdit}
        onDelete={handleDelete}
        onImageChange={handleImageChange}
      />
    </div>
  );
}
