'use client';

import { CTAButton } from '@/components/ui/CTAButton';

const MOCK_SPONSORS = [
  {
    sponsorId: '1',
    name: 'SportTech Pro',
    website: 'https://sporttech.com',
    logoUrl: 'https://via.placeholder.com/120x60/4F46E5/FFFFFF?text=SportTech',
    description: 'Premium nohejbal equipment and gear for professionals and enthusiasts.',
  },
  {
    sponsorId: '2',
    name: 'Czech Sports Federation',
    website: 'https://czechsports.cz',
    logoUrl: 'https://via.placeholder.com/120x60/059669/FFFFFF?text=CSF',
    description: 'Supporting nohejbal development across the Czech Republic.',
  },
  {
    sponsorId: '3',
    name: 'Arena Plus',
    website: 'https://arenaplus.com',
    logoUrl: 'https://via.placeholder.com/120x60/DC2626/FFFFFF?text=Arena+',
    description: 'Modern sports facilities and court rentals for nohejbal teams.',
  },
];

export function SponsorVisibility() {
  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-textPrimary mb-4">Our Sponsors</h2>
        <p className="text-textSecondary mb-6">
          Supporting the nohejbal community with quality products and services.
        </p>
      </div>

      {/* Featured Sponsor */}
      <div className="card glass border-2 border-primary border-opacity-30">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-textPrimary">Featured Sponsor</h3>
          <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
            Premium
          </span>
        </div>
        
        <div className="flex items-center space-x-6 mb-6">
          <div className="w-24 h-12 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SportTech</span>
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-bold text-textPrimary mb-2">SportTech Pro</h4>
            <p className="text-textSecondary">
              Premium nohejbal equipment and gear for professionals and enthusiasts.
            </p>
          </div>
        </div>

        <div className="flex space-x-3">
          <CTAButton variant="primary" className="flex-1">
            🛒 Shop Now
          </CTAButton>
          <CTAButton variant="outline" className="flex-1">
            Learn More
          </CTAButton>
        </div>
      </div>

      {/* Sponsor Directory */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-textPrimary">All Sponsors</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_SPONSORS.map((sponsor) => (
            <div key={sponsor.sponsorId} className="card hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-16 h-8 bg-surface rounded flex items-center justify-center">
                  <span className="text-textSecondary text-xs font-bold">
                    {sponsor.name.split(' ').map(word => word.charAt(0)).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-textPrimary">{sponsor.name}</h4>
                  <p className="text-sm text-textSecondary mt-1">
                    {sponsor.description}
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <CTAButton variant="outline" size="sm" className="flex-1">
                  Visit Website
                </CTAButton>
                <CTAButton variant="secondary" size="sm" className="flex-1">
                  Contact
                </CTAButton>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Become a Sponsor CTA */}
      <div className="card bg-gradient-to-r from-primary to-accent text-white">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">Become a Sponsor</h3>
          <p className="mb-6 opacity-90">
            Join our community and reach passionate nohejbal players and fans.
          </p>
          <CTAButton variant="secondary" className="bg-white text-primary hover:bg-opacity-90">
            📧 Contact Us
          </CTAButton>
        </div>
      </div>
    </div>
  );
}
