import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

import React from 'react';
import BtnGroup from './Components/ButtonGroup';
import TaskBoard from './Components/Taskboard';
// import Chat from './Components/chatbox/Chat'; // Assure-toi que le chemin est correct

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// Vérifie si l'élément avec l'ID 'test' existe
if (document.getElementById('test')) {
    const root = createRoot(document.getElementById('test'));
    root.render(<TaskBoard />); // Utilisation du composant TaskBoard
}

// // Exemple d'utilisation du composant Chat
// if (document.getElementById('chat')) {
//     const root = createRoot(document.getElementById('chat'));
//     root.render(<Chat />); // Assure-toi que tu utilises le bon composant ici
// }
