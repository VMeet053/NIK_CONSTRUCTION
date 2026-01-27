import React from 'react';
import { useContent } from '../../context/ContentContext';
import AdminTable from '../../components/AdminTable';

export default function ProjectsAdmin() {
  const { projects, updateProject, deleteProject, addProject, updateImage } = useContent();

  const columns = [
    { key: 'image', label: 'Image', type: 'image' },
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category' },
    { key: 'description', label: 'Description' },
  ];

  const handleImageChange = (item) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        updateImage('projects', item.id, file);
      }
    };
    input.click();
  };

  const handleEdit = (item) => {
    const newTitle = prompt("Enter new title:", item.title);
    if (newTitle !== null) {
      updateProject(item.id, { title: newTitle });
    }
  };

  const handleDelete = (item) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      deleteProject(item.id);
    }
  };

  const handleAdd = () => {
    const title = prompt("Enter project title:");
    if (title) {
      addProject({
        title,
        category: 'Residential',
        description: 'New Project',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Projects Management</h2>
        <button 
          onClick={handleAdd}
          className="bg-blue text-white px-4 py-2 rounded-lg hover:bg-blue/90 transition-colors"
        >
          Add Project
        </button>
      </div>
      
      <AdminTable 
        columns={columns} 
        data={projects} 
        onEdit={handleEdit}
        onDelete={handleDelete}
        onImageChange={handleImageChange}
      />
    </div>
  );
}
