document.addEventListener('DOMContentLoaded', () => {
    // Animación de secciones al hacer scroll
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Animación de habilidades
                const habilidades = entry.target.querySelectorAll('.habilidades-lista li');
                habilidades.forEach((habilidad, index) => {
                    setTimeout(() => {
                        habilidad.classList.add('visible');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Modal para certificaciones con PDF
    const certCards = document.querySelectorAll('.cert-card');
    const modal = document.getElementById('cert-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalPdf = document.getElementById('modal-pdf');
    const closeModal = document.querySelector('.close');

    certCards.forEach(card => {
        const pdfUrl = card.getAttribute('data-pdf');
        const pdfPreview = card.querySelector('.pdf-preview');

        // Añadir PDF en vista previa al hacer hover
        card.addEventListener('mouseenter', () => {
            pdfPreview.innerHTML = `<embed src="${pdfUrl}" type="application/pdf">`;
        });

        // Limpiar vista previa al salir del hover
        card.addEventListener('mouseleave', () => {
            pdfPreview.innerHTML = '';
        });

        // Mostrar modal con PDF y detalles al hacer clic
        card.addEventListener('click', () => {
            const certId = card.getAttribute('data-cert-id');
            const certTitle = card.querySelector('h4').textContent;
            const certDetails = card.querySelector('.cert-details p').textContent;

            modalTitle.textContent = certTitle;
            modalDescription.textContent = certDetails;
            modalPdf.innerHTML = `<embed src="${pdfUrl}" type="application/pdf">`;
            modal.style.display = 'flex';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        modalPdf.innerHTML = ''; // Limpiar PDF al cerrar
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            modalPdf.innerHTML = ''; // Limpiar PDF al cerrar
        }
    });

    // Menú hamburguesa
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});