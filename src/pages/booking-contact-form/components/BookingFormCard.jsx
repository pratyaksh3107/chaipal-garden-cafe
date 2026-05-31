import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';


const BookingFormCard = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    partySize: '',
    date: '',
    time: '',
    inquiryType: '',
    specialRequests: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const partySizeOptions = [
    { value: '1', label: '1 Person' },
    { value: '2', label: '2 People' },
    { value: '3', label: '3 People' },
    { value: '4', label: '4 People' },
    { value: '5', label: '5 People' },
    { value: '6', label: '6 People' },
    { value: '7', label: '7 People' },
    { value: '8', label: '8 People' },
    { value: '9+', label: '9+ People (Group)' }
  ];

  const inquiryTypeOptions = [
    { value: 'reservation', label: 'Table Reservation' },
    { value: 'menu', label: 'Menu Inquiry' },
    { value: 'event', label: 'Event Booking' },
    { value: 'general', label: 'General Question' }
  ];

  const timeSlotOptions = [
    { value: '09:00', label: '9:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '13:00', label: '1:00 PM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '16:00', label: '4:00 PM' },
    { value: '17:00', label: '5:00 PM' },
    { value: '18:00', label: '6:00 PM' },
    { value: '19:00', label: '7:00 PM' },
    { value: '20:00', label: '8:00 PM' },
    { value: '21:00', label: '9:00 PM' },
    { value: '22:00', label: '10:00 PM' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/?.test(formData?.phone?.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number';
    }

    if (!formData?.inquiryType) {
      newErrors.inquiryType = 'Please select an inquiry type';
    }

    if (formData?.inquiryType === 'reservation' || formData?.inquiryType === 'event') {
      if (!formData?.partySize) {
        newErrors.partySize = 'Party size is required for reservations';
      }
      if (!formData?.date) {
        newErrors.date = 'Date is required for reservations';
      }
      if (!formData?.time) {
        newErrors.time = 'Time is required for reservations';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const generateWhatsAppMessage = () => {
    let message = `Hello ChaiPal Garden Cafe!\n\n`;
    
    if (formData?.inquiryType === 'reservation') {
      message += `I would like to make a table reservation:\n\n`;
      message += `Name: ${formData?.name}\n`;
      message += `Party Size: ${formData?.partySize} people\n`;
      message += `Date: ${new Date(formData.date)?.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}\n`;
      message += `Time: ${formData?.time}\n`;
      message += `Phone: ${formData?.phone}\n`;
      message += `Email: ${formData?.email}\n`;
      if (formData?.specialRequests) {
        message += `\nSpecial Requests: ${formData?.specialRequests}\n`;
      }
    } else if (formData?.inquiryType === 'event') {
      message += `I would like to inquire about event booking:\n\n`;
      message += `Name: ${formData?.name}\n`;
      message += `Expected Guests: ${formData?.partySize} people\n`;
      message += `Preferred Date: ${new Date(formData.date)?.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}\n`;
      message += `Preferred Time: ${formData?.time}\n`;
      message += `Phone: ${formData?.phone}\n`;
      message += `Email: ${formData?.email}\n`;
      if (formData?.specialRequests) {
        message += `\nEvent Details: ${formData?.specialRequests}\n`;
      }
    } else if (formData?.inquiryType === 'menu') {
      message += `I have a question about your menu:\n\n`;
      message += `Name: ${formData?.name}\n`;
      message += `Phone: ${formData?.phone}\n`;
      message += `Email: ${formData?.email}\n`;
      if (formData?.specialRequests) {
        message += `\nQuestion: ${formData?.specialRequests}\n`;
      }
    } else {
      message += `I have a general inquiry:\n\n`;
      message += `Name: ${formData?.name}\n`;
      message += `Phone: ${formData?.phone}\n`;
      message += `Email: ${formData?.email}\n`;
      if (formData?.specialRequests) {
        message += `\nMessage: ${formData?.specialRequests}\n`;
      }
    }

    return encodeURIComponent(message);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const whatsappMessage = generateWhatsAppMessage();
      const whatsappUrl = `https://wa.me/919876543210?text=${whatsappMessage}`;
      window.open(whatsappUrl, '_blank');
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        partySize: '',
        date: '',
        time: '',
        inquiryType: '',
        specialRequests: ''
      });
      setIsSubmitting(false);
    }, 500);
  };

  const showReservationFields = formData?.inquiryType === 'reservation' || formData?.inquiryType === 'event';

  return (
    <div className="w-full bg-white/75 backdrop-blur-md rounded-3xl shadow-xl p-6 md:p-8 lg:p-10">
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1B1B1B] mb-2 md:mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
          Book Your Experience
        </h2>
        <p className="text-sm md:text-base text-[#4A5568]">
          Reserve your table or send us an inquiry. We'll connect with you via WhatsApp.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          <Input
            label="Full Name"
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData?.name}
            onChange={handleInputChange}
            error={errors?.name}
            required
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="your.email@example.com"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          <Input
            label="Phone Number"
            type="tel"
            name="phone"
            placeholder="98765 43210"
            value={formData?.phone}
            onChange={handleInputChange}
            error={errors?.phone}
            required
          />

          <Select
            label="Inquiry Type"
            placeholder="Select inquiry type"
            options={inquiryTypeOptions}
            value={formData?.inquiryType}
            onChange={(value) => handleSelectChange('inquiryType', value)}
            error={errors?.inquiryType}
            required
          />
        </div>

        {showReservationFields && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
              <Select
                label="Party Size"
                placeholder="Select size"
                options={partySizeOptions}
                value={formData?.partySize}
                onChange={(value) => handleSelectChange('partySize', value)}
                error={errors?.partySize}
                required
              />

              <Input
                label="Preferred Date"
                type="date"
                name="date"
                value={formData?.date}
                onChange={handleInputChange}
                error={errors?.date}
                min={new Date()?.toISOString()?.split('T')?.[0]}
                required
              />

              <Select
                label="Preferred Time"
                placeholder="Select time"
                options={timeSlotOptions}
                value={formData?.time}
                onChange={(value) => handleSelectChange('time', value)}
                error={errors?.time}
                required
              />
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-[#1B1B1B] mb-2">
            Special Requests or Questions
          </label>
          <textarea
            name="specialRequests"
            value={formData?.specialRequests}
            onChange={handleInputChange}
            placeholder="Any dietary restrictions, special occasions, or questions..."
            rows="4"
            className="w-full px-4 py-3 rounded-xl border border-[rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-[#3E5B3A] focus:border-transparent transition-all duration-200 resize-none text-sm md:text-base"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2">
          <Button
            type="submit"
            variant="default"
            size="lg"
            iconName="MessageCircle"
            iconPosition="left"
            loading={isSubmitting}
            fullWidth
            className="bg-[#3E5B3A] hover:bg-[#2D4A27] text-white"
          >
            {isSubmitting ? 'Sending...' : 'Send via WhatsApp'}
          </Button>

          <Button
            type="button"
            variant="outline"
            size="lg"
            iconName="Phone"
            iconPosition="left"
            onClick={() => window.location.href = 'tel:+919876543210'}
            className="border-[#3E5B3A] text-[#3E5B3A] hover:bg-[#3E5B3A] hover:text-white"
          >
            Call Now
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingFormCard;