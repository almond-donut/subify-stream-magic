
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Play, ArrowRight, Zap, Globe, Clock } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-10">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Hero Badge */}
          <div className="inline-flex items-center space-x-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <Zap className="w-4 h-4 text-vod-accent" />
            <span className="text-sm text-muted-foreground">Built for Streamers, By Streamers</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Turn <span className="text-gradient">Korean/Japanese/Chinese</span> VODs into Perfect Subtitles
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Generate SRT subtitle files in minutes with AI-powered transcription and translation
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link to="/upload">
              <Button size="lg" className="vod-button text-lg px-8 py-4">
                Start Converting Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 bg-card/30 backdrop-blur-sm border-border/50 hover:bg-card/50">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="vod-card p-6 text-center">
              <div className="w-12 h-12 vod-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">Process hours of content in minutes with our AI-powered engine</p>
            </div>
            
            <div className="vod-card p-6 text-center">
              <div className="w-12 h-12 bg-vod-success rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Multi-Language</h3>
              <p className="text-muted-foreground">Support for Korean, Japanese, Chinese with English translation</p>
            </div>
            
            <div className="vod-card p-6 text-center">
              <div className="w-12 h-12 bg-vod-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Perfect Timing</h3>
              <p className="text-muted-foreground">Accurate timestamps and seamless synchronization</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
