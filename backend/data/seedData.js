const technologies = [
  {
    id: "react",
    name: "React",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <circle cx="50" cy="50" r="8" fill="#61dafb" />
      <ellipse cx="50" cy="50" rx="38" ry="14" fill="none" stroke="#61dafb" stroke-width="3" transform="rotate(0 50 50)" />
      <ellipse cx="50" cy="50" rx="38" ry="14" fill="none" stroke="#61dafb" stroke-width="3" transform="rotate(60 50 50)" />
      <ellipse cx="50" cy="50" rx="38" ry="14" fill="none" stroke="#61dafb" stroke-width="3" transform="rotate(120 50 50)" />
    </svg>`
  },
  {
    id: "vue",
    name: "Vue",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <polygon points="50,85 15,25 30,25 50,60 70,25 85,25" fill="#41b883" />
      <polygon points="50,85 27,25 38,25 50,47 62,25 73,25" fill="#35495e" />
    </svg>`
  },
  {
    id: "angular",
    name: "Angular",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <polygon points="50,90 85,25 50,10 15,25" fill="#dd0031" />
      <polygon points="50,90 85,25 50,10" fill="#c3002f" />
      <path d="M50,17 L72,67 L62,67 L50,38 L38,67 L28,67 Z" fill="#ffffff" />
    </svg>`
  },
  {
    id: "svelte",
    name: "Svelte",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M30,20 C20,30 20,50 30,60 L55,80 C65,90 85,90 95,80 C105,70 105,50 95,40 C85,30 70,35 62,45 L37,25 C45,15 60,10 70,20 Z" fill="#ff3e00" />
    </svg>`
  },
  {
    id: "nodejs",
    name: "Node.js",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <polygon points="50,90 15,70 15,30 50,10 85,30 85,70" fill="none" stroke="#339933" stroke-width="4" />
      <path d="M50,25 L75,39 L75,69 L50,83 L25,69 L25,39 Z" fill="#339933" opacity="0.3" />
      <text x="50" y="58" font-size="20" font-weight="bold" fill="#339933" text-anchor="middle">JS</text>
    </svg>`
  },
  {
    id: "express",
    name: "Express",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <rect x="10" y="25" width="80" height="50" rx="10" fill="#333333" />
      <text x="50" y="58" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle">ex</text>
    </svg>`
  },
  {
    id: "django",
    name: "Django",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <rect x="15" y="15" width="70" height="70" rx="12" fill="#092e20" />
      <text x="50" y="60" font-size="36" font-weight="bold" fill="#44b78b" text-anchor="middle">dj</text>
    </svg>`
  },
  {
    id: "laravel",
    name: "Laravel",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M20,25 L50,10 L80,25 L80,75 L50,90 L20,75 Z" fill="none" stroke="#ff2d20" stroke-width="4" />
      <path d="M50,30 L70,40 L70,60 L50,70 L30,60 L30,40 Z" fill="#ff2d20" />
    </svg>`
  },
  {
    id: "spring",
    name: "Spring Boot",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M50,85 C20,70 15,40 40,15 C60,40 85,30 80,60 C75,80 60,85 50,85 Z" fill="#6db33f" />
      <path d="M40,15 C45,30 35,50 25,60" fill="none" stroke="#ffffff" stroke-width="3" />
    </svg>`
  },
  {
    id: "rails",
    name: "Rails",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <rect x="15" y="15" width="70" height="70" rx="15" fill="#cc0000" />
      <text x="50" y="62" font-size="38" font-weight="bold" fill="#ffffff" text-anchor="middle">R</text>
    </svg>`
  },
  {
    id: "golang",
    name: "Go",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <rect x="15" y="20" width="70" height="60" rx="15" fill="#00add8" />
      <text x="50" y="62" font-size="38" font-weight="bold" fill="#ffffff" text-anchor="middle">Go</text>
    </svg>`
  },
  {
    id: "rust",
    name: "Rust",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <circle cx="50" cy="50" r="35" fill="none" stroke="#e05224" stroke-width="6" stroke-dasharray="8 4" />
      <circle cx="50" cy="50" r="25" fill="#e05224" />
      <text x="50" y="58" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle">R</text>
    </svg>`
  },
  {
    id: "python",
    name: "Python",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M50,10 C30,10 30,25 45,25 L55,25 C70,25 70,10 50,10 Z" fill="#3776ab" />
      <path d="M50,90 C70,90 70,75 55,75 L45,75 C30,75 30,90 50,90 Z" fill="#ffd343" />
      <rect x="35" y="30" width="30" height="40" rx="8" fill="#3776ab" opacity="0.8" />
    </svg>`
  },
  {
    id: "typescript",
    name: "TypeScript",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <rect x="15" y="15" width="70" height="70" rx="6" fill="#3178c6" />
      <text x="75" y="75" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="end">TS</text>
    </svg>`
  },
  {
    id: "javascript",
    name: "JavaScript",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <rect x="15" y="15" width="70" height="70" rx="6" fill="#f7df1e" />
      <text x="75" y="75" font-size="28" font-weight="bold" fill="#000000" text-anchor="end">JS</text>
    </svg>`
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <circle cx="50" cy="50" r="38" fill="#336791" />
      <path d="M35,40 C35,25 65,25 65,40 C65,55 50,70 35,70" fill="none" stroke="#ffffff" stroke-width="4" />
      <circle cx="45" cy="45" r="4" fill="#ffffff" />
    </svg>`
  },
  {
    id: "mongodb",
    name: "MongoDB",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M50,15 C40,30 35,50 50,85 C65,50 60,30 50,15 Z" fill="#47a248" />
      <path d="M50,15 C47,30 45,50 50,85" fill="none" stroke="#3fa03f" stroke-width="2" />
    </svg>`
  },
  {
    id: "redis",
    name: "Redis",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <polygon points="50,15 85,32 85,67 50,85 15,67 15,32" fill="#d82c20" />
      <polygon points="50,15 85,32 50,50 15,32" fill="#a82218" />
      <line x1="50" y1="50" x2="50" y2="85" stroke="#ffffff" stroke-width="2" />
    </svg>`
  },
  {
    id: "docker",
    name: "Docker",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M15,60 C20,70 50,70 85,60 C85,50 75,45 65,45 C55,45 45,55 15,60 Z" fill="#2496ed" />
      <rect x="35" y="25" width="12" height="12" fill="#2496ed" />
      <rect x="50" y="25" width="12" height="12" fill="#2496ed" />
      <rect x="42" y="39" width="12" height="12" fill="#2496ed" />
    </svg>`
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <polygon points="50,10 85,25 85,65 50,90 15,65 15,25" fill="none" stroke="#326ce5" stroke-width="4" />
      <circle cx="50" cy="50" r="16" fill="#326ce5" />
      <line x1="50" y1="10" x2="50" y2="34" stroke="#326ce5" stroke-width="4" />
      <line x1="15" y1="65" x2="36" y2="58" stroke="#326ce5" stroke-width="4" />
      <line x1="85" y1="65" x2="64" y2="58" stroke="#326ce5" stroke-width="4" />
    </svg>`
  },
  {
    id: "git",
    name: "Git",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <rect x="20" y="20" width="60" height="60" rx="10" fill="#f05032" transform="rotate(45 50 50)" />
      <circle cx="35" cy="50" r="6" fill="#ffffff" />
      <circle cx="65" cy="50" r="6" fill="#ffffff" />
      <line x1="35" y1="50" x2="65" y2="50" stroke="#ffffff" stroke-width="4" />
      <circle cx="50" cy="65" r="6" fill="#ffffff" />
      <line x1="50" y1="50" x2="50" y2="65" stroke="#ffffff" stroke-width="4" />
    </svg>`
  },
  {
    id: "aws",
    name: "AWS",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <rect x="15" y="25" width="70" height="50" rx="10" fill="#232f3e" />
      <path d="M25,58 C35,68 65,68 75,58" fill="none" stroke="#ff9900" stroke-width="4" stroke-linecap="round" />
      <path d="M71,55 L77,59 L75,52 Z" fill="#ff9900" />
    </svg>`
  },
  {
    id: "graphql",
    name: "GraphQL",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" fill="none" stroke="#e10098" stroke-width="3" />
      <circle cx="50" cy="15" r="6" fill="#e10098" />
      <circle cx="80" cy="32" r="6" fill="#e10098" />
      <circle cx="80" cy="68" r="6" fill="#e10098" />
      <circle cx="50" cy="85" r="6" fill="#e10098" />
      <circle cx="20" cy="68" r="6" fill="#e10098" />
      <circle cx="20" cy="32" r="6" fill="#e10098" />
      <polygon points="50,30 68,60 32,60" fill="#e10098" opacity="0.5" />
    </svg>`
  },
  {
    id: "nextjs",
    name: "Next.js",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <circle cx="50" cy="50" r="40" fill="#000000" />
      <text x="50" y="65" font-size="48" font-family="system-ui" font-weight="bold" fill="#ffffff" text-anchor="middle">N</text>
    </svg>`
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M15,50 C30,35 45,55 60,35 C70,25 85,40 85,50 C70,65 55,45 40,65 C30,75 15,60 15,50 Z" fill="#06b6d4" />
    </svg>`
  },
  {
    id: "flutter",
    name: "Flutter",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <polygon points="50,15 80,45 60,65 20,25" fill="#02569b" />
      <polygon points="60,65 80,45 60,85 40,85" fill="#0175c2" opacity="0.8" />
    </svg>`
  },
  {
    id: "reactnative",
    name: "React Native",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <circle cx="50" cy="50" r="6" fill="#00d2ff" />
      <ellipse cx="50" cy="50" rx="35" ry="10" fill="none" stroke="#00d2ff" stroke-width="2.5" transform="rotate(30 50 50)" />
      <ellipse cx="50" cy="50" rx="35" ry="10" fill="none" stroke="#00d2ff" stroke-width="2.5" transform="rotate(90 50 50)" />
      <ellipse cx="50" cy="50" rx="35" ry="10" fill="none" stroke="#00d2ff" stroke-width="2.5" transform="rotate(150 50 50)" />
    </svg>`
  },
  {
    id: "sass",
    name: "Sass",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <circle cx="50" cy="50" r="38" fill="#cf649a" />
      <text x="50" y="60" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="middle">S</text>
    </svg>`
  },
  {
    id: "firebase",
    name: "Firebase",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <polygon points="50,10 85,45 50,85 15,45" fill="#ffca28" />
      <polygon points="50,10 85,45 50,60" fill="#ffa000" />
    </svg>`
  },
  {
    id: "electron",
    name: "Electron",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <circle cx="50" cy="50" r="8" fill="#3178c6" />
      <ellipse cx="50" cy="50" rx="38" ry="12" fill="none" stroke="#3178c6" stroke-width="2" transform="rotate(45 50 50)" />
      <ellipse cx="50" cy="50" rx="38" ry="12" fill="none" stroke="#3178c6" stroke-width="2" transform="rotate(135 50 50)" />
    </svg>`
  }
];

