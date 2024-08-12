import React from 'react';

export function RadioGroup({ children, value, onValueChange, className, ...props }: any) {
  return (
    <div className={`space-y-2 ${className}`} {...props}>
      {React.Children.map(children, child =>
        React.cloneElement(child, { 
          checked: child.props.value === value, 
          onChange: () => onValueChange(child.props.value)
        })
      )}
    </div>
  );
}

export function RadioGroupItem({ value, checked, onChange, children, className, ...props }: any) {
  return (
    <label className={`flex items-center space-x-2 cursor-pointer ${className}`}>
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
        {...props}
      />
      <span>{children}</span>
    </label>
  );
}