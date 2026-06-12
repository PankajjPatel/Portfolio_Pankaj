import React, { useState } from 'react';
import axios from 'axios';
import { X, Lock, FileText, Upload, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ResumeUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeUploadModal: React.FC<ResumeUploadModalProps> = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [statusMsg, setStatusMsg] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

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
    if (!password) {
      setStatusMsg({ type: 'error', text: 'PIN/Password is required.' });
      return;
    }
    if (!selectedFile) {
      setStatusMsg({ type: 'error', text: 'Please choose a resume PDF file.' });
      return;
    }

    setIsUploading(true);
    setStatusMsg(null);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('password', password);

    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
      const response = await axios.post(`${apiBaseUrl}/api/contact/resume/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setStatusMsg({ type: 'success', text: 'Resume uploaded and copied successfully!' });
        setPassword('');
        setSelectedFile(null);
        // Refresh page after a brief moment to update cache
        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 1500);
      }
    } catch (err: any) {
      console.error(err);
      let errMsg = 'Upload failed. Please check your network.';
      if (err.response) {
        if (err.response.data && err.response.data.error) {
          errMsg = err.response.data.error;
        } else if (err.response.status === 401) {
          errMsg = 'Incorrect PIN/Password.';
        }
      }
      setStatusMsg({ type: 'error', text: errMsg });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      {/* Modal Card */}
      <div className="relative w-full max-w-md rounded-xl border border-themeBorder bg-themePanel shadow-lg p-6 flex flex-col gap-5">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-primaryBlue flex items-center justify-center shrink-0">
            <Upload size={18} />
          </div>
          <div className="flex flex-col gap-0.5">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              Update Resume PDF
            </h3>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
              Admin Only Access
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

        {/* Form */}
        <form onSubmit={handleUpload} className="flex flex-col gap-4">
          {/* PIN Input */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="modal-password" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Lock size={11} className="text-primaryBlue" />
              Upload PIN / Password
            </label>
            <input 
              type="password" 
              id="modal-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md bg-slate-50 dark:bg-slate-900 border border-themeBorder text-xs text-gray-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primaryBlue"
              placeholder="••••••••"
              disabled={isUploading}
            />
          </div>

          {/* File Picker */}
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

          {/* Submit */}
          <button 
            type="submit" 
            className="w-full py-2.5 mt-2 rounded-md bg-primaryBlue hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload Resume'}
          </button>
        </form>
      </div>
    </div>
  );
};
