import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDarkMode(prefersDark)
    
    const handleScroll = () => {
      const sections = document.querySelectorAll('section')
      sections.forEach(section => {
        const sectionTop = section.offsetTop
        if (window.scrollY >= sectionTop - 100) {
          setActiveSection(section.getAttribute('id'))
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  // Navigation component
  const Navigation = () => (
    <nav className="fixed w-full z-10 backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <a href="#" className="text-xl font-bold">John Doe</a>
        
        <div className="hidden md:flex space-x-8">
          {['home', 'about', 'projects', 'skills', 'contact'].map((item) => (
            <a 
              key={item}
              href={`#${item}`}
              className={`capitalize transition-colors ${activeSection === item ? 'text-blue-600 dark:text-blue-400 font-medium' : 'hover:text-blue-600 dark:hover:text-blue-400'}`}
            >
              {item}
            </a>
          ))}
        </div>
        
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  )

  // Hero section component
  const HeroSection = () => (
    <section id="home" className="min-h-screen flex items-center pt-16">
      <div className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Hi, I'm <span className="text-blue-600 dark:text-blue-400">John Doe</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-80">
            A Frontend Developer specializing in React and modern web technologies
          </p>
          <div className="flex justify-center space-x-4">
            <a href="#projects" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              View My Work
            </a>
            <a href="#contact" className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </section>
  )

  // About section component
  const AboutSection = () => (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">About Me</h2>
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/3">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                alt="Profile" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <p className="text-lg mb-6">
              I'm a passionate frontend developer with 5 years of experience creating beautiful, functional websites and applications. 
              I specialize in React, Vue.js, and modern JavaScript frameworks.
            </p>
            <p className="text-lg mb-6">
              My approach combines aesthetic design with technical excellence to create digital experiences that users love. 
              I'm constantly learning and adapting to new technologies and methodologies.
            </p>
            <div className="flex flex-wrap gap-4">
              {['React', 'JavaScript', 'TypeScript', 'CSS/Tailwind', 'UI/UX Design'].map((skill) => (
                <div key={skill} className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )

  // Projects section component
  const ProjectsSection = () => (
    <section id="projects" className="py-20 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-900 transition-transform hover:scale-105">
              <img 
                src={`https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80`} 
                alt="Project" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Project {item}</h3>
                <p className="mb-4 opacity-80">A brief description of the project and the technologies used.</p>
                <div className="flex justify-between items-center">
                  <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">View Project</a>
                  <a href="#" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                    <span className="text-lg font-semibold">GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

  // Skills section component
  const SkillsSection = () => (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">My Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { name: 'React', level: 90 },
            { name: 'JavaScript', level: 85 },
            { name: 'TypeScript', level: 80 },
            { name: 'HTML/CSS', level: 95 },
            { name: 'Node.js', level: 75 },
            { name: 'UI/UX Design', level: 70 },
            { name: 'Git', level: 85 },
            { name: 'AWS', level: 65 }
          ].map((skill, index) => (
            <div key={index} className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#eee"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeDasharray={`${skill.level}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold">{skill.level}%</span>
                </div>
              </div>
              <h3 className="text-lg font-medium">{skill.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

  // Contact section component
  const ContactSection = () => (
    <section id="contact" className="py-20 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Get In Touch</h2>
        <div className="max-w-lg mx-auto">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2">Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your email"
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2">Message</label>
              <textarea 
                id="message" 
                rows="5"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your message"
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )

  // Footer component
  const Footer = () => (
    <footer className="py-8 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center space-x-6 mb-6">
          {['github', 'twitter', 'linkedin', 'instagram'].map((social) => (
            <a 
              key={social}
              href="#" 
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <span className="sr-only">{social}</span>
              {social.charAt(0).toUpperCase() + social.slice(1)}
            </a>
          ))}
        </div>
        <p>© {new Date().getFullYear()} John Doe. All rights reserved.</p>
      </div>
    </footer>
  )

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default App