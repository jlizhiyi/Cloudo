import type { Course, LessonIntro } from '../../types';

// Load content from the file-based content/ tree using Vite glob imports.
// This keeps the codebase flexible: add/edit JSON or markdown under `content/` and it will be picked up.
// Note: import.meta.glob paths use forward slashes; handle Windows paths defensively.

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Vite-specific import.meta.glob typing
const courseModules = import.meta.glob('/content/*/course.json', { eager: true }) as Record<string, any>;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const unitModules = import.meta.glob('/content/*/units/**/unit.json', { eager: true }) as Record<string, any>;
// load intro markdown as raw strings
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const introModules = import.meta.glob('/content/*/units/**/lessons/**/intro.md', { as: 'raw', eager: true }) as Record<string, string>;
// exercises JSON
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const exercisesModules = import.meta.glob('/content/*/units/**/lessons/**/exercises.json', { eager: true }) as Record<string, any>;

const courses: Record<string, Course> = {};

Object.entries(courseModules).forEach(([path, mod]) => {
  const courseData = (mod && mod.default) ? mod.default : mod;
  const idMatch = path.match(/\/content\/([^\/]+)\/course.json$/) || path.match(/\/content\/([^\/]+)\/course.json$/);
  const id = courseData?.id ?? (idMatch ? idMatch[1] : undefined);
  if (!id) return;

  const course: Course = {
    id,
    title: courseData.title,
    description: courseData.description,
    icon: courseData.icon ?? '📚',
    color: courseData.color ?? '#000000',
    units: []
  };

  // find units belonging to this course
  Object.entries(unitModules).forEach(([upath, umod]) => {
    if (!upath.includes(`/content/${id}/units/`) && !upath.includes(`\\content\\${id}\\units\\`)) return;
    const unitData = (umod && umod.default) ? umod.default : umod;
    const unitDirMatch = upath.match(/units[\\/](.+?)[\\/]unit.json$/) || upath.match(/units\/(.+?)\/unit.json$/);
    const unitDir = unitDirMatch ? unitDirMatch[1] : unitData.dir;

    const unit: any = { title: unitData.title, lessons: [] };

    (unitData.lessons || []).forEach((lspec: any) => {
      const lessonSlug = lspec.slug;
      const introPath = `/content/${id}/units/${unitDir}/lessons/${lessonSlug}/intro.md`;
      const introPathWin = `\\content\\${id}\\units\\${unitDir}\\lessons\\${lessonSlug}\\intro.md`;
      const introRaw = introModules[introPath] ?? introModules[introPathWin] ?? '';

      let intro: LessonIntro | undefined = undefined;
      if (introRaw) {
        const parts = introRaw.split(/\r?\n\r?\n/).map((s) => s.trim()).filter(Boolean);
        let title = lspec.title ?? '';
        if (parts.length && parts[0].startsWith('#')) {
          title = parts[0].replace(/^#\s*/, '').trim();
          parts.shift();
        }
        intro = { title, content: parts };
      }

      const exPath = `/content/${id}/units/${unitDir}/lessons/${lessonSlug}/exercises.json`;
      const exPathWin = `\\content\\${id}\\units\\${unitDir}\\lessons\\${lessonSlug}\\exercises.json`;
      const exercises = (exercisesModules[exPath] && exercisesModules[exPath].default) ? exercisesModules[exPath].default : (exercisesModules[exPathWin] && exercisesModules[exPathWin].default) ? exercisesModules[exPathWin].default : (exercisesModules[exPath] ?? exercisesModules[exPathWin] ?? []);

      unit.lessons.push({ title: lspec.title ?? '', intro, exercises });
    });

    course.units.push(unit);
  });

  courses[id] = course;
});

export { courses };