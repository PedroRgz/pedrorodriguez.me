/**
 * data.js - Projects, experience, and skills data
 * Pedro Rodriguez Portfolio
 */

// ========== PROJECTS ==========
const projects = [
  {
    title: "SpaceX Launch Success Prediction",
    year: "2025",
    description: "End-to-end ML pipeline that estimates SpaceX launch success probabilities using historical data, APIs, and web scraping.",
    tags: ["Python", "APIs", "EDA", "Scikit-learn"],
    category: ["destacados", "ciencia-de-datos"],
    links: {
      code: "https://github.com/PedroRgz/CareerAcademy-IBM-DS-RocketLaunchesAnalysis",
      notebook: "https://github.com/PedroRgz/CareerAcademy-IBM-DS-RocketLaunchesAnalysis/tree/main/notebooks"
    }
  },
  {
    title: "Stock Market Analysis",
    year: "2024",
    description: "Fundamental analysis of public companies to guide investment theses: data cleaning, dashboards, and key performance metrics.",
    tags: ["Pandas", "Visualization", "Finance", "SQL"],
    category: ["ciencia-de-datos", "destacados"],
    links: {
      code: "https://github.com/PedroRgz",
      notebook: null
    }
  },
  {
    title: "Membership Management Platform (Concept)",
    year: "2024",
    description: "System design for a membership and loyalty platform covering architecture, data models, and engagement workflows.",
    tags: ["System Design", "Product Strategy", "UX", "APIs"],
    category: ["programacion", "destacados"],
    links: {
      code: "https://github.com/PedroRgz",
      demo: null
    }
  },
  {
    title: "Kaggle Data Science Portfolio",
    year: "2023–Present",
    description: "Ongoing contributions to Kaggle competitions and notebooks to tackle real-world ML problems and document insights.",
    tags: ["Kaggle", "Competitions", "Notebook", "ML"],
    category: ["notebooks", "ciencia-de-datos"],
    links: {
      code: "https://www.kaggle.com/pedrorgz",
      notebook: "https://www.kaggle.com/pedrorgz/code"
    }
  }
];

// ========== EXPERIENCE & EDUCATION ==========
const timeline = [
  {
    year: '2024',
    title: 'CAIS Médica — General Practitioner',
    subtitle: 'Primary care clinic · Mérida, Mexico',
    description: 'Provide primary care, introduce digital tools, and automate clinical records with macros and structured datasets.',
    tags: ['Healthcare', 'Automation']
  },
  {
    year: '2024',
    title: 'High Performance Sports Center — Social Service Physician',
    subtitle: 'Elite athlete program · Mérida, Mexico',
    description: 'Founded the on-site medical department and built data strategies to track injuries and health patterns.',
    tags: ['Sports Medicine', 'Data Ops']
  },
  {
    year: '2024',
    title: 'Bachelor of Medicine (M.D.)',
    subtitle: 'Universidad Autónoma de Yucatán — School of Medicine',
    description: 'Clinical education with a neuroscience emphasis that strengthened critical thinking and complex information management.',
    tags: ['Neuroscience', 'Research']
  },
  {
    year: '2024',
    title: 'IBM Data Science Professional Certificate',
    subtitle: 'IBM — Professional Certificate',
    description: 'Hands-on mastery of Python, SQL, APIs, visualization, and model deployment for business and healthcare problems.',
    tags: ['Python', 'SQL', 'APIs', 'Dash', 'Plotly', 'CLI']
  },
  {
    year: '2021',
    title: 'Microsoft Certified: Azure Fundamentals',
    subtitle: 'Microsoft — AZ-900',
    description: 'Solid understanding of core cloud services to enable analytics and ML workloads.',
    tags: ['Azure', 'Cloud']
  },
  {
    year: 'Present',
    title: 'Platzi Data Science & AI Academy',
    subtitle: 'Ongoing specialization',
    description: 'Continuous training in statistics, ML, Python, and mathematical foundations for AI.',
    tags: ['Continuous Learning', 'AI']
  }
];

// ========== TECHNICAL SKILLS ==========
const technicalSkills = [
  { name: "Python (Pandas/NumPy)", percentage: 75 },
  { name: "EDA & Feature Engineering", percentage: 85 },
  { name: "Machine Learning (Scikit-learn)", percentage: 75 },
  { name: "SQL & Data Modeling", percentage: 80 },
  { name: "Visualization (Matplotlib/Plotly)", percentage: 85 },
  { name: "APIs & Web Scraping", percentage: 80 },
  { name: "Azure Cloud", percentage: 75 },
  { name: "Git & GitHub", percentage: 85 },
  { name: "Jupyter Notebooks", percentage: 90 },
  { name: "Linux & Automation", percentage: 70 }
];
