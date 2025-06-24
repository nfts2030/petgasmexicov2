import React from 'react';

const HdpeCard = () => {
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: 'red', // Temporal para verificación
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  };

  const symbolStyle: React.CSSProperties = {
    position: 'absolute',
    width: '80%',
    height: '80%',
    backgroundImage: 'url(/img/HDPE.png)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    zIndex: 2
  };

  return (
    <div style={containerStyle}>
      <div style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url(/img/plasticos/hdpe.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.5
      }} />
      <div style={symbolStyle} />
    </div>
  );
};

export default HdpeCard;
