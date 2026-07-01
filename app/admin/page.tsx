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

  // UPDATED: Now smoothly pulls both projects and contact streams right out of the cloud live!
  const loadData = async () => {
    // 1. Existing Projects Cloud Fetch (Kept Exactly Same)
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

    // 2. FIXED: Now queries the secure cloud database for your submitted leads
    try {
      const messageResponse = await fetch('/api/contact');
      if (messageResponse.ok) {
        const cloudMessages = await messageResponse.json();
        setMessages(cloudMessages);
      }
    } catch (error) {
      console.error("Error fetching incoming live leads from cloud database, falling back locally:", error);
      const storedMessages = localStorage.getItem('contactMessages');
      if (storedMessages) setMessages(JSON.parse(storedMessages));
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    // Note: Current year constraint verified intact
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

  const saveProjects = async (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem('adminProjects', JSON.stringify(newProjects));
    
    setSyncing(true);
    try {
      await fetch('/api/projects', {
        value: 'POST',
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

  const deleteMessage = (id: string) => {
    if (confirm("Delete this message?")) {
      const updated = messages.filter(m => m.id !== id);
      setMessages(updated);
      localStorage.setItem('contactMessages', JSON.stringify(updated));
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-gray-800">
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight">Admin Panel</h1>
            <p className="text-xs text-gray-400 mt-1 flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${syncing ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
              {syncing ? 'Syncing edits to Vercel KV Cloud Store...' : 'All changes locked into cloud storage'}
            </p>
          </div>
          <button onClick={handleLogout} className="text-sm font-semibold text-red-400 hover:text-red-300 bg-red-950/30 px-4 py-2 rounded-lg border border-red-900/40 transition-colors">Logout</button>
        </div>

        {/* Dynamic Action Controls */}
        <button onClick={addProject} className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-lg mb-8 flex items-center gap-2 font-bold text-sm transition-transform duration-150 active:scale-95">
          <Plus className="w-4 h-4" /> Add New Case Study
        </button>

        <div className="space-y-8 mb-16">
          {projects.map(project => (
            <div key={project.id} className="bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-700 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] uppercase font-bold text-gray-400 tracking-wider">Project Title</label>
                  <input type="text" value={project.title} onChange={(e) => updateProject(project.id, 'title', e.target.value)} className="bg-gray-900 p-3 rounded text-white text-sm border border-gray-700 outline-none focus:border-cyan-400" placeholder="Title" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] uppercase font-bold text-gray-400 tracking-wider">Category</label>
                  <input type="text" value={project.category} onChange={(e) => updateProject(project.id, 'category', e.target.value)} className="bg-gray-900 p-3 rounded text-white text-sm border border-gray-700 outline-none focus:border-cyan-400" placeholder="Category" />
                </div>
                <div className="flex flex-col justify-end">
                  <button onClick={() => deleteProject(project.id)} className="bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white p-3 rounded text-sm font-bold border border-red-700/40 transition-all flex items-center justify-center gap-2 h-[46px]">
                    <Trash2 className="w-4 h-4" /> Remove Project
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs uppercase font-bold text-gray-400 tracking-wider mb-2">Image Links</label>
                {project.imageUrls.map((url, index) => (
                  <input key={index} type="text" value={url} onChange={(e) => updateProject(project.id, 'imageUrls', e.target.value, index)} className="bg-gray-900 p-3 rounded text-white text-xs w-full mb-2 border border-gray-700 outline-none focus:border-cyan-400" placeholder="https://images.unsplash.com/example-asset" />
                ))}
                <button onClick={() => addUrlField(project.id, 'imageUrls')} className="text-cyan-400 text-xs font-semibold hover:underline">+ Add Alternative Image String</button>
              </div>

              <div className="mb-6">
                <label className="block text-xs uppercase font-bold text-gray-400 tracking-wider mb-2">Video Links</label>
                {project.videoUrls.map((url, index) => (
                  <input key={index} type="text" value={url} onChange={(e) => updateProject(project.id, 'videoUrls', e.target.value, index)} className="bg-gray-900 p-3 rounded text-white text-xs w-full mb-2 border border-gray-700 outline-none focus:border-cyan-400" placeholder="https://your-video-source.mp4" />
                ))}
                <button onClick={() => addUrlField(project.id, 'videoUrls')} className="text-cyan-400 text-xs font-semibold hover:underline">+ Add Alternative Video String</button>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase font-bold text-gray-400 tracking-wider">Project Narrative Ecosystem</label>
                <textarea value={project.description || ''} onChange={(e) => updateProject(project.id, 'description', e.target.value)} className="w-full bg-gray-900 p-3 rounded text-white text-sm border border-gray-700 outline-none focus:border-cyan-400" placeholder="Project Description" rows={3} />
              </div>
            </div>
          ))}
        </div>

        {/* Contact Messages Board */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Lead Stream Management</h2>
          {messages.length === 0 ? (
            <p className="text-gray-500 text-sm italic">No messages streaming in yet.</p>
          ) : (
            <div className="space-y-6">
              {messages.map(msg => (
                <div key={msg.id} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <p className="text-white font-semibold text-base">{msg.name} <span className="text-zinc-400 font-normal text-sm">({msg.email})</span></p>
                      <p className="text-xs text-gray-500 mt-0.5">{new Date(msg.timestamp).toLocaleString()}</p>
                    </div>
                    <button onClick={() => deleteMessage(msg.id)} className="text-xs font-bold text-red-400 hover:underline">Delete</button>
                  </div>
                  <p className="text-cyan-400 mt-3 text-sm font-semibold uppercase tracking-wider">{msg.subject}</p>
                  <p className="text-gray-300 mt-1.5 text-sm leading-relaxed bg-gray-900/40 p-3 rounded-lg border border-gray-700/50">{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
