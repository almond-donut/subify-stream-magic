
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileUploadProps {
  onFileSelect: (file: File, options: ProcessingOptions) => void;
}

interface ProcessingOptions {
  language: string;
  context: string;
  includeTranslation: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [options, setOptions] = useState<ProcessingOptions>({
    language: '',
    context: 'casual',
    includeTranslation: true
  });
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      // Validate file size (100MB limit for free tier)
      if (file.size > 100 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 100MB for the free tier.",
          variant: "destructive"
        });
        return;
      }
      
      setSelectedFile(file);
      toast({
        title: "File selected",
        description: `${file.name} is ready for processing.`
      });
    }
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a'],
      'video/*': ['.mp4', '.webm', '.mov']
    },
    maxFiles: 1
  });

  const handleStartProcessing = () => {
    if (selectedFile && options.language) {
      onFileSelect(selectedFile, options);
    } else {
      toast({
        title: "Missing information",
        description: "Please select a file and language before processing.",
        variant: "destructive"
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* File Upload Area */}
      <div
        {...getRootProps()}
        className={`vod-card p-12 text-center cursor-pointer transition-all duration-200 ${
          isDragActive ? 'ring-2 ring-vod-primary scale-105' : 'hover:scale-102'
        }`}
      >
        <input {...getInputProps()} />
        
        {selectedFile ? (
          <div className="space-y-4">
            <CheckCircle className="w-16 h-16 text-vod-success mx-auto" />
            <div>
              <h3 className="text-xl font-semibold mb-2">File Selected</h3>
              <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                <File className="w-4 h-4" />
                <span>{selectedFile.name}</span>
                <span>({formatFileSize(selectedFile.size)})</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFile(null);
              }}
              className="bg-card/50"
            >
              <X className="w-4 h-4 mr-2" />
              Remove
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Upload className={`w-16 h-16 mx-auto transition-colors ${isDragActive ? 'text-vod-primary' : 'text-muted-foreground'}`} />
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {isDragActive ? 'Drop your file here' : 'Upload your audio or video file'}
              </h3>
              <p className="text-muted-foreground">
                Supports MP3, MP4, WAV, M4A, WEBM up to 100MB
              </p>
            </div>
            <Button variant="outline" className="bg-card/50">
              Choose File
            </Button>
          </div>
        )}
      </div>

      {/* Processing Options */}
      {selectedFile && (
        <div className="vod-card p-8 space-y-6 animate-fade-in">
          <h3 className="text-xl font-semibold">Processing Options</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Language *</label>
              <Select value={options.language} onValueChange={(value) => setOptions(prev => ({ ...prev, language: value }))}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="korean">Korean (한국어)</SelectItem>
                  <SelectItem value="japanese">Japanese (日本語)</SelectItem>
                  <SelectItem value="chinese">Chinese (中文)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Content Type</label>
              <Select value={options.context} onValueChange={(value) => setOptions(prev => ({ ...prev, context: value }))}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Select context" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gaming">Gaming Stream</SelectItem>
                  <SelectItem value="casual">Casual Conversation</SelectItem>
                  <SelectItem value="formal">Formal/Business</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="translation"
              checked={options.includeTranslation}
              onChange={(e) => setOptions(prev => ({ ...prev, includeTranslation: e.target.checked }))}
              className="rounded border-border"
            />
            <label htmlFor="translation" className="text-sm">
              Include English translation
            </label>
          </div>
          
          {!options.language && (
            <div className="flex items-center space-x-2 text-amber-500 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Please select a language to continue</span>
            </div>
          )}
          
          <Button 
            onClick={handleStartProcessing}
            disabled={!options.language}
            className="vod-button w-full"
          >
            Start Processing
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
