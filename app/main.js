const loadInitialTemplate = () => {
    const template = `
        <h1>Usuarios</h1>

        <form id="user-form">
            <div>
                <label>Nombre</label>
                <input name="name" required />
            </div>

            <div>
                <label>Apellido</label>
                <input name="lastname" required />
            </div>

            <div>
                <label>Email</label>
                <input name="email" type="email" required />
            </div>

            <button type="submit">Enviar</button>
        </form>

        <ul id="user-list"></ul>
    `;

    document.body.innerHTML = template;
};


const getUsers = async () => {
    try {
        const response = await fetch('/users');

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const users = await response.json();

        console.log(users);

    } catch (error) {
        console.error('Error obteniendo usuarios:', error);
    }
};


const addFormListener = () => {
    const userForm = document.getElementById('user-form');

    userForm.onsubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(userForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {

                if (response.status === 409) {
                    console.error('Ese email ya está registrado');
                    return;
                }

                const error = await response.text();
                throw new Error(error);
            }

            console.log('Usuario creado correctamente');

            userForm.reset();

            await getUsers();

        } catch (error) {
            console.error('Error creando usuario:', error);
        }
    };
};


window.onload = () => {
    loadInitialTemplate();
    addFormListener();
    getUsers();
};