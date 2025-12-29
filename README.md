# Cloudo

**Cloudo** is a gamified, micro-learning platform designed to help engineers master cloud certifications (AWS, Azure, GCP, Snowflake, and more). Inspired by Duolingo, it breaks down complex cloud architecture into bite-sized lessons, interactive exercises, and high-stakes unit quizzes.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

Lessons follow a linear course path, and are split into technical intros (Markdown) and 5-question interactive sessions. A 70% passing threshold is required for both lessons and unit quizzes to unlock further content. Users can earn experience points for every correct answer, persisted via `localStorage`.

---

## Tech Stack

- **Frontend:** React 18 (Vite)
- **Styling:** Tailwind CSS (with @tailwindcss/typography)
- **Icons:** Lucide React
- **Content Parsing:** 
  - `react-markdown` + `remark-gfm` (GitHub Flavored Markdown for Tables)
  - `import.meta.glob` (Vite's dynamic filesystem injection)
- **Routing:** React Router v6

---

## Getting Started

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/cloudo.git

# Install dependencies
npm install
```

If you encounter vfile or remark-gfm type mismatches, ensure you are using the following stable versions:

```bash
npm install react-markdown@8.0.7 remark-gfm@3.0.1
```

Run developmental server:

```bash
npm run dev
```

---

## To-do

- Add more units
- Add mock AWS-CCP exams (65 questions)