import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const StatsSection = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
      {stats?.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="bg-white/75 backdrop-blur-md rounded-[18px] p-6 md:p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full mb-4">
            <Icon name={stat?.icon} size={24} color="var(--color-primary)" />
          </div>
          <div className="text-3xl md:text-4xl font-bold text-primary mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            {stat?.value}
          </div>
          <div className="text-sm md:text-base text-muted-foreground font-medium">
            {stat?.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsSection;