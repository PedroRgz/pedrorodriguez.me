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
    id: 1,
    title: "Data Scientist",
    subtitle: "Proyecto Independiente",
    description: "Desarrollo de modelos de ML para análisis predictivo en salud. Implementación de pipelines en Azure Cloud y despliegue de soluciones escalables.",
    tags: ["Machine Learning", "Azure", "Python"]
  },
  {
    id: 2,
    title: "Certificación IBM Data Science",
    subtitle: "Career Academy",
    description: "Programa completo de ciencia de datos incluyendo Python, ML, análisis estadístico y visualización de datos.",
    tags: ["Python", "ML", "Data Analysis"]
  },
  {
    id: 3,
    title: "Desarrollo iOS",
    subtitle: "Freelance",
    description: "Desarrollo de aplicaciones móviles enfocadas en salud digital y bienestar utilizando Swift y SwiftUI.",
    tags: ["Swift", "SwiftUI", "HealthKit"]
  },
  {
    id: 4,
    title: "Médico Cirujano",
    subtitle: "Práctica Clínica",
    description: "Atención médica integral, diagnóstico y tratamiento. Experiencia en urgencias y medicina general.",
    tags: ["Medicina", "Diagnóstico", "Urgencias"]
  },
  {
    id: 5,
    title: "Licenciatura en Medicina",
    subtitle: "Universidad",
    description: "Formación médica completa con énfasis en medicina basada en evidencia y pensamiento crítico.",
    tags: ["Medicina", "Investigación", "Ciencias Básicas"]
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
