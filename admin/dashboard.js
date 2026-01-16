// -----------------------------
// Navigation
// -----------------------------
const sections = document.querySelectorAll('.dashboard-section');
const links = document.querySelectorAll('.sidebar a');

links.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        links.forEach(l => l.classList.remove('active'));
        this.classList.add('active');

        const sectionId = this.dataset.section;
        sections.forEach(s => {
            s.style.display = s.id === sectionId ? 'block' : 'none';
        });
    });
});

// -----------------------------
// Contadores animados
// -----------------------------
function animateCount(id, target) {
    let count = 0;
    const el = document.getElementById(id);
    const increment = Math.ceil(target / 100);
    const interval = setInterval(() => {
        count += increment;
        if (count >= target) {
            el.innerText = target;
            clearInterval(interval);
        } else {
            el.innerText = count;
        }
    }, 15);
}

animateCount('count-agendamentos', 12);
animateCount('count-clientes', 35);
animateCount('count-pagamentos', 20);
animateCount('count-tatuagens', 50);

// -----------------------------
// Notificações nos cards
// -----------------------------
const notifications = {
    agendamentos: 3,  // ex: 3 atrasados
    clientes: 5,      // 5 novos clientes
    pagamentos: 2,    // 2 pendentes
    tatuagens: 0
};

// Função para criar bolinhas de notificação
function createNotifications() {
    document.querySelectorAll('.dashboard-cards .card').forEach(card => {
        const icon = card.querySelector('i');
        const id = icon.className.includes('calendar') ? 'agendamentos' :
            icon.className.includes('people') ? 'clientes' :
                icon.className.includes('cash') ? 'pagamentos' :
                    icon.className.includes('pencil') ? 'tatuagens' : '';

        if (notifications[id] && notifications[id] > 0) {
            const badge = document.createElement('div');
            badge.classList.add('notification');
            badge.innerText = notifications[id];
            card.appendChild(badge);
        }
    });
}

createNotifications();


// -----------------------------
// Chart.js
// -----------------------------
const ctxAgend = document.getElementById('chartAgendamentos').getContext('2d');
new Chart(ctxAgend, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [{ label: 'Agendamentos', data: [5, 8, 12, 9, 15, 12], backgroundColor: '#482c44' }]
    },
    options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
});

const ctxClientes = document.getElementById('chartClientes').getContext('2d');
new Chart(ctxClientes, {
    type: 'doughnut',
    data: {
        labels: ['Novos', 'Ativos', 'Inativos'],
        datasets: [{ data: [10, 20, 5], backgroundColor: ['#482c44', '#353b45', '#999'] }]
    },
    options: { responsive: true }
});

// -----------------------------
// Modo Escuro
// -----------------------------
document.getElementById('toggle-dark-mode').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// -----------------------------
// Drag & Drop Cards
// -----------------------------
const container = document.getElementById('cards-container');
let dragged;

container.addEventListener('dragstart', (e) => { dragged = e.target; e.target.style.opacity = 0.5; });
container.addEventListener('dragend', (e) => { e.target.style.opacity = ""; });
container.addEventListener('dragover', (e) => e.preventDefault());
container.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('card')) {
        container.insertBefore(dragged, e.target.nextSibling);
    }
});
