import { useContent } from '../../context/ContentContext';
import AdminPageHeader from '../../components/AdminPageHeader';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { stats, projects, services, articles, testimonials } = useContent();

  const overviewStats = [
    { label: 'Total Projects', value: projects.length, color: 'bg-blue-500' },
    { label: 'Services', value: services.length, color: 'bg-green-500' },
    { label: 'Blog Posts', value: articles.length, color: 'bg-purple-500' },
    { label: 'Testimonials', value: testimonials.length, color: 'bg-amber-500' },
  ];

  const recentProjects = [...projects].reverse().slice(0, 5);
  const recentArticles = [...articles].reverse().slice(0, 5);
  const recentTestimonials = [...testimonials].reverse().slice(0, 3);

  return (
    <div className="space-y-8">
      <AdminPageHeader 
        title="Dashboard Overview" 
        stats="Welcome to the Kirti Construction Admin Panel"
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 font-medium text-sm">{stat.label}</h3>
              <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <h3 className="text-xl font-bold text-gray-800">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/admin/projects" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          </div>
          <div>
            <h4 className="font-bold text-gray-800">Manage Projects</h4>
            <p className="text-xs text-gray-500 mt-1">Add or edit projects</p>
          </div>
        </Link>
        
        <Link to="/admin/services" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-lg group-hover:bg-green-600 group-hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <div>
            <h4 className="font-bold text-gray-800">Services</h4>
            <p className="text-xs text-gray-500 mt-1">Update service offerings</p>
          </div>
        </Link>

        <Link to="/admin/blog" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
          </div>
          <div>
            <h4 className="font-bold text-gray-800">Blog Posts</h4>
            <p className="text-xs text-gray-500 mt-1">Write new articles</p>
          </div>
        </Link>

        <Link to="/admin/testimonials" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg group-hover:bg-amber-600 group-hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          </div>
          <div>
            <h4 className="font-bold text-gray-800">Testimonials</h4>
            <p className="text-xs text-gray-500 mt-1">Manage client reviews</p>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Projects */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Recent Projects</h3>
            <Link to="/admin/projects" className="text-sm text-amber-500 hover:text-amber-600 font-medium">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentProjects.map(project => (
                  <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        {project.image ? (
                          <img src={project.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                        <span className="font-medium text-gray-900">{project.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.location}</td>
                  </tr>
                ))}
                {recentProjects.length === 0 && (
                  <tr>
                    <td colSpan="3" className="px-6 py-8 text-center text-gray-500">No projects found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Articles */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Latest Articles</h3>
            <Link to="/admin/blog" className="text-sm text-amber-500 hover:text-amber-600 font-medium">View All</Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentArticles.map(article => (
              <div key={article.id} className="p-4 hover:bg-gray-50 transition-colors group">
                <h4 className="font-medium text-gray-900 mb-1 group-hover:text-amber-600 transition-colors line-clamp-1">{article.title}</h4>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded-full">{article.category}</span>
                </div>
              </div>
            ))}
            {recentArticles.length === 0 && (
              <div className="p-8 text-center text-gray-500">No articles found</div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Testimonials */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">Recent Testimonials</h3>
          <Link to="/admin/testimonials" className="text-sm text-amber-500 hover:text-amber-600 font-medium">View All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentTestimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover border-2 border-amber-100" />
                <div>
                  <h4 className="font-bold text-gray-900 line-clamp-1">{testimonial.name}</h4>
                  <p className="text-xs text-gray-500 line-clamp-1">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm italic line-clamp-3">"{testimonial.quote}"</p>
              <div className="flex text-amber-400 text-sm mt-auto">
                {[...Array(5)].map((_, i) => (
                   <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < testimonial.rating ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                   </svg>
                ))}
              </div>
            </div>
          ))}
          {recentTestimonials.length === 0 && (
            <div className="col-span-3 text-center py-8 text-gray-500 bg-white rounded-xl border border-gray-100">No testimonials found</div>
          )}
        </div>
      </div>
    </div>
  );
}