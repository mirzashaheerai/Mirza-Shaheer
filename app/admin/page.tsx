'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Plus, Trash2, Lock, LogOut } from 'lucide-react';

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
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth) {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const loadData = () => {
    const storedProjects = localStorage.getItem('adminProjects');
    if (storedProjects) setProjects(JSON.parse(storedProjects));

    const storedMessages = localStorage.getItem('contactMessages');
    if (storedMessages) setMessages(JSON.parse(storedMessages));
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

  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem('adminProjects', JSON.stringify(newProjects));
  };

  const addProject = () => {
    const newProj = {
      id: Date.now(),
      title: "New Project",
      category: "Content Creation",
      imageUrls: [""],
      videoUrls: [""],
      description: "Add project description here..."
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
    if (confirm("Delete this project?")) {
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-2xl w-full max-w-md">
          <h1 className="text-3xl font-bold text-white text-center mb-6">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="w-full p-4 rounded bg-gray-700 text-white mb-4" />
            <button type="submit" className="w-full bg-cyan-500 py-4 rounded font-bold">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between mb-8">
          <h1 className="text-4xl font-bold text-white">Admin Panel</h1>
          <button onClick={handleLogout} className="text-red-400">Logout</button>
        </div>

        {/* Projects Section - Unchanged */}
        <button onClick={addProject} className="bg-cyan-500 text-black px-6 py-3 rounded-lg mb-8 flex items-center gap-2">
          <Plus /> Add New Project
        </button>

        <div className="space-y-8 mb-16">
          {projects.map(project => (
            <div key={project.id} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <input type="text" value={project.title} onChange={(e) => updateProject(project.id, 'title', e.target.value)} className="bg-gray-900 p-3 rounded text-white" placeholder="Title" />
                <input type="text" value={project.category} onChange={(e) => updateProject(project.id, 'category', e.target.value)} className="bg-gray-900 p-3 rounded text-white" placeholder="Category" />
                <button onClick={() => deleteProject(project.id)} className="bg-red-600 text-white p-3 rounded">Delete</button>
              </div>

              <div className="mb-6">
                <label className="block text-white mb-2 font-medium">Image URLs</label>
                {project.imageUrls.map((url, index) => (
                  <input key={index} type="text" value={url} onChange={(e) => updateProject(project.id, 'imageUrls', e.target.value, index)} className="bg-gray-900 p-3 rounded text-white w-full mb-2" placeholder="Image URL" />
                ))}
                <button onClick={() => addUrlField(project.id, 'imageUrls')} className="text-cyan-400 text-sm">+ Add Image URL</button>
              </div>

              <div className="mb-6">
                <label className="block text-white mb-2 font-medium">Video URLs</label>
                {project.videoUrls.map((url, index) => (
                  <input key={index} type="text" value={url} onChange={(e) => updateProject(project.id, 'videoUrls', e.target.value, index)} className="bg-gray-900 p-3 rounded text-white w-full mb-2" placeholder="Video URL" />
                ))}
                <button onClick={() => addUrlField(project.id, 'videoUrls')} className="text-cyan-400 text-sm">+ Add Video URL</button>
              </div>

              <textarea value={project.description || ''} onChange={(e) => updateProject(project.id, 'description', e.target.value)} className="w-full bg-gray-900 p-3 rounded text-white" placeholder="Project Description" rows={3} />
            </div>
          ))}
        </div>

        {/* New Messages Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Contact Messages</h2>
          {messages.length === 0 ? (
            <p className="text-gray-400">No messages yet.</p>
          ) : (
            <div className="space-y-6">
              {messages.map(msg => (
                <div key={msg.id} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-white font-medium">{msg.name} ({msg.email})</p>
                      <p className="text-sm text-gray-400">{new Date(msg.timestamp).toLocaleString()}</p>
                    </div>
                    <button onClick={() => {/* delete function */}} className="text-red-400">Delete</button>
                  </div>
                  <p className="text-cyan-400 mt-3 font-medium">{msg.subject}</p>
                  <p className="text-gray-300 mt-2">{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}