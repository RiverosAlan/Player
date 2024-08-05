// document.getElementById('openModalCheckbox').addEventListener('click', function() {
//     if (this.checked) {
//         var modal = new bootstrap.Modal(document.getElementById('mediumModal'));
//         modal.show();
//         // Desmarcar el checkbox después de abrir el modal
//         this.checked = false;
//     }
// });


// JavaScript para abrir el dropdown cuando el radio button sea seleccionado
document.getElementById('radio-trigger').addEventListener('change', function() {
    if (this.checked) {
        var dropdownButton = document.getElementById('dropdownMenuButton');
        var dropdown = new bootstrap.Dropdown(dropdownButton);
        dropdown.show();
        this.checked = false;
    }
});

