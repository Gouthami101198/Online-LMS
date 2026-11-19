import { Course, User, Certificate, Notification, RevenueRecord, CategoryDistribution } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user-student-1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    avatar: '',
    role: 'student',
    title: 'Aspiring Full-Stack Software Engineer',
    bio: 'Passionate computer science learner building modern web and AI applications. IIT Bombay alumnus focused on React, TypeScript, and Python.',
    phone: '+91 98765 43210',
    location: 'Bengaluru, Karnataka, India',
    website: 'https://aaravsharma.dev',
    joinedDate: '2024-01-15',
    enrolledCoursesCount: 4,
    completedCoursesCount: 1,
    status: 'active',
  },
  {
    id: 'user-instructor-1',
    name: 'Dr. Rajesh Varma',
    email: 'rajesh.varma@edupath.in',
    avatar: '',
    role: 'instructor',
    title: 'Principal AI Architect & Former Google India Staff Engineer',
    bio: 'PhD in Distributed Systems from IIT Delhi. Has trained over 150,000 Indian engineers in scalable full-stack architectures, GenAI, and microservices.',
    phone: '+91 98234 56789',
    location: 'Hyderabad, Telangana, India',
    website: 'https://rajeshvarma.ai',
    joinedDate: '2022-03-10',
    totalEarnings: 1489200,
    status: 'active',
  },
  {
    id: 'user-instructor-2',
    name: 'Pooja Iyer',
    email: 'pooja.iyer@edupath.in',
    avatar: '',
    role: 'instructor',
    title: 'VP of Product Design at Razorpay | NID Alumna',
    bio: 'Design systems lead with 14+ years shaping interfaces for India’s fastest growing fintech and SaaS products. Expert in accessibility and micro-interactions.',
    phone: '+91 98450 11223',
    location: 'Bengaluru, Karnataka, India',
    website: 'https://poojaiyer.design',
    joinedDate: '2022-07-22',
    totalEarnings: 945000,
    status: 'active',
  },
  {
    id: 'user-admin-1',
    name: 'Vikramaditya Sengupta',
    email: 'admin@edupath.in',
    avatar: '',
    role: 'admin',
    title: 'Director of Platform Operations & Academic Governance',
    bio: 'Oversees EduPath LMS platform reliability, faculty verification, and Indian university accreditation standards.',
    phone: '+91 98111 22334',
    location: 'Bengaluru, Karnataka, India',
    joinedDate: '2021-01-01',
    status: 'active',
  },
  {
    id: 'user-student-2',
    name: 'Tanvi Kulkarni',
    email: 'tanvi.k@example.com',
    avatar: '',
    role: 'student',
    title: 'Data Analyst & Python Developer',
    bio: 'Exploring Deep Learning and Next.js applications in Pune.',
    phone: '+91 98220 33445',
    location: 'Pune, Maharashtra, India',
    joinedDate: '2024-02-14',
    enrolledCoursesCount: 2,
    completedCoursesCount: 0,
    status: 'active',
  },
  {
    id: 'user-student-3',
    name: 'Rohan Deshmukh',
    email: 'rohan.d@example.com',
    avatar: '',
    role: 'student',
    title: 'Cloud DevOps Engineer',
    bio: 'Mastering modern microservices and Kubernetes architectures in Mumbai.',
    phone: '+91 98330 55667',
    location: 'Mumbai, Maharashtra, India',
    joinedDate: '2024-03-01',
    enrolledCoursesCount: 3,
    completedCoursesCount: 2,
    status: 'active',
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-react-ts-mastery',
    title: 'Full-Stack React 18, Next.js & TypeScript Mastery',
    slug: 'react-nextjs-typescript-mastery',
    subtitle: 'Build production-ready, ultra-fast web applications with clean architecture, Zustand/Redux, and Tailwind CSS.',
    description: 'Master the entire React 18 ecosystem from fundamentals to enterprise-grade architectures. In this complete project-driven course, you will engineer full-stack web applications featuring server-side rendering, real-time state synchronization, automated testing, and cloud deployment pipelines.',
    category: 'Development',
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80',
    promoVideoUrl: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
    instructorId: 'user-instructor-1',
    instructorName: 'Dr. Rajesh Varma',
    instructorTitle: 'Principal Cloud & AI Architect, Former Google India Staff Engineer',
    instructorAvatar: '',
    instructorBio: 'PhD in Distributed Systems from IIT Madras with 15+ years architecting scalable cloud platforms in Bengaluru.',
    price: 4999,
    discountPrice: 2499,
    rating: 4.9,
    reviewsCount: 1248,
    studentsCount: 14250,
    duration: '28h 30m',
    totalLessons: 32,
    lastUpdated: 'November 2024',
    language: 'English',
    tags: ['React', 'TypeScript', 'Next.js', 'Redux', 'Tailwind CSS'],
    isFeatured: true,
    isTrending: true,
    status: 'published',
    whatYouWillLearn: [
      'Architect robust enterprise React applications using TypeScript strictly without any `any` types',
      'Leverage React 18 Concurrent features, Transitions, Suspense, and Server Components',
      'Implement state management using Redux Toolkit, RTK Query, and modern custom hooks',
      'Build responsive, pixel-perfect, accessible UI components with Tailwind CSS',
      'Deploy full-stack applications to Vercel and AWS with automated CI/CD workflows'
    ],
    requirements: [
      'Basic understanding of HTML, CSS, and modern JavaScript (ES6+)',
      'A computer running Windows, macOS, or Linux with Node.js installed',
      'No prior TypeScript or Redux knowledge required - taught from ground up'
    ],
    chapters: [
      {
        id: 'chap-1',
        title: 'Section 1: Modern React 18 Fundamentals & Architecture',
        order: 1,
        lessons: [
          {
            id: 'les-1-1',
            title: '1. Welcome & High-Performance Architecture Overview',
            duration: '09:45',
            durationSeconds: 585,
            videoUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8',
            summary: 'Welcome to the course! Learn how modern React 18 applications are structured for scalability, maintainability, and clean code boundaries.',
            isFreePreview: true,
            resources: [
              { id: 'res-1', title: 'Architecture Cheat Sheet (PDF)', type: 'pdf', fileSize: '2.4 MB', url: '#' },
              { id: 'res-2', title: 'Starter Boilerplate Repository', type: 'code', url: 'https://github.com/example/react-starter' }
            ]
          },
          {
            id: 'les-1-2',
            title: '2. TypeScript Setup, Strict Typing & Component Props',
            duration: '14:20',
            durationSeconds: 860,
            videoUrl: 'https://www.youtube.com/watch?v=gieEQFIfgYc',
            summary: 'Set up strict TypeScript with custom utility types, generic props, Discriminated Unions, and event handler typing.',
            isFreePreview: true,
            resources: [
              { id: 'res-3', title: 'TypeScript Cheat Sheet.pdf', type: 'pdf', fileSize: '1.8 MB', url: '#' }
            ]
          },
          {
            id: 'les-1-3',
            title: '3. State Management with Redux Toolkit and Slices',
            duration: '18:50',
            durationSeconds: 1130,
            videoUrl: 'https://www.youtube.com/watch?v=9zySeP5vH9c',
            summary: 'Deep dive into configureStore, createSlice, extraReducers, and typed useSelector and useDispatch hooks.',
            quiz: {
              id: 'quiz-react-redux',
              title: 'React & Redux Architecture Knowledge Check',
              timeLimitMinutes: 10,
              passingScorePercent: 75,
              questions: [
                {
                  id: 'q1',
                  question: 'What is the primary benefit of Redux Toolkit createSlice?',
                  options: [
                    'It automatically handles Immer under the hood for immutable updates while letting you write mutating logic',
                    'It replaces all React components with pure functions',
                    'It eliminates the need for any TypeScript interfaces',
                    'It forces all state to be stored in localStorage exclusively'
                  ],
                  correctOptionIndex: 0,
                  explanation: 'createSlice uses Immer internally, allowing developers to write simpler mutating code that produces clean immutable updates.'
                },
                {
                  id: 'q2',
                  question: 'Which React hook was introduced in React 18 to mark non-urgent state transitions?',
                  options: [
                    'useTransition',
                    'useCallback',
                    'useDeferredValue',
                    'useImperativeHandle'
                  ],
                  correctOptionIndex: 0,
                  explanation: 'useTransition lets you mark updates as transitions, keeping the user interface responsive during heavy state changes.'
                },
                {
                  id: 'q3',
                  question: 'How do you type custom RootState in Redux Toolkit?',
                  options: [
                    'type RootState = ReturnType<typeof store.getState>;',
                    'type RootState = typeof store.state;',
                    'type RootState = any;',
                    'type RootState = store.getAllStates();'
                  ],
                  correctOptionIndex: 0,
                  explanation: 'Using ReturnType<typeof store.getState> generates an exact, automatically updated TypeScript type for the root Redux store.'
                }
              ]
            }
          }
        ]
      },
      {
        id: 'chap-2',
        title: 'Section 2: High-Performance Routing, Layouts & Data Fetching',
        order: 2,
        lessons: [
          {
            id: 'les-2-1',
            title: '4. React Router v6 Nested Routes & Protected Layouts',
            duration: '16:30',
            durationSeconds: 990,
            videoUrl: 'https://www.youtube.com/watch?v=Ul3y1LXxzdU',
            summary: 'Build scalable navigation bars, sidebars, dynamic parameter routing, and role-based route authentication wrappers.',
            resources: [
              { id: 'res-4', title: 'Route Layout Diagrams.zip', type: 'zip', fileSize: '4.1 MB', url: '#' }
            ]
          },
          {
            id: 'les-2-2',
            title: '5. Axios Centralized Client, Interceptors & Error Boundaries',
            duration: '21:10',
            durationSeconds: 1270,
            videoUrl: 'https://www.youtube.com/watch?v=6LyagkoRWYA',
            summary: 'Configure Axios instance with automatic JWT header injection, 401 token refresh retry interceptors, and user-friendly error banners.',
            isFreePreview: false
          }
        ]
      },
      {
        id: 'chap-3',
        title: 'Section 3: Production Polishing, Testing & Cloud CI/CD',
        order: 3,
        lessons: [
          {
            id: 'les-3-1',
            title: '6. Micro-animations with Framer Motion & Responsive Polish',
            duration: '19:40',
            durationSeconds: 1180,
            videoUrl: 'https://www.youtube.com/watch?v=2V1WK-3HQNk',
            summary: 'Bring your LMS and web app to life with subtle spring transitions, layout animations, and accessibility-compliant reduced motion.',
            resources: [
              { id: 'res-5', title: 'Animation Presets Source Code.ts', type: 'code', url: '#' }
            ]
          },
          {
            id: 'les-3-2',
            title: '7. Final Capstone Project Review & Certification',
            duration: '12:15',
            durationSeconds: 735,
            videoUrl: 'https://www.youtube.com/watch?v=843nec-IvW0',
            summary: 'Verify your complete application, run audits with Lighthouse, and claim your verifiable completion certificate.',
            quiz: {
              id: 'quiz-react-capstone',
              title: 'Full-Stack React Certification Exam',
              timeLimitMinutes: 15,
              passingScorePercent: 80,
              questions: [
                {
                  id: 'qc1',
                  question: 'What is the recommended practice for handling API authorization tokens securely in browser apps?',
                  options: [
                    'HTTP-Only Secure SameSite cookies combined with in-memory tokens via Axios interceptors',
                    'Hardcoding API keys in plain text in client bundle',
                    'Storing token in query params on every navigation',
                    'Disabling CORS across the entire backend'
                  ],
                  correctOptionIndex: 0,
                  explanation: 'HTTP-Only secure cookies prevent malicious XSS scripts from reading sensitive authentication tokens.'
                },
                {
                  id: 'qc2',
                  question: 'Why should you include key props when rendering dynamic lists in React?',
                  options: [
                    'Keys help React identify which items have changed, been added, or been removed during reconciliation',
                    'Keys are required by TypeScript to avoid compile errors',
                    'Keys change the CSS styling of each child node',
                    'Keys ensure the items are automatically sorted alphabetically'
                  ],
                  correctOptionIndex: 0,
                  explanation: 'Unique stable keys enable React virtual DOM diffing to update only the specific elements that changed.'
                }
              ]
            }
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        userId: 'user-student-2',
        userName: 'Tanvi Kulkarni',
        userAvatar: '',
        rating: 5,
        comment: 'Hands down the most practical, comprehensive React + TypeScript course available in India. The modular architecture and Redux integration patterns directly helped me pass my senior developer interview at Swiggy!',
        date: '2 weeks ago',
        likes: 34
      },
      {
        id: 'rev-2',
        userId: 'user-student-3',
        userName: 'Rohan Deshmukh',
        userAvatar: '',
        rating: 5,
        comment: 'The video lecture interface and interactive quizzes made learning so seamless. Dr. Rajesh explains distributed system tradeoffs with pristine clarity.',
        date: '1 month ago',
        likes: 19
      }
    ]
  },
  {
    id: 'course-ui-ux-design-systems',
    title: 'Modern UI/UX Design Systems with Figma & Tailwind',
    slug: 'ui-ux-design-systems-figma-tailwind',
    subtitle: 'From user wireframes to tokenized multi-brand design systems, interactive prototypes, and production code.',
    description: 'Bridge the gap between design and front-end engineering. Learn how to craft world-class design systems in Figma using auto-layout 5.0, variables, design tokens, and translate them directly into responsive Tailwind CSS components.',
    category: 'Design',
    level: 'All Levels',
    thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80',
    promoVideoUrl: 'https://www.youtube.com/watch?v=c9Wg6Cb_YlU',
    instructorId: 'user-instructor-2',
    instructorName: 'Ananya Deshmukh',
    instructorTitle: 'Lead Design Strategist, Razorpay & IIT Bombay Alumna',
    instructorAvatar: '',
    instructorBio: 'Design systems leader shaping payment experiences for over 10M+ Indian businesses and consumers.',
    price: 3499,
    discountPrice: 1999,
    rating: 4.8,
    reviewsCount: 840,
    studentsCount: 9820,
    duration: '21h 15m',
    totalLessons: 24,
    lastUpdated: 'October 2024',
    language: 'English',
    tags: ['UI/UX', 'Figma', 'Design Systems', 'Tailwind CSS', 'Accessibility'],
    isFeatured: true,
    isTrending: false,
    status: 'published',
    whatYouWillLearn: [
      'Build comprehensive design systems with Figma Variables, components, and auto-layout',
      'Create responsive UI components that mirror production Tailwind design tokens',
      'Conduct user testing, wireframing, and interactive micro-interaction prototyping',
      'Ensure WCAG 2.1 AA accessibility standards for color contrast, typography, and focus states'
    ],
    requirements: [
      'Free Figma account',
      'Curiosity for visual design and software user experience'
    ],
    chapters: [
      {
        id: 'chap-ui-1',
        title: 'Section 1: Foundations of Design Systems & Token Architecture',
        order: 1,
        lessons: [
          {
            id: 'les-ui-1-1',
            title: '1. Why Design Systems Fail (And How to Win)',
            duration: '11:10',
            durationSeconds: 670,
            videoUrl: 'https://www.youtube.com/watch?v=c9Wg6Cb_YlU',
            summary: 'Understanding the common pitfalls of component libraries and how to build maintainable token foundations.',
            isFreePreview: true
          },
          {
            id: 'les-ui-1-2',
            title: '2. Figma Variables: Colors, Spacing, and Elevation',
            duration: '17:40',
            durationSeconds: 1060,
            videoUrl: 'https://www.youtube.com/watch?v=FTFaQWZBqQ8',
            summary: 'Creating light and dark mode variable collections and semantic aliases.',
            isFreePreview: true
          }
        ]
      }
    ],
    reviews: []
  },
  {
    id: 'course-ai-data-science-python',
    title: 'Generative AI & Machine Learning with Python & LangChain',
    slug: 'generative-ai-ml-python-langchain',
    subtitle: 'Build LLM agents, RAG pipelines, fine-tuned models, and deploy intelligent AI applications.',
    description: 'Step into the generative AI revolution. Learn how to build production RAG (Retrieval-Augmented Generation) systems, vector database search with Pinecone and ChromaDB, function calling agents, and neural network fine-tuning.',
    category: 'Data Science & AI',
    level: 'Advanced',
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80',
    promoVideoUrl: 'https://www.youtube.com/watch?v=aywZrzNaKjs',
    instructorId: 'user-instructor-1',
    instructorName: 'Dr. Rajesh Varma',
    instructorTitle: 'Principal Cloud & AI Architect, Former Google India Staff Engineer',
    instructorAvatar: '',
    instructorBio: 'Former Staff Engineer at Google Cloud, PhD in Distributed Systems from MIT with over 150,000 students worldwide.',
    price: 5999,
    discountPrice: 3499,
    rating: 4.95,
    reviewsCount: 2150,
    studentsCount: 18400,
    duration: '34h 45m',
    totalLessons: 40,
    lastUpdated: 'November 2024',
    language: 'English',
    tags: ['Python', 'Generative AI', 'LangChain', 'OpenAI', 'RAG', 'Vector DBs'],
    isFeatured: true,
    isTrending: true,
    status: 'published',
    whatYouWillLearn: [
      'Build end-to-end RAG pipelines with semantic document chunking and embeddings',
      'Create multi-agent workflows using LangGraph and LangChain',
      'Fine-tune open-weights models like Llama 3 with LoRA and QLoRA',
      'Integrate streaming LLM responses with modern React web frontends'
    ],
    requirements: [
      'Intermediate Python proficiency',
      'Familiarity with basic linear algebra and vector operations is helpful'
    ],
    chapters: [
      {
        id: 'chap-ai-1',
        title: 'Section 1: Modern LLM Foundations & Prompt Engineering',
        order: 1,
        lessons: [
          {
            id: 'les-ai-1-1',
            title: '1. The Transformer Architecture Demystified',
            duration: '15:20',
            durationSeconds: 920,
            videoUrl: 'https://www.youtube.com/watch?v=eMlx5fFNoYc',
            summary: 'Attention mechanisms, embeddings, and token generation explained intuitively.',
            isFreePreview: true
          }
        ]
      }
    ],
    reviews: []
  },
  {
    id: 'course-cloud-devops-k8s',
    title: 'Cloud Native DevOps: Kubernetes, Docker & AWS Mastery',
    slug: 'cloud-native-devops-kubernetes-docker-aws',
    subtitle: 'Containerize microservices, deploy GitOps pipelines with ArgoCD, and automate infrastructure as code.',
    description: 'Transform your deployments into automated, self-healing cloud native systems. Learn Terraform, Docker multi-stage builds, Kubernetes pod scheduling, Helm charts, and continuous deployment.',
    category: 'Cloud & DevOps',
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop&q=80',
    promoVideoUrl: 'https://www.youtube.com/watch?v=X48VuDVv0do',
    instructorId: 'user-instructor-4',
    instructorName: 'Karthik Iyer',
    instructorTitle: 'Chief Cloud Infrastructure Architect & AWS Community Hero',
    instructorAvatar: '',
    instructorBio: 'Lead cloud consultant based in Hyderabad, migrating enterprise banking systems to Kubernetes and Terraform.',
    price: 5499,
    discountPrice: 2999,
    rating: 4.85,
    reviewsCount: 970,
    studentsCount: 11200,
    duration: '26h 10m',
    totalLessons: 28,
    lastUpdated: 'September 2024',
    language: 'English',
    tags: ['DevOps', 'Kubernetes', 'Docker', 'AWS', 'Terraform', 'CI/CD'],
    isFeatured: false,
    isTrending: true,
    status: 'published',
    whatYouWillLearn: [
      'Write optimized Dockerfiles and reduce image footprint by 80%',
      'Deploy and manage production Kubernetes clusters on AWS EKS',
      'Provision scalable cloud infrastructure using Terraform scripts',
      'Implement GitOps pipelines with automated rollback capabilities'
    ],
    requirements: [
      'Basic Linux command line knowledge',
      'Free tier AWS account'
    ],
    chapters: [
      {
        id: 'chap-k8s-1',
        title: 'Section 1: Containerization with Docker & Microservices',
        order: 1,
        lessons: [
          {
            id: 'les-k8s-1',
            title: '1. Production Dockerfile Multi-Stage Builds',
            duration: '14:20',
            durationSeconds: 860,
            videoUrl: 'https://www.youtube.com/watch?v=fqMOX6JJhGo',
            summary: 'Learn multi-stage builds, alpine base images, and minimizing attack surface.',
            isFreePreview: true,
            resources: [
              { id: 'res-k8s-1', title: 'Docker Production Guide.pdf', type: 'pdf', fileSize: '1.5 MB', url: '#' }
            ]
          },
          {
            id: 'les-k8s-2',
            title: '2. Kubernetes Pods, Deployments and Services',
            duration: '18:45',
            durationSeconds: 1125,
            videoUrl: 'https://www.youtube.com/watch?v=d6WC5n9G_sM',
            summary: 'Declarative YAML manifests, ReplicaSets, and ClusterIP routing.',
            isFreePreview: false
          }
        ]
      }
    ],
    reviews: []
  },
  {
    id: 'course-cyber-security-defense',
    title: 'Ethical Hacking & Modern Web Application Defense',
    slug: 'ethical-hacking-web-application-defense',
    subtitle: 'Hands-on penetration testing, OWASP Top 10 vulnerabilities, and defensive security engineering.',
    description: 'Protect applications against modern cyber threats. Master vulnerability scanning, SQL injection, XSS defense, authentication bypass prevention, and security auditing.',
    category: 'Cyber Security',
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
    promoVideoUrl: 'https://www.youtube.com/watch?v=inWWhr5tnEA',
    instructorId: 'user-instructor-2',
    instructorName: 'Vikramaditya Sengupta',
    instructorTitle: 'Principal Cybersecurity Consultant & CERT-In Panelist',
    instructorAvatar: '',
    instructorBio: 'Advising Indian government agencies and Fortune 500 banks on zero-trust architectures and red-team penetration testing.',
    price: 6499,
    discountPrice: 3799,
    rating: 4.78,
    reviewsCount: 620,
    studentsCount: 7400,
    duration: '18h 40m',
    totalLessons: 22,
    lastUpdated: 'August 2024',
    language: 'English',
    tags: ['Cyber Security', 'Ethical Hacking', 'OWASP', 'Penetration Testing'],
    isFeatured: false,
    isTrending: false,
    status: 'published',
    whatYouWillLearn: [
      'Identify and remediate OWASP Top 10 security flaws',
      'Perform authenticated penetration tests in safe lab environments',
      'Implement robust cryptography, CSP headers, and rate limiting',
      'Prepare for CompTIA Security+ and CEH certifications'
    ],
    requirements: [
      'Basic web development concepts'
    ],
    chapters: [
      {
        id: 'chap-sec-1',
        title: 'Section 1: Web Security Fundamentals & Threat Modeling',
        order: 1,
        lessons: [
          {
            id: 'les-sec-1',
            title: '1. OWASP Top 10 Walkthrough & Lab Setup',
            duration: '16:15',
            durationSeconds: 975,
            videoUrl: 'https://www.youtube.com/watch?v=2_lswM1S264',
            summary: 'Understanding modern threat vectors, injection flaws, and security headers.',
            isFreePreview: true
          }
        ]
      }
    ],
    reviews: []
  },
  {
    id: 'course-mobile-flutter-native',
    title: 'Cross-Platform Mobile Development with Flutter & Dart',
    slug: 'cross-platform-mobile-flutter-dart',
    subtitle: 'Build stunning iOS and Android apps with a single codebase, Bloc state management, and Firebase.',
    description: 'Craft high-performance, 60fps native mobile apps for iOS and Android. Master Dart 3 features, animations, offline storage, push notifications, and App Store submissions.',
    category: 'Mobile Development',
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop&q=80',
    promoVideoUrl: 'https://www.youtube.com/watch?v=lHhRhPV--G0',
    instructorId: 'user-instructor-1',
    instructorName: 'Aditi Sundaram',
    instructorTitle: 'Lead Mobile Architect, Swiggy & BITS Pilani Alumna',
    instructorAvatar: '',
    instructorBio: 'Expert in cross-platform Dart/Flutter engineering, offline-first sync, and high-performance mobile architectures.',
    price: 4799,
    discountPrice: 2499,
    rating: 4.88,
    reviewsCount: 1100,
    studentsCount: 13500,
    duration: '24h 50m',
    totalLessons: 30,
    lastUpdated: 'October 2024',
    language: 'English',
    tags: ['Flutter', 'Mobile', 'Dart', 'iOS', 'Android', 'Firebase'],
    isFeatured: false,
    isTrending: false,
    status: 'published',
    whatYouWillLearn: [
      'Develop pixel-perfect iOS and Android applications using Flutter',
      'Master reactive state management with Flutter Bloc and Cubit',
      'Integrate Firebase Authentication, Firestore, and Cloud Functions',
      'Publish applications to Apple App Store and Google Play Store'
    ],
    requirements: [
      'Basic programming knowledge in any object-oriented language'
    ],
    chapters: [
      {
        id: 'chap-mob-1',
        title: 'Section 1: Flutter Widgets & Reactive UI',
        order: 1,
        lessons: [
          {
            id: 'les-mob-1',
            title: '1. Building Responsive Layouts with Flutter',
            duration: '15:40',
            durationSeconds: 940,
            videoUrl: 'https://www.youtube.com/watch?v=1ukSR1GRtMU',
            summary: 'Mastering Stateless & Stateful widgets, BuildContext, and Flex layouts.',
            isFreePreview: true
          }
        ]
      }
    ],
    reviews: []
  },
  {
    id: 'course-business-product-mgmt',
    title: 'Tech Product Management: From Discovery to Scale',
    slug: 'tech-product-management-discovery-to-scale',
    subtitle: 'Drive product roadmap strategy, conduct user research, master OKRs, and align engineering teams.',
    description: 'Learn the exact frameworks used by product leaders at Airbnb, Stripe, and Google. Master feature prioritization, metrics definition, user feedback loops, and agile execution.',
    category: 'Business & Management',
    level: 'All Levels',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80',
    promoVideoUrl: 'https://www.youtube.com/watch?v=0lJKucu6HJc',
    instructorId: 'user-instructor-2',
    instructorName: 'Pooja Shenoy',
    instructorTitle: 'VP of Product Management, Flipkart & IIM Bangalore Alumna',
    instructorAvatar: '',
    instructorBio: 'Built and scaled hyper-growth consumer platforms across India with over 50M monthly active users.',
    price: 4499,
    discountPrice: 2299,
    rating: 4.82,
    reviewsCount: 490,
    studentsCount: 6200,
    duration: '16h 20m',
    totalLessons: 20,
    lastUpdated: 'November 2024',
    language: 'English',
    tags: ['Product Management', 'Agile', 'Scrum', 'Business', 'Strategy'],
    isFeatured: true,
    isTrending: false,
    status: 'published',
    whatYouWillLearn: [
      'Define North Star metrics and actionable business OKRs',
      'Conduct impactful customer interviews and prototype validation',
      'Write clear PRDs (Product Requirement Documents) and user stories',
      'Manage cross-functional stakeholders and sprint cycles'
    ],
    requirements: ['Interest in technology businesses and leadership'],
    chapters: [
      {
        id: 'chap-pm-1',
        title: 'Section 1: Product Strategy & Opportunity Discovery',
        order: 1,
        lessons: [
          {
            id: 'les-pm-1',
            title: '1. Finding Product-Market Fit & Opportunity Solution Trees',
            duration: '13:50',
            durationSeconds: 830,
            videoUrl: 'https://www.youtube.com/watch?v=DOtCl5PU8F0',
            summary: 'How top tech companies evaluate ideas before writing code.',
            isFreePreview: true
          }
        ]
      }
    ],
    reviews: []
  },
  {
    id: 'course-growth-marketing-saas',
    title: 'Growth Marketing, Technical SEO & Analytics for SaaS',
    slug: 'growth-marketing-technical-seo-analytics',
    subtitle: 'Data-driven customer acquisition, conversion rate optimization, Google Analytics 4, and paid channels.',
    description: 'Scale software products with rigorous growth experiments. Master customer acquisition cost (CAC), lifetime value (LTV), search engine optimization, programmatic landing pages, and funnel analytics.',
    category: 'Marketing',
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    promoVideoUrl: 'https://www.youtube.com/watch?v=bixR-KIJKYM',
    instructorId: 'user-instructor-1',
    instructorName: 'Sneha Patel',
    instructorTitle: 'Head of Growth Marketing, Zomato & MICA Ahmedabad',
    instructorAvatar: '',
    instructorBio: 'Digital growth hacker driving multi-crore organic acquisition campaigns across pan-India metros and tier-2 markets.',
    price: 3999,
    discountPrice: 1999,
    rating: 4.86,
    reviewsCount: 380,
    studentsCount: 5100,
    duration: '15h 10m',
    totalLessons: 18,
    lastUpdated: 'October 2024',
    language: 'English',
    tags: ['Marketing', 'SEO', 'Analytics', 'Growth', 'SaaS'],
    isFeatured: false,
    isTrending: true,
    status: 'published',
    whatYouWillLearn: [
      'Design high-converting landing pages with rigorous A/B testing',
      'Implement technical SEO architectures and schema markups',
      'Configure Google Analytics 4 (GA4) event funnels and attribution models',
      'Optimize acquisition channels across organic and paid campaigns'
    ],
    requirements: ['Basic understanding of web technologies and marketing concepts'],
    chapters: [
      {
        id: 'chap-mkt-1',
        title: 'Section 1: The Modern Growth Engine & Funnel Architecture',
        order: 1,
        lessons: [
          {
            id: 'les-mkt-1',
            title: '1. Designing High-Velocity Growth Loops',
            duration: '12:30',
            durationSeconds: 750,
            videoUrl: 'https://www.youtube.com/watch?v=nU-IIXBWlS4',
            summary: 'Understanding viral coefficients, retention curves, and monetization funnels.',
            isFreePreview: true
          }
        ]
      }
    ],
    reviews: []
  },
  {
    id: 'course-backend-microservices-node-go',
    title: 'Enterprise Backend Engineering: Node.js, Go & Microservices',
    slug: 'enterprise-backend-engineering-nodejs-go-microservices',
    subtitle: 'Design high-throughput distributed systems, event-driven architectures with Kafka, and gRPC APIs.',
    description: 'Scale backends from single monoliths to event-driven microservices. Master gRPC, message queues with Kafka, PostgreSQL connection pooling, Redis caching, and zero-downtime database migrations.',
    category: 'Development',
    level: 'Advanced',
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
    promoVideoUrl: 'https://www.youtube.com/watch?v=y8OnoxKotPQ',
    instructorId: 'user-instructor-1',
    instructorName: 'Dr. Rajesh Varma',
    instructorTitle: 'Principal Cloud & AI Architect, Former Google India Staff Engineer',
    instructorAvatar: '',
    instructorBio: 'Former Staff Engineer at Google Cloud India, PhD in Distributed Systems from IIT Madras.',
    price: 5499,
    discountPrice: 2999,
    rating: 4.92,
    reviewsCount: 1420,
    studentsCount: 16800,
    duration: '31h 00m',
    totalLessons: 36,
    lastUpdated: 'November 2024',
    language: 'English',
    tags: ['Node.js', 'Go', 'Microservices', 'PostgreSQL', 'Docker', 'Kafka'],
    isFeatured: true,
    isTrending: true,
    status: 'published',
    whatYouWillLearn: [
      'Build ultra high-throughput microservices using Go and Node.js',
      'Implement real-time pub/sub messaging patterns using Apache Kafka and Redis',
      'Optimize database queries with indexing, partitioning, and connection pools',
      'Design fault-tolerant APIs with circuit breakers and rate limiting'
    ],
    requirements: ['Intermediate JavaScript or Go programming experience'],
    chapters: [
      {
        id: 'chap-be-1',
        title: 'Section 1: Distributed Systems Fundamentals',
        order: 1,
        lessons: [
          {
            id: 'les-be-1',
            title: '1. Monolith to Microservices: Architectural Tradeoffs',
            duration: '16:00',
            durationSeconds: 960,
            videoUrl: 'https://www.youtube.com/watch?v=CZ3wIuvmHeM',
            summary: 'Service boundaries, domain-driven design, and consistency models.',
            isFreePreview: true
          }
        ]
      }
    ],
    reviews: []
  },
  {
    id: 'course-nextjs-fullstack-ai',
    title: 'Next.js 15, Server Actions & Full-Stack AI Web Apps',
    slug: 'nextjs-15-server-actions-fullstack-ai',
    subtitle: 'Build ultra-fast AI SaaS platforms using Next.js 15 App Router, React Server Components, and OpenAI APIs.',
    description: 'Master the next generation of full-stack React. In this course, you will engineer a complete SaaS product using Next.js 15, Server Actions, streaming UI with Suspense, Tailwind CSS, Stripe/Razorpay payments, and the Vercel AI SDK.',
    category: 'Development',
    level: 'Advanced',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    promoVideoUrl: 'https://www.youtube.com/watch?v=wm5gMKuwSYk',
    instructorId: 'user-instructor-1',
    instructorName: 'Dr. Rajesh Varma',
    instructorTitle: 'Principal Cloud & AI Architect, Former Google India Staff Engineer',
    instructorAvatar: '',
    instructorBio: 'PhD in Distributed Systems from IIT Madras with 15+ years architecting scalable cloud platforms in Bengaluru.',
    price: 4999,
    discountPrice: 2499,
    rating: 4.94,
    reviewsCount: 890,
    studentsCount: 11400,
    duration: '22h 45m',
    totalLessons: 26,
    lastUpdated: 'November 2024',
    language: 'English',
    tags: ['Next.js', 'React 18', 'AI', 'Tailwind CSS', 'TypeScript'],
    isFeatured: true,
    isTrending: true,
    status: 'published',
    whatYouWillLearn: [
      'Build end-to-end applications with Next.js 15 App Router and Server Components',
      'Integrate LLM streaming responses using the Vercel AI SDK',
      'Implement secure authentication with Auth.js (NextAuth) and role-based access',
      'Deploy high-availability production workloads on Vercel and AWS'
    ],
    requirements: [
      'Basic knowledge of React and modern JavaScript (ES6+)',
      'Familiarity with TypeScript is recommended'
    ],
    chapters: [
      {
        id: 'chap-next-1',
        title: 'Section 1: Next.js 15 App Router & Server Architecture',
        order: 1,
        lessons: [
          {
            id: 'les-next-1',
            title: '1. App Router Architecture & Server Component Mental Model',
            duration: '14:20',
            durationSeconds: 860,
            videoUrl: 'https://www.youtube.com/watch?v=ZVnjOPwW4ZA',
            summary: 'Understanding server vs client components, streaming boundaries, and zero-bundle-size React components.',
            isFreePreview: true,
            resources: [
              { id: 'res-next-1', title: 'Next.js 15 Cheat Sheet.pdf', type: 'pdf', fileSize: '2.1 MB', url: '#' }
            ]
          }
        ]
      }
    ],
    reviews: []
  },
  {
    id: 'course-design-mobile-product',
    title: 'Mobile App UI/UX Design & Prototyping Masterclass',
    slug: 'mobile-app-ui-ux-design-prototyping',
    subtitle: 'Design intuitive iOS and Android applications, master user research, wireframing, and interactive micro-animations.',
    description: 'Transform complex product ideas into intuitive, beautifully crafted mobile app experiences. Master iOS Human Interface Guidelines, Google Material Design 3, micro-interactions in Figma, and design handoffs.',
    category: 'Design',
    level: 'All Levels',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    promoVideoUrl: 'https://www.youtube.com/watch?v=FTFaQWZBqQ8',
    instructorId: 'user-instructor-2',
    instructorName: 'Ananya Deshmukh',
    instructorTitle: 'Lead Design Strategist, Razorpay & IIT Bombay Alumna',
    instructorAvatar: '',
    instructorBio: 'Design systems leader shaping payment experiences for over 10M+ Indian businesses and consumers.',
    price: 3999,
    discountPrice: 1999,
    rating: 4.87,
    reviewsCount: 710,
    studentsCount: 8400,
    duration: '19h 30m',
    totalLessons: 22,
    lastUpdated: 'October 2024',
    language: 'English',
    tags: ['UI/UX', 'Figma', 'Mobile Design', 'iOS', 'Android'],
    isFeatured: false,
    isTrending: true,
    status: 'published',
    whatYouWillLearn: [
      'Design modern mobile experiences adhering to iOS and Android design guidelines',
      'Create high-fidelity interactive prototypes with smart animations in Figma',
      'Conduct guerrilla user testing and synthesize usability insights',
      'Export production design tokens and assets for mobile engineering teams'
    ],
    requirements: [
      'Free Figma account',
      'Passion for designing user-friendly interfaces'
    ],
    chapters: [
      {
        id: 'chap-mobdes-1',
        title: 'Section 1: Mobile Design Guidelines & Ergonomics',
        order: 1,
        lessons: [
          {
            id: 'les-mobdes-1',
            title: '1. Thumb Zone Ergonomics & Navigation Patterns',
            duration: '13:40',
            durationSeconds: 820,
            videoUrl: 'https://www.youtube.com/watch?v=FTFaQWZBqQ8',
            summary: 'Understanding mobile viewport constraints, bottom tab navigation, and touch target sizing.',
            isFreePreview: true
          }
        ]
      }
    ],
    reviews: []
  },
  {
    id: 'course-deep-learning-pytorch-vision',
    title: 'Applied Deep Learning with PyTorch, Computer Vision & NLP',
    slug: 'applied-deep-learning-pytorch-vision-nlp',
    subtitle: 'Train neural networks, CNNs, Vision Transformers, and modern NLP architectures from scratch in PyTorch.',
    description: 'Go beyond the basics of machine learning. Learn to build and train production deep neural networks using PyTorch. Implement ResNets, YOLO object detection, attention mechanisms, and deploy GPU-accelerated inference pipelines.',
    category: 'Data Science & AI',
    level: 'Advanced',
    thumbnail: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=800&auto=format&fit=crop&q=80',
    promoVideoUrl: 'https://www.youtube.com/watch?v=V_xro1bcAuA',
    instructorId: 'user-instructor-1',
    instructorName: 'Dr. Rajesh Varma',
    instructorTitle: 'Principal Cloud & AI Architect, Former Google India Staff Engineer',
    instructorAvatar: '',
    instructorBio: 'PhD in Distributed Systems from IIT Madras with 15+ years architecting scalable cloud platforms in Bengaluru.',
    price: 5499,
    discountPrice: 2999,
    rating: 4.93,
    reviewsCount: 1650,
    studentsCount: 15300,
    duration: '32h 15m',
    totalLessons: 38,
    lastUpdated: 'November 2024',
    language: 'English',
    tags: ['PyTorch', 'Deep Learning', 'Computer Vision', 'NLP', 'Python'],
    isFeatured: true,
    isTrending: false,
    status: 'published',
    whatYouWillLearn: [
      'Build and train convolutional neural networks (CNNs) for image classification',
      'Implement modern Vision Transformers (ViT) and object detection models',
      'Optimize training pipelines with mixed-precision (FP16/BF16) and multi-GPU DDP',
      'Deploy production models with TorchScript, ONNX Runtime, and FastAPI'
    ],
    requirements: [
      'Intermediate Python knowledge',
      'Basic familiarity with matrix calculus and linear algebra'
    ],
    chapters: [
      {
        id: 'chap-pytorch-1',
        title: 'Section 1: Tensors, Autograd & Neural Network Foundations',
        order: 1,
        lessons: [
          {
            id: 'les-pytorch-1',
            title: '1. PyTorch Tensors, GPU Acceleration & Backpropagation',
            duration: '18:10',
            durationSeconds: 1090,
            videoUrl: 'https://www.youtube.com/watch?v=tHL5STNJKag',
            summary: 'Understanding tensor operations, automatic differentiation, and CUDA device management.',
            isFreePreview: true
          }
        ]
      }
    ],
    reviews: []
  },
  {
    id: 'course-aws-solutions-architect-pro',
    title: 'AWS Certified Solutions Architect & Terraform Infrastructure as Code',
    slug: 'aws-certified-solutions-architect-terraform',
    subtitle: 'Design fault-tolerant AWS multi-region architectures, automate cloud provisioning with Terraform, and pass AWS SAA-C03.',
    description: 'Become an enterprise-ready AWS Cloud Architect. Master VPC networking, IAM security policies, EC2 auto-scaling, RDS Aurora clustering, S3 lifecycle policies, and automate complete multi-account environments with Terraform.',
    category: 'Cloud & DevOps',
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    promoVideoUrl: 'https://www.youtube.com/watch?v=Ia-UEYYR44s',
    instructorId: 'user-instructor-4',
    instructorName: 'Karthik Iyer',
    instructorTitle: 'Chief Cloud Infrastructure Architect & AWS Community Hero',
    instructorAvatar: '',
    instructorBio: 'Lead cloud consultant based in Hyderabad, migrating enterprise banking systems to Kubernetes and Terraform.',
    price: 5999,
    discountPrice: 3499,
    rating: 4.89,
    reviewsCount: 1120,
    studentsCount: 13900,
    duration: '27h 40m',
    totalLessons: 32,
    lastUpdated: 'November 2024',
    language: 'English',
    tags: ['AWS', 'Cloud', 'Terraform', 'DevOps', 'Architecture'],
    isFeatured: false,
    isTrending: true,
    status: 'published',
    whatYouWillLearn: [
      'Architect resilient, highly available AWS solutions across multiple Availability Zones',
      'Provision scalable infrastructure declaratively with Terraform state and modules',
      'Configure enterprise VPC peering, Transit Gateways, and security firewalls',
      'Prepare comprehensively for the AWS Solutions Architect Associate (SAA-C03) exam'
    ],
    requirements: [
      'Basic familiarity with web servers and operating systems',
      'Free-tier AWS account for hands-on labs'
    ],
    chapters: [
      {
        id: 'chap-aws-1',
        title: 'Section 1: Global Infrastructure & VPC Network Design',
        order: 1,
        lessons: [
          {
            id: 'les-aws-1',
            title: '1. Designing Multi-AZ Virtual Private Clouds (VPC)',
            duration: '16:45',
            durationSeconds: 1005,
            videoUrl: 'https://www.youtube.com/watch?v=SLB_c_ayRMo',
            summary: 'Public and private subnets, NAT Gateways, route tables, and Internet Gateways.',
            isFreePreview: true
          }
        ]
      }
    ],
    reviews: []
  },
  {
    id: 'course-soc-analyst-threat-hunting',
    title: 'Network Security, SIEM & Threat Hunting for SOC Analysts',
    slug: 'network-security-siem-threat-hunting-soc',
    subtitle: 'Master Wireshark packet analysis, Splunk SIEM dashboards, malware triage, and incident response operations.',
    description: 'Prepare for high-demand Security Operations Center (SOC) defense roles. Learn packet-level network traffic analysis, detect brute-force and DDoS vectors in real-time, configure Splunk queries, and execute incident containment procedures.',
    category: 'Cyber Security',
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
    promoVideoUrl: 'https://www.youtube.com/watch?v=qiQR5rTSshw',
    instructorId: 'user-instructor-2',
    instructorName: 'Vikramaditya Sengupta',
    instructorTitle: 'Principal Cybersecurity Consultant & CERT-In Panelist',
    instructorAvatar: '',
    instructorBio: 'Advising Indian government agencies and Fortune 500 banks on zero-trust architectures and red-team penetration testing.',
    price: 6299,
    discountPrice: 3599,
    rating: 4.84,
    reviewsCount: 540,
    studentsCount: 6800,
    duration: '21h 30m',
    totalLessons: 24,
    lastUpdated: 'October 2024',
    language: 'English',
    tags: ['Cyber Security', 'SOC', 'Wireshark', 'Splunk', 'SIEM'],
    isFeatured: true,
    isTrending: false,
    status: 'published',
    whatYouWillLearn: [
      'Analyze network packet captures using Wireshark to isolate malware beacons',
      'Build detection rules and alerts in Splunk and Elastic SIEM',
      'Investigate endpoint telemetry and lateral movement in enterprise networks',
      'Execute CERT-In compliant incident response workflows and documentation'
    ],
    requirements: [
      'Basic networking concepts (TCP/IP, DNS, HTTP/S)',
      'A computer with Wireshark installed'
    ],
    chapters: [
      {
        id: 'chap-soc-1',
        title: 'Section 1: Packet Analysis & Protocol Dissection',
        order: 1,
        lessons: [
          {
            id: 'les-soc-1',
            title: '1. Wireshark Deep Dive: Dissecting Malicious TCP/IP Streams',
            duration: '17:20',
            durationSeconds: 1040,
            videoUrl: 'https://www.youtube.com/watch?v=TkCSr30UojM',
            summary: 'Filtering packets, analyzing TCP handshakes, identifying rogue DNS queries, and reconstructing payloads.',
            isFreePreview: true
          }
        ]
      }
    ],
    reviews: []
  },
  {
    id: 'course-react-native-expo-production',
    title: 'React Native & Expo: iOS and Android Production App Mastery',
    slug: 'react-native-expo-production-mastery',
    subtitle: 'Build cross-platform mobile apps using React Native, Expo Router, NativeWind, SQLite, and EAS Cloud Build.',
    description: 'Learn how modern cross-platform engineering is done in top tech firms. Build beautiful, high-performance mobile apps with React Native, file-based routing via Expo Router, offline caching with SQLite, and automated app store builds.',
    category: 'Mobile Development',
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80',
    promoVideoUrl: 'https://www.youtube.com/watch?v=0-S5a0eXPoc',
    instructorId: 'user-instructor-1',
    instructorName: 'Aditi Sundaram',
    instructorTitle: 'Lead Mobile Architect, Swiggy & BITS Pilani Alumna',
    instructorAvatar: '',
    instructorBio: 'Expert in cross-platform Dart/Flutter and React Native mobile architectures.',
    price: 4499,
    discountPrice: 2299,
    rating: 4.91,
    reviewsCount: 1290,
    studentsCount: 14700,
    duration: '25h 00m',
    totalLessons: 30,
    lastUpdated: 'November 2024',
    language: 'English',
    tags: ['React Native', 'Expo', 'Mobile', 'iOS', 'Android', 'TypeScript'],
    isFeatured: true,
    isTrending: true,
    status: 'published',
    whatYouWillLearn: [
      'Build production-ready mobile apps with React Native and Expo Router',
      'Implement offline-first data synchronization with local SQLite databases',
      'Style native components cleanly with Tailwind CSS (NativeWind)',
      'Automate iOS and Android app distribution using Expo Application Services (EAS)'
    ],
    requirements: [
      'Intermediate React and JavaScript/TypeScript proficiency',
      'Expo Go app installed on your physical iOS or Android phone'
    ],
    chapters: [
      {
        id: 'chap-rn-1',
        title: 'Section 1: Modern Expo Router & Layout Architecture',
        order: 1,
        lessons: [
          {
            id: 'les-rn-1',
            title: '1. Expo Router File-Based Navigation & Native Stacks',
            duration: '15:15',
            durationSeconds: 915,
            videoUrl: 'https://www.youtube.com/watch?v=mJ3bGvy0WAY',
            summary: 'File-based tabs, drawer layouts, dynamic routes, and native stack screen transitions.',
            isFreePreview: true
          }
        ]
      }
    ],
    reviews: []
  },
  {
    id: 'course-startup-fundraising-financial-modeling',
    title: 'Startup Financial Modeling, Unit Economics & Pitching VCs',
    slug: 'startup-financial-modeling-unit-economics-vcs',
    subtitle: 'Master startup valuation, cohort retention metrics, cap tables, term sheets, and investor pitch deck mastery.',
    description: 'Learn the exact mathematical models and financial frameworks used by high-growth startups to raise venture capital. Master customer LTV/CAC ratios, burn multiple, working capital modeling, and convertible note term sheets.',
    category: 'Business & Management',
    level: 'All Levels',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
    promoVideoUrl: 'https://www.youtube.com/watch?v=bNpx7gpSqbY',
    instructorId: 'user-instructor-2',
    instructorName: 'Pooja Shenoy',
    instructorTitle: 'VP of Product Management, Flipkart & IIM Bangalore Alumna',
    instructorAvatar: '',
    instructorBio: 'Built and scaled hyper-growth consumer platforms across India with over 50M monthly active users.',
    price: 4999,
    discountPrice: 2499,
    rating: 4.88,
    reviewsCount: 680,
    studentsCount: 7900,
    duration: '18h 15m',
    totalLessons: 20,
    lastUpdated: 'November 2024',
    language: 'English',
    tags: ['Business', 'Finance', 'Startups', 'Venture Capital', 'Strategy'],
    isFeatured: false,
    isTrending: false,
    status: 'published',
    whatYouWillLearn: [
      'Build dynamic financial forecasting models in Google Sheets and Excel',
      'Calculate unit economics: Blended CAC, Paid CAC, LTV, and Payback Period',
      'Structure cap tables, ESOP pools, and simulate dilution across Seed and Series A',
      'Craft compelling investor pitch decks that clearly communicate product traction'
    ],
    requirements: [
      'Basic spreadsheet familiarity (Google Sheets or Microsoft Excel)',
      'Curiosity for technology businesses and startup mechanics'
    ],
    chapters: [
      {
        id: 'chap-fin-1',
        title: 'Section 1: Unit Economics & Growth Metrics Modeling',
        order: 1,
        lessons: [
          {
            id: 'les-fin-1',
            title: '1. Mastering the LTV/CAC Ratio and Payback Period',
            duration: '14:50',
            durationSeconds: 890,
            videoUrl: 'https://www.youtube.com/watch?v=ii1jcLg-eIQ',
            summary: 'How venture capitalists evaluate business sustainability, churn rates, and net revenue retention (NRR).',
            isFreePreview: true
          }
        ]
      }
    ],
    reviews: []
  },
  {
    id: 'course-performance-marketing-meta-google-ads',
    title: 'Performance Marketing: Meta & Google Ads Scaling Masterclass',
    slug: 'performance-marketing-meta-google-ads-scaling',
    subtitle: 'Scale customer acquisition with high-converting creative hooks, lookalike audiences, Google Performance Max, and ROAS tracking.',
    description: 'Stop burning budget on ineffective ad campaigns. Master the algorithms behind Meta Ads Manager and Google Ads. Learn creative strategy, conversion rate optimization (CRO), custom audience segmentation, and multi-touch attribution.',
    category: 'Marketing',
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&auto=format&fit=crop&q=80',
    promoVideoUrl: 'https://www.youtube.com/watch?v=hF515-0Tduk',
    instructorId: 'user-instructor-1',
    instructorName: 'Sneha Patel',
    instructorTitle: 'Head of Growth Marketing, Zomato & MICA Ahmedabad',
    instructorAvatar: '',
    instructorBio: 'Digital growth hacker driving multi-crore organic acquisition campaigns across pan-India metros and tier-2 markets.',
    price: 3999,
    discountPrice: 1999,
    rating: 4.85,
    reviewsCount: 520,
    studentsCount: 6400,
    duration: '17h 45m',
    totalLessons: 20,
    lastUpdated: 'November 2024',
    language: 'English',
    tags: ['Marketing', 'Google Ads', 'Meta Ads', 'Paid Growth', 'E-commerce'],
    isFeatured: true,
    isTrending: false,
    status: 'published',
    whatYouWillLearn: [
      'Build and scale high-ROAS ad campaigns across Facebook, Instagram, and Google',
      'Leverage Google Performance Max campaigns and Search Ads intent matching',
      'Design video creative hooks and landing page experiments that convert',
      'Implement server-side Conversions API (CAPI) for post-iOS 14 attribution accuracy'
    ],
    requirements: [
      'Basic familiarity with online advertising concepts',
      'Free Meta Business Manager or Google Ads account'
    ],
    chapters: [
      {
        id: 'chap-ads-1',
        title: 'Section 1: Campaign Structure & Creative Strategy',
        order: 1,
        lessons: [
          {
            id: 'les-ads-1',
            title: '1. Winning Ad Creative Frameworks & Hook Architecture',
            duration: '13:20',
            durationSeconds: 800,
            videoUrl: 'https://www.youtube.com/watch?v=nU-IIXBWlS4',
            summary: 'How to write high-converting copy, test visual hooks, and lower customer acquisition costs.',
            isFreePreview: true
          }
        ]
      }
    ],
    reviews: []
  }
];

export const INITIAL_CATEGORIES = [
  { id: 'cat-1', name: 'Development', icon: 'Code', count: 48, color: 'from-teal-500 to-emerald-600' },
  { id: 'cat-2', name: 'Design', icon: 'Palette', count: 32, color: 'from-purple-500 to-pink-600' },
  { id: 'cat-3', name: 'Data Science & AI', icon: 'Brain', count: 41, color: 'from-emerald-500 to-teal-600' },
  { id: 'cat-4', name: 'Cloud & DevOps', icon: 'Cloud', count: 26, color: 'from-cyan-500 to-blue-600' },
  { id: 'cat-5', name: 'Cyber Security', icon: 'Shield', count: 19, color: 'from-rose-500 to-red-600' },
  { id: 'cat-6', name: 'Mobile Development', icon: 'Smartphone', count: 24, color: 'from-amber-500 to-orange-600' },
  { id: 'cat-7', name: 'Business & Management', icon: 'Briefcase', count: 30, color: 'from-teal-600 to-cyan-700' },
  { id: 'cat-8', name: 'Marketing', icon: 'TrendingUp', count: 18, color: 'from-lime-500 to-emerald-600' }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    title: 'Certificate Ready! 🎉',
    message: 'Congratulations! You earned the official Full-Stack React 18 & TypeScript Mastery certificate.',
    type: 'achievement',
    read: false,
    createdAt: '10 minutes ago',
    link: '/certificates'
  },
  {
    id: 'notif-2',
    title: 'New Quiz Added',
    message: 'Dr. Sophia Chen uploaded a new Knowledge Check Quiz in Chapter 2.',
    type: 'course',
    read: false,
    createdAt: '2 hours ago',
    link: '/course/course-react-ts-mastery'
  },
  {
    id: 'notif-3',
    title: 'Flash Sale: 50% Off Top Courses',
    message: 'Unlock Generative AI & Machine Learning with Python at half price this week.',
    type: 'system',
    read: true,
    createdAt: '1 day ago',
    link: '/courses'
  },
  {
    id: 'notif-4',
    title: 'Study Goal Reminder 🎯',
    message: 'You are just 2 lessons away from completing Section 1 in your active course!',
    type: 'reminder',
    read: true,
    createdAt: '2 days ago',
    link: '/my-learning'
  }
];

