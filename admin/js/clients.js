const API_URL = "http://localhost:8080/clients";
let editingClientId = null;

document.addEventListener("DOMContentLoaded", () => {
    loadClients();

    const clientModal = new bootstrap.Modal(document.getElementById("clientModal"));
    const form = document.querySelector("#clientModal form");

    form.addEventListener("submit", e => {
        e.preventDefault();

        const clientData = {
            nome: form.nome.value.trim(),
            telefone: form.telefone.value.trim(),
            email: form.email.value.trim()
        };

        // -----------------------------
        // Validações
        // -----------------------------
        if (!clientData.nome || !clientData.telefone || !clientData.email) {
            showToast("Todos os campos são obrigatórios!", "danger");
            return;
        }

        if (!isValidEmail(clientData.email)) {
            showToast("Email inválido!", "danger");
            return;
        }

        if (!isValidPhone(clientData.telefone)) {
            showToast("Telefone inválido! Use o formato: (XX)XXXXX-XXXX", "danger");
            return;
        }

        // -----------------------------
        // Envio para API
        // -----------------------------
        if (editingClientId) {
            // Atualizar cliente
            fetch(`${API_URL}/${editingClientId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(clientData)
            })
                .then(res => res.json())
                .then(() => {
                    clientModal.hide();
                    loadClients();
                    showToast("Cliente atualizado com sucesso!");
                    editingClientId = null;
                    form.reset();
                })
                .catch(err => console.error(err));
        } else {
            // Criar novo cliente
            fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(clientData)
            })
                .then(res => res.json())
                .then(() => {
                    clientModal.hide();
                    loadClients();
                    showToast("Cliente criado com sucesso!");
                    form.reset();
                })
                .catch(err => console.error(err));
        }
    });
});

// -----------------------------
// Carregar clientes
// -----------------------------
function loadClients() {
    fetch(API_URL)
        .then(res => res.json())
        .then(clients => renderClients(clients))
        .catch(err => console.error(err));
}

// -----------------------------
// Renderizar clientes na tabela
// -----------------------------
function renderClients(clients) {
    const tbody = document.getElementById("clientsTableBody");
    tbody.innerHTML = "";

    clients.forEach(client => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${client.nome}</td>
            <td>${client.telefone}</td>
            <td>${client.email}</td>
            <td>
                <button class="btn btn-sm btn-outline-secondary edit-btn" data-id="${client.id}">Editar</button>
                <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${client.id}">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // -----------------------------
    // Botões Editar / Excluir
    // -----------------------------
    document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.addEventListener("click", e => {
            const id = e.target.dataset.id;
            const client = clients.find(c => c.id == id);
            const form = document.querySelector("#clientModal form");
            form.nome.value = client.nome;
            form.telefone.value = client.telefone;
            form.email.value = client.email;
            editingClientId = id;
            new bootstrap.Modal(document.getElementById("clientModal")).show();
        });
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", e => {
            if (confirm("Deseja realmente excluir este cliente?")) {
                const id = e.target.dataset.id;
                fetch(`${API_URL}/${id}`, { method: "DELETE" })
                    .then(() => {
                        loadClients();
                        showToast("Cliente excluído com sucesso!", "danger");
                    })
                    .catch(err => console.error(err));
            }
        });
    });
}

// ==============================
// Validação de Email
// ==============================
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ==============================
// Validação de Telefone
// ==============================
function isValidPhone(phone) {
    const regex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    return regex.test(phone);
}

// ==============================
// Toasts
// ==============================
function showToast(message, type = "success") {
    const toastContainer = document.getElementById("toastContainer");
    const toastEl = document.createElement("div");
    toastEl.className = `toast align-items-center text-bg-${type} border-0`;
    toastEl.setAttribute("role", "alert");
    toastEl.setAttribute("aria-live", "assertive");
    toastEl.setAttribute("aria-atomic", "true");
    toastEl.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    toastContainer.appendChild(toastEl);
    const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
    toast.show();

    toastEl.addEventListener("hidden.bs.toast", () => toastEl.remove());
}
