import React from 'react';
import Icon from '../../../components/AppIcon';

const ContactInfoCard = () => {
  const contactDetails = [
    {
      icon: 'MapPin',
      title: 'Visit Us',
      content: 'Sitapura Industrial Area, Jaipur, Rajasthan 302022',
      action: () => window.open('https://www.google.com/maps?q=26.7606,75.8472&z=14&output=embed', '_blank')
    },
    {
      icon: 'Phone',
      title: 'Call Us',
      content: '+91 98765 43210',
      action: () => window.location.href = 'tel:+919876543210'
    },
    {
      icon: 'Mail',
      title: 'Email Us',
      content: 'hello@chaipalgarden.com',
      action: () => window.location.href = 'mailto:hello@chaipalgarden.com'
    },
    {
      icon: 'Clock',
      title: 'Opening Hours',
      content: 'Mon-Sun: 9:00 AM - 10:00 PM',
      action: null
    }
  ];

  const socialLinks = [
    { icon: 'Instagram', url: 'https://instagram.com/chaipalgarden', label: 'Instagram' },
    { icon: 'Facebook', url: 'https://facebook.com/chaipalgarden', label: 'Facebook' },
    { icon: 'Twitter', url: 'https://twitter.com/chaipalgarden', label: 'Twitter' }
  ];

  return (
    <div className="w-full space-y-6 md:space-y-8">
      <div className="bg-white/75 backdrop-blur-md rounded-3xl shadow-xl p-6 md:p-8">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1B1B1B] mb-4 md:mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          Get In Touch
        </h3>

        <div className="space-y-4 md:space-y-5">
          {contactDetails?.map((detail, index) => (
            <div
              key={index}
              onClick={detail?.action}
              className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-300 ${
                detail?.action ? 'cursor-pointer hover:bg-[#3E5B3A]/5 hover:shadow-md' : ''
              }`}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#3E5B3A]/10 flex items-center justify-center">
                <Icon name={detail?.icon} size={24} color="#3E5B3A" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm md:text-base font-semibold text-[#1B1B1B] mb-1">
                  {detail?.title}
                </h4>
                <p className="text-sm md:text-base text-[#4A5568] break-words">
                  {detail?.content}
                </p>
              </div>
              {detail?.action && (
                <Icon name="ChevronRight" size={20} color="#3E5B3A" className="flex-shrink-0 mt-1" />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white/75 backdrop-blur-md rounded-3xl shadow-xl p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-bold text-[#1B1B1B] mb-4 md:mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          Connect With Us
        </h3>

        <div className="flex flex-wrap gap-3 md:gap-4">
          {socialLinks?.map((social, index) => (
            <button
              key={index}
              onClick={() => window.open(social?.url, '_blank')}
              className="flex items-center gap-2 px-4 md:px-6 py-3 rounded-xl bg-[#3E5B3A]/10 hover:bg-[#3E5B3A] hover:text-white text-[#3E5B3A] transition-all duration-300 hover:shadow-lg"
              aria-label={social?.label}
            >
              <Icon name={social?.icon} size={20} />
              <span className="text-sm md:text-base font-medium">{social?.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-[rgba(0,0,0,0.08)]">
          <p className="text-xs md:text-sm text-[#4A5568] text-center">
            Follow us for daily updates, special offers, and behind-the-scenes moments from ChaiPal Garden Cafe
          </p>
        </div>
      </div>
      <div className="bg-gradient-to-br from-[#3E5B3A] to-[#2D4A27] rounded-3xl shadow-xl p-6 md:p-8 text-white">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <Icon name="MessageCircle" size={24} color="white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Quick Response Guarantee
            </h3>
            <p className="text-sm md:text-base text-white/90 mb-4">
              We respond to all WhatsApp messages within 15 minutes during business hours. For urgent reservations, please call us directly.
            </p>
            <div className="flex flex-wrap gap-2 text-xs md:text-sm">
              <span className="px-3 py-1 rounded-full bg-white/20">Fast Response</span>
              <span className="px-3 py-1 rounded-full bg-white/20">24/7 Support</span>
              <span className="px-3 py-1 rounded-full bg-white/20">Instant Confirmation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoCard;