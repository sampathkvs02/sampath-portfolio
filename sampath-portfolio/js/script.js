/* =====================================================
SAMPATH PORTFOLIO
FILE: js/script.js

FEATURES:
1. Loading screen
2. Mobile navigation menu
3. Typing animation
4. Project filters
5. Project details modal
6. Escape key close
7. Contact form validation
8. Back-to-top button
9. Scroll reveal animations
===================================================== */

document.addEventListener('DOMContentLoaded', function () {
  const loadingScreen = document.getElementById('loadingScreen');

  window.addEventListener('load', function () {
    setTimeout(function () {
      if (loadingScreen) {
        loadingScreen.classList.add('loading-hide');
      }
    }, 700);
  });

  const mobileMenuButton = document.getElementById('mobileMenuButton');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuButton && navLinks) {
    mobileMenuButton.addEventListener('click', function () {
      navLinks.classList.toggle('show');
      mobileMenuButton.textContent = navLinks.classList.contains('show') ? '✕' : '☰';
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('show');
        mobileMenuButton.textContent = '☰';
      });
    });
  }

  const typingText = document.getElementById('typingText');
  const typingWords = [
    'ServiceNow Developer',
    'ServiceNow Workflows',
    'Custom Applications|',
    'Business Process Tools|',
    'REST APIs|',
    'Flow Designer|',
    'HRSD|',
  ];
  let wordIndex = 0;
  let characterIndex = 0;
  let isDeleting = false;

  function typeText() {
    if (!typingText) {
      return;
    }

    const currentWord = typingWords[wordIndex];

    if (!isDeleting) {
      typingText.textContent = currentWord.substring(0, characterIndex + 1);
      characterIndex++;

      if (characterIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeText, 1400);
        return;
      }

      setTimeout(typeText, 90);
    } else {
      typingText.textContent = currentWord.substring(0, characterIndex - 1);
      characterIndex--;

      if (characterIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % typingWords.length;
        setTimeout(typeText, 500);
        return;
      }

      setTimeout(typeText, 45);
    }
  }

  if (typingText) {
    typeText();
  }

  const filterButtons = document.querySelectorAll('.filter-button');
  const projectCards = document.querySelectorAll('.projects-grid .project-card');

  function filterProjects(filter) {
    projectCards.forEach(function (card) {
      const categories = (card.dataset.category || '').split(' ').map(function (item) {
        return item.trim();
      });
      const isVisible = filter === 'all' || categories.includes(filter);
      card.style.display = isVisible ? 'grid' : 'none';
    });
  }

  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        filterButtons.forEach(function (btn) {
          btn.classList.remove('active');
        });
        button.classList.add('active');
        filterProjects(button.dataset.filter || 'all');
      });
    });
  }

  const projectModal = document.getElementById('projectModal');
  const modalInformation = document.getElementById('modalInformation');
  const projectDetailsButtons = document.querySelectorAll('.project-details-button');

  const projectData = {
    visitor: {
      title: 'Visitor Pass Management System',
      description: 'A modern visitor management application designed to simplify visitor registration, pass generation and visitor record management.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS'],
      links: [
        { label: 'GitHub', url: '#' },
        { label: 'Live Demo', url: '#' }
      ]
    },
    image: {
      title: 'Image Authentix',
      description: 'An AI-powered image forgery detection system using image preprocessing, Error Level Analysis and CNN-based prediction.',
      technologies: ['Python', 'CNN', 'Deep Learning', 'Machine Learning'],
      links: [
        { label: 'GitHub', url: '#' },
        { label: 'Live Demo', url: '#' }
      ]
    },
    chat: {
      title: 'AI Chat Assistant for SQLite',
      description: 'A web-based AI chat assistant that allows users to interact with SQLite database information through a simple interface.',
      technologies: ['Python', 'Flask', 'SQLite', 'JavaScript'],
      links: [
        { label: 'GitHub', url: '#' },
        { label: 'Live Demo', url: '#' }
      ]
    },
    itsm: {
      title: 'ServiceNow ITSM Implementation',
      description: 'A hands-on ServiceNow implementation focused on Incident, Problem, Change, Service Catalog, SLA concepts and workflow automation.',
      technologies: ['ServiceNow', 'ITSM', 'Flow Designer', 'CMDB'],
      links: [
        { label: 'GitHub', url: '#' },
        { label: 'Live Demo', url: '#' }
      ]
    }
  };

  function openProjectModal(projectKey) {
    if (!projectModal || !modalInformation || !projectKey) {
      return;
    }

    const project = projectData[projectKey];
    if (!project) {
      return;
    }

    modalInformation.innerHTML =
      '<h2>' + project.title + '</h2>' +
      '<p>' + project.description + '</p>' +
      '<div class="project-technologies">' +
      project.technologies.map(function (item) {
        return '<span>' + item + '</span>';
      }).join('') +
      '</div>' +
      '<div class="project-buttons">' +
      project.links.map(function (link) {
        return '<a href="' + link.url + '" target="_blank">' + link.label + '</a>';
      }).join('') +
      '</div>';

    projectModal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!projectModal) {
      return;
    }
    projectModal.classList.remove('show');
    document.body.style.overflow = '';
  }

  projectDetailsButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      openProjectModal(button.dataset.project);
    });
  });

  const closeModalButton = document.getElementById('closeModal');
  if (closeModalButton) {
    closeModalButton.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', function (event) {
      if (event.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeProjectModal();
    }
  });

  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const subject = document.getElementById('subject');
      const message = document.getElementById('message');

      if (!name || !email || !subject || !message) {
        return;
      }

      if (!name.value.trim() || !email.value.trim() || !subject.value.trim() || !message.value.trim()) {
        if (formMessage) {
          formMessage.textContent = 'Please fill in all fields before sending.';
          formMessage.style.color = '#20c997';
        }
        return;
      }

      if (formMessage) {
        formMessage.textContent = 'Thank you! Your message has been received.';
        formMessage.style.color = '#20c997';
      }
      contactForm.reset();
    });
  }

  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', function () {
    if (backToTop) {
      backToTop.classList.toggle('show', window.scrollY > 400);
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-links a');

  function highlightCurrentSection() {
    const scrollY = window.pageYOffset;
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 110;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (sectionId && scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinksAll.forEach(function (link) {
          link.classList.toggle('active-link', link.getAttribute('href') === '#' + sectionId);
        });
      }
    });
  }

  window.addEventListener('scroll', highlightCurrentSection);
  highlightCurrentSection();

  const revealTargets = document.querySelectorAll('.hero-content, .about-content, .project-card, .timeline-item, .certification-card, .github-section, .contact-form');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-show');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(function (element) {
      element.classList.add('reveal-hidden');
      revealObserver.observe(element);
    });
  }
});
