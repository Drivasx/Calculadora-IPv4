import "../App.css";

const About = () => {
  // Datos reales provistos por el usuario
  const name = "David Mauricio Rivas Benavides";
  const title = "Ingeniería de Sistemas (Est.) / Desarrollador backend";
  const email = "davidmrivasb2004@gmail.com";
  const phone = "+57 315 363 0625";
  const city = "Bogotá D.C., Colombia";
  const website = "https://github.com/Drivasx";
  const github = "https://github.com/Drivasx";
  const linkedin = "https://linkedin.com/in/davidm-rivasb";

  const summary = `Estudiante de Ingeniería de Sistemas con experiencia en desarrollo web, microservicios y herramientas de redes. Interesado en DevOps, cloud y soluciones escalables.`;

  const skills = [
    "Java", "Spring Boot", "Spring Security",
    "ReactJS", "JavaScript", "Astro",
    "Oracle Database", "PostgreSQL", "MongoDB",
    "Git", "Linux", "Oracle Cloud Infrastructure",
    "Español (Nativo)", "Inglés (B2)"
  ];

  const experience = [
    {
      company: "Hi Auto Ltda.",
      role: "Entrenador de IA",
      period: "ene 2025 – may 2025",
      details: `Proporcionó retroalimentación lingüística y contextual para mejorar la precisión del modelo y reducir falsos positivos. Aseguró calidad y consistencia en 10,000+ muestras mediante pautas de anotación y auditorías entre pares.`
    },
    {
      company: "Calusajo Eventos y Decoraciones (Freelance)",
      role: "Desarrollador Web Frontend",
      period: "jun 2025 – jul 2025",
      details: `Diseñó e implementó sitio web corporativo responsivo; desarrolló componentes reutilizables con React y Astro, mejorando rendimiento móvil ~20% y optimizando SEO.`
    }
  ];

  const education = [
    {
      school: "Universidad El Bosque",
      degree: "Ingeniería de Sistemas",
      location: "Bogotá D.C., COL",
      gpa: "4.0/5.0",
      year: "Jun 2027",
      notes: "Cursos relevantes: Programación Orientada a Objetos, Bases de Datos, Arquitectura de Software, Ingeniería de Software, Redes, Inteligencia Artificial"
    },
    {
      school: "Oracle Academy",
      degree: "Oracle Cloud Infrastructure DevOps Professional (certificación)",
      location: "Online",
      year: "Oct 2025",
      notes: "OCI, Microservices, Kubernetes, Terraform, CI/CD, DevSecOps, Docker, Helm Charts"
    },
    {
      school: "Udemy",
      degree: "Microservicios y API REST con Spring Boot, OAuth2.0 y Docker",
      location: "Online",
      year: "dic. de 2024",
      notes: "Spring Boot, Spring Security, Spring Cloud, Docker, Netflix Eureka, Microservicios"
    }
  ];

  // Botones de contacto y vCard eliminados por petición del usuario

  return (
    <main className="text-left">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-left">
        <div>
          <h1 className="text-3xl font-bold">{name}</h1>
          <p className="text-sm text-gray-600">{title} • {city}</p>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
          </div>
        </div>

      </header>

      <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column: Contact + Skills */}
        <aside className="space-y-4">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-4 shadow-sm text-left">
            <h3 className="font-semibold text-gray-700 mb-2">Contacto</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li><strong>Email:</strong> <a className="text-blue-600" href={`mailto:${email}`}>{email}</a></li>
              <li><strong>Tel:</strong> {phone}</li>
              <li><strong>Ubicación:</strong> {city}</li>
              <li><strong>Enlaces:</strong> <div className="mt-1"><a className="text-blue-600 mr-2" href={github} target="_blank" rel="noreferrer">GitHub</a><a className="text-blue-600" href={linkedin} target="_blank" rel="noreferrer">LinkedIn</a></div></li>
            </ul>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-lg p-4 shadow-sm text-left">
            <h3 className="font-semibold text-gray-700 mb-2">Habilidades</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map(s => (
                <span key={s} className="text-xs px-2 py-1 bg-gray-100 rounded">{s}</span>
              ))}
            </div>
          </div>
        </aside>

        {/* Right columns: Summary, Experience, Education, Projects */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm text-left">
            <h2 className="text-xl font-semibold mb-2">Resumen</h2>
            <p className="text-gray-700">{summary}</p>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm text-left">
            <h2 className="text-xl font-semibold mb-4">Experiencia</h2>
            <div className="space-y-3">
              {experience.map((e, i) => (
                <article key={i} className="p-4 border rounded bg-gray-50 text-left">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{e.role}</p>
                      <p className="text-sm text-gray-600">{e.company}</p>
                    </div>
                    <div className="text-sm text-gray-500">{e.period}</div>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">{e.details}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm text-left">
            <h2 className="text-xl font-semibold mb-3">Educación</h2>
            <div className="space-y-2">
              {education.map((ed, i) => (
                <div key={i} className="p-3 border rounded bg-gray-50 text-left">
                  <p className="font-semibold">{ed.school} — {ed.degree}</p>
                  <p className="text-sm text-gray-600">{ed.location} • {ed.year} • GPA: {ed.gpa ? ed.gpa : 'N/A'}</p>
                  <p className="mt-2 text-sm text-gray-700">{ed.notes}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm text-left">
            <h2 className="text-xl font-semibold mb-3">Proyectos</h2>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
              <li><strong>Sistema de gestión de nóminas:</strong> Spring Boot, ReactJS, PostgreSQL, PL/pgSQL, MongoDB, Docker — Plataforma de administración de nóminas con lógica backend y APIs.</li>
              <li><strong>Módulo de seguridad JWT:</strong> Spring Boot, Spring Security, JWT — Lógica de autenticación y autorización para APIs REST.</li>
              <li><strong>Acortador de URL:</strong> Spring Boot, Redis, Swagger — API escalable con cache en Redis y documentación Swagger.</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