export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-react-2024-001',
    courseId: 'course-react-ts-mastery',
    courseTitle: 'Full-Stack React 18, Next.js & TypeScript Mastery',
    studentId: 'user-student-1',
    studentName: 'Aarav Sharma',
    instructorName: 'Dr. Rajesh Varma',
    issueDate: 'November 12, 2024',
    verificationCode: 'EDP-RC18-98421-VNZ',
    grade: 'Score: 98% (Exemplary Honor)'
  }
];

export const INITIAL_REVENUE_ANALYTICS: RevenueRecord[] = [
  { month: 'Jun', revenue: 24500, students: 840, coursesSold: 420 },
  { month: 'Jul', revenue: 31200, students: 1050, coursesSold: 580 },
  { month: 'Aug', revenue: 28900, students: 970, coursesSold: 510 },
  { month: 'Sep', revenue: 42300, students: 1420, coursesSold: 760 },
  { month: 'Oct', revenue: 56800, students: 1890, coursesSold: 990 },
  { month: 'Nov', revenue: 68400, students: 2310, coursesSold: 1240 },
];

export const INITIAL_CATEGORY_DISTRIBUTION: CategoryDistribution[] = [
  { name: 'Development', value: 42, color: '#6366f1' },
  { name: 'Data Science & AI', value: 28, color: '#10b981' },
  { name: 'Design', value: 16, color: '#ec4899' },
  { name: 'Cloud & DevOps', value: 14, color: '#06b6d4' },
];

