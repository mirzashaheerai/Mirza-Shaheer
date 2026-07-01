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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-gray-800">
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight">Admin Panel</h1>
            <p
