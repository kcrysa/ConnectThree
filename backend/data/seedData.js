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
      <polygon points="50,38 38,67 62,67" fill="#ffffff" />
      <line x1="38" y1="58" x2="62" y2="58" stroke="#dd0031" stroke-width="4" />
    </svg>`
  },
  {
    id: "svelte",
    name: "Svelte",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M70,20 C60,10 40,10 30,20 C20,30 20,50 30,60 L55,80 C65,90 85,90 95,80 C105,70 105,50 95,40 L90,35 C88,33 85,33 83,35 C81,37 81,40 83,42 L88,47 C94,53 94,67 88,73 C82,79 68,79 62,73 L37,53 C31,47 31,33 37,27 C43,21 57,21 63,27 L68,32 C70,34 73,34 75,32 C77,30 77,27 75,25 L70,20 Z" fill="#ff3e00" transform="translate(-12, -2)" />
      <path d="M30,80 C40,90 60,90 70,80 C80,70 80,50 70,40 L45,20 C35,10 15,10 5,20 C-5,30 -5,50 5,60 L10,65 C12,67 15,67 17,65 C19,63 19,60 17,58 L12,53 C6,47 6,33 12,27 C18,21 32,21 38,27 L63,47 C69,53 69,67 63,73 C57,79 43,79 37,73 L32,68 C30,66 27,66 25,68 C23,70 23,73 25,75 L30,80 Z" fill="#ff3e00" transform="translate(12, 2)" />
    </svg>`
  },
  {
    id: "nextjs",
    name: "Next.js",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <circle cx="50" cy="50" r="45" fill="#000000" stroke="#333333" stroke-width="2" />
      <path d="M35,30 L35,70 M35,30 L63,68 M63,30 L63,55" stroke="#ffffff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      <path d="M50,48 L65,70" stroke="#ffffff" stroke-width="5" stroke-linecap="round" fill="none" />
    </svg>`
  },
  {
    id: "nodejs",
    name: "Node.js",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <polygon points="50,15 80,32.5 80,67.5 50,85 20,67.5 20,32.5" fill="none" stroke="#6cc24a" stroke-width="6" stroke-linejoin="round" />
      <path d="M50,22 L72,35 L72,65 L50,78 L28,65 L28,35 Z" fill="#333333" />
      <path d="M50,30 L50,70" stroke="#6cc24a" stroke-width="8" stroke-linecap="round" />
      <path d="M38,40 C38,35 62,35 62,45 C62,55 38,50 38,60 C38,65 62,65 62,60" fill="none" stroke="#6cc24a" stroke-width="6" stroke-linecap="round" />
    </svg>`
  },
  {
    id: "django",
    name: "Django",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <rect x="15" y="15" width="70" height="70" rx="10" fill="#092e20" />
      <text x="50" y="65" font-family="'Courier New', Courier, monospace" font-size="55" font-weight="bold" fill="#ffffff" text-anchor="middle">d</text>
      <circle cx="70" cy="30" r="6" fill="#44b78b" />
    </svg>`
  },
  {
    id: "php",
    name: "PHP",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <ellipse cx="50" cy="50" rx="45" ry="30" fill="#4F5D95" stroke="#777bb4" stroke-width="3" />
      <text x="50" y="58" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="bold" fill="#ffffff" text-anchor="middle" font-style="italic">php</text>
    </svg>`
  },
  {
    id: "typescript",
    name: "TypeScript",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <rect x="10" y="10" width="80" height="80" rx="6" fill="#3178c6" />
      <text x="80" y="80" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="end">TS</text>
    </svg>`
  },
  {
    id: "javascript",
    name: "JavaScript",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <rect x="10" y="10" width="80" height="80" rx="6" fill="#f7df1e" />
      <text x="80" y="80" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="#000000" text-anchor="end">JS</text>
    </svg>`
  },
  {
    id: "python",
    name: "Python",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M50,10 C35,10 32,15 32,22 L32,32 L50,32 L50,36 L25,36 C18,36 12,42 12,50 C12,58 18,64 25,64 L30,64 L30,59 C30,51 35,46 43,46 L60,46 C66,46 72,40 72,32 L72,22 C72,15 65,10 50,10 Z" fill="#3776ab" />
      <path d="M50,90 C65,90 68,85 68,78 L68,68 L50,68 L50,64 L75,64 C82,64 88,58 88,50 C88,42 82,36 75,36 L70,36 L70,41 C70,49 65,54 57,54 L40,54 C34,54 28,60 28,68 L28,78 C28,85 35,90 50,90 Z" fill="#ffd343" />
      <circle cx="40" cy="20" r="3.5" fill="#ffffff" />
      <circle cx="60" cy="80" r="3.5" fill="#000000" />
    </svg>`
  },
  {
    id: "rust",
    name: "Rust",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <circle cx="50" cy="50" r="35" fill="none" stroke="#dec29b" stroke-width="6" stroke-dasharray="14 4" />
      <circle cx="50" cy="50" r="28" fill="#2d2d2d" stroke="#dec29b" stroke-width="2" />
      <text x="50" y="60" font-family="'Times New Roman', Times, serif" font-size="34" font-weight="bold" fill="#ffffff" text-anchor="middle">R</text>
    </svg>`
  },
  {
    id: "go",
    name: "Go",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <ellipse cx="50" cy="50" rx="45" ry="32" fill="#00add8" />
      <text x="50" y="62" font-family="'Comic Sans MS', sans-serif" font-size="40" font-weight="bold" fill="#ffffff" text-anchor="middle" font-style="italic">Go</text>
    </svg>`
  },
  {
    id: "cpp",
    name: "C++",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <polygon points="50,10 85,25 85,75 50,90 15,75 15,25" fill="#004482" />
      <text x="43" y="60" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="bold" fill="#ffffff" text-anchor="middle">C</text>
      <text x="68" y="55" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="bold" fill="#00add8" text-anchor="middle">+</text>
      <text x="80" y="55" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="bold" fill="#00add8" text-anchor="middle">+</text>
    </svg>`
  },
  {
    id: "java",
    name: "Java",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <ellipse cx="50" cy="70" rx="35" ry="12" fill="#f89820" opacity="0.3" />
      <path d="M25,55 C25,55 20,68 50,68 C80,68 75,55 75,55 C75,55 78,50 68,50 C58,50 58,52 50,52 C42,52 42,50 32,50 C22,50 25,55 25,55 Z" fill="#5382a1" />
      <path d="M68,50 C75,50 82,42 70,38 C60,35 62,45 68,50 Z" fill="#f89820" />
      <path d="M48,15 C48,15 35,30 45,45 C50,52 55,42 50,35 C45,28 55,20 48,15 Z" fill="#ea2d2e" />
      <path d="M58,22 C58,22 48,32 55,43 C60,50 65,42 60,35 C55,28 65,22 58,22 Z" fill="#ea2d2e" />
    </svg>`
  },
  {
    id: "swift",
    name: "Swift",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <rect x="10" y="10" width="80" height="80" rx="18" fill="url(#swiftGrad)" />
      <defs>
        <linearGradient id="swiftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ff7f34" />
          <stop offset="100%" stop-color="#f23d26" />
        </linearGradient>
      </defs>
      <path d="M25,75 C25,75 55,75 75,45 C75,45 60,60 48,60 C36,60 28,52 28,45 C28,35 45,20 45,20 C45,20 30,35 25,48 C20,60 25,75 25,75 Z" fill="#ffffff" />
      <path d="M48,60 C58,60 70,50 80,30 C80,30 72,42 60,48 C48,54 48,60 48,60 Z" fill="#ffffff" />
    </svg>`
  },
  {
    id: "flutter",
    name: "Flutter",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <polygon points="55,10 85,40 65,60 35,30" fill="#47c5fb" />
      <polygon points="65,60 85,80 55,90 35,70" fill="#02569b" />
      <polygon points="35,70 50,55 65,60 35,90" fill="#0175c2" />
    </svg>`
  },
  {
    id: "css",
    name: "CSS",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <polygon points="15,10 85,10 78,78 50,90 22,78" fill="#1572b6" />
      <polygon points="50,17 78,17 72,73 50,82" fill="#33a9dc" />
      <path d="M50,30 L68,30 L67,40 L50,40 L50,50 L65,50 L64,65 L50,71 L36,65 L35,53 L44,53 L45,58 L50,60 L55,58 L56,50 L34,50 L32,20 L69,20 L69,25 L37,25 L38,38 L50,38 Z" fill="#ffffff" />
    </svg>`
  },
  {
    id: "html",
    name: "HTML",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <polygon points="15,10 85,10 78,78 50,90 22,78" fill="#e34f26" />
      <polygon points="50,17 78,17 72,73 50,82" fill="#f06529" />
      <path d="M50,30 L68,30 L66,50 L50,50 L50,60 L59,60 L58,65 L50,68 L42,65 L41,58 L32,58 L34,70 L50,75 L66,70 L69,38 L32,38 L31,20 L71,20 L71,25 L36,25 L37,30 L50,30 Z" fill="#ffffff" />
    </svg>`
  },
  {
    id: "sql",
    name: "SQL",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <ellipse cx="50" cy="25" rx="35" ry="12" fill="#336791" stroke="#ffffff" stroke-width="2" />
      <path d="M15,25 L15,45 C15,52 30,57 50,57 C70,57 85,52 85,45 L85,25" fill="#336791" stroke="#ffffff" stroke-width="2" stroke-linejoin="round" />
      <path d="M15,45 L15,65 C15,72 30,77 50,77 C70,77 85,72 85,65 L85,45" fill="#336791" stroke="#ffffff" stroke-width="2" stroke-linejoin="round" />
      <ellipse cx="50" cy="45" rx="35" ry="10" fill="#2f5e85" stroke="#ffffff" stroke-width="1.5" />
      <ellipse cx="50" cy="65" rx="35" ry="10" fill="#244967" stroke="#ffffff" stroke-width="1.5" />
    </svg>`
  },
  {
    id: "mongodb",
    name: "MongoDB",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M50,10 C50,10 72,32 72,55 C72,72 62,85 50,90 C38,85 28,72 28,55 C28,32 50,10 50,10 Z" fill="#47a248" />
      <path d="M50,10 C50,10 58,32 58,55 C58,72 54,82 50,90 Z" fill="#3f8a3f" />
      <path d="M50,22 C48,22 45,35 45,50 C45,65 48,78 50,78 Z" fill="#ffffff" opacity="0.3" />
    </svg>`
  },
  {
    id: "redis",
    name: "Redis",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <polygon points="50,10 85,25 50,40 15,25" fill="#d82c20" />
      <path d="M15,25 L15,45 L50,60 L50,40 Z" fill="#a31e16" />
      <path d="M85,25 L85,45 L50,60 L50,40 Z" fill="#b9241a" />
      <polygon points="50,35 85,50 50,65 15,50" fill="#d82c20" />
      <path d="M15,50 L15,70 L50,85 L50,65 Z" fill="#a31e16" />
      <path d="M85,50 L85,70 L50,85 L50,65 Z" fill="#b9241a" />
    </svg>`
  },
  {
    id: "docker",
    name: "Docker",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M10,50 C10,65 22,75 45,75 C70,75 88,68 88,52 C88,40 76,40 70,40 C65,40 60,43 55,43 C50,43 45,38 35,38 C22,38 10,42 10,50 Z" fill="#0db7ed" />
      <rect x="25" y="24" width="8" height="8" rx="1.5" fill="#0db7ed" stroke="#ffffff" stroke-width="1.5" />
      <rect x="35" y="24" width="8" height="8" rx="1.5" fill="#0db7ed" stroke="#ffffff" stroke-width="1.5" />
      <rect x="45" y="24" width="8" height="8" rx="1.5" fill="#0db7ed" stroke="#ffffff" stroke-width="1.5" />
      <rect x="30" y="14" width="8" height="8" rx="1.5" fill="#0db7ed" stroke="#ffffff" stroke-width="1.5" />
      <rect x="40" y="14" width="8" height="8" rx="1.5" fill="#0db7ed" stroke="#ffffff" stroke-width="1.5" />
      <rect x="50" y="14" width="8" height="8" rx="1.5" fill="#0db7ed" stroke="#ffffff" stroke-width="1.5" />
      <path d="M60,30 C60,25 72,15 80,25" fill="none" stroke="#0db7ed" stroke-width="3" stroke-linecap="round" />
    </svg>`
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <polygon points="50,5 88,27 88,73 50,95 12,73 12,27" fill="#326ce5" />
      <polygon points="50,11 82,30 82,70 50,89 18,70 18,30" fill="#ffffff" />
      <polygon points="50,18 76,33 76,67 50,82 24,67 24,33" fill="#326ce5" />
      <circle cx="50" cy="50" r="12" fill="#ffffff" />
      <line x1="50" y1="18" x2="50" y2="82" stroke="#ffffff" stroke-width="5" />
      <line x1="24" y1="33" x2="76" y2="67" stroke="#ffffff" stroke-width="5" />
      <line x1="24" y1="67" x2="76" y2="33" stroke="#ffffff" stroke-width="5" />
    </svg>`
  },
  {
    id: "aws",
    name: "AWS",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <rect x="10" y="20" width="80" height="60" rx="10" fill="#232f3e" />
      <path d="M22,58 L28,40 L34,58 L30,58 L28,50 L25,58 Z" fill="#ffffff" />
      <path d="M38,40 L43,58 L48,40 L53,58 L58,40" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M62,54 C62,54 66,58 72,55 C78,52 74,46 68,44 C62,42 62,38 68,38 C74,38 78,42 78,42" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" />
      <path d="M22,66 C35,76 65,76 78,66" fill="none" stroke="#ff9900" stroke-width="4.5" stroke-linecap="round" />
      <polygon points="78,66 73,62 76,71" fill="#ff9900" />
    </svg>`
  },
  {
    id: "git",
    name: "Git",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <rect x="10" y="10" width="80" height="80" rx="14" fill="#f05032" transform="rotate(45 50 50)" />
      <circle cx="50" cy="35" r="7" fill="#ffffff" />
      <circle cx="50" cy="65" r="7" fill="#ffffff" />
      <circle cx="65" cy="50" r="7" fill="#ffffff" />
      <line x1="50" y1="35" x2="50" y2="65" stroke="#ffffff" stroke-width="5" />
      <path d="M50,50 Q65,50 65,50" stroke="#ffffff" stroke-width="5" fill="none" />
      <line x1="50" y1="50" x2="65" y2="50" stroke="#ffffff" stroke-width="5" />
    </svg>`
  },
  {
    id: "graphql",
    name: "GraphQL",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" fill="none" stroke="#e10098" stroke-width="4" stroke-linejoin="round" />
      <polygon points="50,22 75,36 75,64 50,78 25,64 25,36" fill="none" stroke="#e10098" stroke-width="3" stroke-linejoin="round" />
      <circle cx="50" cy="10" r="6" fill="#e10098" />
      <circle cx="85" cy="30" r="6" fill="#e10098" />
      <circle cx="85" cy="70" r="6" fill="#e10098" />
      <circle cx="50" cy="90" r="6" fill="#e10098" />
      <circle cx="15" cy="70" r="6" fill="#e10098" />
      <circle cx="15" cy="30" r="6" fill="#e10098" />
      <circle cx="50" cy="50" r="10" fill="#e10098" />
      <line x1="50" y1="10" x2="50" y2="90" stroke="#e10098" stroke-width="2" />
      <line x1="15" y1="30" x2="85" y2="70" stroke="#e10098" stroke-width="2" />
      <line x1="15" y1="70" x2="85" y2="30" stroke="#e10098" stroke-width="2" />
    </svg>`
  },
  {
    id: "terraform",
    name: "Terraform",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <polygon points="20,15 45,15 45,40 20,40" fill="#7b42bc" />
      <polygon points="55,15 80,15 80,40 55,40" fill="#7b42bc" />
      <polygon points="20,48 45,48 45,73 20,73" fill="#7b42bc" />
      <polygon points="55,48 80,48 80,73 55,73" fill="#844fba" />
      <polygon points="37,31 62,31 62,56 37,56" fill="#5c4ee5" />
    </svg>`
  },
  {
    id: "redux",
    name: "Redux",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M50,15 C40,30 20,30 20,50 C20,70 40,70 50,85 C60,70 80,70 80,50 C80,30 60,30 50,15 Z" fill="none" stroke="#764abc" stroke-width="5" />
      <path d="M15,50 C30,40 30,20 50,20 C70,20 70,40 85,50 C70,60 70,80 50,80 C30,80 30,60 15,50 Z" fill="none" stroke="#764abc" stroke-width="5" />
      <circle cx="50" cy="50" r="10" fill="#764abc" />
    </svg>`
  },
  {
    id: "vite",
    name: "Vite",
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <polygon points="50,8 90,20 78,80 50,92 22,80 10,20" fill="url(#viteBg)" />
      <defs>
        <linearGradient id="viteBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#41187a" />
          <stop offset="100%" stop-color="#1b0e3d" />
        </linearGradient>
      </defs>
      <polygon points="53,18 78,35 48,55 60,55 35,85 45,45 35,45" fill="#ffc700" />
      <polygon points="53,18 42,38 48,55 37,55 35,85 45,45 35,45" fill="#ff9e00" />
    </svg>`
  }
];

