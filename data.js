/**
 * RESUME DATA
 * ------------------------------------------------------------------
 * Это единственный файл, который тебе нужно редактировать своими
 * реальными данными. Всё остальное (HTML/CSS/JS) — движок,
 * который просто отрисовывает то, что здесь описано.
 *
 * Постоянные ссылки на версии:
 *   site.com/?resume=default   -> полная версия
 *   site.com/?resume=short     -> сокращённая версия
 *
 * Хочешь третью версию — скопируй один из блоков ниже,
 * дай ему новый ключ (например "backend-lead") и раздавай ссылку
 * site.com/?resume=backend-lead
 * ------------------------------------------------------------------
 */

const RESUME_VERSIONS = {

  default: {
    meta: {
      name: "Ваше Имя",
      role: "Java Backend Developer",
      tagline: "Пишу код, который не будят по ночам.",
      location: "Tashkent, UZ",
      email: "you@example.com",
      github: "github.com/yourhandle",
      telegram: "@yourhandle",
      availability: "Открыт к предложениям"
    },

    summary:
      "Backend-разработчик на Java/Spring Boot с опытом проектирования " +
      "микросервисов, работы с конкурентностью и построения отказоустойчивых " +
      "интеграций. Люблю разбираться, как всё устроено на уровне JVM, а не " +
      "только на уровне фреймворка.",

    experience: [
      {
        company: "Company Name",
        role: "Java Backend Developer",
        period: "2023 — настоящее время",
        stack: ["Java 21", "Spring Boot", "PostgreSQL", "Docker"],
        bullets: [
          "Спроектировал и поддерживал сервис в монорепозитории из N микросервисов",
          "Внедрил outbox-паттерн для надёжной асинхронной доставки событий",
          "Сократил время сборки CI на X% за счёт оптимизации Gradle-модулей",
          "Покрыл ключевые сценарии интеграционными тестами (Testcontainers)"
        ]
      },
      {
        company: "Previous Company",
        role: "Junior Java Developer",
        period: "2021 — 2023",
        stack: ["Java 17", "Spring MVC", "MySQL"],
        bullets: [
          "Разрабатывал REST API для внутренней CRM-системы",
          "Участвовал в переходе с Maven на Gradle",
          "Писал unit-тесты, повысил покрытие модуля с X% до Y%"
        ]
      }
    ],

    skills: {
      categories: [
        {
          name: "Languages & Core",
          items: ["Java 17/21", "Concurrency", "JVM internals", "GC tuning"]
        },
        {
          name: "Frameworks",
          items: ["Spring Boot", "Spring Data", "Hibernate", "Spring Security"]
        },
        {
          name: "Infrastructure",
          items: ["Docker", "Docker Compose", "Kubernetes (basics)", "CI/CD"]
        },
        {
          name: "Data",
          items: ["PostgreSQL", "Redis", "Liquibase"]
        },
        {
          name: "Testing",
          items: ["JUnit 5", "Mockito", "Testcontainers", "ArchUnit"]
        }
      ]
    },

    projects: [
      {
        name: "project-name",
        description:
          "Краткое описание проекта: что делает, зачем сделан, какую задачу решает.",
        stack: ["Java", "Spring Boot", "PostgreSQL"],
        link: "github.com/yourhandle/project-name"
      },
      {
        name: "another-project",
        description:
          "Ещё один проект — например, пет-проект по hexagonal architecture.",
        stack: ["Java 21", "Hexagonal Architecture", "Liquibase"],
        link: "github.com/yourhandle/another-project"
      }
    ],

    education: [
      {
        school: "Название университета",
        degree: "Специальность / степень",
        period: "20XX — 20XX"
      }
    ]
  },

  short: {
    meta: {
      name: "Ваше Имя",
      role: "Java Backend Developer",
      tagline: "Коротко и по делу.",
      location: "Tashkent, UZ",
      email: "you@example.com",
      github: "github.com/yourhandle",
      telegram: "@yourhandle",
      availability: "Открыт к предложениям"
    },

    summary:
      "Backend-разработчик на Java/Spring Boot. Опыт: микросервисы, REST API, " +
      "работа с реляционными БД.",

    experience: [
      {
        company: "Company Name",
        role: "Java Backend Developer",
        period: "2023 — настоящее время",
        stack: ["Java 21", "Spring Boot", "PostgreSQL"],
        bullets: [
          "Разработка и поддержка бэкенд-сервисов в микросервисной архитектуре",
          "Внедрение паттернов надёжной доставки событий"
        ]
      }
    ],

    skills: {
      categories: [
        { name: "Core", items: ["Java 17/21", "Spring Boot", "PostgreSQL"] },
        { name: "Infra", items: ["Docker", "CI/CD"] }
      ]
    },

    projects: [
      {
        name: "project-name",
        description: "Краткое описание проекта.",
        stack: ["Java", "Spring Boot"],
        link: "github.com/yourhandle/project-name"
      }
    ],

    education: [
      {
        school: "Название университета",
        degree: "Специальность / степень",
        period: "20XX — 20XX"
      }
    ]
  }

};

const DEFAULT_VERSION_KEY = "default";
