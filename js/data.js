/**
 * data.js - Datos de proyectos, experiencia y habilidades
 * Portfolio de Pedro Rodriguez
 */

// ========== PROYECTOS ==========
const projects = [
  {
    title: "Pipeline ML para Diagnóstico Médico",
    year: "2024",
    description: "Sistema de machine learning para análisis predictivo de datos clínicos utilizando Azure ML y Python.",
    tags: ["Python", "Azure ML", "Scikit-learn", "Pandas"],
    category: ["destacados", "ciencia-de-datos"],
    links: {
      code: "https://github.com/PedroRgz",
      demo: null
    }
  },
  {
    title: "App iOS de Seguimiento de Salud",
    year: "2024",
    description: "Aplicación móvil para monitoreo de signos vitales y recordatorios médicos desarrollada en Swift.",
    tags: ["Swift", "SwiftUI", "HealthKit", "Core Data"],
    category: ["destacados", "ios"],
    links: {
      code: "https://github.com/PedroRgz",
      demo: null
    }
  },
  {
    title: "Análisis de Datos Clínicos COVID-19",
    year: "2023",
    description: "Notebook exploratorio con análisis estadístico y visualizaciones de datos epidemiológicos.",
    tags: ["Python", "Jupyter", "Matplotlib", "Seaborn"],
    category: ["notebooks", "ciencia-de-datos"],
    links: {
      code: null,
      notebook: "https://github.com/PedroRgz"
    }
  },
  {
    title: "Dashboard Interactivo de Métricas",
    year: "2024",
    description: "Dashboard web para visualización de KPIs médicos en tiempo real con Python y Streamlit.",
    tags: ["Python", "Streamlit", "Plotly", "SQL"],
    category: ["ciencia-de-datos", "programacion"],
    links: {
      code: "https://github.com/PedroRgz",
      demo: null
    }
  },
  {
    title: "API REST para Gestión de Pacientes",
    year: "2023",
    description: "API backend desarrollada con FastAPI para gestión de información médica.",
    tags: ["Python", "FastAPI", "PostgreSQL", "Docker"],
    category: ["programacion"],
    links: {
      code: "https://github.com/PedroRgz",
      demo: null
    }
  },
  {
    title: "Modelo Predictivo de Riesgo Cardiovascular",
    year: "2023",
    description: "Modelo de ML para predicción de riesgo cardiovascular basado en datos clínicos.",
    tags: ["Python", "TensorFlow", "Pandas", "NumPy"],
    category: ["ciencia-de-datos"],
    links: {
      code: "https://github.com/PedroRgz",
      notebook: null
    }
  },
  {
    title: "Sistema de Procesamiento de Lenguaje Natural",
    year: "2024",
    description: "Implementación de NLP para análisis de textos médicos y extracción de entidades.",
    tags: ["Python", "spaCy", "NLTK", "Transformers"],
    category: ["ciencia-de-datos", "programacion"],
    links: {
      code: "https://github.com/PedroRgz",
      notebook: "https://github.com/PedroRgz"
    }
  }
];

// ========== EXPERIENCIA Y FORMACIÓN ==========
const timeline = [
  {
    year: '2025',
    title: 'Especialización en IA Médica',
    subtitle: 'Desarrollo continuo',
    description: 'Desarrollando proyectos de machine learning aplicados a diagnóstico y pronóstico médico.',
    tags: ['ML', 'Salud Digital']
  },
  {
    year: '2025',
    title: 'Episcopio — Social Media Analytics',
    subtitle: 'Proyecto destacado',
    description: 'Pipeline y API para analítica de redes sociales desplegado en Azure.',
    tags: ['Azure', 'Python', 'API']
  },
  {
    year: '2024',
    title: 'CAIS Médica — Médico General',
    subtitle: 'Sep 2024 – Actual · Mérida, Yucatán',
    description: 'Atención integral de primer nivel, mejora de procesos y herramientas de gestión clínica.',
    tags: ['Medicina', 'Gestión']
  },
  {
    year: '2024',
    title: 'Azure Cloud Certification',
    subtitle: 'Microsoft Azure',
    description: 'Certificación en Microsoft Azure para desarrollo de soluciones en la nube.',
    tags: ['Azure', 'Cloud']
  },
  {
    year: '2024',
    title: 'IBM Data Science Career Academy',
    subtitle: 'Certificación profesional',
    description: 'Programa completo de ciencia de datos con proyectos prácticos en Python, ML y visualización.',
    tags: ['Python', 'ML', 'Data Science']
  },
  {
    year: '2023',
    title: 'Centro Alto Rendimiento — Servicio Social',
    subtitle: 'Ago 2023 – Jul 2024 · Mérida, Yucatán',
    description: 'Creación del área médica desde cero, organización de expedientes y análisis estadístico.',
    tags: ['Medicina', 'Análisis']
  }
];

// ========== HABILIDADES TÉCNICAS ==========
const technicalSkills = [
  { name: "Python", percentage: 90 },
  { name: "Machine Learning", percentage: 85 },
  { name: "Azure Cloud", percentage: 80 },
  { name: "Swift (iOS)", percentage: 75 },
  { name: "SQL", percentage: 80 },
  { name: "Git & GitHub", percentage: 85 },
  { name: "Data Visualization", percentage: 85 },
  { name: "FastAPI", percentage: 70 },
  { name: "Docker", percentage: 75 },
  { name: "TensorFlow", percentage: 70 }
];
