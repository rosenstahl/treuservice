"use client"

import React from 'react'

interface Checkbox2Props {
  id: string;
  name?: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const Checkbox2: React.FC<Checkbox2Props> = ({
  id,
  name,
  checked,
  onChange,
  className = ""
}) => {
  return (
    <input
      id={id}
      name={name || id}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={`h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded ${className}`}
    />
  );
};

export default Checkbox2;