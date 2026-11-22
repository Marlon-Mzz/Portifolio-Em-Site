
// 1. EFEITO DE DIGITAÇÃO

const titulo = document.querySelector(".hero h2");

const frases = [
    "Desenvolvedor em formação",
    "Apaixonado por tecnologia",
    "Estudante de programação",
    "Futuro desenvolvedor web"
];

let fraseAtual = 0;
let letraAtual = 0;
let apagando = false;

function efeitoDigitacao() {

    if (!titulo) return;

    const frase = frases[fraseAtual];

    if (!apagando) {
        letraAtual++;
    } else {
        letraAtual--;
    }

    titulo.textContent = frase.substring(0, letraAtual);

    let velocidade = apagando ? 50 : 100;

    if (!apagando && letraAtual === frase.length) {
        velocidade = 1800;
        apagando = true;
    }

    if (apagando && letraAtual === 0) {
        apagando = false;
        fraseAtual = (fraseAtual + 1) % frases.length;
        velocidade = 400;
    }

    setTimeout(efeitoDigitacao, velocidade);
}

if (titulo) {
    efeitoDigitacao();
}

// 2. FECHAR MENU MOBILE

const menu = document.getElementById("menu");
const linksMenu = document.querySelectorAll(".navbar-nav .nav-link");

linksMenu.forEach(function(link) {

    link.addEventListener("click", function() {

        if (!menu || typeof bootstrap === "undefined") {
            return;
        }

        const menuAberto = menu.classList.contains("show");

        if (menuAberto) {
            const instancia = bootstrap.Collapse.getOrCreateInstance(
                menu,
                { toggle: false }
            );

            instancia.hide();
        }

    });

});

// 3. BOTÃO VOLTAR AO TOPO

const botaoTopo = document.createElement("button");

botaoTopo.innerHTML = "↑";
botaoTopo.classList.add("btn-topo");

botaoTopo.setAttribute("aria-label", "Voltar ao topo");
botaoTopo.setAttribute("title", "Voltar ao topo");

document.body.appendChild(botaoTopo);

function verificarScroll() {

    if (window.scrollY > 350) {
        botaoTopo.classList.add("mostrar");
    } else {
        botaoTopo.classList.remove("mostrar");
    }

}

window.addEventListener("scroll", verificarScroll);

verificarScroll();

botaoTopo.addEventListener("click", function() {

    const movimentoReduzido = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
        top: 0,
        behavior: movimentoReduzido ? "auto" : "smooth"
    });

});

// 4. VALIDAÇÃO DO FORMULÁRIO

const formulario = document.getElementById("contactForm");
const feedback = document.getElementById("formFeedback");

if (formulario && feedback) {

    formulario.addEventListener("submit", function(evento) {

        evento.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const mensagem = document.getElementById("mensagem").value.trim();

        feedback.classList.remove("text-success", "text-danger");

        if (nome === "" || email === "" || mensagem === "") {

            feedback.textContent = "Preencha todos os campos!";
            feedback.classList.add("text-danger");

            return;
        }

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailValido.test(email)) {

            feedback.textContent = "Digite um e-mail válido!";
            feedback.classList.add("text-danger");

            return;
        }

        feedback.textContent =
            "Formulário validado com sucesso! Nenhuma mensagem foi enviada.";

        feedback.classList.add("text-success");

        formulario.reset();

    });

}
