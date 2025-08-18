---
title: "How This Portfolio Was Built: A Deep Dive"
date: "2024-07-30"
tags: ["Next.js", "Vercel", "GitHub", "AI", "WebDev"]
excerpt: "A look under the hood at the technology and workflow powering this website, from AI-driven development to a Git-based content management system."
---

## Introduction

Ever wonder what goes on behind the scenes of a modern web application? This portfolio is more than just a static collection of pages; it's a dynamic, continuously deployed project built with a powerful and modern technology stack. This post will walk you through the entire workflow, from the initial code generation to how blog posts like this one are published automatically.

## Core Technologies

This website is built on a foundation of industry-leading tools that prioritize performance, developer experience, and scalability.

- **Framework:** **Next.js (React)** is the backbone of the site, enabling a hybrid approach of server-side rendering and static site generation for optimal performance.
- **Styling:** **Tailwind CSS** provides a utility-first approach for rapid and consistent styling, while **ShadCN/UI** offers a library of beautifully crafted and accessible components.
- **Deployment:** The entire project is hosted on **Vercel**, a platform built by the creators of Next.js. It offers seamless, automatic deployments directly from GitHub.

## The AI-Powered Development Workflow

A unique aspect of this project is its development process. Instead of writing every line of code by hand, this site was bootstrapped and iterated upon using an AI coding assistant within **Firebase Studio**.

Here's how it worked:
1.  **Conversational Prompts:** I provided high-level instructions and feature requests in plain English.
2.  **Code Generation:** The AI assistant translated these requests into production-quality code for Next.js and React components.
3.  **Iteration and Refinement:** I guided the AI to fix bugs, add new features (like the blog you're reading), and refine the UI, creating a collaborative development loop.

![A screenshot of the portfolio website homepage](https://raw.githubusercontent.com/rootsecops/rootsecops/refs/heads/main/assets/portfolio.png)

## The GitHub-Based Blog (Headless CMS)

One of the most powerful features of this site is how content is managed. Instead of a traditional, complex Content Management System (CMS), this blog uses a simple yet effective approach:

1.  **Content Source:** All blog posts are stored as simple Markdown (`.md`) files in a dedicated `blogs` folder within a private GitHub repository (`rootsecops/rootsecops.io`).
2.  **Automatic Fetching:** When the site is built on Vercel, a special script (`src/lib/blogs.ts`) securely connects to the GitHub API using a Personal Access Token. It reads all the markdown files from the repository.
3.  **Static Generation:** Next.js then pre-renders each blog post as a static HTML page. This makes loading pages incredibly fast for visitors.

Whenever I want to publish a new post or update an existing one, I simply push a new `.md` file or commit a change to the GitHub repository. Vercel detects this change and automatically triggers a new deployment, ensuring the website is always up-to-date with the latest content.

## Conclusion

This project is a testament to the power of modern web development workflows. By combining the strengths of Next.js, the simplicity of a Git-based CMS, and the speed of AI-assisted coding, it's possible to build a professional, high-performance, and easily maintainable portfolio. This setup not only showcases my projects but also demonstrates a practical understanding of the tools that power the modern web.