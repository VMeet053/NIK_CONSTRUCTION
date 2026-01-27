import { createContext, useContext, useState, useEffect } from 'react';

const ContentContext = createContext();
const API_URL = 'http://localhost:5000/api/content';

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

export const ContentProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define states
  const [heroContent, setHeroContentState] = useState([]);
  const [stats, setStatsState] = useState([]);
  const [projects, setProjectsState] = useState([]);
  const [aboutContent, setAboutContentState] = useState({});
  const [clients, setClientsState] = useState([]);
  const [services, setServicesState] = useState([]);
  const [testimonials, setTestimonialsState] = useState([]);
  const [aboutValues, setAboutValuesState] = useState([]);
  const [achievementStats, setAchievementStatsState] = useState([]);
  const [certifications, setCertificationsState] = useState([]);
  const [awards, setAwardsState] = useState([]);
  const [articles, setArticlesState] = useState([]);
  const [processSteps, setProcessStepsState] = useState([]);
  const [contactInfo, setContactInfoState] = useState({});
  const [contactPageContent, setContactPageContentState] = useState({});
  const [projectsPageContent, setProjectsPageContentState] = useState({});
  const [servicesPageContent, setServicesPageContentState] = useState({});
  const [homeGeneral, setHomeGeneralState] = useState({});
  const [footerContent, setFooterContentState] = useState({});

  // Fetch all data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();

        // Update states
        if (data.heroContent) setHeroContentState(data.heroContent);
        if (data.stats) setStatsState(data.stats);
        if (data.projects) setProjectsState(data.projects);
        if (data.aboutContent) setAboutContentState(data.aboutContent);
        if (data.clients) setClientsState(data.clients);
        if (data.services) setServicesState(data.services);
        if (data.testimonials) setTestimonialsState(data.testimonials);
        if (data.aboutValues) setAboutValuesState(data.aboutValues);
        if (data.achievementStats) setAchievementStatsState(data.achievementStats);
        if (data.certifications) setCertificationsState(data.certifications);
        if (data.awards) setAwardsState(data.awards);
        if (data.articles) setArticlesState(data.articles);
        if (data.processSteps) setProcessStepsState(data.processSteps);
        if (data.contactInfo) setContactInfoState(data.contactInfo);
        if (data.contactPageContent) setContactPageContentState(data.contactPageContent);
        if (data.projectsPageContent) setProjectsPageContentState(data.projectsPageContent);
        if (data.servicesPageContent) setServicesPageContentState(data.servicesPageContent);
        if (data.homeGeneral) setHomeGeneralState(data.homeGeneral);
        if (data.footerContent) setFooterContentState(data.footerContent);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching content:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Generic update function
  const updateContent = async (key, newData) => {
    // Optimistic update
    switch (key) {
        case 'heroContent': setHeroContentState(newData); break;
        case 'stats': setStatsState(newData); break;
        case 'projects': setProjectsState(newData); break;
        case 'aboutContent': setAboutContentState(newData); break;
        case 'clients': setClientsState(newData); break;
        case 'services': setServicesState(newData); break;
        case 'testimonials': setTestimonialsState(newData); break;
        case 'aboutValues': setAboutValuesState(newData); break;
        case 'achievementStats': setAchievementStatsState(newData); break;
        case 'certifications': setCertificationsState(newData); break;
        case 'awards': setAwardsState(newData); break;
        case 'articles': setArticlesState(newData); break;
        case 'processSteps': setProcessStepsState(newData); break;
        case 'contactInfo': setContactInfoState(newData); break;
        case 'contactPageContent': setContactPageContentState(newData); break;
        case 'projectsPageContent': setProjectsPageContentState(newData); break;
        case 'servicesPageContent': setServicesPageContentState(newData); break;
        case 'homeGeneral': setHomeGeneralState(newData); break;
        case 'footerContent': setFooterContentState(newData); break;
    }

    try {
      const response = await fetch(`${API_URL}/${key}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
      if (!response.ok) throw new Error(`Failed to update ${key}`);
    } catch (err) {
      console.error(`Error updating ${key}:`, err);
      alert(`Failed to save changes to ${key}. Please try again.`);
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await fetch('http://localhost:5000/api/upload', {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error('Upload failed');
    const data = await response.json();
    return data.url;
  };

  const updateImage = async (sectionKey, itemId, fileOrUrl) => {
    try {
        let imageUrl = fileOrUrl;
        if (typeof fileOrUrl !== 'string') {
             imageUrl = await uploadFile(fileOrUrl);
        }

        if (sectionKey === 'heroContent' || sectionKey === 'hero') {
            const newData = heroContent.map(item => 
                item.id === itemId ? { ...item, src: imageUrl } : item
            );
            updateContent('heroContent', newData);
        } else if (sectionKey === 'clients') {
            const newData = clients.map(item => 
                item.id === itemId ? { ...item, logo: imageUrl } : item
            );
            updateContent('clients', newData);
        } else if (sectionKey === 'services') {
             const newData = services.map(item => 
                item.id === itemId ? { ...item, image: imageUrl } : item
            );
            updateContent('services', newData);
        } else if (sectionKey === 'projects') {
             const newData = projects.map(item => 
                item.id === itemId ? { ...item, image: imageUrl } : item
            );
            updateContent('projects', newData);
        } else if (sectionKey === 'testimonials') {
             const newData = testimonials.map(item => 
                item.id === itemId ? { ...item, image: imageUrl } : item
            );
            updateContent('testimonials', newData);
        } else if (sectionKey === 'articles') {
             const newData = articles.map(item => 
                item.id === itemId ? { ...item, image: imageUrl } : item
            );
            updateContent('articles', newData);
        }
    } catch (error) {
        console.error("Error updating image:", error);
        throw error;
    }
  };

  // CRUD Helpers
  const createCRUD = (state, setState, key) => ({
    add: (item) => {
      const newItem = { ...item, id: Date.now() };
      const newData = [...state, newItem];
      updateContent(key, newData);
    },
    update: (id, item) => {
      const newData = state.map(i => i.id === id ? item : i);
      updateContent(key, newData);
    },
    delete: (id) => {
      const newData = state.filter(i => i.id !== id);
      updateContent(key, newData);
    }
  });

  const value = {
    heroContent, 
    setHeroContent: (data) => updateContent('heroContent', data),
    addHeroContent: (item) => createCRUD(heroContent, setHeroContentState, 'heroContent').add(item),
    updateHeroContent: (id, item) => createCRUD(heroContent, setHeroContentState, 'heroContent').update(id, item),
    deleteHeroContent: (id) => createCRUD(heroContent, setHeroContentState, 'heroContent').delete(id),
    
    stats, 
    setStats: (data) => updateContent('stats', data),
    updateStats: (id, item) => {
        const newData = stats.map(i => i.id === id ? item : i);
        updateContent('stats', newData);
    },

    projects, 
    setProjects: (data) => updateContent('projects', data),
    addProject: (item) => createCRUD(projects, setProjectsState, 'projects').add(item),
    updateProject: (id, item) => createCRUD(projects, setProjectsState, 'projects').update(id, item),
    deleteProject: (id) => createCRUD(projects, setProjectsState, 'projects').delete(id),

    aboutContent, setAboutContent: (data) => updateContent('aboutContent', data),
    
    clients, 
    setClients: (data) => updateContent('clients', data),
    addClient: (item) => createCRUD(clients, setClientsState, 'clients').add(item),
    updateClient: (id, item) => createCRUD(clients, setClientsState, 'clients').update(id, item),
    deleteClient: (id) => createCRUD(clients, setClientsState, 'clients').delete(id),

    services, 
    setServices: (data) => updateContent('services', data),
    addService: (item) => createCRUD(services, setServicesState, 'services').add(item),
    updateService: (id, item) => createCRUD(services, setServicesState, 'services').update(id, item),
    deleteService: (id) => createCRUD(services, setServicesState, 'services').delete(id),

    testimonials, 
    setTestimonials: (data) => updateContent('testimonials', data),
    addTestimonial: (item) => createCRUD(testimonials, setTestimonialsState, 'testimonials').add(item),
    updateTestimonial: (id, item) => createCRUD(testimonials, setTestimonialsState, 'testimonials').update(id, item),
    deleteTestimonial: (id) => createCRUD(testimonials, setTestimonialsState, 'testimonials').delete(id),

    aboutValues, setAboutValues: (data) => updateContent('aboutValues', data),
    achievementStats, setAchievementStats: (data) => updateContent('achievementStats', data),
    certifications, setCertifications: (data) => updateContent('certifications', data),
    awards, setAwards: (data) => updateContent('awards', data),
    articles, setArticles: (data) => updateContent('articles', data),
    processSteps, setProcessSteps: (data) => updateContent('processSteps', data),
    contactInfo, setContactInfo: (data) => updateContent('contactInfo', data),
    contactPageContent, setContactPageContent: (data) => updateContent('contactPageContent', data),
    updateContactPageContent: (section, data) => {
        const newData = { ...contactPageContent, [section]: data };
        updateContent('contactPageContent', newData);
    },
    projectsPageContent, updateProjectsPageContent: (section, data) => {
        // Handle partial updates like updateProjectsPageContent('hero', {...})
        // But the component uses it like: updateProjectsPageContent(section, formData[section])
        // Let's match the signature the component expects if it's special, or just expose a generic setter.
        // AdminProjectsGeneral uses: updateProjectsPageContent(section, formData[section])
        // which implies updateContent('projectsPageContent', { ...projectsPageContent, [section]: data })
        // Let's implement a helper here or just expose generic.
        
        // Actually, let's look at how updateContent works. It takes the WHOLE object for the key.
        // So if we want to update just 'hero' section of 'projectsPageContent', we need to merge it.
        const newData = { ...projectsPageContent, [section]: data };
        updateContent('projectsPageContent', newData);
    },
    servicesPageContent, updateServicesPageContent: (section, data) => {
        const newData = { ...servicesPageContent, [section]: data };
        updateContent('servicesPageContent', newData);
    },
    homeGeneral, setHomeGeneral: (data) => updateContent('homeGeneral', data),
    footerContent, setFooterContent: (data) => updateContent('footerContent', data),
    
    updateImage,
    uploadFile,
    
    loading,
    error
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};