const questions = [
  {
    questionText: "Which of these are popular component-based frontend web libraries or frameworks?",
    correctAnswerIds: ["react", "vue", "angular", "svelte"]
  },
  {
    questionText: "Which of these backend frameworks are written in JavaScript or TypeScript?",
    correctAnswerIds: ["express", "nextjs", "electron"]
  },
  {
    questionText: "Which of these are backend frameworks written in languages other than JavaScript?",
    correctAnswerIds: ["django", "laravel", "spring", "rails"]
  },
  {
    questionText: "Which of these technologies are systems programming or statically compiled languages?",
    correctAnswerIds: ["golang", "rust", "spring"]
  },
  {
    questionText: "Which of these databases or data stores support SQL or key-value structures?",
    correctAnswerIds: ["postgresql", "redis", "firebase"]
  },
  {
    questionText: "Which of these are cross-platform client app frameworks (mobile, desktop, or hybrid)?",
    correctAnswerIds: ["flutter", "reactnative", "electron"]
  },
  {
    questionText: "Which of these technologies utilize or run on top of the Node.js runtime environment?",
    correctAnswerIds: ["express", "nextjs", "electron", "react", "vue"]
  },
  {
    questionText: "Which of these technologies were originally created or open-sourced by Google?",
    correctAnswerIds: ["angular", "golang", "kubernetes", "flutter"]
  },
  {
    questionText: "Which of these technologies are widely used for containerization, orchestration, or cloud hosting?",
    correctAnswerIds: ["docker", "kubernetes", "aws"]
  },
  {
    questionText: "Which of these are server-side scripting or backend programming languages?",
    correctAnswerIds: ["python", "javascript", "typescript", "golang", "rust"]
  },
  {
    questionText: "Which of these are popular database or backend storage engines?",
    correctAnswerIds: ["postgresql", "mongodb", "redis", "firebase"]
  },
  {
    questionText: "Which of these technologies are commonly used for building web user interfaces or styles?",
    correctAnswerIds: ["react", "vue", "angular", "svelte", "nextjs", "tailwind", "sass"]
  },
  {
    questionText: "Which of these technologies are built or maintained by Meta (formerly Facebook)?",
    correctAnswerIds: ["react", "reactnative", "graphql"]
  },
  {
    questionText: "Which of these tools are standard for version control or CI/CD container pipelines?",
    correctAnswerIds: ["git", "docker", "kubernetes"]
  },
  {
    questionText: "Which of these technologies are popular backend web frameworks?",
    correctAnswerIds: ["express", "django", "laravel", "spring", "rails"]
  },
  {
    questionText: "Which of these technologies heavily rely on or compile down to JavaScript?",
    correctAnswerIds: ["typescript", "nextjs", "reactnative", "electron", "react", "vue"]
  },
  {
    questionText: "Which of these are considered NoSQL or non-relational database/storage technologies?",
    correctAnswerIds: ["mongodb", "redis", "firebase"]
  },
  {
    questionText: "Which of these programming languages support native async/await syntax or coroutines?",
    correctAnswerIds: ["javascript", "python", "rust", "golang"]
  },
  {
    questionText: "Which of these technologies are widely used as backend or cloud hosting systems?",
    correctAnswerIds: ["aws", "firebase", "kubernetes"]
  },
  {
    questionText: "Which of these tools help web developers compile, pre-process, or style layouts?",
    correctAnswerIds: ["tailwind", "sass", "nextjs"]
  },
  
  // 20 New Questions linking technologies by a single common feature or fact (short and simple)
  {
    questionText: "Which of these technologies are popular tools in a modern DevOps CI/CD pipeline?",
    correctAnswerIds: ["git", "docker", "kubernetes", "aws"]
  },
  {
    questionText: "Which of these technologies are parts of a classic Python-based web development stack?",
    correctAnswerIds: ["python", "django", "postgresql"]
  },
  {
    questionText: "Which of these technologies are commonly used in the MERN or MEAN fullstack JavaScript setups?",
    correctAnswerIds: ["mongodb", "express", "react", "angular", "nodejs"]
  },
  {
    questionText: "Which of these technologies are primarily utilized for building APIs (REST or GraphQL)?",
    correctAnswerIds: ["express", "graphql", "nextjs"]
  },
  {
    questionText: "Which of these technologies are designed to run directly inside web browsers?",
    correctAnswerIds: ["javascript", "react", "vue", "angular", "svelte"]
  },
  {
    questionText: "Which of these technologies use a virtual DOM or reactive state updates to refresh the UI?",
    correctAnswerIds: ["react", "vue", "reactnative"]
  },
  {
    questionText: "Which of these technologies support static site generation (SSG) or server-side rendering (SSR)?",
    correctAnswerIds: ["nextjs", "react", "vue", "angular"]
  },
  {
    questionText: "Which of these technologies are strongly typed or support static type checking?",
    correctAnswerIds: ["typescript", "golang", "rust", "spring"]
  },
  {
    questionText: "Which of these technologies utilize or support nesting and variables for styling?",
    correctAnswerIds: ["sass", "tailwind", "nextjs"]
  },
  {
    questionText: "Which of these technologies support atomic database transactions out of the box?",
    correctAnswerIds: ["postgresql", "mongodb", "redis"]
  },
  {
    questionText: "Which of these technologies are backend runtimes or scripting languages?",
    correctAnswerIds: ["nodejs", "python", "javascript"]
  },
  {
    questionText: "Which of these tools are used to build desktop applications using web technologies?",
    correctAnswerIds: ["electron", "react", "vue"]
  },
  {
    questionText: "Which of these technologies support real-time data synchronization or WebSockets?",
    correctAnswerIds: ["firebase", "redis", "nodejs", "express"]
  },
  {
    questionText: "Which of these technologies are developed or maintained by independent communities/foundations?",
    correctAnswerIds: ["postgresql", "python", "rust", "git"]
  },
  {
    questionText: "Which of these technologies are primarily database engines?",
    correctAnswerIds: ["postgresql", "mongodb", "redis"]
  },
  {
    questionText: "Which of these technologies are widely used in serverless or cloud-native architectures?",
    correctAnswerIds: ["aws", "firebase", "docker", "kubernetes"]
  },
  {
    questionText: "Which of these technologies support the package manager npm?",
    correctAnswerIds: ["javascript", "typescript", "nodejs", "react", "vue", "angular", "svelte", "nextjs"]
  },
  {
    questionText: "Which of these technologies are widely used for containerizing or deploying web services?",
    correctAnswerIds: ["docker", "kubernetes", "aws"]
  },
  {
    questionText: "Which of these technologies support hot module replacement (HMR) or fast refresh?",
    correctAnswerIds: ["react", "vue", "nextjs"]
  },
  {
    questionText: "Which of these technologies are standard for building modern web APIs?",
    correctAnswerIds: ["express", "graphql", "nextjs", "laravel"]
  }
];

module.exports = {
  technologies,
  questions
};