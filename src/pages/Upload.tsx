
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import FileUpload from '@/components/FileUpload';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProcessingOptions {
  language: string;
  context: string;
  includeTranslation: boolean;
}

const Upload = () => {
  const navigate = useNavigate();
  
  const handleFileSelect = (file: File, options: ProcessingOptions) => {
    // Store file and options in session storage for the processing page
    sessionStorage.setItem('processingFile', JSON.stringify({
      name: file.name,
      size: file.size,
      type: file.type,
      options: options
    }));
    
    // Navigate to processing page
    navigate('/process');
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
          
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Upload Your <span className="text-gradient">VOD File</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select your Korean, Japanese, or Chinese audio/video file to generate accurate subtitles
            </p>
          </div>
          
          {/* Upload Component */}
          <FileUpload onFileSelect={handleFileSelect} />
          
          {/* Usage Info */}
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="vod-card p-6">
              <h3 className="font-semibold mb-4">Free Tier Limits</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Files per month:</span>
                  <span>3 files</span>
                </div>
                <div className="flex justify-between">
                  <span>Max file size:</span>
                  <span>100MB</span>
                </div>
                <div className="flex justify-between">
                  <span>Max duration:</span>
                  <span>10 minutes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Upload;
