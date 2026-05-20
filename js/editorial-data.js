// Content for Pedro Rodriguez portfolio
(function () {
const PROFILE = {
  name: "Pedro Rodriguez",
  initials: "PR",
  role: "Physician · Data Scientist",
  longRole: "Physician — Data Science / ML / LLMs",
  location: "Mérida, México",
  status: "Open to roles & collaborations",
  focus: "Medicine × Code × Data",
  email: "pedro.rodriguez.g@icloud.com",
  github: "https://github.com/PedroRgz",
  linkedin: "https://www.linkedin.com/in/pedro-rgz/",
  notion: "https://pedro-rgz.notion.site/",
  intro: "A general practitioner with a neuroscience focus who turned self-directed coding into a data science practice. I translate clinical and business questions into datasets, ML prototypes, and decision-support tools.",
  about: [
    "I started as a self-taught developer and turned curiosity into production work: streamlining clinical workflows with macros and structured data, building ML pipelines, and shaping executive dashboards.",
    "I thrive under pressure, collaborate well with multidisciplinary teams, and treat every challenge as a hypothesis to validate. I look for engagements where I can connect medicine, analytics and product strategy."
  ]
};

const FILTERS = [
  { id: "destacados", label: "Featured" },
  { id: "todos", label: "All" },
  { id: "ciencia-de-datos", label: "Data Science" },
  { id: "ios", label: "iOS" },
  { id: "notebooks", label: "Notebooks" },
  { id: "programacion", label: "Engineering" }
];

const PROJECTS = [
  {
    id: "spacex-ml",
    title: "SpaceX Launch Success Prediction",
    year: "2025",
    description: "End-to-end ML pipeline that estimates SpaceX launch success probabilities using historical data, APIs and web scraping. EDA, feature engineering, and a deployable scoring pipeline.",
    tags: ["Python", "Scikit-learn", "APIs", "EDA"],
    areas: ["destacados", "ciencia-de-datos"],
    code: "https://github.com/PedroRgz/CareerAcademy-IBM-DS-RocketLaunchesAnalysis",
    notebook: "https://github.com/PedroRgz/CareerAcademy-IBM-DS-RocketLaunchesAnalysis/tree/main/notebooks"
  },
  {
    id: "spacex-dash",
    title: "SpaceX Launch Records Dashboard",
    year: "2025",
    description: "Interactive Plotly/Dash dashboard exposing launch records, success rates, and site comparisons for non-technical stakeholders.",
    tags: ["Plotly", "Dash", "Python"],
    areas: ["destacados", "ciencia-de-datos"],
    code: "https://github.com/PedroRgz/CareerAcademy-IBM-DS-RocketLaunchesDashboard"
  },
  {
    id: "episcopio",
    title: "Episcopio — Social Analytics MVP",
    year: "2025",
    description: "Pipeline and API for social media analytics with a focus on production-grade deployment via Azure Container Registry and App Service.",
    tags: ["Python", "Azure", "Docker", "API"],
    areas: ["destacados", "programacion"],
    code: "https://github.com/PedroRgz/Episcopio"
  },
  {
    id: "missing-data",
    title: "Course — Missing Data Handling",
    year: "2024",
    description: "Hands-on exploration of techniques for missing data in pandas — reproducible notebooks, imputation strategies, and decision frameworks.",
    tags: ["Pandas", "Notebooks", "Methodology"],
    areas: ["destacados", "notebooks"],
    code: "https://github.com/PedroRgz/Curso-Manejo-de-datos-faltantes",
    notebook: "https://github.com/PedroRgz/Curso-Manejo-de-datos-faltantes"
  },
  {
    id: "earth-ar",
    title: "Earth iOS AR",
    year: "2025",
    description: "Augmented-reality demo built with ARKit and Swift — anchoring a scaled Earth model into a real space.",
    tags: ["Swift", "ARKit", "iOS"],
    areas: ["destacados", "ios"],
    code: "https://github.com/PedroRgz/Earth-iOS-AR"
  },
  {
    id: "watch-notes",
    title: "Notes — Apple Watch",
    year: "2025",
    description: "Lightweight note-taking app for Apple Watch built in Swift / watchOS, optimized for fast on-wrist capture.",
    tags: ["Swift", "watchOS", "Xcode"],
    areas: ["destacados", "ios"],
    code: "https://github.com/PedroRgz/NotesApp_AppleWatch"
  },
  {
    id: "stocks",
    title: "Stock Market Analysis",
    year: "2024",
    description: "Fundamental analysis of public companies to guide investment theses — data cleaning, dashboards, and KPI tracking.",
    tags: ["Pandas", "SQL", "Finance"],
    areas: ["ciencia-de-datos"],
    code: "https://github.com/PedroRgz"
  },
  {
    id: "membership",
    title: "Membership Platform (Concept)",
    year: "2024",
    description: "System design for a membership and loyalty platform covering architecture, data models and engagement workflows.",
    tags: ["System Design", "Product", "APIs"],
    areas: ["programacion"],
    code: "https://github.com/PedroRgz"
  },
  {
    id: "kaggle",
    title: "Kaggle Portfolio",
    year: "2023 — Present",
    description: "Ongoing contributions to Kaggle competitions and notebooks tackling real-world ML problems and documenting insights.",
    tags: ["Kaggle", "ML", "Notebooks"],
    areas: ["ciencia-de-datos", "notebooks"],
    code: "https://www.kaggle.com/pedrorgz",
    notebook: "https://www.kaggle.com/pedrorgz/code"
  },
  {
    id: "breast-cancer",
    title: "Risk Factors — Breast Cancer (Cuban Population)",
    year: "2024",
    description: "Epidemiological analysis of risk factors in a Cuban population cohort — academic project bridging medicine and data work.",
    tags: ["Epidemiology", "Python", "Health"],
    areas: ["ciencia-de-datos"],
    code: "https://github.com/PedroRgz/Risk-Factors-for-breast-cancer-in-cuban-population"
  }
];

const TIMELINE = [
  {
    year: "2024 — Now",
    title: "General Practitioner",
    org: "CAIS Médica · Primary care clinic, Mérida",
    description: "Provide primary care, introduce digital tools, and automate clinical records with macros and structured datasets.",
    tags: ["Healthcare", "Automation"],
    kind: "work"
  },
  {
    year: "2023 — 2024",
    title: "Social Service Physician",
    org: "High Performance Sports Center · Mérida",
    description: "Founded the on-site medical department and built data strategies to track injuries and health patterns across elite athletes.",
    tags: ["Sports Medicine", "Data Ops"],
    kind: "work"
  },
  {
    year: "2024",
    title: "M.D. — Bachelor of Medicine",
    org: "Universidad Autónoma de Yucatán",
    description: "Clinical education with a neuroscience emphasis. Strengthened critical thinking and complex information management.",
    tags: ["Neuroscience", "Research"],
    kind: "education"
  },
  {
    year: "2024",
    title: "IBM Data Science Professional",
    org: "IBM — Professional Certificate",
    description: "Hands-on mastery of Python, SQL, APIs, visualization, and model deployment for business and healthcare problems.",
    tags: ["Python", "SQL", "Dash"],
    kind: "education"
  },
  {
    year: "2021",
    title: "Azure Fundamentals (AZ-900)",
    org: "Microsoft Certified",
    description: "Solid understanding of core cloud services to enable analytics and ML workloads on Azure.",
    tags: ["Azure", "Cloud"],
    kind: "education"
  },
  {
    year: "Present",
    title: "Data Science & AI Academy",
    org: "Platzi — Ongoing specialization",
    description: "Continuous training in statistics, ML, Python and mathematical foundations for AI.",
    tags: ["Continuous", "AI"],
    kind: "education"
  }
];

const TECH_SKILLS = [
  { name: "Python · Pandas / NumPy", level: 75 },
  { name: "EDA & Feature Engineering", level: 85 },
  { name: "Machine Learning · Scikit-learn", level: 75 },
  { name: "SQL & Data Modeling", level: 80 },
  { name: "Visualization · Plotly / Matplotlib", level: 85 },
  { name: "APIs & Web Scraping", level: 80 },
  { name: "Azure Cloud", level: 75 },
  { name: "Git & GitHub", level: 85 },
  { name: "Jupyter Notebooks", level: 90 },
  { name: "Linux & Automation", level: 70 }
];

const SOFT_SKILLS = [
  "Teamwork",
  "Problem solving",
  "Communication",
  "Adaptability",
  "Leadership & organization"
];

const CERTIFICATIONS = [
  { name: "IBM Data Science Professional Certificate", year: "2024" },
  { name: "Microsoft Certified: Azure Fundamentals", year: "2021" },
  { name: "Platzi Data Science & AI Academy", year: "In progress" }
];

window.PR_DATA = {
  PROFILE, FILTERS, PROJECTS, TIMELINE, TECH_SKILLS, SOFT_SKILLS, CERTIFICATIONS
};
})();
