"use strict";

function main() {
  const ACTORS = {
    "maria": {
      password: "123",
      role: "proprieter",
    },
    "luis.freitas": {
      password: "123",
      role: "contractor",
    },
    "marta": {
      password: "123",
      role: "resident",
    },
  };

  const LOGIN_FORM_ID = "loginForm";

  const form = document.forms.namedItem(LOGIN_FORM_ID)
  if (form === null) {
    console.error(`Form with ID ${LOGIN_FORM_ID} not found`);
    return;
  }

  const FORM_MESSAGE_BOX_ID = "messageBox";
  const formMessageBox = document.getElementById(FORM_MESSAGE_BOX_ID);
  if (formMessageBox === null) {
    console.error(`No message box with ID ${FORM_MESSAGE_BOX_ID} found`);
    return;
  }

  form.addEventListener(
    "submit",
    event => {
      const name = form.elements.namedItem("usernameInput")?.value;
      const password = form.elements.namedItem("passwordInput")?.value;
      const fieldsValid = name in ACTORS && password === ACTORS[name].password;

      if (!form.checkValidity() || !fieldsValid) {
        event.preventDefault();
        event.stopPropagation();
        formMessageBox.classList.replace("opacity-0", "opacity-100");

        const message = !form.checkValidity()
          ? "Preencha ambos os campos"
          : "Credenciais inválidas";
        formMessageBox.innerText = message;
      } else {
        formMessageBox.classList.replace("opacity-100", "opacity-0");;

        const role = ACTORS[name].role;

        // TODO: Shouldn't there be a way to change the action URL without changing the
        // form?
        switch (role) {
          case "proprieter": {
            form.action = "./dashboard.html";
          } break;
          case "resident": {
            form.action = "./report.html"
          } break;
          case "contractor": {
            form.action = "./worker.html"
          } break;
        }

        console.log(`Successfully signed in as ${role}`)
      }
    }
  );
}

main();
