'use client';

import React, { useState, useEffect } from 'react';
import { Provider } from '@/types/index';

export default function ManageProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [editedProvider, setEditedProvider] = useState<Provider | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [searchTerm, setSearchTerm] = useState('');
  const [newProvider, setNewProvider] = useState<Provider>({
    id: '',
    name: '',
    logo: '',
    description: '',
    website: '',
    locations: [],
    features: [],
    tags: []
  });
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    // Load all providers data
    setTimeout(() => {
      import('@/data/deals.json')
        .then(module => {
          const dealsData = module.default;
          // Extract unique providers from deals
          const uniqueProviders: Provider[] = [];
          const providerIds = new Set<string>();
          
          dealsData.forEach((deal: any) => {
            if (deal.provider && typeof deal.provider === 'object' && !providerIds.has(deal.provider.id)) {
              providerIds.add(deal.provider.id);
              
              const provider: Provider = {
                id: deal.provider.id,
                name: deal.provider.name,
                logo: deal.provider.logo || '',
                description: '',
                website: deal.link || '',
                locations: [deal.location] || [],
                features: [],
                tags: deal.tags || []
              };
              
              uniqueProviders.push(provider);
            }
          });
          
          setProviders(uniqueProviders);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error loading providers:', error);
          setLoading(false);
        });
    }, 500);
  }, []);

  const handleSelectProvider = (provider: Provider) => {
    setSelectedProvider(provider);
    setEditedProvider({ ...provider });
    setIsCreating(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, target: 'edit' | 'new') => {
    const { name, value } = e.target;
    
    if (target === 'edit' && editedProvider) {
      setEditedProvider(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          [name]: value
        };
      });
    } else if (target === 'new') {
      setNewProvider(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleArrayInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string, target: 'edit' | 'new') => {
    const values = e.target.value.split(',').map(item => item.trim()).filter(item => item);
    
    if (target === 'edit' && editedProvider) {
      setEditedProvider(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          [field]: values
        };
      });
    } else if (target === 'new') {
      setNewProvider(prev => ({
        ...prev,
        [field]: values
      }));
    }
  };

  const handleSave = async () => {
    if (!editedProvider) return;
    
    setSaveStatus('saving');
    
    try {
      // In a real application, this would be an API call
      // For now, we just update the local state
      setProviders(prev => prev.map(provider => 
        provider.id === editedProvider.id ? editedProvider : provider
      ));
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Error saving provider:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleCreate = async () => {
    if (!newProvider.name) {
      alert('Provider name is required');
      return;
    }
    
    setSaveStatus('saving');
    
    try {
      // Generate an ID if not provided
      const providerId = newProvider.id || `provider-${Date.now()}`;
      const providerToCreate = {
        ...newProvider,
        id: providerId
      };
      
      // In a real application, this would be an API call
      // For now, we just update the local state
      setProviders(prev => [...prev, providerToCreate]);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset the form
      setNewProvider({
        id: '',
        name: '',
        logo: '',
        description: '',
        website: '',
        locations: [],
        features: [],
        tags: []
      });
      
      setIsCreating(false);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Error creating provider:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this provider?')) {
      setProviders(prev => prev.filter(provider => provider.id !== id));
      
      if (selectedProvider?.id === id) {
        setSelectedProvider(null);
        setEditedProvider(null);
      }
    }
  };

  const filteredProviders = providers.filter(provider => 
    provider.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Manage Providers</h1>
          <p className="text-gray-400">Create and edit VPS service providers</p>
        </div>
        <button
          onClick={() => {
            setIsCreating(true);
            setSelectedProvider(null);
            setEditedProvider(null);
          }}
          className="glow-button"
        >
          Add New Provider
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Provider list */}
        <div className="lg:col-span-1">
          <div className="cyber-card p-6 space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search providers..."
                className="cyber-input w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
                <p className="mt-2 text-gray-400">Loading...</p>
              </div>
            ) : filteredProviders.length === 0 ? (
              <p className="text-center py-8 text-gray-400">No providers found</p>
            ) : (
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                {filteredProviders.map(provider => (
                  <div 
                    key={provider.id}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedProvider?.id === provider.id 
                        ? 'bg-primary-500/20 border border-primary-500/50' 
                        : 'bg-dark-800/50 hover:bg-dark-700/50 border border-dark-700/50'
                    }`}
                    onClick={() => handleSelectProvider(provider)}
                  >
                    <div className="font-medium text-white">{provider.name}</div>
                    <div className="text-sm text-gray-400 flex justify-between">
                      <span>{provider.website}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Right column - Edit/Create form */}
        <div className="lg:col-span-2">
          {!selectedProvider && !isCreating ? (
            <div className="cyber-card p-6 text-center">
              <p className="text-gray-400">Select a provider from the list to edit or click "Add New Provider"</p>
            </div>
          ) : (
            <div className="cyber-card p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                {isCreating ? 'Create New Provider' : 'Edit Provider'}
              </h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-gray-300">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={isCreating ? newProvider.name : editedProvider?.name || ''}
                      onChange={(e) => handleInputChange(e, isCreating ? 'new' : 'edit')}
                      className="cyber-input w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-gray-300">ID {isCreating && '(optional)'}</label>
                    <input
                      type="text"
                      name="id"
                      value={isCreating ? newProvider.id : editedProvider?.id || ''}
                      onChange={(e) => handleInputChange(e, isCreating ? 'new' : 'edit')}
                      className="cyber-input w-full"
                      disabled={!isCreating}
                      placeholder={isCreating ? "Auto-generated if empty" : ""}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block mb-1 text-gray-300">Logo URL</label>
                  <input
                    type="url"
                    name="logo"
                    value={isCreating ? newProvider.logo : editedProvider?.logo || ''}
                    onChange={(e) => handleInputChange(e, isCreating ? 'new' : 'edit')}
                    className="cyber-input w-full"
                    placeholder="https://example.com/logo.png"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-gray-300">Website</label>
                  <input
                    type="url"
                    name="website"
                    value={isCreating ? newProvider.website : editedProvider?.website || ''}
                    onChange={(e) => handleInputChange(e, isCreating ? 'new' : 'edit')}
                    className="cyber-input w-full"
                    placeholder="https://example.com"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-gray-300">Description</label>
                  <textarea
                    name="description"
                    value={isCreating ? newProvider.description : editedProvider?.description || ''}
                    onChange={(e) => handleInputChange(e, isCreating ? 'new' : 'edit')}
                    rows={4}
                    className="cyber-input w-full"
                    placeholder="Describe this provider..."
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-gray-300">Locations (comma separated)</label>
                  <input
                    type="text"
                    value={isCreating 
                      ? newProvider.locations?.join(', ') || '' 
                      : editedProvider?.locations?.join(', ') || ''}
                    onChange={(e) => handleArrayInputChange(e, 'locations', isCreating ? 'new' : 'edit')}
                    className="cyber-input w-full"
                    placeholder="e.g. USA, Europe, Asia"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-gray-300">Features (comma separated)</label>
                  <input
                    type="text"
                    value={isCreating 
                      ? newProvider.features?.join(', ') || '' 
                      : editedProvider?.features?.join(', ') || ''}
                    onChange={(e) => handleArrayInputChange(e, 'features', isCreating ? 'new' : 'edit')}
                    className="cyber-input w-full"
                    placeholder="e.g. DDoS Protection, IPv6 Support, 24/7 Support"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-gray-300">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={isCreating 
                      ? newProvider.tags?.join(', ') || '' 
                      : editedProvider?.tags?.join(', ') || ''}
                    onChange={(e) => handleArrayInputChange(e, 'tags', isCreating ? 'new' : 'edit')}
                    className="cyber-input w-full"
                    placeholder="e.g. Budget Friendly, Enterprise Grade, Gaming Optimized"
                  />
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreating(false);
                      setSelectedProvider(null);
                      setEditedProvider(null);
                    }}
                    className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded transition-colors"
                  >
                    Cancel
                  </button>
                  
                  {!isCreating && selectedProvider && (
                    <button
                      type="button"
                      onClick={() => handleDelete(selectedProvider.id)}
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors"
                    >
                      Delete
                    </button>
                  )}
                  
                  <button
                    type="button"
                    onClick={isCreating ? handleCreate : handleSave}
                    disabled={saveStatus === 'saving'}
                    className={`glow-button ${saveStatus === 'saving' ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {saveStatus === 'saving' 
                      ? 'Saving...' 
                      : isCreating 
                        ? 'Create Provider' 
                        : 'Save Changes'}
                  </button>
                </div>
                
                {saveStatus === 'success' && (
                  <div className="mt-2 text-green-400 text-center">
                    {isCreating ? 'Provider created successfully!' : 'Changes saved successfully!'}
                  </div>
                )}
                
                {saveStatus === 'error' && (
                  <div className="mt-2 text-red-400 text-center">
                    Error saving changes. Please try again.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Preview section */}
      {(selectedProvider || isCreating) && (
        <div className="cyber-card p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Provider Preview</h2>
          
          <div className="bg-dark-800/50 p-6 rounded-lg">
            <div className="flex items-center space-x-4">
              {(isCreating ? newProvider.logo : editedProvider?.logo) ? (
                <img 
                  src={isCreating ? newProvider.logo : editedProvider?.logo} 
                  alt={isCreating ? newProvider.name : editedProvider?.name}
                  className="h-12 w-auto object-contain"
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    const img = e.target as HTMLImageElement;
                    img.style.display = 'none';
                  }}
                />
              ) : (
                <div className="h-12 w-24 bg-dark-700/50 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-400">No Logo</span>
                </div>
              )}
              
              <div>
                <h3 className="text-lg font-medium text-white">
                  {isCreating ? newProvider.name || 'New Provider' : editedProvider?.name}
                </h3>
                {(isCreating ? newProvider.website : editedProvider?.website) && (
                  <a 
                    href={isCreating ? newProvider.website : editedProvider?.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-400 hover:text-primary-300 text-sm"
                  >
                    {isCreating ? newProvider.website : editedProvider?.website}
                  </a>
                )}
              </div>
            </div>
            
            {(isCreating ? newProvider.description : editedProvider?.description) && (
              <div className="mt-4">
                <p className="text-gray-300">
                  {isCreating ? newProvider.description : editedProvider?.description}
                </p>
              </div>
            )}
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Locations */}
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Locations</h4>
                {(isCreating ? newProvider.locations : editedProvider?.locations)?.length ? (
                  <div className="flex flex-wrap gap-1">
                    {(isCreating ? newProvider.locations : editedProvider?.locations)?.map((location, index) => (
                      <span 
                        key={index}
                        className="bg-dark-700/50 text-gray-300 text-xs px-2 py-1 rounded-full"
                      >
                        {location}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No locations specified</p>
                )}
              </div>
              
              {/* Features */}
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Features</h4>
                {(isCreating ? newProvider.features : editedProvider?.features)?.length ? (
                  <div className="flex flex-wrap gap-1">
                    {(isCreating ? newProvider.features : editedProvider?.features)?.map((feature, index) => (
                      <span 
                        key={index}
                        className="bg-dark-700/50 text-gray-300 text-xs px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No features specified</p>
                )}
              </div>
              
              {/* Tags */}
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Tags</h4>
                {(isCreating ? newProvider.tags : editedProvider?.tags)?.length ? (
                  <div className="flex flex-wrap gap-1">
                    {(isCreating ? newProvider.tags : editedProvider?.tags)?.map((tag, index) => (
                      <span 
                        key={index}
                        className="bg-primary-500/20 text-primary-400 text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No tags specified</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}