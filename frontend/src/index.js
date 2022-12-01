import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { backgroundImageCode, backgroundColor, backgroundOpacity, backgroundGradientEffect, backgroundImage } from '@/config/config';

const root = ReactDOM.createRoot(document.getElementById('root'));
document.body.style = backgroundImage ? `background: ${backgroundImageCode}` : backgroundGradientEffect ? `background: linear-gradient(-45deg, rgba(${backgroundColor.extraLight}, ${backgroundOpacity/2}), rgba(${backgroundColor.main}, ${backgroundOpacity}), rgba(${backgroundColor.extraDark}, ${backgroundOpacity/2}), rgba(${backgroundColor.main}, ${backgroundOpacity}) ); background-size: 400% 400%; animation: gradient 10s ease infinite` : `background-color: rgba(${backgroundColor.main}, ${backgroundOpacity});`;

root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
