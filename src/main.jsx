import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource-variable/outfit';
import App from './App.jsx';
import './styles.css';

document.documentElement.classList.add('js');
createRoot(document.getElementById('root')).render(<StrictMode><BrowserRouter><App /></BrowserRouter></StrictMode>);