const questions = [
  {
    questionText: "Which three technologies are programming languages that compile to machine code or are statically compiled?",
    correctAnswerIds: ["rust", "go", "cpp"]
  },
  {
    questionText: "Which three technologies are dedicated database systems or key-value stores for managing structured or unstructured data?",
    correctAnswerIds: ["sql", "mongodb", "redis"]
  },
  {
    questionText: "Which three technologies are client-side frontend libraries or frameworks running natively in the browser?",
    correctAnswerIds: ["react", "vue", "angular"]
  },
  {
    questionText: "Which three technologies represent the foundational languages and styling pillars of the standard Web platform?",
    correctAnswerIds: ["html", "css", "javascript"]
  },
  {
    questionText: "Which three technologies are open-source projects or developer frameworks created, initiated, or heavily backed by Google?",
    correctAnswerIds: ["go", "angular", "flutter"]
  },
  {
    questionText: "Which three technologies are widely recognized tools or services used for containerization, system orchestration, and cloud DevOps?",
    correctAnswerIds: ["docker", "kubernetes", "aws"]
  },
  {
    questionText: "Which three technologies are compiled languages heavily designed for low-level systems programming, high performance, or absolute safety?",
    correctAnswerIds: ["rust", "go", "cpp"]
  },
  {
    questionText: "Which three technologies are modern tools, libraries, or frameworks built directly on top of or powered by React?",
    correctAnswerIds: ["nextjs", "react", "redux"]
  },
  {
    questionText: "Which three technologies are backend frameworks, engines, or runtimes built primarily for server-side logic and application servers?",
    correctAnswerIds: ["nodejs", "django", "php"]
  },
  {
    questionText: "Which three technologies are strictly statically typed programming languages?",
    correctAnswerIds: ["typescript", "rust", "cpp"]
  },
  {
    questionText: "Which three technologies are official general-purpose programming languages (excluding markups, styles, and configurations)?",
    correctAnswerIds: ["python", "rust", "java"]
  },
  {
    questionText: "Which three technologies are specialized tools inside JavaScript development for state management, project building, or dependency routing?",
    correctAnswerIds: ["redux", "vite", "git"]
  },
  {
    questionText: "Which three technologies are heavily used to construct, query, or design standard web APIs and database schemas?",
    correctAnswerIds: ["graphql", "sql", "mongodb"]
  },
  {
    questionText: "Which three technologies are dynamically-typed scripting languages commonly run in backend, utility, or web scripting fields?",
    correctAnswerIds: ["javascript", "python", "php"]
  },
  {
    questionText: "Which three technologies use custom markup schemas, structural stylesheets, or configuration-declarative files?",
    correctAnswerIds: ["html", "css", "terraform"]
  },
  {
    questionText: "Which three technologies are frontend UI systems that support custom reactive state paradigms or template bindings?",
    correctAnswerIds: ["vue", "angular", "svelte"]
  },
  {
    questionText: "Which three technologies are highly utilized runtimes or engines for compiling and executing JavaScript applications outside standard browsers?",
    correctAnswerIds: ["nodejs", "javascript", "nextjs"]
  },
  {
    questionText: "Which three technologies represent the cloud-native ecosystem's core container builds, hosting platforms, and deployment tools?",
    correctAnswerIds: ["docker", "kubernetes", "aws"]
  },
  {
    questionText: "Which three technologies are part of the React ecosystem or require React as a peer dependency for standard production apps?",
    correctAnswerIds: ["react", "nextjs", "redux"]
  },
  {
    questionText: "Which three technologies support native application development or hybrid mobile frameworks running cross-platform on iOS/Android?",
    correctAnswerIds: ["flutter", "swift", "react"]
  }
];

module.exports = { technologies, questions };
