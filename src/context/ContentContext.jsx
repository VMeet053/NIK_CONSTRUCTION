import { createContext, useContext, useState, useEffect } from 'react';

const ContentContext = createContext();

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

export const ContentProvider = ({ children }) => {
  // --- Home Page Data ---
  const [heroContent, setHeroContent] = useState([
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1920&auto=format&fit=crop',
      alt: 'Amer Fort architecture details',
      text: "Guardians of the Built World"
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920&auto=format&fit=crop',
      alt: 'Taj Mahal detailed view',
      text: "Restoring Iconic Legacies"
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1585506942812-e72b29cef00c?w=1920&auto=format&fit=crop',
      alt: 'Hawa Mahal Jaipur',
      text: "Preserving Cultural Identity"
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1627889345479-0524cb562391?w=1920&auto=format&fit=crop',
      alt: 'Rajasthan Fort walls',
      text: "Engineering for Eternity"
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1920&auto=format&fit=crop',
      alt: 'Goa Church heritage',
      text: "Revitalizing Sacred Spaces"
    },
  ]);

  const [stats, setStats] = useState([
    { id: 1, number: '38+', label: 'Years Experience' },
    { id: 2, number: '120+', label: 'Projects Completed' },
    { id: 3, number: '22', label: 'Cities' },
    { id: 4, number: '15', label: 'Awards' },
  ]);

  // --- Projects Data ---
  // Merged "projects" from Home.jsx and "allProjects" from Projects.jsx
  // We'll use a single source of truth for projects.
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Temple Precinct Masterplan',
      category: 'Religious',
      location: 'Western India',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1548625361-98822605e55d?q=80&w=1600&auto=format&fit=crop',
      history: 'Masterplanning that reintegrates the historic temple complex with its urban fabric.',
      summary: 'Masterplanning and urban reintegration.',
      featured: true
    },
    {
      id: 2,
      title: 'Civic Archive Hall',
      category: 'Public',
      location: 'Gulf Region',
      year: '2022',
      image: 'https://images.unsplash.com/photo-1481253127861-534498168948?q=80&w=1600&auto=format&fit=crop',
      history: 'Converting a disused facility into a state-of-the-art archive.',
      summary: 'Adaptive reuse for civic purposes.',
      featured: true
    },
    {
      id: 3,
      title: 'Courtyard House Restoration',
      category: 'Residential',
      location: 'South India',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
      history: 'Restoring a traditional courtyard house to its former glory.',
      summary: 'Residential restoration and conservation.',
      featured: true
    },
    {
      id: 4,
      title: 'Fort Stabilization',
      category: 'Forts',
      location: 'Rajasthan',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1572025442641-535c4b36f999?q=80&w=1600&auto=format&fit=crop',
      history: 'Structural stabilization of 16th-century fortification walls.',
      summary: 'Structural stitching with reversible anchors.',
      featured: true
    },
    {
      id: 5,
      title: 'Waterfront Ghats',
      category: 'Public',
      location: 'River Town',
      year: '2022',
      image: 'https://images.unsplash.com/photo-1596401057633-56565269651a?q=80&w=1600&auto=format&fit=crop',
      history: 'Restoration of ghats restoring stone and ritual life.',
      summary: 'Stepwells and ghats reconnection.',
      featured: true
    },
    {
      id: 6,
      title: 'Amer Fort Conservation',
      category: 'Forts',
      location: 'Jaipur, Rajasthan',
      year: '2022',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1600',
      history: 'Built in 1592 by Raja Man Singh, Amer Fort is a UNESCO World Heritage site known for its artistic style. Our work focused on the delicate restoration of the Sheesh Mahal (Mirror Palace) and structural stabilization of the Ganesh Pol foundering foundations.',
      summary: 'Structural stitching with reversible anchors to secure a windswept fort edge.',
      featured: false
    },
    {
      id: 7,
      title: 'Varanasi Ghats Restoration',
      category: 'Public',
      location: 'Varanasi, UP',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1600',
      history: 'The ancient ghats of Varanasi face annual flooding and immense pilgrim footfall. This project involved mapping the submergence zones and restoring the 18th-century sandstone pavilions using traditional lime mortar techniques.',
      summary: 'Stepwells, ghats, and shaded pavilions reconnected for daily ritual.',
      featured: false
    },
    {
      id: 8,
      title: 'Chettinad Haveli',
      category: 'Residential',
      location: 'Karaikudi, Tamil Nadu',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1622308644420-d3de5903b381?w=1600',
      history: 'A 19th-century merchant mansion with Athangudi tiles and Burma teak pillars. The restoration involved reviving the central courtyard drainage system and conserving the fading fresco paintings on the facade.',
      summary: 'Traditional timber work and lime plasters revived for a multigenerational home.',
      featured: false
    },
    {
      id: 9,
      title: 'City Palace Archives',
      category: 'Public',
      location: 'Udaipur, Rajasthan',
      year: '2021',
      image: 'https://images.unsplash.com/photo-1590766940554-634a7ed01478?w=1600',
      history: 'Converting a disused armory wing into a state-of-the-art climate-controlled archive. We balanced the need for modern HVAC systems with the preservation of the original stone masonry walls.',
      summary: 'A layered archive that balances daylight, conservation labs, and civic gathering.',
      featured: false
    },
    {
      id: 10,
      title: 'Goa Church Preservation',
      category: 'Religious',
      location: 'Old Goa',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1600',
      history: 'This Baroque-style church required urgent intervention for laterite stone weathering. Our team developed a breathable lime-based plaster mix that matched the original 17th-century composition.',
      summary: 'Bio-cleaning and salt removal for a UNESCO Heritage church facade.',
      featured: false
    },
  ]);

  // --- Services Data ---
  const [services, setServices] = useState([
    {
      id: 1,
      title: 'Heritage Conservation',
      description: 'Comprehensive conservation strategies integrating archival research, material science, and community engagement.',
      details: ['Structural Stabilization', 'Material Conservation', 'Archival Research'],
      iconType: 'conservation',
      image: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?w=1200'
    },
    {
      id: 2,
      title: 'Architectural Restoration',
      description: 'Precise, reversible interventions for historic structures across multiple eras and typologies.',
      details: ['Facade Restoration', 'Traditional Lime Plaster', 'Stone Masonry'],
      iconType: 'restoration',
      image: 'https://images.unsplash.com/photo-1548761208-b7896a6ff225?w=1200'
    },
    {
      id: 3,
      title: 'Research & Documentation',
      description: 'Museum-grade surveys, mapping, and narrative documentation for institutions and private estates.',
      details: ['3D Laser Scanning', 'Historical Surveys', 'Condition Assessment'],
      iconType: 'research',
      image: 'https://images.unsplash.com/photo-1581093458791-9f302e683837?w=1200'
    },
    {
      id: 4,
      title: 'Adaptive Reuse',
      description: 'Transforming historic buildings for contemporary use while preserving their essential character.',
      details: ['Feasibility Studies', 'Space Planning', 'Modern Integration'],
      iconType: 'reuse',
      image: 'https://images.unsplash.com/photo-1566373752520-2fdef87df038?w=1200'
    },
    {
      id: 5,
      title: 'Consultancy',
      description: 'Expert advice on conservation strategies, material selection, regulatory compliance, and project management.',
      details: ['Project Management', 'Regulatory Approvals', 'Grant Applications'],
      iconType: 'consultancy',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200' // Added placeholder image
    }
  ]);

  // --- Testimonials Data ---
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: 'Dr. Priya Sharma',
      role: 'Director, Heritage Trust',
      location: 'Mumbai',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop',
      quote: 'Verdantia transformed our temple precinct with incredible sensitivity. Their approach to conservation respects both the historic fabric and contemporary needs.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      role: 'Municipal Commissioner',
      location: 'Ahmedabad',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&auto=format&fit=crop',
      quote: 'The restoration of our civic archive hall exceeded expectations. The team\'s attention to detail and archival research was exceptional.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Anita Desai',
      role: 'Private Estate Owner',
      location: 'Chennai',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop',
      quote: 'Working with Verdantia on our courtyard house restoration was a privilege. They understood the soul of the building and brought it back to life.',
      rating: 5,
    },
    {
      id: 4,
      name: 'Colonel Vikram Singh',
      role: 'Fort Conservation Authority',
      location: 'Rajasthan',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop',
      quote: 'The fort stabilization project was executed with military precision. Their structural interventions are invisible yet effective.',
      rating: 5,
    },
  ]);

  // --- Clients Data ---
  const [clients, setClients] = useState([
    { id: 1, name: 'Heritage Trust', logo: '🏛️', category: 'NGO' },
    { id: 2, name: 'Ministry of Culture', logo: '🏛️', category: 'Government' },
    { id: 3, name: 'UNESCO', logo: '🌍', category: 'International' },
    { id: 4, name: 'Indian National Trust', logo: '🏛️', category: 'NGO' },
    { id: 5, name: 'Municipal Corporation', logo: '🏛️', category: 'Government' },
    { id: 6, name: 'Private Estates', logo: '🏛️', category: 'Private' },
    { id: 7, name: 'Temple Trusts', logo: '🕉️', category: 'Religious' },
    { id: 8, name: 'Museum Authority', logo: '🏛️', category: 'Institution' },
  ]);

  // --- Team/About Data ---
  const [aboutValues, setAboutValues] = useState([
    {
      id: 1,
      title: 'Precision',
      desc: 'We measure success in millimeters and centuries. Every intervention is documented and reversible.',
      iconType: 'precision'
    },
    {
      id: 2,
      title: 'Respect',
      desc: 'Architecture is an elder. We listen to its cracks, its weathering, and its silence before we speak.',
      iconType: 'respect'
    },
    {
      id: 3,
      title: 'Innovation',
      desc: 'We use lasers to map the past and code to archive the future. Technology serves tradition.',
      iconType: 'innovation'
    }
  ]);

  // --- Achievement Stats Data ---
  const [achievementStats, setAchievementStats] = useState([
    { id: 1, number: '15', label: 'Intl. Awards' },
    { id: 2, number: '38+', label: 'Years Active' },
    { id: 3, number: '120+', label: 'Heritage Sites' },
    { id: 4, number: '27', label: 'Publications' },
  ]);

  // --- Certifications Data ---
  const [certifications, setCertifications] = useState([
    { id: 1, text: 'ISO 9001:2015 Quality Management' },
    { id: 2, text: 'Grade A Conservation License (ASI)' },
    { id: 3, text: 'Member: Association for Preservation Technology' },
    { id: 4, text: 'Licensed Structural Heritage Consultants' },
  ]);

  // --- Achievements/Awards Data ---
  const [awards, setAwards] = useState([
    {
      id: 1,
      title: 'UNESCO Asia-Pacific Heritage Award',
      category: 'Distinction of Excellence',
      year: '2023',
      project: 'Temple Precinct Masterplan',
      location: 'Western India',
      citation: 'For the sensitive masterplanning that reintegrates the historic temple complex with its urban fabric, prioritizing pilgrim experience while restoring architectural integrity.',
      image: 'https://images.unsplash.com/photo-1562916132-841bc6c47866?w=800',
      issuer: 'UNESCO Bangkok',
    },
    {
      id: 2,
      title: 'Indian National Trust Award',
      category: 'Excellence in Conservation',
      year: '2022',
      project: 'Civic Archive Hall',
      location: 'New Delhi',
      citation: 'A masterclass in adaptive reuse, transforming a derelict colonial storage facility into a state-of-the-art civic archive without compromising the original structural narrative.',
      image: 'https://images.unsplash.com/photo-1572978351545-2f15949d0685?w=800',
      issuer: 'INTACH',
    },
    {
      id: 3,
      title: 'ICOMOS Global Citation',
      category: 'Technical Achievement',
      year: '2021',
      project: 'Fort Stabilization Initiative',
      location: 'Rajasthan',
      citation: 'Recognized for the innovative use of traditional lime-pozzolana mortars in high-stress structural stabilization of 16th-century fortification walls.',
      image: 'https://images.unsplash.com/photo-1590766940554-634a7ed01478?w=800',
      issuer: 'ICOMOS International',
    },
    {
      id: 4,
      title: 'Architecture Review: New Old',
      category: 'Shortlist: Rebirth',
      year: '2020',
      project: 'Waterfront Ghats',
      location: 'Varanasi',
      citation: 'An intervention that feels invisible yet essential. The restoration of the ghats restores not just stone, but the daily ritual life of the riverfront.',
      image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800',
      issuer: 'The Architectural Review',
    },
  ]);

  // --- Blog/Articles Data ---
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: 'The Future of Heritage Conservation',
      category: 'Innovation',
      excerpt: 'Exploring modern techniques and traditional craft in contemporary conservation practice. How we bridge the gap between old and new.',
      date: 'March 15, 2024',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1200',
      featured: true,
    },
    {
      id: 2,
      title: 'Material Science in Historic Buildings',
      category: 'Technology',
      excerpt: 'How advanced diagnostics help us understand and preserve historic fabric with precision and care.',
      date: 'February 28, 2024',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a8?w=800',
      featured: false,
    },
    {
      id: 3,
      title: 'Community Engagement in Conservation',
      category: 'Social Impact',
      excerpt: 'The role of local communities in preserving cultural heritage for future generations.',
      date: 'January 10, 2024',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800',
      featured: false,
    },
    {
      id: 4,
      title: 'Adaptive Reuse: Principles and Practice',
      category: 'Architecture',
      excerpt: 'Balancing contemporary needs with historic integrity in adaptive reuse projects.',
      date: 'December 05, 2023',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800',
      featured: false,
    },
  ]);

  // --- Process Steps Data ---
  const [processSteps, setProcessSteps] = useState([
    { num: '01', title: 'Survey', text: 'Detailed documentation using photogrammetry and laser scanning.' },
    { num: '02', title: 'Analysis', text: 'Material testing and structural assessment of the historic fabric.' },
    { num: '03', title: 'Strategy', text: 'Developing reversible intervention plans aligned with charters.' },
    { num: '04', title: 'Execution', text: 'On-site restoration by master craftsmen under supervision.' },
  ]);

  // --- Actions/Setters ---
  const addProject = (project) => {
    setProjects(prev => [...prev, { ...project, id: Date.now() }]);
  };

  const updateProject = (id, updatedProject) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updatedProject } : p));
  };

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const addService = (service) => {
    setServices(prev => [...prev, { ...service, id: Date.now() }]);
  };

  const updateService = (id, updatedService) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updatedService } : s));
  };

  const deleteService = (id) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  // Generic update functions for other states
  const updateHeroContent = (id, data) => setHeroContent(prev => prev.map(item => item.id === id ? { ...item, ...data } : item));
  const updateStats = (id, data) => setStats(prev => prev.map(item => item.id === id ? { ...item, ...data } : item));
  const updateTestimonial = (id, data) => setTestimonials(prev => prev.map(item => item.id === id ? { ...item, ...data } : item));
  const updateClient = (id, data) => setClients(prev => prev.map(item => item.id === id ? { ...item, ...data } : item));
  const updateArticle = (id, data) => setArticles(prev => prev.map(item => item.id === id ? { ...item, ...data } : item));

  // Image update helper (mock implementation since we don't have backend)
  const updateImage = (section, id, newImageUrl) => {
    switch(section) {
      case 'hero':
        updateHeroContent(id, { src: newImageUrl });
        break;
      case 'projects':
        updateProject(id, { image: newImageUrl });
        break;
      case 'services':
        updateService(id, { image: newImageUrl });
        break;
      case 'testimonials':
        updateTestimonial(id, { image: newImageUrl });
        break;
      case 'awards':
        setAwards(prev => prev.map(item => item.id === id ? { ...item, image: newImageUrl } : item));
        break;
      case 'articles':
        updateArticle(id, { image: newImageUrl });
        break;
      default:
        console.warn('Unknown section for image update:', section);
    }
  };

  return (
    <ContentContext.Provider value={{
      heroContent, setHeroContent, updateHeroContent,
      stats, setStats, updateStats,
      projects, setProjects, addProject, updateProject, deleteProject,
      services, setServices, addService, updateService, deleteService,
      testimonials, setTestimonials, updateTestimonial,
      clients, setClients, updateClient,
      aboutValues, setAboutValues,
      processSteps, setProcessSteps,
      achievementStats, setAchievementStats,
      awards, setAwards,
      certifications, setCertifications,
      articles, setArticles, updateArticle,
      updateImage
    }}>
      {children}
    </ContentContext.Provider>
  );
};
