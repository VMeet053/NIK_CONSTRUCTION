import React from 'react';
import { useContent } from '../../context/ContentContext';
import AdminTable from '../../components/AdminTable';

export default function TestimonialsAdmin() {
  const { testimonials, updateTestimonial, deleteTestimonial, addTestimonial, updateImage } = useContent();

  const columns = [
    { key: 'image', label: 'Photo', type: 'image' },
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
    { key: 'text', label: 'Testimonial' },
  ];

  const handleImageChange = (item) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          updateImage('testimonials', item.id, reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleEdit = (item) => {
    const newName = prompt("Enter new name:", item.name);
    if (newName !== null) {
      updateTestimonial(item.id, { name: newName });
    }
  };

  const handleDelete = (item) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      deleteTestimonial(item.id);
    }
  };

  const handleAdd = () => {
    const name = prompt("Enter client name:");
    if (name) {
      addTestimonial({
        name,
        role: 'Client',
        text: 'Great work!',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Testimonials Management</h2>
        <button 
          onClick={handleAdd}
          className="bg-blue text-white px-4 py-2 rounded-lg hover:bg-blue/90 transition-colors"
        >
          Add Testimonial
        </button>
      </div>
      
      <AdminTable 
        columns={columns} 
        data={testimonials} 
        onEdit={handleEdit}
        onDelete={handleDelete}
        onImageChange={handleImageChange}
      />
    </div>
  );
}
