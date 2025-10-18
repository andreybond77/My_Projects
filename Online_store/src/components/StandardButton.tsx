// src/components/StandardButton.tsx
import React, { memo } from 'react';

interface StandardButtonProps {
  BGcolor: string;
  icon?: string;
  title: string;
  btnType: 'iconButton' | 'textButton';
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const StandardButton: React.FC<StandardButtonProps> = memo(({
  BGcolor,
  icon,
  title,
  btnType,
  onClick,
  className = '',
  disabled = false,
}) => {
  const baseClasses = `btn btn-${BGcolor} ${className}`.trim();

  return (
    <button
      type="button"
      className={baseClasses}
      onClick={onClick}
      title={title}
      disabled={disabled}
    >
      {btnType === 'iconButton' && icon ? (
        <i className={`bi bi-${icon}`}></i>
      ) : (
        title
      )}
    </button>
  );
});

export default StandardButton;