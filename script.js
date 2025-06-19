
class EmployeeDirectory {
    constructor() {
        this.employees = this.loadEmployees();
        this.form = document.getElementById('employeeForm');
        this.employeesList = document.getElementById('employeesList');
        this.successMessage = document.getElementById('successMessage');

        this.initializeEventListeners();
        this.renderEmployees();
    }

    //fonction initializeEventListener

    initializeEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e))
    }

    //gestion du submit du formulaire

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(this.form);
        const employee = {
            id: Date.now(),
            nom: formData.get('nom').trim(),
            prenom: formData.get('prenom').trim(),
            email: formData.get('email').trim(),
            poste: formData.get('poste').trim(),

        };

        if (this.validateEmployee(employee)) {
            this.addEmployee(employee);
            this.form.reset();
            this.clearValidationErrors();
            this.showSuccessMessage();
        }
    }

    /*validation d'un employé*/

    validateEmployee(employee) {

        let isValid = true;

        //validation du nom

        if (!employee.nom) {
            this.showError('nom', 'le nom est obligatoire.');
            isValid = false;
        } else {
            this.clearError('nom');
        }

        //validation du prenom

        if (!employee.prenom) {
            this.showError('prenom', 'le prénom est obligatoire.');
            isValid = false;
        } else {
            this.clearError('prenom');
        }
           

        //validation de l'email
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // if (!employee.email) {
        //     this.showError('email', 'l\'email est obligatoire.');
        //     isValid = false;
        // } else if (!emailRegex.test(employee.email)) {
        //     this.showError('email', 'Cet email existe déjà.');
        //     isValid = false;
        // }
        
        // else if (this.isEamailExists(employee.email)) {
        //     this.showError('email', 'Cet email existe déjà.');
        //     isValid = false;
        // } else {
        //     this.clearError('email');
        // }

        //validation du poste

        if (!employee.poste) {
            this.showError('poste', 'la fonction est obligatoire.');
            isValid = false;
        } else {
            this.clearError('poste');
        }

        return isValid;
    }

    //fonction de verification de l'email

    isEmailExists(email) {
        return this.employees.some(emp => emp.email.toLowercase() === email.toLowercase())
    }

    //focntion pour afficher le message d'erreur

    showError(fieldName, message) {
        const input = document.getElementById(fieldName);
        const errorDiv = document.getElementById(fieldName + 'Error');

        input.classList.add('error');
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }

    //fonction pour effacer le champ message d'erreur

    clearError(fieldName) {
        const input = document.getElementById(fieldName);
        const errorDiv = document.getElementById(fieldName + 'Error');

        input.classList.remove('error');

    }

    clearValidationErrors() {
        ['nom', 'prenom', 'email', 'poste'].forEach(field => {
            this.clearError(field);
        });
    }

    //fonction affichage message de success

    showSuccessMessage() {
        this.successMessage.style.display = 'block';

        setTimeout(() => {
            this.successMessage.style.display = 'none';
        },
            3000);
    }

    //fonction pour ajouter un employé

    addEmployee(employee) {
        this.employees.push(employee);
        this.saveEmployees();
        this.renderEmployees();
    }


    //fonction pour supprimer un employé

    deleteEmployee(id) {
        if (confirm('Etes-vous sûr de vouloir supprimer cet employé ?')) {
            this.employees = this.employees.filter(emp => emp.id !== id);
            this.saveEmployees();
            this.renderEmployees();
        }
    }

    //fonction pour afficher les employés

    renderEmployees() {
        if (this.employees.length === 0) {
            this.employeesList.innerHTML = `
                <div class="empty-state">
                    <h3>Aucun employé enregistré</h3>
                    <p>Enregistrez un employé avec le formulaire ci-dessus</p>
                </div>
                `;
            return;
        }
        const employeesHTML = this.employees.map(employee =>`
            <div class="employee-card">
                <div class="employee-name">
                    ${employee.nom} ${employee.prenom}

                </div>
                <div class="employee-info">
                <strong>Email:</strong> ${employee.email}
                </div>

                <div class="employee-info">
                <strong>Poste:</strong> ${employee.poste}
                </div>


                 <div class="delete-btn-container">
                <button class="btn btn-delete" onclick="directory.deleteEmployee(${employee.poste})">Supprimer </button>
                </div>
            </div>
       ` ).join('');

        this.employeesList.innerHTML = `<div class="employees-grid">
            ${employeesHTML}
        </div>
        `;
    }


    /* Chargement d'un employé */

    loadEmployees() {
        const saved = localStorage.getItem('empoloyees');
        return saved ? JSON.parse(saved) : [];
    }

    /* En registrement d'un employé */

    saveEmployees() {
        localStorage.setItem('employees', JSON.stringify(this.employees));
        console.log('SAUVEGARDE DES EMPLOYES :', this.employees);
    }
}
//instantiation d'un objet de EmployeeDirectory

let directory;

document.addEventListener('DOMContentLoaded', () => {
    directory = new EmployeeDirectory();
});
//const directory = new EmployeeDirectory();