'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Plus, Trash2, Lock, LogOut, CloudLightning } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  imageUrls: string[];
  videoUrls: string[];
  description?: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth) {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  // FIXED: Pulls live contact lists directly from Vercel KV cloud endpoint bypassing caches
  const loadData = async () => {
    // 1. Projects Cloud Fetch
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const cloudData = await response.json();
        setProjects(cloudData);
        localStorage.setItem('adminProjects', JSON.stringify(cloudData));
      }
    } catch (e) {
      console.error("Error connecting to cloud database, trying local storage", e);
      const storedProjects = localStorage.getItem('adminProjects');
      if (storedProjects) setProjects(JSON.parse(storedProjects));
    }

    // 2. FIXED: Cache-busting connection pulls your dynamic form database stream live
    try {
      const messageResponse = await fetch(`/api/contact?t=${Date.now()}`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      });
      if (messageResponse.ok) {
        const cloudMessages = await messageResponse.json();
        setMessages(cloudMessages);
      }
    } catch (error) {
      console.error("Error fetching incoming live leads from cloud database:", error);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin2024') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      loadData();
    } else alert('Wrong password');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
  };

  // FIXED: Cleared the duplicated object configuration parameter causing Vercel crashes
  const saveProjects = async (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem('adminProjects', JSON.stringify(newProjects));
    
    setSyncing(true);
    try {
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProjects),
      });
    } catch (error) {
      console.error("Failed syncing items to Vercel KV Cloud:", error);
    } finally {
      setSyncing(false);
    }
  };

  const addProject = () => {
    const newProj = {
      id: Date.now(),
      title: "New Project Title",
      category: "Content Strategy",
      imageUrls: [""],
      videoUrls: [""],
      description: "Add comprehensive project metrics/narratives here..."
    };
    saveProjects([...projects, newProj]);
  };

  const updateProject = (id: number, field: string, value: any, index?: number) => {
    const updated = projects.map(p => {
      if (p.id === id) {
        if (field === 'imageUrls' || field === 'videoUrls') {
          const urls = [...p[field]];
          urls[index!] = value;
          return { ...p, [field]: urls };
        }
        return { ...p, [field]: value };
      }
      return p;
    });
    saveProjects(updated);
  };

  const addUrlField = (id: number, type: 'imageUrls' | 'videoUrls') => {
    const updated = projects.map(p => {
      if (p.id === id) {
        return { ...p, [type]: [...p[type], ""] };
      }
      return p;
    });
    saveProjects(updated);
  };

  const deleteProject = (id: number) => {
    if (confirm("Delete this project from cloud database?")) {
      saveProjects(projects.filter(p => p.id !== id));
    }
  };

  // FIXED: Syncs message deletion across cloud arrays instead of dead localStorage keys
  const deleteMessage = async (id: string) => {
    if (confirm("Delete this message?")) {
      const updated = messages.filter(m => m.id !== id);
      setMessages(updated);
      
      try {
        // Post updated inbox back to database array endpoint via our contact route hook
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated)
        });
      } catch (err) {
        console.error("Failed to delete message from cloud infrastructure storage:", err);
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
        <div className="bg-gray-800 p-8 rounded-2xl w-full max-w-md border border-gray-700">
          <h1 className="text-3xl font-bold text-white text-center mb-6">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="w-full p-4 rounded bg-gray-700 text-white mb-4 outline-none focus:ring-2 focus:ring-cyan-400" />
            <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-4 rounded font-bold transition-colors duration-200">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* TOP CONTROLS SECTION */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-gray-800">
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight">Admin Panel</h1>
            <p className="text-gray-400 text-sm mt-1">Manage brand display content assets and view logs</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={addProject}
              className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-2.5 rounded-xl font-bold text-sm transition-colors"
            >
              <Plus className="w-4 h-4" /> Add New Project
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2.5 rounded-xl font-medium text-sm border border-gray-700 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {/* STATUS BAR INFRASTRUCTURE */}
        {syncing && (
          <div className="mb-6 flex items-center gap-2 text-cyan-400 text-sm font-semibold bg-cyan-950/40 border border-cyan-800/50 p-3 rounded-xl">
            <CloudLightning className="w-4 h-4 animate-pulse" /> Syncing updates live to cloud storage metrics...
          </div>
        )}

        {/* PROJECTS MANAGER BLOCK */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Portfolio Core Assets ({projects.length})</h2>
          <div className="grid grid-cols-1 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 relative group">
                <button 
                  onClick={() => deleteProject(project.id)}
                  className="absolute top-6 right-6 text-gray-500 hover:text-red-400 transition-colors"
                  title="Delete Project"
                >
                  <Trash2 className="w-5 h-5" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Project Title</label>
                      <input 
                        type="text" 
                        value={project.title} 
                        onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl outline-none focus:border-cyan-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Category Domain</label>
                      <input 
                        type="text" 
                        value={project.category} 
                        onChange={(e) => updateProject(project.id, 'category', e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl outline-none focus:border-cyan-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Description Context</label>
                      <textarea 
                        value={project.description || ''} 
                        onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                        rows={3}
                        className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl outline-none focus:border-cyan-500 text-sm resize-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* IMAGE UTILITY FIELD PATHS */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Image Asset CDN Links</label>
                        <button onClick={() => addUrlField(project.id, 'imageUrls')} className="text-xs text-cyan-400 hover:underline font-bold">+ Add Row</button>
                      </div>
                      {project.imageUrls.map((url, idx) => (
                        <input 
                          key={idx}
                          type="text" 
                          value={url} 
                          onChange={(e) => updateProject(project.id, 'imageUrls', e.target.value, idx)}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl outline-none focus:border-cyan-500 text-sm mb-2"
                        />
                      ))}
                    </div>

                    {/* VIDEO UTILITY FIELD PATHS */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Video Asset Stream Links</label>
                        <button onClick={() => addUrlField(project.id, 'videoUrls')} className="text-xs text-cyan-400 hover:underline font-bold">+ Add Row</button>
                      </div>
                      {project.videoUrls.map((url, idx) => (
                        <input 
                          key={idx}
                          type="text" 
                          value={url} 
                          onChange={(e) => updateProject(project.id, 'videoUrls', e.target.value, idx)}
                          placeholder="Raw .mp4 video link path..."
                          className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl outline-none focus:border-cyan-500 text-sm mb-2"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* INCOMING LEGACY BACKEND MESSAGE VIEWER */}
        <div className="mt-12 border-t border-gray-800 pt-12">
          <h2 className="text-2xl font-bold text-white mb-2">Legacy Contact Log</h2>
          <p className="text-gray-400 text-xs mb-6">Historical records processed via local cloud endpoints before routing strategy optimizations.</p>
          
          {messages.length === 0 ? (
            <div className="text-center py-12 bg-gray-900/50 border border-gray-800 rounded-2xl text-gray-500 font-medium text-sm">
              No legacy inbound message records stored locally in the backup cache.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {messages.map((msg) => (
                <div key={msg.id} className="bg-gray-900 border border-gray-800 p-5 rounded-xl relative group">
                  <button 
                    onClick={() => deleteMessage(msg.id)}
                    className="absolute top-4 right-4 text-gray-600 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="text-xs font-bold text-cyan-400 mb-1">{msg.timestamp}</div>
                  <h3 className="text-white font-bold text-base">{msg.name}</h3>
                  <div className="text-gray-400 text-xs font-semibold mb-3">{msg.email}</div>
                  {msg.subject && <div className="text-gray-300 text-xs font-bold bg-gray-800 px-2 py-1 rounded inline-block mb-3">Subj: {msg.subject}</div>}
                  <p className="text-gray-400 text-xs leading-relaxed border-t border-gray-800 pt-3 mt-2">{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
