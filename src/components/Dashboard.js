import React, { useState } from 'react';
import { Inbox, Send, Users, Tag, BarChart2, Settings, CheckCircle, XCircle, Edit, MoreHorizontal, Upload, Download, Linkedin, Twitter, Globe } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('inbox');
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', company: 'ABC Corp', status: 'pending', valid: null },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', company: 'XYZ Inc', status: 'responded', valid: true },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', company: '123 LLC', status: 'pending', valid: null },
  ]);
  const [userProfile, setUserProfile] = useState({
    name: 'Alex User',
    role: 'Sales Manager',
    company: 'Tech Innovations Inc.',
    linkedIn: '',
    twitter: '',
    companyWebsite: '',
  });

  const tabs = [
    { id: 'inbox', name: 'Inbox', icon: Inbox },
    { id: 'sent', name: 'Sent', icon: Send },
    { id: 'contacts', name: 'Contacts', icon: Users },
    { id: 'categories', name: 'Categories', icon: Tag },
    { id: 'analytics', name: 'Analytics', icon: BarChart2 },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const handleValidation = (id, isValid) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, valid: isValid, status: isValid ? 'approved' : 'rejected' } : contact
    ));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'inbox':
        return <InboxContent />;
      case 'sent':
        return <SentContent />;
      case 'contacts':
        return <ContactsContent contacts={contacts} handleValidation={handleValidation} />;
      case 'categories':
        return <CategoriesContent />;
      case 'analytics':
        return <AnalyticsContent />;
      case 'settings':
        return <SettingsContent userProfile={userProfile} setUserProfile={setUserProfile} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-blue-600">Bounce Back</h1>
        </div>
        <nav>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center w-full px-4 py-2 text-left ${
                activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="mr-2 h-5 w-5" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto p-8">
        <h2 className="text-2xl font-semibold mb-4">{tabs.find(tab => tab.id === activeTab)?.name}</h2>
        {renderContent()}
      </div>
    </div>
  );
};

const InboxContent = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <Card title="Pending Responses" value="23" />
    <Card title="Auto-Responded Today" value="47" />
  </div>
);

const SentContent = () => (
  <div>
    <p>Sent emails content goes here</p>
  </div>
);

const ContactsContent = ({ contacts, handleValidation }) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-semibold">Contacts Management</h3>
      <div className="space-x-2">
        <Button variant="outline" size="sm">
          <Upload className="w-4 h-4 mr-2" />
          Import
        </Button>
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Email</th>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Company</th>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact) => (
          <tr key={contact.id}>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">{contact.name}</td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">{contact.email}</td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">{contact.company}</td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">{contact.status}</td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
              <div className="flex space-x-2">
                {contact.valid === null && (
                  <>
                    <Button variant="ghost" size="sm" onClick={() => handleValidation(contact.id, true)}>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleValidation(contact.id, false)}>
                      <XCircle className="w-4 h-4 text-red-500" />
                    </Button>
                  </>
                )}
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const CategoriesContent = () => (
  <div>
    <p>Categories management content goes here</p>
  </div>
);

const AnalyticsContent = () => (
  <div>
    <p>Analytics content goes here</p>
  </div>
);

const SettingsContent = ({ userProfile, setUserProfile }) => {
  const handleInputChange = (e) => {
    setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">User Profile Settings</h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" name="name" id="name" value={userProfile.name} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
          <input type="text" name="role" id="role" value={userProfile.role} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
          <input type="text" name="company" id="company" value={userProfile.company} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="linkedIn" className="block text-sm font-medium text-gray-700">LinkedIn Profile</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
              <Linkedin className="h-4 w-4" />
            </span>
            <input type="text" name="linkedIn" id="linkedIn" value={userProfile.linkedIn} onChange={handleInputChange} className="flex-1 block w-full rounded-none rounded-r-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
        </div>
        <div>
          <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">Twitter Profile</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
              <Twitter className="h-4 w-4" />
            </span>
            <input type="text" name="twitter" id="twitter" value={userProfile.twitter} onChange={handleInputChange} className="flex-1 block w-full rounded-none rounded-r-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
        </div>
        <div>
          <label htmlFor="companyWebsite" className="block text-sm font-medium text-gray-700">Company Website</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
              <Globe className="h-4 w-4" />
            </span>
            <input type="text" name="companyWebsite" id="companyWebsite" value={userProfile.companyWebsite} onChange={handleInputChange} className="flex-1 block w-full rounded-none rounded-r-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
        </div>
      </div>
      <div>
        <Button>Save Profile</Button>
      </div>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="px-4 py-5 sm:p-6">
      <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
      <dd className="mt-1 text-3xl font-semibold text-gray-900">{value}</dd>
    </div>
  </div>
);

const Button = ({ children, variant = "primary", size = "md", ...props }) => {
  const baseClasses = "inline-flex items-center border font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";
  const variantClasses = {
    primary: "border-transparent text-white bg-blue-600 hover:bg-blue-700",
    outline: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50",
    ghost: "border-transparent text-blue-600 bg-white hover:bg-blue-50",
  };
  const sizeClasses = {
    sm: "px-2.5 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Dashboard;