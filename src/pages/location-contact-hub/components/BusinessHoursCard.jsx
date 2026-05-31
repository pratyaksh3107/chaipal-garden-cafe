import React from 'react';
import Icon from '../../../components/AppIcon';

const BusinessHoursCard = ({ hours }) => {
  const getCurrentDayStatus = () => {
    const now = new Date();
    const currentDay = now?.toLocaleDateString('en-US', { weekday: 'long' });
    const currentTime = now?.getHours() * 60 + now?.getMinutes();
    
    const todayHours = hours?.find(h => h?.day === currentDay);
    if (!todayHours) return { isOpen: false, message: 'Closed today' };
    
    if (todayHours?.closed) return { isOpen: false, message: 'Closed today' };
    
    const [openHour, openMin] = todayHours?.open?.split(':')?.map(Number);
    const [closeHour, closeMin] = todayHours?.close?.split(':')?.map(Number);
    const openTime = openHour * 60 + openMin;
    const closeTime = closeHour * 60 + closeMin;
    
    if (currentTime >= openTime && currentTime < closeTime) {
      return { isOpen: true, message: `Open until ${todayHours?.close}` };
    }
    
    return { isOpen: false, message: `Opens at ${todayHours?.open}` };
  };

  const status = getCurrentDayStatus();

  return (
    <div className="bg-white/75 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-md">
      <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon name="Clock" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="text-base md:text-lg font-semibold text-foreground" style={{ fontFamily: 'Playfair Display, serif' }}>
            Business Hours
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <div className={`w-2 h-2 rounded-full ${status?.isOpen ? 'bg-success' : 'bg-error'}`} />
            <span className={`text-xs md:text-sm font-medium ${status?.isOpen ? 'text-success' : 'text-error'}`}>
              {status?.message}
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-2 md:space-y-3">
        {hours?.map((schedule, index) => (
          <div key={index} className="flex justify-between items-center text-sm md:text-base">
            <span className="text-muted-foreground font-medium">{schedule?.day}</span>
            <span className="text-foreground">
              {schedule?.closed ? 'Closed' : `${schedule?.open} - ${schedule?.close}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessHoursCard;