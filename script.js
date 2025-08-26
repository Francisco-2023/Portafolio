document.addEventListener('DOMContentLoaded', () => {
    // Toggle del menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Animaciones de scroll
    const sections = document.querySelectorAll('.section');
    const habilidades = document.querySelectorAll('.habilidades-lista li');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const habilidadObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                habilidadObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
    habilidades.forEach(habilidad => habilidadObserver.observe(habilidad));

    // Modal para certificados
    const certModal = document.getElementById('cert-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalPdf = document.getElementById('modal-pdf');
    const downloadBtn = document.getElementById('download-btn');
    const printBtn = document.getElementById('print-btn');
    const certClose = certModal.querySelector('.close');

    function clearCertModalContent() {
        modalTitle.textContent = '';
        modalDescription.textContent = '';
        modalPdf.innerHTML = '';
        downloadBtn.removeAttribute('href');
        downloadBtn.style.display = 'none';
        printBtn.style.display = 'none';
    }

    document.querySelectorAll('.cert-card').forEach(card => {
        card.addEventListener('click', () => {
            clearCertModalContent();
            const title = card.querySelector('h4').textContent;
            const description = card.querySelector('.cert-details p').textContent;
            const pdfPath = card.getAttribute('data-pdf');

            modalTitle.textContent = title;
            modalDescription.textContent = description;
            if (pdfPath) {
                modalPdf.innerHTML = `<embed src="${pdfPath}" type="application/pdf" width="100%" height="100%">`;
                downloadBtn.href = pdfPath;
                downloadBtn.download = title.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.pdf';
                downloadBtn.style.display = 'inline-block';
                printBtn.style.display = 'inline-block';
                printBtn.onclick = () => {
                    const pdfWindow = window.open(pdfPath, '_blank');
                    pdfWindow.onload = () => {
                        pdfWindow.print();
                    };
                };
            }
            certModal.style.display = 'flex';
        });
    });

    certClose.addEventListener('click', () => {
        clearCertModalContent();
        certModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === certModal) {
            clearCertModalContent();
            certModal.style.display = 'none';
        }
    });

    // Modal para proyectos
    const projectModal = document.getElementById('project-modal');
    const projectModalTitle = document.getElementById('project-modal-title');
    const projectModalDescription = document.getElementById('project-modal-description');
    const projectModalCarouselInner = document.getElementById('project-modal-carousel-inner');
    const projectModalGithub = document.getElementById('project-modal-github');
    const projectClose = projectModal.querySelector('.close');
    const projectPrevBtn = projectModal.querySelector('.carousel-control.prev');
    const projectNextBtn = projectModal.querySelector('.carousel-control.next');

    let currentIndex = 0;
    let images = [];

    function clearProjectModalContent() {
        projectModalTitle.textContent = '';
        projectModalDescription.textContent = '';
        projectModalCarouselInner.innerHTML = '';
        projectModalGithub.href = '#';
        projectModalGithub.textContent = '';
        currentIndex = 0;
    }

    function updateCarousel() {
        projectModalCarouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    document.querySelectorAll('.project-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            clearProjectModalContent();
            const project = button.closest('.proyecto');
            const title = project.querySelector('h3').textContent;
            const description = project.querySelector('p').textContent;
            const githubLink = project.getAttribute('data-github') || '#';
            images = JSON.parse(project.getAttribute('data-images') || '[]');

            projectModalTitle.textContent = title;
            projectModalDescription.textContent = description;
            projectModalGithub.href = githubLink;
            projectModalGithub.textContent = 'Ver en GitHub';

            images.forEach((src, index) => {
                const item = document.createElement('div');
                item.classList.add('carousel-item');
                if (index === 0) item.classList.add('active');
                item.innerHTML = `<img src="${src}" alt="${title} Screenshot ${index + 1}" onerror="this.parentElement.innerHTML='<p>Imagen no disponible</p>'">`;
                projectModalCarouselInner.appendChild(item);
            });

            updateCarousel();
            projectModal.style.display = 'flex';
        });
    });

    projectPrevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        updateCarousel();
    });

    projectNextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    projectClose.addEventListener('click', () => {
        clearProjectModalContent();
        projectModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === projectModal) {
            clearProjectModalContent();
            projectModal.style.display = 'none';
        }
    });
});