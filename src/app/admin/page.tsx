"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  LogOut, 
  RefreshCw, 
  Calendar, 
  User, 
  MessageSquare,
  FileText,
  Clock,
  ArrowLeft
} from 'lucide-react';

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read';
}

export default function AdminDashboard() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/messages');
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages);
      } else {
        if (response.status === 401) {
          router.push('/admin/login');
        } else {
          setError('Failed to fetch messages. Please refresh.');
        }
      }
    } catch {
      setError('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMessages();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchMessages]);

  const handleStatusToggle = async (id: string, currentStatus: 'unread' | 'read') => {
    setActionInProgress(id);
    const newAction = currentStatus === 'unread' ? 'mark_read' : 'mark_unread';
    try {
      const response = await fetch('/api/admin/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: newAction, id }),
      });
      if (response.ok) {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === id 
              ? { ...msg, status: currentStatus === 'unread' ? 'read' : 'unread' } 
              : msg
          )
        );
        if (selectedMessage && selectedMessage.id === id) {
          setSelectedMessage(prev => 
            prev ? { ...prev, status: currentStatus === 'unread' ? 'read' : 'unread' } : null
          );
        }
      }
    } catch {
      alert('Failed to update status.');
    } finally {
      setActionInProgress(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    setActionInProgress(id);
    try {
      const response = await fetch('/api/admin/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'delete', id }),
      });
      if (response.ok) {
        setMessages(prev => prev.filter(msg => msg.id !== id));
        if (selectedMessage && selectedMessage.id === id) {
          setSelectedMessage(null);
        }
      }
    } catch {
      alert('Failed to delete message.');
    } finally {
      setActionInProgress(null);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      if (response.ok) {
        router.push('/admin/login');
        router.refresh();
      }
    } catch {
      alert('Logout failed.');
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const totalMessages = messages.length;
  const unreadMessages = messages.filter(m => m.status === 'unread').length;
  const readMessages = totalMessages - unreadMessages;

  return (
    <main className="min-h-screen bg-dark-bg text-text-main py-12 px-6 md:px-12 relative overflow-hidden transition-colors duration-300">
      {/* Background Glows */}
      <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-dark-border/40 pb-8 mb-10">
          <div>
            <div className="flex items-center gap-3">
              <Link href="/" className="p-2 border border-dark-border rounded-xl text-dark-muted hover:text-gold-500 transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <span className="font-display font-black text-2xl md:text-3xl tracking-wider uppercase">
                Inbox <span className="text-gold-500">Dashboard</span>
              </span>
            </div>
            <p className="text-xs text-dark-muted mt-2 tracking-widest uppercase">
              Manage client inquiries & contact messages
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={fetchMessages}
              disabled={loading}
              className="p-3 border border-dark-border hover:border-gold-500 rounded-xl text-dark-muted hover:text-gold-500 transition-all cursor-pointer disabled:opacity-50"
              title="Refresh messages"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest bg-red-950/20 hover:bg-red-950/40 text-red-400 border border-red-500/30 px-5 py-3 rounded-xl transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              LOGOUT
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-dark-surface/50 border border-dark-border p-6 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[10px] text-dark-muted font-bold tracking-wider uppercase">Total Inquiries</span>
              <h4 className="text-3xl font-black mt-2 text-text-main">{totalMessages}</h4>
            </div>
            <div className="p-4 bg-dark-card rounded-2xl text-gold-500 border border-dark-border">
              <MessageSquare className="w-6 h-6" />
            </div>
          </div>
          <div className="bg-dark-surface/50 border border-dark-border p-6 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[10px] text-dark-muted font-bold tracking-wider uppercase text-yellow-500">Unread</span>
              <h4 className="text-3xl font-black mt-2 text-yellow-500">{unreadMessages}</h4>
            </div>
            <div className="p-4 bg-dark-card rounded-2xl text-yellow-500 border border-dark-border">
              <Clock className="w-6 h-6 animate-pulse" />
            </div>
          </div>
          <div className="bg-dark-surface/50 border border-dark-border p-6 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[10px] text-dark-muted font-bold tracking-wider uppercase text-green-400">Processed</span>
              <h4 className="text-3xl font-black mt-2 text-green-400">{readMessages}</h4>
            </div>
            <div className="p-4 bg-dark-card rounded-2xl text-green-400 border border-dark-border">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="p-4 bg-red-950/20 border border-red-500/30 text-red-400 text-sm rounded-xl mb-6 text-center">
            {error}
          </div>
        )}

        {/* Content Section: Lists vs Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Messages List (Spans 7/12) */}
          <div className="lg:col-span-7 bg-dark-surface/50 border border-dark-border rounded-3xl p-6 md:p-8 flex flex-col min-h-[500px]">
            <h3 className="font-display font-extrabold text-lg text-text-main mb-6 border-b border-dark-border/40 pb-4">
              Messages Box
            </h3>

            {loading && messages.length === 0 ? (
              <div className="flex-grow flex items-center justify-center py-20">
                <RefreshCw className="w-8 h-8 text-gold-500 animate-spin" />
              </div>
            ) : messages.length === 0 ? (
              <div className="flex-grow flex flex-col items-center justify-center py-20 text-center text-dark-muted">
                <Mail className="w-12 h-12 mb-4 text-dark-border" />
                <p className="text-sm font-semibold uppercase tracking-wider">No inquiries found</p>
                <p className="text-xs mt-1">When clients contact you, messages will list here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => {
                  const isSelected = selectedMessage?.id === message.id;
                  const isUnread = message.status === 'unread';
                  return (
                    <motion.div
                      key={message.id}
                      onClick={() => setSelectedMessage(message)}
                      className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer text-left relative flex flex-col gap-3 ${
                        isSelected 
                          ? 'bg-dark-card border-gold-500/80 shadow-md shadow-gold-500/5' 
                          : 'bg-dark-card/50 border-dark-border hover:border-dark-border/80 hover:bg-dark-card'
                      }`}
                    >
                      {/* Top Row: Unread Badge & Action buttons */}
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          {isUnread && (
                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 shrink-0" />
                          )}
                          <span className="font-bold text-sm text-text-main truncate max-w-[150px]">
                            {message.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleStatusToggle(message.id, message.status)}
                            disabled={actionInProgress === message.id}
                            className={`p-2 rounded-lg border transition-colors ${
                              isUnread 
                                ? 'border-dark-border text-dark-muted hover:border-green-500/40 hover:text-green-400' 
                                : 'border-dark-border text-green-400 hover:border-yellow-500/40 hover:text-yellow-500'
                            }`}
                            title={isUnread ? "Mark as Read" : "Mark as Unread"}
                          >
                            {isUnread ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={() => handleDelete(message.id)}
                            disabled={actionInProgress === message.id}
                            className="p-2 border border-dark-border text-dark-muted hover:border-red-500/40 hover:text-red-400 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Message preview snippet */}
                      <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                        {message.message}
                      </p>

                      {/* Date details */}
                      <div className="flex items-center gap-1 text-[10px] text-dark-muted mt-1 uppercase font-bold tracking-wider">
                        <Calendar className="w-3.5 h-3.5 text-gold-500/80" />
                        <span>{formatDate(message.createdAt)}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Message Detail view (Spans 5/12) */}
          <div className="lg:col-span-5 bg-dark-surface/50 border border-dark-border rounded-3xl p-6 md:p-8 min-h-[500px] flex flex-col">
            <h3 className="font-display font-extrabold text-lg text-text-main mb-6 border-b border-dark-border/40 pb-4 text-left">
              Inquiry Details
            </h3>

            <AnimatePresence mode="wait">
              {selectedMessage ? (
                <motion.div
                  key={selectedMessage.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-grow flex flex-col text-left gap-6"
                >
                  {/* Sender Metadata */}
                  <div className="bg-dark-card border border-dark-border p-5 rounded-2xl space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 bg-dark-bg border border-dark-border rounded-xl text-gold-500">
                        <User className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] text-dark-muted font-bold tracking-wider uppercase leading-none mb-1">Sender Name</span>
                        <span className="text-sm font-semibold text-text-main truncate">{selectedMessage.name}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2.5 bg-dark-bg border border-dark-border rounded-xl text-gold-500">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] text-dark-muted font-bold tracking-wider uppercase leading-none mb-1">Email Address</span>
                        <a href={`mailto:${selectedMessage.email}`} className="text-xs font-semibold text-gold-500 hover:underline truncate">
                          {selectedMessage.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2.5 bg-dark-bg border border-dark-border rounded-xl text-gold-500">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] text-dark-muted font-bold tracking-wider uppercase leading-none mb-1">Received At</span>
                        <span className="text-xs font-semibold text-text-secondary">{formatDate(selectedMessage.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Message body content */}
                  <div className="flex-grow bg-dark-card border border-dark-border p-5 rounded-2xl flex flex-col">
                    <div className="flex items-center gap-2 mb-3 text-dark-muted">
                      <FileText className="w-4 h-4 text-gold-500/80" />
                      <span className="text-[10px] font-bold tracking-wider uppercase">Message Content</span>
                    </div>
                    <div className="text-xs md:text-sm text-text-secondary leading-relaxed font-light whitespace-pre-wrap flex-grow overflow-y-auto max-h-[250px] pr-2">
                      {selectedMessage.message}
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() => handleStatusToggle(selectedMessage.id, selectedMessage.status)}
                      disabled={actionInProgress === selectedMessage.id}
                      className={`flex-grow inline-flex items-center justify-center gap-2 text-xs font-bold tracking-widest border py-3.5 rounded-xl transition-all cursor-pointer ${
                        selectedMessage.status === 'unread'
                          ? 'bg-gold-500 border-gold-500 hover:bg-gold-400 text-absolute-dark'
                          : 'border-dark-border hover:border-gold-500 text-dark-muted hover:text-gold-500'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                      {selectedMessage.status === 'unread' ? 'MARK PROCESSED' : 'MARK UNREAD'}
                    </button>
                    <button
                      onClick={() => handleDelete(selectedMessage.id)}
                      disabled={actionInProgress === selectedMessage.id}
                      className="p-3.5 border border-dark-border hover:border-red-500/40 text-dark-muted hover:text-red-400 rounded-xl transition-all cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center py-20 text-center text-dark-muted">
                  <FileText className="w-12 h-12 mb-4 text-dark-border" />
                  <p className="text-sm font-semibold uppercase tracking-wider">No message selected</p>
                  <p className="text-xs mt-1">Select an inquiry from the list to view its complete details.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </main>
  );
}
