$(document).ready(function () {
    function insertCard(gifPicture) {
        const template = `
        <div class="card__inner">
            <div class="card__face card__face--front card_bg">
                <h2>Haz clic para comenzar</h2>
            </div>
            <div class="card__face card__face--back">
                <div class="card__content">
                    <div class="card__header card_bg__header">
                        <img class="gif" src="./img/${gifPicture}.gif" frameborder="0"></img>
                    </div>
                    <div class="card__body">
                        <div class="happy_birthday_title">
                            <p> ¡¡ <span class="color_word"> Feliz </span> Cumpleaños <span class="color_word"> Yanided </span>!! 🥳🥂</p>
                        </div>
                        <div class="wrap_typing">
                            <span class="typing"></span><span class="cursor"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        return template;
    }

    const textos = [
        'Yaniiiii, hoy es tu cumpleaños y sabes que significa eso? 🤔. Que me debes una rebanada de pastel 🍰 y que ya estás viejita jaja. De seguro ya te seden el asiento en el metro jaja (es bromi anciana). Paso rápido a felicitarte, a decirte que disfrutes este dia con tu familia y principalmente con tus amigos porque sí o sí tienes que celebrarlo con ellos. Nada es especial si tus amigos no están ahí para verlo. Por cierto recuerdas que hace un año te felicité y te dijé que cumplias 30 años jaja, y volteaste a ver a Karen con cara de "Y este wey quien se cree 😠" no sé como no me golpeaste 🤕 jaja. También me invitaste a tu comida de cumple y yo en mi mente de "No te conozco y tú no me conoces, sería incomodo" jaja. Pero bueno, pasatela super, te quiero un chingo y recibe un gran abrazo de mi parte 🤗 en este día que nos hace sentir especiales.',
        'Con cariño <strong style="color: #fac73c;">Mike</strong>.'
    ];
    
    let textoActual = 0;
    const velocidadEscritura = 100;
    const pausaOracion = 2000;
    let confetiIntervalo = null;
    let timeouts = [];

    
    function escribirTexto(elemento) {
        elemento.innerHTML = "";
    
        function escribirOracion(oracion, callback) {
            let div = document.createElement("div");
            div.innerHTML = oracion;
            let nodos = Array.from(div.childNodes);
    
            function escribirNodo(indexNodo = 0) {
                if (indexNodo >= nodos.length) {
                    if (textoActual < textos.length - 1) {
                        elemento.innerHTML += "<br><br>";
                    }                    
                    callback();
                    return;
                }
    
                let nodo = nodos[indexNodo];
    
                if (nodo.nodeType === Node.TEXT_NODE) {
                    let texto = nodo.textContent;
                    let i = 0;
    
                    function escribirCaracterTexto() {
                        if (i < texto.length) {
                            elemento.innerHTML += texto[i++];

                            // setTimeout(escribirCaracterTexto, texto[i - 1] === "." ? pausaOracion : velocidadEscritura);
                            
                            let timeoutID = setTimeout(escribirCaracterTexto, texto[i - 1] === "." ? pausaOracion : velocidadEscritura);
                            timeouts.push(timeoutID);

                        } else {
                            escribirNodo(indexNodo + 1);
                        }
                    }
    
                    escribirCaracterTexto();
                } else {
                    elemento.innerHTML += nodo.outerHTML;
                    escribirNodo(indexNodo + 1);
                }
            }
    
            escribirNodo();
        }
    
        function escribirTodas() {
            if (textoActual < textos.length) {
                escribirOracion(textos[textoActual], () => {
                    textoActual++;
                    escribirTodas();
                });
            }
        }
    
        escribirTodas();
    }
    

    $(".card").append(insertCard("happy_birthday"));

    let yaSeEjecuto = false;

    const card = document.querySelector(".card__inner");
    if (card) {
        card.addEventListener("click", function () {
            card.classList.toggle("is-flipped");
    
            const musica = document.getElementById("musica");
    
            if (card.classList.contains("is-flipped")) {
                if (!yaSeEjecuto) {
                    const typingElement = document.querySelector(".typing");
    
                    lanzarConfeti();
    
                    if (musica) {
                        musica.currentTime = 0;
                        musica.play();
                    }
    
                    if (typingElement) {
                        textoActual = 0;
                        indiceCaracter = 0;
    
                        // setTimeout(() => {
                        //     escribirTexto(typingElement);
                        // }, 3000);

                        timeouts.push(setTimeout(() => {
                            escribirTexto(typingElement);
                        }, 3000));
                        
                    }
    
                    if (!confetiIntervalo) {
                        confetiIntervalo = setInterval(lanzarConfeti, 7000);
                    }
    
                    yaSeEjecuto = true;
                }
            }

        });
    }
    
    
    function lanzarConfeti() {
        var duration = 2 * 1000; // Duración total de 2 segundos por disparo
        var animationEnd = Date.now() + duration;
        var skew = 1;

        function frame() {
            var timeLeft = animationEnd - Date.now();
            var ticks = Math.max(200, 500 * (timeLeft / duration));
            skew = Math.max(0.8, skew - 0.001);

            confetti({
                particleCount: 5,
                startVelocity: 30,
                spread: 360,
                origin: { x: Math.random(), y: Math.random() - 0.2 },
                colors: ["#ff0000", "#00ff00", "#0000ff", "#ffcc00", "#ff66ff"]
            });

            if (timeLeft > 0) {
                requestAnimationFrame(frame);
            }
        }

        frame();
    }

    // $("#toggle-audio").on("click", function () {
    //     const musica = document.getElementById("musica");
    //     if (musica) {
    //         if (musica.paused) {
    //             musica.play();
    //             $(this).text("🔈 Silenciar");
    //         } else {
    //             musica.pause();
    //             $(this).text("🔊 Reanudar");
    //         }
    //     }
    // });

    const fechaActual = new Date();
    const fechaLimite = new Date("2025-05-25T00:00:00");

    if (fechaActual >= fechaLimite) {
        $("#skip-typing").show();
    } else {
        $("#skip-typing").hide();
    }


    $("#skip-typing").on("click", function () {
        timeouts.forEach(clearTimeout);
        timeouts = [];
    
        const typingElement = document.querySelector(".typing");
        if (typingElement) {
            typingElement.innerHTML = textos.join("<br><br>");
        }
    });
    

});
