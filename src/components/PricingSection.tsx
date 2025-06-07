
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Star, Zap, Crown } from 'lucide-react';

const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for trying out our service",
      icon: Star,
      features: [
        "3 files per month",
        "Max 10 minutes per file",
        "Basic quality transcription",
        "Standard processing time",
        "Community support"
      ],
      buttonText: "Get Started",
      buttonClass: "vod-button-secondary",
      popular: false
    },
    {
      name: "Basic",
      price: "$5",
      period: "per month",
      description: "Great for regular VOD watchers",
      icon: Zap,
      features: [
        "50 files per month",
        "Max 60 minutes per file",
        "High quality transcription",
        "Priority processing",
        "Email support",
        "Batch processing"
      ],
      buttonText: "Choose Basic",
      buttonClass: "vod-button",
      popular: true
    },
    {
      name: "Pro",
      price: "$15",
      period: "per month",
      description: "For content creators and streamers",
      icon: Crown,
      features: [
        "Unlimited files",
        "No time limits",
        "Ultra-high quality AI",
        "Instant processing",
        "Priority support",
        "Custom terminology",
        "API access",
        "Advanced editing tools"
      ],
      buttonText: "Choose Pro",
      buttonClass: "vod-button-accent",
      popular: false
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Simple <span className="text-gradient">Pricing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your subtitle generation needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div key={plan.name} className={`vod-card p-8 relative animate-fade-in ${plan.popular ? 'ring-2 ring-vod-primary scale-105' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-vod-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <div className="w-16 h-16 vod-gradient rounded-xl flex items-center justify-center mx-auto mb-4">
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                
                <Button className={`${plan.buttonClass} w-full`}>
                  {plan.buttonText}
                </Button>
              </div>
              
              <div className="space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-vod-success flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
