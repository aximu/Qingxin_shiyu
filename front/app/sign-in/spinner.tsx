import React from 'react';
import Image from 'next/image';

const CircularImage: React.FC = () => {
  const containerStyle = {
    height: '200px',
    animation: 'spin 4s linear infinite',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '80px'
  };

  const imgStyle = {
    borderRadius: '50%',
  };

  return (
    <div style={containerStyle}>
      {/* <Image height={200} width={200} src="https://www.promptior.ai/assets/promptior-icon-f9f2bdd1.webp" alt="Circular Image" style={imgStyle} /> */}
      <Image height={200} width={200} src="/bot_icon.webp" alt="Circular Image" style={imgStyle} />
    </div>
  );
};

export default CircularImage;

