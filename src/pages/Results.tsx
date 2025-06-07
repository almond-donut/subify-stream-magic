
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Download, FileText, Globe, ArrowLeft, Upload, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Results = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [fileInfo, setFileInfo] = useState<any>(null);
  const [subtitlePreview, setSubtitlePreview] = useState({
    original: "1\n00:00:01,000 --> 00:00:05,000\n안녕하세요! 오늘 게임을 시작해보겠습니다.\n\n2\n00:00:05,500 --> 00:00:09,000\n이번 레벨은 정말 어려울 것 같아요.",
    translated: "1\n00:00:01,000 --> 00:00:05,000\nHello! Let's start the game today.\n\n2\n00:00:05,500 --> 00:00:09,000\nThis level looks really difficult."
  });

  useEffect(() => {
    const storedFileInfo = sessionStorage.getItem('processingFile');
    if (!storedFileInfo) {
      navigate('/upload');
      return;
    }
    
    setFileInfo(JSON.parse(storedFileInfo));
  }, [navigate]);

  const handleDownload = (type: 'original' | 'translated') => {
    const content = subtitlePreview[type];
    const fileName = `${fileInfo?.name?.split('.')[0] || 'subtitles'}_${type}.srt`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download started",
      description: `${fileName} is being downloaded.`
    });
  };

  const handleProcessAnother = () => {
    sessionStorage.removeItem('processingFile');
    navigate('/upload');
  };

  if (!fileInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link to="/process" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Processing
            </Link>
          </div>
          
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-vod-success rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Subtitles <span className="text-gradient">Generated!</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Your SRT files are ready for download
            </p>
          </div>
          
          {/* File Info Summary */}
          <div className="vod-card p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-vod-primary mb-2">
                  {fileInfo.name}
                </div>
                <p className="text-muted-foreground">Original File</p>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-vod-secondary mb-2">
                  {fileInfo.options.language}
                </div>
                <p className="text-muted-foreground">Source Language</p>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-vod-success mb-2">
                  2 Files
                </div>
                <p className="text-muted-foreground">SRT Generated</p>
              </div>
            </div>
          </div>
          
          {/* Download Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Original Language */}
            <div className="vod-card p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-vod-primary rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Original Subtitles</h3>
                  <p className="text-muted-foreground">{fileInfo.options.language} language</p>
                </div>
              </div>
              
              <div className="bg-background/50 rounded-lg p-4 mb-6 max-h-40 overflow-y-auto">
                <pre className="text-sm whitespace-pre-wrap font-mono">
                  {subtitlePreview.original}
                </pre>
              </div>
              
              <Button onClick={() => handleDownload('original')} className="vod-button w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Original SRT
              </Button>
            </div>
            
            {/* English Translation */}
            <div className="vod-card p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-vod-success rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">English Translation</h3>
                  <p className="text-muted-foreground">Translated subtitles</p>
                </div>
              </div>
              
              <div className="bg-background/50 rounded-lg p-4 mb-6 max-h-40 overflow-y-auto">
                <pre className="text-sm whitespace-pre-wrap font-mono">
                  {subtitlePreview.translated}
                </pre>
              </div>
              
              <Button onClick={() => handleDownload('translated')} className="vod-button-accent w-full">
                <Download className="w-4 h-4 mr-2" />
                Download English SRT
              </Button>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
            <Button onClick={handleProcessAnother} size="lg" className="vod-button-secondary">
              <Upload className="w-5 h-5 mr-2" />
              Process Another File
            </Button>
            
            <Button variant="outline" size="lg" className="bg-card/50">
              <Star className="w-5 h-5 mr-2" />
              Rate Quality
            </Button>
          </div>
          
          {/* Quality Metrics */}
          <div className="vod-card p-8">
            <h3 className="text-lg font-semibold mb-6">Processing Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-vod-success mb-2">98%</div>
                <p className="text-sm text-muted-foreground">Confidence Score</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-vod-primary mb-2">247</div>
                <p className="text-sm text-muted-foreground">Words Detected</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-vod-secondary mb-2">2:15</div>
                <p className="text-sm text-muted-foreground">Duration</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-vod-accent mb-2">32s</div>
                <p className="text-sm text-muted-foreground">Process Time</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Results;
