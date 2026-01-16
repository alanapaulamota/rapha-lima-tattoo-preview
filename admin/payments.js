const payments = [
    { cliente: "Lucas Silva", servico: "Tatuagem Peito", valor: 250, status: "Pendente" },
    { cliente: "Mariana Costa", servico: "Tatuagem Costas", valor: 500, status: "Concluído" },
    { cliente: "Carlos Mendes", servico: "Tatuagem Braço", valor: 300, status: "Pendente" },
];

const tableBody = document.getElementById('payments-table');
let totalValue = 0;
payments.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${p.cliente}</td>
        <td>${p.servico}</td>
        <td>R$ ${p.valor.toFixed(2)}</td>
        <td><span class="${p.status === 'Pendente' ? 'badge bg-warning text-dark' : 'badge bg-success'}">${p.status}</span></td>
        <td>
            <button class="btn btn-sm btn-primary">Editar</button>
            <button class="btn btn-sm btn-danger">Excluir</button>
        </td>
    `;
    tableBody.appendChild(tr);
    if (p.status === 'Concluído') totalValue += p.valor;
});

// Atualizar contadores
document.getElementById('total-payments').innerText = `R$ ${totalValue.toFixed(2)}`;
document.getElementById('pending-payments').innerText = payments.filter(p => p.status === 'Pendente').length;
document.getElementById('completed-payments').innerText = payments.filter(p => p.status === 'Concluído').length;

// Modo escuro
document.getElementById('toggle-dark-mode').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
