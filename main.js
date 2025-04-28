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

    // const textos = [
    //     'Yaniiii, hoy es tu cumpleaños y sabes que significa eso?. Que me debes una rebanada de pastel 🍰 jaja, y que ya tambien se te ha pasado un año de vida. El tiempo pasa muy rápido, no lo crees?. Quizas hoy estés feliz, triste o nostalgica, no lo sé con exactitud pero lo que sí sé es que te mereces lo mejor, y aunque no pueda estar físicamente a tu lado para celebrarlo, quiero que sientas mi cariño y mi torpeza desde la distancia. Por cierto recuerdas que hace un año te felicité y te dijé que cumplias 30 años jaja, no sé como no me golpeaste. Ojala podamos vernos pronto para seguir echando chisme jaja. Y si ya no quieres verme tampoco pasa nada ntp. Disfruta este dia con tus amigos y familiares pero principalmente con tus amigos, porque si algo he aprendido es que nada es especial si tus amigos no están ahí para verlo. Pasatela super, te quiero un chingo carnala y recibe un gran abrazo de mi parte 🤗.',
    //     'Con cariño <strong style="color: #fac73c;">Mike</strong>.'
    // ];

    const textos = [
        'Yaniiii, hoy es tu cumpleaños y sabes que significa eso?. Que me debes una rebanada de pastel 🍰 jaja, y que ya tambien se te ha pasado un año de vida. El tiempo pasa muy rápido, no lo crees?. Pero bueno paso a felicitarte en este dia, a decirte que te mereces lo mejor y aunque no pueda estar físicamente a tu lado para celebrarlo, quiero que sientas mi cariño y mi torpeza desde la distancia. Por cierto recuerdas que hace un año te felicité y te dijé que cumplias 30 años jaja, no sé como no me golpeaste. También me invitaste a tu comida de cumple y yo en mi mente de "Y por qué me invitas si ni siquiera te conozco" jaja. Ojala podamos vernos pronto para seguir echando chisme jaja. Y si ya no quieres verme tampoco pasa nada ntp. Disfruta este dia con tus amigos y familiares pero principalmente con tus amigos, porque si algo he aprendido es que nada es especial si tus amigos no están ahí para verlo. Pasatela super, te quiero un chingo carnala y recibe un gran abrazo de mi parte 🤗.',
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

    $("#toggle-audio").on("click", function () {
        const musica = document.getElementById("musica");
        if (musica) {
            if (musica.paused) {
                musica.play();
                $(this).text("🔈 Silenciar");
            } else {
                musica.pause();
                $(this).text("🔊 Reanudar");
            }
        }
    });

    const fechaActual = new Date();
    const fechaLimite = new Date("2025-04-28");
    if (fechaActual >= fechaLimite) {
        $("#skip-typing").show();
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
