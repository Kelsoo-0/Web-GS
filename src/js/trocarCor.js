const temas = ["space-mode", "earth-mode", "moon-mode"];

function aplicarTema(tema) {
    temas.forEach(t => document.body.classList.remove(t));
    document.body.classList.add(tema);
}

document.getElementById("SpaceTheme").addEventListener('click', () => aplicarTema("space-mode"));
document.getElementById("EarthTheme").addEventListener('click', () => aplicarTema("earth-mode"));
document.getElementById("MoonTheme").addEventListener('click', () => aplicarTema("moon-mode"));