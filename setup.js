const fs = require('fs');
const path = require('path');

// --- THE ARCHITECT SCRIPT (FIXED) ---
const rootDir = process.cwd();

// 1. UTILITY FUNCTIONS
function createDir(dirPath) {
  const fullPath = path.join(rootDir, dirPath);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

function createFile(filePath, content) {
  const fullPath = path.join(rootDir, filePath);
  fs.writeFileSync(fullPath, content.trim());
  console.log(`Created file: ${filePath}`);
}

// 2. DEFINE FILE CONTENTS

const packageJson = `
{
  "name": "apex-portfolio",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.1.0",
    "react": "^18",
    "react-dom": "^18",
    "framer-motion": "^11.0.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "postcss": "^8",
    "tailwindcss": "^3.3.0",
    "typescript": "^5"
  }
}
`;

const tsConfig = `
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
`;

const tailwindConfig = `
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-playfair)'], 
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
`;

const postcssConfig = `
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`;

const nextConfig = `
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com'],
    },
};

module.exports = nextConfig;
`;

const globalCss = `
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 255, 255, 255;
  --background-start-rgb: 5, 5, 5;
  --background-end-rgb: 0, 0, 0;
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
  cursor: none;
}

::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #050505; 
}
::-webkit-scrollbar-thumb {
  background: #333; 
  border-radius: 4px;
}
`;

// FIXED: Removed the extra backslash that caused the SyntaxError
const layoutTsx = `
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "APEX | Future Design Leader",
  description: "Portfolio of the future leader of web design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={\`\${inter.variable} \${playfair.variable} font-sans antialiased\`}>{children}</body>
    </html>
  );
}
`;

const apiRouteTs = `
import { NextResponse } from 'next/server';

const projects = [
  {
    id: '1',
    client: 'DRAKE',
    title: 'The OVO Soundscape',
    category: 'Immersive Experience',
    image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop',
    color: '#D4AF37', 
    description: 'A complete digital overhaul for the OVO brand.'
  },
  {
    id: '2',
    client: 'NFL',
    title: 'Sunday Night Overdrive',
    category: 'Broadcast Branding',
    image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=2026&auto=format&fit=crop',
    color: '#013369', 
    description: 'Dynamic, real-time 3D scoreboards.'
  },
  {
    id: '3',
    client: 'SNAPPLE',
    title: 'Pop the Cap',
    category: 'Viral Campaign',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=2070&auto=format&fit=crop',
    color: '#EB3C48', 
    description: 'Interactive mobile AR game.'
  },
  {
    id: '4',
    client: 'NBA',
    title: 'Courtside VR',
    category: 'Product Design',
    image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2069&auto=format&fit=crop',
    color: '#C9082A',
    description: 'VR interface allowing fans to sit courtside.'
  },
  {
    id: '5',
    client: 'WNBA',
    title: 'Her Time is Now',
    category: 'Rebrand',
    image: 'https://images.unsplash.com/photo-1519766304800-c9519d0092bf?q=80&w=2115&auto=format&fit=crop',
    color: '#FA4616', 
    description: 'Typography-led rebrand.'
  },
   {
    id: '6',
    client: 'NIKE',
    title: 'Velocity System',
    category: 'Global Commercial',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop',
    color: '#CCFF00', 
    description: 'High-octane commercial mixing live action with VFX.'
  }
];

export async function GET() {
  return NextResponse.json(projects);
}
`;

const customCursorTsx = `
'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', mouseMove);
    return () => window.removeEventListener('mousemove', mouseMove);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference"
        animate={{ x: mousePosition.x - 8, y: mousePosition.y - 8 }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-white rounded-full pointer-events-none z-[99] mix-blend-difference"
        animate={{ x: mousePosition.x - 24, y: mousePosition.y - 24 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      />
    </>
  );
}
`;

const projectGalleryTsx = `
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Project {
  id: string;
  client: string;
  title: string;
  category: string;
  image: string;
  color: string;
  description: string;
}

export default function ProjectGallery({ projects }: { projects: Project[] }) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <section className="relative w-full min-h-screen bg-[#050505] py-20 px-4 md:px-12 overflow-hidden">
        
      <div className="absolute inset-0 pointer-events-none transition-colors duration-700 ease-in-out opacity-20"
           style={{
             background: hoveredProject 
               ? \`radial-gradient(circle at 50% 50%, \${projects.find(p => p.id === hoveredProject)?.color}, transparent 70%)\` 
               : 'transparent'
           }}
      />

      <div className="max-w-7xl mx-auto z-10 relative">
        <h2 className="text-white text-xs tracking-[0.3em] uppercase mb-12 border-b border-gray-800 pb-4">
          Selected Works /// 2024-2025
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative cursor-none"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative h-[500px] w-full overflow-hidden rounded-sm">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-500 z-10" />
                
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                
                <div className="absolute bottom-0 left-0 p-8 z-20 w-full mix-blend-difference">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: hoveredProject === project.id ? 'auto' : 0 }}
                    className="overflow-hidden"
                  >
                     <p className="text-sm font-bold uppercase mb-2" style={{ color: project.color }}>
                       {project.client}
                     </p>
                  </motion.div>
                  
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 font-serif tracking-tighter">
                    {project.title}
                  </h3>
                  
                  <div className="flex justify-between items-end border-t border-white/20 pt-4 mt-4">
                     <span className="text-gray-400 text-sm">{project.category}</span>
                     <span className="text-white text-xl">↗</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
`;

const pageTsx = `
import ProjectGallery from '@/components/ProjectGallery';
import CustomCursor from '@/components/CustomCursor';

// NOTE: In a real build, fetch this from the absolute URL of your API
async function getProjects() {
  return [
      {
        id: '1',
        client: 'DRAKE',
        title: 'The OVO Soundscape',
        category: 'Immersive Experience',
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop',
        color: '#D4AF37', 
        description: '...'
      },
      {
        id: '2',
        client: 'NFL',
        title: 'Sunday Night Overdrive',
        category: 'Broadcast Branding',
        image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=2026&auto=format&fit=crop',
        color: '#013369',
        description: '...'
      },
      {
        id: '3',
        client: 'SNAPPLE',
        title: 'Pop the Cap',
        category: 'Viral Campaign',
        image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?q=80&w=1965&auto=format&fit=crop',
        color: '#EB3C48',
        description: '...'
      },
      {
        id: '4',
        client: 'NBA',
        title: 'Courtside VR',
        category: 'Product Design',
        image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2069&auto=format&fit=crop',
        color: '#C9082A',
        description: '...'
      },
      {
        id: '5',
        client: 'WNBA',
        title: 'Her Time is Now',
        category: 'Rebrand',
        image: 'https://images.unsplash.com/photo-1519766304800-c9519d0092bf?q=80&w=2115&auto=format&fit=crop',
        color: '#FA4616',
        description: '...'
      },
       {
        id: '6',
        client: 'NIKE',
        title: 'Velocity System',
        category: 'Global Commercial',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop',
        color: '#CCFF00',
        description: '...'
      }
  ];
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="bg-[#050505] min-h-screen">
      <CustomCursor />
      
      {/* HERO SECTION */}
      <section className="h-screen flex flex-col justify-center items-center relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] animate-pulse" />
        
        <div className="z-10 text-center mix-blend-difference">
          <h1 className="text-white text-6xl md:text-9xl font-black tracking-tighter mb-4 leading-none font-sans">
            FUTURE <br /> ARCHITECT
          </h1>
          <p className="text-gray-400 text-lg md:text-xl uppercase tracking-[0.5em] font-sans">
            Digital Design Leader
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-[10px] text-white uppercase tracking-widest">Explore</span>
            <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* PORTFOLIO GRID */}
      <ProjectGallery projects={projects} />
      
      {/* FOOTER */}
      <footer className="py-20 text-center border-t border-white/10">
        <h2 className="text-4xl text-white font-bold mb-8 font-serif">READY TO BREAK THE INTERNET?</h2>
        <button className="px-8 py-4 bg-white text-black font-bold text-lg hover:scale-105 transition-transform uppercase tracking-wider">
            Initiate Project
        </button>
      </footer>
    </main>
  );
}
`;

// 3. EXECUTION
console.log("Initializing Apex Portfolio Architecture...");

// Create Directories
createDir('app');
createDir('app/api');
createDir('app/api/projects');
createDir('components');
createDir('public');

// Create Configuration Files
createFile('package.json', packageJson);
createFile('tsconfig.json', tsConfig);
createFile('tailwind.config.ts', tailwindConfig);
createFile('postcss.config.js', postcssConfig);
createFile('next.config.js', nextConfig);

// Create App Files
createFile('app/globals.css', globalCss);
createFile('app/layout.tsx', layoutTsx);
createFile('app/page.tsx', pageTsx);
createFile('app/api/projects/route.ts', apiRouteTs);

// Create Components
createFile('components/CustomCursor.tsx', customCursorTsx);
createFile('components/ProjectGallery.tsx', projectGalleryTsx);

console.log("------------------------------------------------");
console.log("✓ Architecture Complete.");
console.log("NEXT STEPS:");
console.log("1. Run 'npm install'");
console.log("2. Run 'npm run dev'");
console.log("------------------------------------------------");