document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");
    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const assunto = document.getElementById("assunto");
    const mensagem = document.getElementById("mensagem");

    const feedback = document.createElement("div");
    feedback.style.marginTop = "10px";
    feedback.style.fontWeight = "bold";
    form.appendChild(feedback);

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        feedback.textContent = "";
        feedback.style.color = "red";

        if (nome.value.trim() === "") {
            feedback.textContent = "O nome é obrigatório.";
            nome.focus();
            return;
        }

        if (email.value.trim() === "") {
            feedback.textContent = "O e-mail é obrigatório.";
            email.focus();
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            feedback.textContent = "Digite um e-mail válido.";
            email.focus();
            return;
        }

        if (assunto.value === "selecionar") {
            feedback.textContent = "Selecione um assunto.";
            assunto.focus();
            return;
        }

        if (mensagem.value.trim().length < 5) {
            feedback.textContent = "A mensagem deve ter pelo menos 5 caracteres.";
            mensagem.focus();
            return;
        }

        feedback.style.color = "lightgreen";
        feedback.textContent = "Mensagem enviada com sucesso!";

        form.reset();
    });

});