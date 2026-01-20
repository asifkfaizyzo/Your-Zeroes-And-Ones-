// components/CustomSelect.jsx
"use client";

import { useId } from 'react';
import Select from 'react-select';
import CategoryIcon from './CategoryIcon';

export default function CustomSelect({ 
  options, 
  value, 
  onChange, 
  placeholder, 
  isDisabled = false,
  showIcon = false,
  iconMap = {},
  isClearable = false,
}) {
  // Generate stable ID for SSR/hydration
  const instanceId = useId();

  const customStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: '42px',
      borderColor: state.isFocused ? '#3b82f6' : '#cbd5e1',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : 'none',
      '&:hover': {
        borderColor: '#94a3b8'
      },
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      backgroundColor: isDisabled ? '#f1f5f9' : 'white',
      borderRadius: '8px',
      transition: 'all 0.2s',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected 
        ? '#2563eb' 
        : state.isFocused 
        ? '#eff6ff' 
        : 'white',
      color: state.isSelected ? 'white' : '#1e293b',
      cursor: 'pointer',
      padding: '10px 16px',
      fontWeight: state.isSelected ? '600' : '500',
      transition: 'all 0.15s',
      '&:active': {
        backgroundColor: '#2563eb',
        color: 'white',
      }
    }),
    menu: (base) => ({
      ...base,
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e2e8f0',
      marginTop: '4px',
      zIndex: 9999,
    }),
    menuList: (base) => ({
      ...base,
      padding: '4px',
      maxHeight: '240px',
      '::-webkit-scrollbar': {
        width: '8px',
      },
      '::-webkit-scrollbar-track': {
        background: '#f1f5f9',
        borderRadius: '4px',
      },
      '::-webkit-scrollbar-thumb': {
        background: '#cbd5e1',
        borderRadius: '4px',
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: '#94a3b8',
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: '#1e293b',
      fontWeight: 500,
    }),
    placeholder: (base) => ({
      ...base,
      color: '#94a3b8',
      fontWeight: 400,
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: '#94a3b8',
      transition: 'all 0.2s',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      '&:hover': {
        color: '#64748b',
      }
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    clearIndicator: (base) => ({
      ...base,
      color: '#94a3b8',
      cursor: 'pointer',
      '&:hover': {
        color: '#ef4444',
      }
    }),
  };

  const formatOptionLabel = ({ label, value: optValue }) => {
    const icon = iconMap[optValue];
    
    return (
      <div className="flex items-center gap-2.5">
        {showIcon && icon && (
          <CategoryIcon icon={icon} className="w-5 h-5 flex-shrink-0" />
        )}
        <span className="truncate">{label}</span>
      </div>
    );
  };

  return (
    <Select
      instanceId={instanceId}
      value={value}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      isDisabled={isDisabled}
      isClearable={isClearable}
      styles={customStyles}
      formatOptionLabel={showIcon ? formatOptionLabel : undefined}
      classNamePrefix="custom-select"
      menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
      menuPosition="fixed"
      theme={(theme) => ({
        ...theme,
        borderRadius: 8,
        colors: {
          ...theme.colors,
          primary: '#3b82f6',
          primary25: '#eff6ff',
          primary50: '#dbeafe',
        },
      })}
    />
  );
}