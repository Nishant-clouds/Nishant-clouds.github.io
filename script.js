// 1. Dark mode toggle
const darkToggle = document.getElementById('darkToggle');
darkToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark');
    darkToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// 2. Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// 3. Publication filter
const filterButtons = document.querySelectorAll('.filter-btn');
const pubItems = document.querySelectorAll('.pub-item');

filterButtons.forEach(btn => {
    btn.addEventListener('click', function () {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const year = btn.dataset.year;
        pubItems.forEach(item => {
            if (year === 'all' || item.dataset.year === year) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// 4. Scroll-reveal animation
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => observer.observe(el));

// 5. Back to top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});
backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 6. Research card modal (tap to expand)
const researchDetails = {
    misinfo: {
        title: "Misinformation Detection",
        body: `<p>We build machine learning models that detect coordinated misinformation campaigns across social media platforms in real time.</p>
               <ul>
                 <li>Graph-based detection of bot networks</li>
                 <li>Cross-platform narrative tracking</li>
                 <li>Real-time fact-check matching</li>
               </ul>
               <p><strong>Related publication:</strong> "Detecting Coordinated Misinformation Campaigns at Scale," EMNLP 2026.</p>`
    },
    toxicity: {
        title: "Toxicity & Abuse Prevention",
        body: `<p>We develop context-aware models that detect harassment and abusive language while minimizing false positives against marginalized dialects.</p>
               <ul>
                 <li>Context-sensitive toxicity classifiers</li>
                 <li>Bias auditing across dialects</li>
                 <li>Deployment-ready moderation APIs</li>
               </ul>
               <p><strong>Related publication:</strong> "Cross-Lingual Toxicity Detection in Low-Resource Settings," ACL 2026.</p>`
    },
    lowres: {
        title: "Low-Resource Languages",
        body: `<p>We build NLP datasets and models for languages that lack large existing text corpora, focusing on equitable access to language technology.</p>
               <ul>
                 <li>Community-sourced dataset creation</li>
                 <li>Transfer learning from high-resource languages</li>
                 <li>Open-source model releases</li>
               </ul>
               <p><strong>Related publication:</strong> "Low-Resource NLP for Under-Documented Languages," ACL 2025.</p>`
    }
};

const modal = document.getElementById('researchModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.getElementById('closeModal');

document.querySelectorAll('.research-card').forEach(card => {
    card.addEventListener('click', function () {
        const key = card.dataset.research;
        const data = researchDetails[key];
        modalContent.innerHTML = `<h3>${data.title}</h3>${data.body}`;
        modal.classList.add('open');
    });
});

closeModal.addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', function (e) {
    if (e.target === modal) modal.classList.remove('open');
});
