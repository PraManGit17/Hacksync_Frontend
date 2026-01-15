export const roadmaps = {
  "backend": {
    title: "Backend Engineer Roadmap",
    description: "Path to becoming a Backend Engineer in 2025",
    nodes: [
      {
        id: "internet",
        title: "Internet",
        description: "Learn how the internet works",
        type: "main",
        children: ["dns", "http", "browsers", "hosting"],
        resources: ["MDN Web Docs", "How DNS works"]
      },
      {
        id: "dns",
        title: "DNS",
        description: "Domain Name System",
        type: "sub",
        parent: "internet"
      },
      {
        id: "http",
        title: "HTTP/HTTPS",
        description: "Request/Response cycle",
        type: "sub",
        parent: "internet"
      },
      {
        id: "browsers",
        title: "Browsers",
        description: "How browsers work",
        type: "sub",
        parent: "internet"
      },
      {
        id: "hosting",
        title: "Hosting",
        description: "Web hosting concepts",
        type: "sub",
        parent: "internet"
      },
      {
        id: "languages",
        title: "Languages",
        description: "Pick a backend language",
        type: "main",
        children: ["javascript", "python", "java", "go", "rust"],
      },
      {
        id: "javascript",
        title: "JavaScript",
        description: "Server-side JS with Node.js",
        type: "sub",
        parent: "languages"
      },
      {
        id: "python",
        title: "Python",
        description: "Python backends with Django/Flask",
        type: "sub",
        parent: "languages"
      },
      {
        id: "java",
        title: "Java",
        description: "Enterprise backends with Java",
        type: "sub",
        parent: "languages"
      },
      {
        id: "go",
        title: "Go",
        description: "High-performance backends",
        type: "sub",
        parent: "languages"
      },
      {
        id: "rust",
        title: "Rust",
        description: "Systems-level programming",
        type: "sub",
        parent: "languages"
      },
      {
        id: "databases",
        title: "Databases",
        description: "Data storage options",
        type: "main",
        children: ["relational", "nosql"],
      },
      {
        id: "relational",
        title: "Relational DBs",
        description: "MySQL, PostgreSQL, etc.",
        type: "sub",
        parent: "databases"
      },
      {
        id: "nosql",
        title: "NoSQL DBs",
        description: "MongoDB, Redis, etc.",
        type: "sub",
        parent: "databases"
      },
      {
        id: "apis",
        title: "APIs",
        description: "API design and development",
        type: "main",
        children: ["rest", "graphql", "grpc"],
      },
      {
        id: "rest",
        title: "REST",
        description: "RESTful API principles",
        type: "sub",
        parent: "apis"
      },
      {
        id: "graphql",
        title: "GraphQL",
        description: "Query language for APIs",
        type: "sub",
        parent: "apis"
      },
      {
        id: "grpc",
        title: "gRPC",
        description: "High-performance RPC",
        type: "sub",
        parent: "apis"
      },
      {
        id: "auth",
        title: "Authentication",
        description: "Auth systems & security",
        type: "main",
        children: ["oauth", "jwt", "sessions"],
      },
      {
        id: "oauth",
        title: "OAuth",
        description: "Authorization framework",
        type: "sub",
        parent: "auth"
      },
      {
        id: "jwt",
        title: "JWT",
        description: "JSON Web Tokens",
        type: "sub",
        parent: "auth"
      },
      {
        id: "sessions",
        title: "Sessions",
        description: "Session-based auth",
        type: "sub",
        parent: "auth"
      },
      {
        id: "devops",
        title: "DevOps",
        description: "CI/CD & deployment",
        type: "main",
        children: ["docker", "kubernetes", "ci-cd"],
      },
      {
        id: "docker",
        title: "Docker",
        description: "Containerization",
        type: "sub",
        parent: "devops"
      },
      {
        id: "kubernetes",
        title: "Kubernetes",
        description: "Container orchestration",
        type: "sub",
        parent: "devops"
      },
      {
        id: "ci-cd",
        title: "CI/CD",
        description: "Continuous integration & delivery",
        type: "sub",
        parent: "devops"
      },
    ]
  },
  
  "frontend": {
    title: "Frontend Engineer Roadmap",
    description: "Path to becoming a Frontend Engineer in 2025",
    nodes: [
      {
        id: "html-css",
        title: "HTML/CSS",
        description: "Website building blocks",
        type: "main",
        children: ["html5", "css3", "responsive"],
      },
      {
        id: "html5",
        title: "HTML5",
        description: "Semantic markup & features",
        type: "sub",
        parent: "html-css"
      },
      {
        id: "css3",
        title: "CSS3",
        description: "Modern styling capabilities",
        type: "sub",
        parent: "html-css"
      },
      {
        id: "responsive",
        title: "Responsive Design",
        description: "Mobile-first approach",
        type: "sub",
        parent: "html-css"
      },
      {
        id: "javascript",
        title: "JavaScript",
        description: "Frontend programming",
        type: "main",
        children: ["es6", "dom", "apis"],
      },
      {
        id: "es6",
        title: "Modern JavaScript",
        description: "ES6+ features",
        type: "sub",
        parent: "javascript"
      },
      {
        id: "dom",
        title: "DOM Manipulation",
        description: "Working with the DOM",
        type: "sub",
        parent: "javascript"
      },
      {
        id: "apis",
        title: "Web APIs",
        description: "Browser APIs & fetch",
        type: "sub",
        parent: "javascript"
      },
      {
        id: "frameworks",
        title: "Frameworks",
        description: "Modern JS frameworks",
        type: "main",
        children: ["react", "vue", "angular", "svelte"],
      },
      {
        id: "react",
        title: "React",
        description: "Component-based UI library",
        type: "sub",
        parent: "frameworks"
      },
      {
        id: "vue",
        title: "Vue.js",
        description: "Progressive JS framework",
        type: "sub",
        parent: "frameworks"
      },
      {
        id: "angular",
        title: "Angular",
        description: "Full-featured framework",
        type: "sub",
        parent: "frameworks"
      },
      {
        id: "svelte",
        title: "Svelte",
        description: "Compiled approach to UIs",
        type: "sub",
        parent: "frameworks"
      },
      {
        id: "tools",
        title: "Build Tools",
        description: "Frontend tooling",
        type: "main",
        children: ["webpack", "vite", "babel"],
      },
      {
        id: "webpack",
        title: "Webpack",
        description: "Module bundler",
        type: "sub",
        parent: "tools"
      },
      {
        id: "vite",
        title: "Vite",
        description: "Next-gen frontend build tool",
        type: "sub",
        parent: "tools"
      },
      {
        id: "babel",
        title: "Babel",
        description: "JavaScript compiler",
        type: "sub",
        parent: "tools"
      },
      {
        id: "state",
        title: "State Management",
        description: "Managing application state",
        type: "main",
        children: ["redux", "mobx", "context"],
      },
      {
        id: "redux",
        title: "Redux",
        description: "Predictable state container",
        type: "sub",
        parent: "state"
      },
      {
        id: "mobx",
        title: "MobX",
        description: "Simple state management",
        type: "sub",
        parent: "state"
      },
      {
        id: "context",
        title: "Context API",
        description: "React's built-in state mgmt",
        type: "sub",
        parent: "state"
      },
      {
        id: "testing",
        title: "Testing",
        description: "Frontend testing strategies",
        type: "main",
        children: ["jest", "cypress", "rtl"],
      },
      {
        id: "jest",
        title: "Jest",
        description: "JavaScript testing framework",
        type: "sub",
        parent: "testing"
      },
      {
        id: "cypress",
        title: "Cypress",
        description: "End-to-end testing",
        type: "sub",
        parent: "testing"
      },
      {
        id: "rtl",
        title: "React Testing Library",
        description: "Component testing",
        type: "sub",
        parent: "testing"
      },
    ]
  },
  
  "data-engineer": {
    title: "Data Engineer Roadmap",
    description: "Path to becoming a Data Engineer in 2025",
    nodes: [
      {
        id: "foundations",
        title: "Foundations",
        description: "Core skills & concepts",
        type: "main",
        children: ["programming", "sql", "databases", "distributed-systems"],
      },
      {
        id: "programming",
        title: "Programming",
        description: "Python, Java, or Scala",
        type: "sub",
        parent: "foundations"
      },
      {
        id: "sql",
        title: "SQL",
        description: "Advanced SQL querying",
        type: "sub",
        parent: "foundations"
      },
      {
        id: "databases",
        title: "Databases",
        description: "RDBMS concepts",
        type: "sub",
        parent: "foundations"
      },
      {
        id: "distributed-systems",
        title: "Distributed Systems",
        description: "Distributed computing principles",
        type: "sub",
        parent: "foundations"
      },
      {
        id: "data-storage",
        title: "Data Storage",
        description: "Storage technologies",
        type: "main",
        children: ["data-warehousing", "data-lakes", "nosql"],
      },
      {
        id: "data-warehousing",
        title: "Data Warehousing",
        description: "Snowflake, Redshift, BigQuery",
        type: "sub",
        parent: "data-storage"
      },
      {
        id: "data-lakes",
        title: "Data Lakes",
        description: "S3, HDFS, Databricks",
        type: "sub",
        parent: "data-storage"
      },
      {
        id: "nosql",
        title: "NoSQL",
        description: "MongoDB, Cassandra, etc.",
        type: "sub",
        parent: "data-storage"
      },
      {
        id: "big-data",
        title: "Big Data Processing",
        description: "Batch & stream processing",
        type: "main",
        children: ["hadoop", "spark", "kafka", "flink"],
      },
      {
        id: "hadoop",
        title: "Hadoop Ecosystem",
        description: "HDFS, MapReduce, YARN",
        type: "sub",
        parent: "big-data"
      },
      {
        id: "spark",
        title: "Apache Spark",
        description: "In-memory processing",
        type: "sub",
        parent: "big-data"
      },
      {
        id: "kafka",
        title: "Apache Kafka",
        description: "Streaming data platform",
        type: "sub",
        parent: "big-data"
      },
      {
        id: "flink",
        title: "Apache Flink",
        description: "Stream processing framework",
        type: "sub",
        parent: "big-data"
      },
      {
        id: "data-pipelines",
        title: "Data Pipelines",
        description: "Orchestration & ETL",
        type: "main",
        children: ["airflow", "etl-elt", "dbt"],
      },
      {
        id: "airflow",
        title: "Apache Airflow",
        description: "Workflow orchestration",
        type: "sub",
        parent: "data-pipelines"
      },
      {
        id: "etl-elt",
        title: "ETL/ELT",
        description: "Data transformation patterns",
        type: "sub",
        parent: "data-pipelines"
      },
      {
        id: "dbt",
        title: "dbt",
        description: "Data build tool",
        type: "sub",
        parent: "data-pipelines"
      },
      {
        id: "cloud",
        title: "Cloud Services",
        description: "Cloud data platforms",
        type: "main",
        children: ["aws", "azure", "gcp"],
      },
      {
        id: "aws",
        title: "AWS",
        description: "S3, Redshift, Glue, EMR",
        type: "sub",
        parent: "cloud"
      },
      {
        id: "azure",
        title: "Azure",
        description: "Data Factory, Synapse",
        type: "sub",
        parent: "cloud"
      },
      {
        id: "gcp",
        title: "GCP",
        description: "BigQuery, Dataflow, Dataproc",
        type: "sub",
        parent: "cloud"
      },
    ]
  },

  "devops": {
    title: "DevOps Engineer Roadmap",
    description: "Path to becoming a DevOps Engineer in 2025",
    nodes: [
      {
        id: "os-concepts",
        title: "OS Concepts",
        description: "Operating system fundamentals",
        type: "main",
        children: ["linux", "process-mgmt", "threads", "file-systems"],
      },
      {
        id: "linux",
        title: "Linux",
        description: "Linux administration",
        type: "sub",
        parent: "os-concepts"
      },
      {
        id: "process-mgmt",
        title: "Process Management",
        description: "Process handling",
        type: "sub",
        parent: "os-concepts"
      },
      {
        id: "threads",
        title: "Threads & Concurrency",
        description: "Parallel execution",
        type: "sub",
        parent: "os-concepts"
      },
      {
        id: "file-systems",
        title: "File Systems",
        description: "Storage organization",
        type: "sub",
        parent: "os-concepts"
      },
      {
        id: "networking",
        title: "Networking",
        description: "Network concepts",
        type: "main",
        children: ["protocols", "firewalls", "load-balancing", "proxy"],
      },
      {
        id: "protocols",
        title: "Protocols",
        description: "HTTP, TCP/IP, DNS",
        type: "sub",
        parent: "networking"
      },
      {
        id: "firewalls",
        title: "Firewalls",
        description: "Network security",
        type: "sub",
        parent: "networking"
      },
      {
        id: "load-balancing",
        title: "Load Balancing",
        description: "Traffic distribution",
        type: "sub",
        parent: "networking"
      },
      {
        id: "proxy",
        title: "Reverse Proxy",
        description: "Traffic management",
        type: "sub",
        parent: "networking"
      },
      {
        id: "containerization",
        title: "Containerization",
        description: "Container technologies",
        type: "main",
        children: ["docker", "kubernetes", "helm"],
      },
      {
        id: "docker",
        title: "Docker",
        description: "Container platform",
        type: "sub",
        parent: "containerization"
      },
      {
        id: "kubernetes",
        title: "Kubernetes",
        description: "Container orchestration",
        type: "sub",
        parent: "containerization"
      },
      {
        id: "helm",
        title: "Helm",
        description: "Kubernetes package manager",
        type: "sub",
        parent: "containerization"
      },
      {
        id: "iac",
        title: "Infrastructure as Code",
        description: "Automated provisioning",
        type: "main",
        children: ["terraform", "ansible", "cloudformation"],
      },
      {
        id: "terraform",
        title: "Terraform",
        description: "Multi-cloud IaC",
        type: "sub",
        parent: "iac"
      },
      {
        id: "ansible",
        title: "Ansible",
        description: "Configuration management",
        type: "sub",
        parent: "iac"
      },
      {
        id: "cloudformation",
        title: "CloudFormation",
        description: "AWS IaC service",
        type: "sub",
        parent: "iac"
      },
      {
        id: "ci-cd",
        title: "CI/CD",
        description: "Continuous integration/delivery",
        type: "main",
        children: ["jenkins", "github-actions", "gitlab-ci", "argocd"],
      },
      {
        id: "jenkins",
        title: "Jenkins",
        description: "Automation server",
        type: "sub",
        parent: "ci-cd"
      },
      {
        id: "github-actions",
        title: "GitHub Actions",
        description: "GitHub CI/CD",
        type: "sub",
        parent: "ci-cd"
      },
      {
        id: "gitlab-ci",
        title: "GitLab CI",
        description: "GitLab CI/CD",
        type: "sub",
        parent: "ci-cd"
      },
      {
        id: "argocd",
        title: "ArgoCD",
        description: "GitOps CD tool",
        type: "sub",
        parent: "ci-cd"
      },
      {
        id: "monitoring",
        title: "Monitoring",
        description: "Observability tools",
        type: "main",
        children: ["prometheus", "grafana", "elk"],
      },
      {
        id: "prometheus",
        title: "Prometheus",
        description: "Monitoring & alerting",
        type: "sub",
        parent: "monitoring"
      },
      {
        id: "grafana",
        title: "Grafana",
        description: "Visualization & dashboards",
        type: "sub",
        parent: "monitoring"
      },
      {
        id: "elk",
        title: "ELK Stack",
        description: "Logging platform",
        type: "sub",
        parent: "monitoring"
      },
    ]
  }
};

export const roadmapSteps = roadmaps;