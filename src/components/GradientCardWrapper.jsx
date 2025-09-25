import React from 'react';
import './GradientCardWrapper.css';

const GradientCardWrapper = ({ 
  children, 
  className = '', 
  gradientType = 'default',
  intensity = 'medium',
  size = 'medium'
}) => {
  const wrapperClasses = [
    'gradient-card-wrapper',
    `gradient-${gradientType}`,
    `intensity-${intensity}`,
    `size-${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      <div className="gradient-card-inner">
        {children}
      </div>
    </div>
  );
};

export default GradientCardWrapper;
