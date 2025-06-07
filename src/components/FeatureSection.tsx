
import React from 'react';
import { Upload, Cpu, Download, Star } from 'lucide-react';

const FeatureSection = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload Your File",
      description: "Drag & drop your Korean, Japanese, or Chinese audio/video file",
      gradient: "from-vod-primary to-vod-secondary"
    },
    {
      icon: Cpu,
      title: "AI Processing",
      description: "Our AI transcribes and translates your content with high accuracy",
      gradient: "from-vod-secondary to-vod-success"
    },
    {
      icon: Download,
      title: "Download SRT",
      description: "Get both original and English translated subtitle files",
      gradient: "from-vod-success to-vod-accent"
    },
    {
      icon: Star,
      title: "Perfect Results",
      description: "Professional-quality subtitles ready for your VOD content",
      gradient: "from-vod-accent to-vod-primary"
    }
  ];

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple, fast, and accurate subtitle generation in just four steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="vod-card p-8 text-center h-full">
                <div className={`w-16 h-16 bg-gradient-to-r ${step.gradient} rounded-xl flex items-center justify-center mx-auto mb-6`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                
                <div className="text-sm text-vod-primary font-semibold mb-2">
                  STEP {index + 1}
                </div>
                
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-border to-transparent"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
