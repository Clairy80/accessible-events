// src/components/RegisterForm.jsx

const RegisterForm = () => {
    return (
      <div>
        <h2>Registrierungsformular</h2>
        <form>
          <input type="text" placeholder="Benutzername" />
          <input type="password" placeholder="Passwort" />
          <button type="submit">Registrieren</button>
        </form>
      </div>
    );
  };
  
  export default RegisterForm;
  