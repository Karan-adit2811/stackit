export const mockQuestions = [
  {
    id: 1,
    title: "How to handle async/await in React components?",
    description: "I'm trying to fetch data from an API in my React component but I'm getting errors with async/await. What's the best practice?",
    tags: ["React", "JavaScript", "Async"],
    author: "johndev",
    votes: 15,
    answers: 3,
    createdAt: "2024-01-15T10:30:00Z",
    isAnswered: true
  },
  {
    id: 2,
    title: "SQL JOIN vs subquery performance comparison",
    description: "When should I use JOINs vs subqueries? Is there a performance difference between them in MySQL?",
    tags: ["SQL", "MySQL", "Performance"],
    author: "dbexpert",
    votes: 23,
    answers: 5,
    createdAt: "2024-01-14T15:45:00Z",
    isAnswered: true
  },
  {
    id: 3,
    title: "Next.js routing with dynamic parameters",
    description: "I need to create dynamic routes in Next.js 13 with app directory. How do I handle nested dynamic routes?",
    tags: ["Next.js", "React", "Routing"],
    author: "nextjsdev",
    votes: 8,
    answers: 0,
    createdAt: "2024-01-14T09:20:00Z",
    isAnswered: false
  },
  {
    id: 4,
    title: "TypeScript generic constraints with interfaces",
    description: "How can I properly constrain generic types in TypeScript when working with complex interfaces?",
    tags: ["TypeScript", "Generics", "Interfaces"],
    author: "typescriptpro",
    votes: 12,
    answers: 2,
    createdAt: "2024-01-13T14:30:00Z",
    isAnswered: true
  },
  {
    id: 5,
    title: "Docker container networking issues",
    description: "My Docker containers can't communicate with each other. I've tried different network configurations but still having issues.",
    tags: ["Docker", "Networking", "DevOps"],
    author: "devopsguru",
    votes: 6,
    answers: 1,
    createdAt: "2024-01-13T11:15:00Z",
    isAnswered: false
  }
];

export const mockAnswers = {
  1: [
    {
      id: 1,
      content: "You should use useEffect hook for API calls in React. Here's the pattern:\n\n```javascript\nuseEffect(() => {\n  const fetchData = async () => {\n    try {\n      const response = await fetch('/api/data');\n      const data = await response.json();\n      setData(data);\n    } catch (error) {\n      console.error('Error:', error);\n    }\n  };\n  \n  fetchData();\n}, []);\n```",
      author: "reactmaster",
      votes: 10,
      createdAt: "2024-01-15T11:00:00Z"
    },
    {
      id: 2,
      content: "Another approach is to use a custom hook for better reusability:\n\n```javascript\nconst useApi = (url) => {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  \n  useEffect(() => {\n    fetch(url)\n      .then(res => res.json())\n      .then(data => {\n        setData(data);\n        setLoading(false);\n      });\n  }, [url]);\n  \n  return { data, loading };\n};\n```",
      author: "hooksenthusiast",
      votes: 8,
      createdAt: "2024-01-15T12:30:00Z"
    }
  ],
  2: [
    {
      id: 3,
      content: "JOINs are generally faster than subqueries because:\n\n1. The query optimizer can better optimize JOINs\n2. JOINs allow for better index usage\n3. Subqueries often create temporary tables\n\nHowever, for simple existence checks, EXISTS subqueries can be more readable.",
      author: "sqloptimizer",
      votes: 15,
      createdAt: "2024-01-14T16:00:00Z"
    }
  ]
};

export const tagCategories = [
  "JavaScript", "React", "TypeScript", "Node.js", "Python", "SQL", "MySQL", 
  "PostgreSQL", "Docker", "AWS", "Next.js", "Vue.js", "Angular", "CSS", 
  "HTML", "Git", "DevOps", "MongoDB", "GraphQL", "API"
]