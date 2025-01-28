export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  technologies: string[];
  links: {
    live?: string;
    github?: string;
  };
  details: {
    challenge: string;
    solution: string;
    impact: string;
  };
  images: string[];
  featured: boolean;
}

const projectsData: Project[] = [
  {
    id: 'Rule-based Nepali Arpabet Converter',
    title: 'Rule-based Nepali Arpabet Converter',
    description: 'A tool for converting Nepali text to Arpabet phonemes',
    thumbnail: '/images/Nepali_Arpabet.webp',
    category: 'Speech Technology',
    technologies: ['Python', 'NLP', 'TTS', 'ASR'],
    links: {
      live: 'https://nepali-arpabet.vercel.app'
    },
    details: {
      challenge: 'Developing a tool for converting Nepali text to Arpabet phonemes',
      solution: 'Developed a rule-based approach for converting Nepali text to Arpabet phonemes',
      impact: 'Simplified the process of converting Nepali text to Arpabet phonemes'
    },
    images: [
      '/images/Nepali_Arpabet.webp',    
    ],
    featured: true
  },
  // ... rest of the projects data ...
];

// Process projects to ensure all have images
export const projects: Project[] = projectsData.map(project => ({
  ...project,
  thumbnail: project.thumbnail || `https://source.unsplash.com/800x600/?${encodeURIComponent(project.category)}`,
  images: project.images?.length 
    ? project.images 
    : [`https://source.unsplash.com/1200x800/?${encodeURIComponent(project.category)}`]
}));