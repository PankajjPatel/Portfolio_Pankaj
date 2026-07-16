import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  X, Lock, FileText, AlertCircle, CheckCircle2, 
  RefreshCw, Globe, Laptop, Share2 
} from 'lucide-react';

interface ResumeUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface VisitorLog {
  id: number;
  ip_address: string;
  user_agent: string;
  referrer: string;
  timestamp: string;
}

export const ResumeUploadModal: React.FC<ResumeUploadModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authenticatedPassword, setAuthenticatedPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'resume' | 'visitors'>('resume');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [statusMsg, setStatusMsg] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Visitor log state
  const [visitorLogs, setVisitorLogs] = useState<VisitorLog[]>([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);

  useEffect(() => {
    // Reset state when modal is closed/opened
    if (!isOpen) {
      setUsername('');
      setPassword('');
      setAuthenticatedPassword('');
      setIsAuthenticated(false);
      setSelectedFile(null);
      setStatusMsg(null);
      setVisitorLogs([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAuthenticate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setStatusMsg({ type: 'error', text: 'Username and Password are required.' });
      return;
    }

    if (username !== 'pankaj_09' || password !== 'PankajDev@123') {
      setStatusMsg({ type: 'error', text: 'Incorrect Username or Password.' });
      return;
    }

    setIsUploading(true);
    setStatusMsg(null);

    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
      const response = await axios.get(`${apiBaseUrl}/api/contact/visitor-logs/`, {
        params: { password }
      });

      if (response.status === 200) {
        setIsAuthenticated(true);
        setAuthenticatedPassword(password);
        setVisitorLogs(response.data);
        setActiveTab('resume'); // Default to resume tab on successful login
      }
    } catch (err: unknown) {
      console.error(err);
      let errMsg = 'Authentication failed. Please verify your Admin credentials.';
      if (axios.isAxiosError(err) && err.response && err.response.status === 401) {
        errMsg = 'Incorrect Admin Password.';
      }
      setStatusMsg({ type: 'error', text: errMsg });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFetchLogs = async () => {
    setIsLoadingLogs(true);
    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
      const response = await axios.get(`${apiBaseUrl}/api/contact/visitor-logs/`, {
        params: { password: authenticatedPassword }
      });
      if (response.status === 200) {
        setVisitorLogs(response.data);
      }
    } catch (err) {
      console.error('Failed to reload logs:', err);
    } finally {
      setIsLoadingLogs(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
        setStatusMsg({ type: 'error', text: 'Please select a valid PDF file.' });
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
      setStatusMsg(null);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setStatusMsg({ type: 'error', text: 'Please choose a resume PDF file.' });
      return;
    }

    setIsUploading(true);
    setStatusMsg(null);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('password', authenticatedPassword);

    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
      const response = await axios.post(`${apiBaseUrl}/api/contact/resume/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setStatusMsg({ type: 'success', text: 'Resume uploaded and copied successfully!' });
        setSelectedFile(null);
        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 1500);
      }
    } catch (err: unknown) {
      console.error(err);
      let errMsg = 'Upload failed. Please check your network.';
      if (axios.isAxiosError(err) && err.response && err.response.data) {
        const data = err.response.data as Record<string, unknown>;
        if (typeof data.error === 'string') errMsg = data.error;
      }
      setStatusMsg({ type: 'error', text: errMsg });
    } finally {
      setIsUploading(false);
    }
  };

  // Helper to cleanly parse User-Agent
  const parseUA = (ua: string) => {
    if (!ua) return 'Unknown Device';
    let os = 'Unknown OS';
    let browser = 'Unknown Browser';

    if (ua.includes('Windows')) os = 'Windows';
    else if (ua.includes('Macintosh') || ua.includes('Mac OS')) os = 'macOS';
    else if (ua.includes('iPhone')) os = 'iPhone';
    else if (ua.includes('iPad')) os = 'iPad';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('Linux')) os = 'Linux';

    if (ua.includes('Chrome') || ua.includes('CriOS')) browser = 'Chrome';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
    else if (ua.includes('Edge')) browser = 'Edge';

    return `${os} • ${browser}`;
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-100/10 dark:bg-black/60 backdrop-blur-xs p-4">
      {/* Modal Card */}
      <div className={`relative w-full rounded-xl border border-themeBorder bg-themePanel shadow-lg p-6 flex flex-col gap-5 transition-all duration-300 ${
        isAuthenticated && activeTab === 'visitors' ? 'max-w-2xl' : 'max-w-md'
      }`}>
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-primaryBlue flex items-center justify-center shrink-0">
            <Lock size={18} />
          </div>
          <div className="flex flex-col gap-0.5">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              {isAuthenticated ? 'Admin Console' : 'Authenticate Admin Access'}
            </h3>
            <p className="text-[10px] text-slate-600 dark:text-slate-400 uppercase tracking-widest font-semibold">
              {isAuthenticated ? 'Authenticated Session' : 'Admin Only Access'}
            </p>
          </div>
        </div>

        {/* Status Messages */}
        {statusMsg && (
          <div className={`p-3.5 rounded-lg border text-xs font-semibold flex items-start gap-2.5 ${
            statusMsg.type === 'success' 
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/20 text-emerald-800 dark:text-emerald-300' 
              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500/20 text-rose-800 dark:text-rose-300'
          }`}>
            {statusMsg.type === 'success' ? (
              <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle size={15} className="text-rose-500 shrink-0 mt-0.5" />
            )}
            <span className="leading-snug">{statusMsg.text}</span>
          </div>
        )}

        {/* Auth prompt if not authenticated */}
        {!isAuthenticated ? (
          <form onSubmit={handleAuthenticate} className="flex flex-col gap-4">
            {/* Username Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="modal-username" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Username
              </label>
              <input 
                type="text" 
                id="modal-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3.5 py-2 rounded-md bg-slate-50 dark:bg-slate-900 border border-themeBorder text-xs text-gray-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primaryBlue"
                placeholder="Enter admin username"
                disabled={isUploading}
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="modal-password" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Password
              </label>
              <input 
                type="password" 
                id="modal-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2 rounded-md bg-slate-50 dark:bg-slate-900 border border-themeBorder text-xs text-gray-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primaryBlue"
                placeholder="Enter admin password"
                disabled={isUploading}
              />
            </div>

            <button 
              type="submit" 
              className="w-full py-2.5 mt-2 rounded-md bg-primaryBlue hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              disabled={isUploading}
            >
              {isUploading ? 'Authenticating...' : 'Enter Admin Console'}
            </button>
          </form>
        ) : (
          /* Authenticated Admin View */
          <div className="flex flex-col gap-4 w-full">
            {/* Tabs Selector */}
            <div className="flex border-b border-themeBorder">
              <button 
                onClick={() => { setActiveTab('resume'); setStatusMsg(null); }}
                className={`flex-1 pb-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'resume' 
                    ? 'border-primaryBlue text-primaryBlue' 
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                Upload Resume
              </button>
              <button 
                onClick={() => { setActiveTab('visitors'); setStatusMsg(null); handleFetchLogs(); }}
                className={`flex-1 pb-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'visitors' 
                    ? 'border-primaryBlue text-primaryBlue' 
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                Visitor Logs ({visitorLogs.length})
              </button>
            </div>

            {/* TAB CONTENT: Upload Resume */}
            {activeTab === 'resume' && (
              <form onSubmit={handleUpload} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <FileText size={11} className="text-primaryBlue" />
                    Resume File (.PDF)
                  </label>
                  <div className="flex items-center gap-3">
                    <label 
                      htmlFor="resume-file" 
                      className="px-4 py-2 rounded-md border border-themeBorder bg-slate-50 dark:bg-slate-900 hover:bg-themePanelHeavy hover:border-themeBorderHeavy transition-colors text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer shrink-0"
                    >
                      Choose PDF
                    </label>
                    <input 
                      type="file" 
                      id="resume-file" 
                      accept=".pdf" 
                      onChange={handleFileChange}
                      className="hidden" 
                      disabled={isUploading}
                    />
                    <span className="text-xs text-slate-500 truncate">
                      {selectedFile ? selectedFile.name : 'No file selected'}
                    </span>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-2.5 mt-2 rounded-md bg-primaryBlue hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  disabled={isUploading}
                >
                  {isUploading ? 'Uploading...' : 'Upload New Resume'}
                </button>
              </form>
            )}

            {/* TAB CONTENT: Visitor Logs */}
            {activeTab === 'visitors' && (
              <div className="flex flex-col gap-3 w-full">
                {/* Header Actions */}
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Latest Visits
                  </span>
                  <button 
                    onClick={handleFetchLogs}
                    disabled={isLoadingLogs}
                    className="p-1 rounded-md text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-all flex items-center gap-1.5 text-[10px] font-bold cursor-pointer"
                  >
                    <RefreshCw size={10} className={isLoadingLogs ? 'animate-spin' : ''} />
                    Refresh Logs
                  </button>
                </div>

                {/* Logs List Container */}
                <div className="max-h-[300px] overflow-y-auto border border-themeBorder rounded-lg divide-y divide-themeBorder flex flex-col">
                  {visitorLogs.length === 0 ? (
                    <div className="p-8 text-center text-xs text-slate-500">
                      No visits logged yet.
                    </div>
                  ) : (
                    visitorLogs.map((log) => (
                      <div key={log.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
                        {/* Left Compartment: IP & Device details */}
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2.5">
                            <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                              <Globe size={12} className="text-primaryBlue shrink-0" />
                              {log.ip_address}
                            </span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-themeBorder text-slate-600 dark:text-slate-400 font-mono">
                              IPv4
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                              <Laptop size={11} className="shrink-0" />
                              {parseUA(log.user_agent)}
                            </span>
                          </div>
                        </div>

                        {/* Right Compartment: Referrer & Time */}
                        <div className="flex flex-col sm:items-end gap-1 shrink-0 text-slate-500 dark:text-slate-400 text-[10px]">
                          <div className="flex items-center gap-1">
                            <Share2 size={11} className="shrink-0 text-emerald-500" />
                            <span className="truncate max-w-[150px]" title={log.referrer}>
                              Ref: {log.referrer}
                            </span>
                          </div>
                          <span className="text-[9px] font-mono text-slate-500">
                            {log.timestamp}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
