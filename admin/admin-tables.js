// Dark Mode
document.querySelectorAll('#toggle-dark').forEach(btn => {
    btn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
});



// Filtro de pesquisa
document.querySelectorAll('#search').forEach(input => {
    input.addEventListener('keyup', function() {
        const table = this.nextElementSibling.querySelector('table');
        const filter = this.value.toLowerCase();
        const rows = table.getElementsByTagName('tr');

        for (let i = 1;i < rows.length;i++) {
            const cells = rows[i].getElementsByTagName('td');
            let match = false;
            for (let j = 0;j < cells.length;j++) {
                if (cells[j].textContent.toLowerCase().includes(filter)) {
                    match = true;
                    break;
                }
            }
            rows[i].style.display = match ? '' : 'none';
        }
    });
});
