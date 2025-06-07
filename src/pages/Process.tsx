
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, X, CheckCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Process = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [fileInfo, setFileInfo] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const processingSteps = [
    { name: 'Uploading', description: 'Uploading your file to our servers', range: [0, 20] },
    { name: 'Extracting Audio', description: 'Preparing audio for transcription', range: [20, 40] },
    { name: 'Transcribing', description: 'Converting speech to text using AI', range: [40, 70] },
    { name: 'Translating', description: 'Generating English translation', range: [70, 90] },
    { name: 'Finalizing', description: 'Creating SRT files for download', range: [90, 100] }
  ];

  useEffect(() => {
    const storedFileInfo = sessionStorage.getItem('processingFile');
    if (!storedFileInfo) {
      navigate('/upload');
      return;
    }
    
    setFileInfo(JSON.parse(storedFileInfo));
    startProcessing();
  }, [navigate]);

  const startProcessing = () => {
    setIsProcessing(true);
    
    // Simulate processing with realistic timing
    const processFile = () => {
      let currentProgress = 0;
      let stepIndex = 0;
      
      const interval = setInterval(() => {
        currentProgress += Math.random() * 3 + 1; // Random progress increment
        
        if (currentProgress >= 100) {
          currentProgress = 100;
          setProgress(100);
          setCurrentStep(processingSteps.length - 1);
          clearInterval(interval);
          
          // Redirect to results after completion
          setTimeout(() => {
            navigate('/results');
          }, 2000);
          return;
        }
        
        // Update current step based on progress
        const newStepIndex = processingSteps.findIndex(step => 
          currentProgress >= step.range[0] && currentProgress <= step.range[1]
        );
        
        if (newStepIndex !== -1 && newStepIndex !== stepIndex) {
          stepIndex = newStepIndex;
          setCurrentStep(stepIndex);
        }
        
        setProgress(currentProgress);
      }, 200 + Math.random() * 300); // Random timing for realistic effect
    };
    
    processFile();
  };

  const handleCancel = () => {
    sessionStorage.removeItem('processingFile');
    navigate('/upload');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!fileInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link to="/upload" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Upload
            </Link>
          </div>
          
          {/* Processing Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Processing Your <span className="text-gradient">VOD File</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Please wait while we generate your subtitles
            </p>
          </div>
          
          {/* File Info Card */}
          <div className="vod-card p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold">{fileInfo.name}</h3>
                <p className="text-muted-foreground">
                  {formatFileSize(fileInfo.size)} • {fileInfo.options.language} • {fileInfo.options.context}
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={handleCancel} className="bg-card/50">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
            
            {/* Progress Bar */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-3" />
              
              {/* Current Step */}
              <div className="flex items-center space-x-3 pt-2">
                {progress < 100 ? (
                  <Loader2 className="w-5 h-5 animate-spin text-vod-primary" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-vod-success" />
                )}
                <div>
                  <div className="font-medium">
                    {progress < 100 ? processingSteps[currentStep]?.name : 'Complete!'}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {progress < 100 ? processingSteps[currentStep]?.description : 'Your subtitles are ready for download'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Processing Steps */}
          <div className="vod-card p-8">
            <h3 className="text-lg font-semibold mb-6">Processing Steps</h3>
            <div className="space-y-4">
              {processingSteps.map((step, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    index < currentStep ? 'bg-vod-success' :
                    index === currentStep ? 'bg-vod-primary animate-pulse' :
                    'bg-muted'
                  }`}>
                    {index < currentStep ? (
                      <CheckCircle className="w-4 h-4 text-white" />
                    ) : index === currentStep && progress < 100 ? (
                      <Loader2 className="w-4 h-4 text-white animate-spin" />
                    ) : (
                      <span className="text-xs font-semibold text-muted-foreground">{index + 1}</span>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className={`font-medium ${
                      index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {step.description}
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    {index < currentStep ? '✓' : index === currentStep ? `${step.range[0]}-${step.range[1]}%` : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Estimated Time */}
          {isProcessing && progress < 100 && (
            <div className="text-center mt-8">
              <p className="text-muted-foreground">
                Estimated time remaining: {Math.max(1, Math.round((100 - progress) / 10))} minutes
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Process;
