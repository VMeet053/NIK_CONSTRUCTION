import React from 'react';
import { useContent } from '../../context/ContentContext';
import AdminTable from '../../components/AdminTable';

export default function ServicesAdmin() {
  const { services, updateService, deleteService, addService, updateImage } = useContent();

  const columns = [
    { key: 'image', label: 'Icon/Image', type: 'image' },
    { key: 'title', label: 'Title' },
    { key: 'description', label: 'Description' },
  ];

  const handleImageChange = (item) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        updateImage('services', item.id, file);
      }
    };
    input.click();
  };

  const handleEdit = (item) => {
    const newTitle = prompt("Enter new title:", item.title);
    if (newTitle !== null) {
      updateService(item.id, { title: newTitle });
    }
  };

  const handleDelete = (item) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      deleteService(item.id);
    }
  };

  const handleAdd = () => {
    const title = prompt("Enter service title:");
    if (title) {
      addService({
        title,
        description: 'New Service Description',
        image: 'https://images.unsplash.com/photo-1581094794329-cd675335442f'
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Services Management</h2>
        <button 
          onClick={handleAdd}
          className="bg-blue text-white px-4 py-2 rounded-lg hover:bg-blue/90 transition-colors"
        >
          Add Service
        </button>
      </div>
      
      <AdminTable 
        columns={columns} 
        data={services} 
        onEdit={handleEdit}
        onDelete={handleDelete}
        onImageChange={handleImageChange}
      />
    </div>
  );
}
