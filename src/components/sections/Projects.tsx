import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sword, Shield, Scroll, X, ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '../../data/projects';

interface ProjectDetailsProps {
  project: typeof projects[0];
  onClose: () => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-lg bg-gray-900/90 border border-red-900/50"
      >
        {/* Close Button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-red-900/50 text-red-500 hover:bg-red-800/50"
        >
          <X className="w-6 h-6" />
        </motion.button>

        <div className="p-8">
          {/* Project Title */}
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-targaryen text-red-500 mb-4"
          >
            {project.title}
          </motion.h2>

          {/* Image Gallery */}
          <div className="relative mb-8 rounded-lg overflow-hidden group">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-video"
            >
              <img
                src={project.images[currentImageIndex]}
                alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </motion.div>

            {/* Navigation Arrows */}
            {project.images.length > 1 && (
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </>
            )}

            {/* Image Counter */}
            {project.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 text-white text-sm">
                {currentImageIndex + 1} / {project.images.length}
              </div>
            )}
          </div>

          {/* Project Details */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-targaryen text-red-400 mb-4">The Quest</h3>
              <p className="text-gray-300 mb-6">{project.details.challenge}</p>

              <h3 className="text-2xl font-targaryen text-red-400 mb-4">The Solution</h3>
              <p className="text-gray-300 mb-6">{project.details.solution}</p>

              <h3 className="text-2xl font-targaryen text-red-400 mb-4">The Impact</h3>
              <p className="text-gray-300 mb-6">{project.details.impact}</p>
            </div>

            <div>
              {/* Technologies */}
              <div className="mb-8">
                <h3 className="text-2xl font-targaryen text-red-400 mb-4">Arsenal</h3>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech) => (
                    <motion.span
                      key={tech}
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 rounded-full bg-red-900/20 border border-red-900/50 text-red-400"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div>
                <h3 className="text-2xl font-targaryen text-red-400 mb-4">Portals</h3>
                <div className="flex gap-4">
                  {project.links.live && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-lg bg-red-900/20 border border-red-900/50 text-red-400 hover:bg-red-800/30 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Visit Realm
                    </motion.a>
                  )}
                  {project.links.github && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-lg bg-red-900/20 border border-red-900/50 text-red-400 hover:bg-red-800/30 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                      View Scrolls
                    </motion.a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectCard: React.FC<{
  project: typeof projects[0];
  onSelect: () => void;
}> = ({ project, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      onClick={onSelect}
      className="group relative overflow-hidden rounded-lg bg-black/40 backdrop-blur-sm border border-red-900/30 cursor-pointer"
    >
      {/* Medieval Ornaments */}
      <div className="absolute top-0 left-0 w-16 h-16">
        <Shield className="absolute top-2 left-2 w-6 h-6 text-red-600/40" />
      </div>
      <div className="absolute top-0 right-0 w-16 h-16">
        <Sword className="absolute top-2 right-2 w-6 h-6 text-red-600/40" />
      </div>

      {/* Project Image */}
      <div className="relative h-64 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"
          whileHover={{ opacity: 0.8 }}
        />
        <motion.img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Animated Fire Particles */}
        <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1"
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                y: -100,
                x: Math.random() * 20 - 10,
              }}
              transition={{
                duration: 1 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                bottom: '0%',
                background: `radial-gradient(circle, rgba(239,68,68,${Math.random() * 0.7 + 0.3}) 0%, rgba(239,68,68,0) 70%)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6 relative z-30">
        <motion.h3
          className="text-2xl font-targaryen mb-2 text-red-500 group-hover:text-red-400 transition-colors"
        >
          {project.title}
        </motion.h3>
        <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-sm bg-red-900/20 border border-red-900/30 rounded-full text-red-400"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-3 py-1 text-sm bg-red-900/20 border border-red-900/30 rounded-full text-red-400">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* View Details Button */}
        <motion.div
          whileHover={{ x: 5 }}
          className="flex items-center gap-2 text-red-500 group-hover:text-red-400 transition-colors"
        >
          <Scroll className="w-4 h-4" />
          <span>View Details</span>
        </motion.div>
      </div>

      {/* Medieval Border Effect */}
      <div className="absolute inset-0 border-2 border-red-900/20 rounded-lg pointer-events-none">
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-600/40" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-600/40" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-600/40" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-600/40" />
      </div>
    </motion.div>
  );
};

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="projects" className="relative py-32 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80')] bg-fixed opacity-5" />
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-red-900/20 to-transparent"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            animate={{
              rotateZ: [0, 5, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sword className="w-20 h-20 text-red-600 mx-auto mb-6" />
          </motion.div>
          <h2 className="text-6xl font-targaryen text-red-600 mb-6">
            Conquered Realms
          </h2>
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-red-900 via-red-600 to-red-900 mx-auto"
            animate={{
              scaleX: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetails
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};