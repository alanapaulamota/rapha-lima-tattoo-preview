// Dados simulados
const appointments = [
    { cliente: "Lucas Silva", data: "2026-01-20", hora: "14:00", status: "Pendente" },
    { cliente: "Mariana Costa", data: "2026-01-21", hora: "10:30", status: "Concluído" },
    { cliente: "Carlos Mendes", data: "2026-01-22", hora: "16:00", status: "Pendente" },
    { cliente: "Ana Paula", data: "2026-01-23", hora: "11:00", status: "Concluído" },
];

// Função para popular tabela
const tableBody = document.getElementById('appointments-table');
appointments.forEach(a => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${a.cliente}</td>
        <td>${a.data}</td>
        <td>${a.hora}</td>
        <td><span class="${a.status === 'Pendente' ? 'badge bg-warning text-dark' : 'badge bg-success'}">${a.status}</span></td>
        <td>
            <button class="btn btn-sm btn-primary">Editar</button>
            <button class="btn btn-sm btn-danger">Excluir</button>
        </td>
    `;
    tableBody.appendChild(tr);
});

// Atualizar contadores
document.getElementById('total-appointments').innerText = appointments.length;
document.getElementById('pending-appointments').innerText = appointments.filter(a => a.status === 'Pendente').length;
document.getElementById('completed-appointments').innerText = appointments.filter(a => a.status === 'Concluído').length;

// Modo escuro
document.getElementById('toggle-dark-mode').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
