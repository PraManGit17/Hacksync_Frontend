export const frontendRoadmap = {
  id: "frontend",
  title: "Frontend Developer",
  levels: [
    {
      level: 1,
      label: "Foundations",
      nodes: [
        {
          id: "html",
          title: "HTML",
          description: "Learn semantic HTML, accessibility, and document structure.",
          priority: "must",
          prerequisites: [],
          resources: [
            { label: "MDN HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" }
          ]
        },
        {
          id: "css",
          title: "CSS",
          description: "Layout, Flexbox, Grid, responsive design.",
          priority: "must",
          prerequisites: ["html"],
          resources: [
            { label: "CSS Tricks", url: "https://css-tricks.com" }
          ]
        }
      ]
    },
    {
      level: 2,
      label: "Core JavaScript",
      nodes: [
        {
          id: "js",
          title: "JavaScript",
          description: "Closures, async, DOM, ES6+.",
          priority: "must",
          prerequisites: ["html", "css"],
          resources: [
            { label: "JavaScript.info", url: "https://javascript.info" }
          ]
        }
      ]
    },
    {
      level: 3,
      label: "Frameworks",
      nodes: [
        {
          id: "react",
          title: "React",
          description: "Hooks, state, lifecycle, performance.",
          priority: "must",
          prerequisites: ["js"],
          resources: [
            { label: "React Docs", url: "https://react.dev" }
          ]
        }
      ]
    }
  ]
};
