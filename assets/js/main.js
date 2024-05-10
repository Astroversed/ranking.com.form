const wrapper = document.querySelector(".wrapper"),
selectBtn = wrapper.querySelector(".select-btn"),
searchInp = wrapper.querySelector("input"),
options = wrapper.querySelector(".options");

let countries = ["Tercero A", "Tercero B", "Tercero C", "Tercero D", "Tercero E", "4to Informática A", "4to Informática B",
                 "4to Enfermería", "4to Gestión", "4to Mercadeo", "4to Modas", "4to Ebanistería", "5to Informática",
                 "5to Enfermería", "5to Gestión", "5to Mercadeo", "5to Modas", "5to Ebanistería", "6to Informática",
                 "6to Enfermería", "6to Gestión", "6to Mercadeo", "6to Modas", "6to Ebanistería"];

function addCountry(selectedCountry) {
    options.innerHTML = "";
    countries.forEach(country => {
        let isSelected = country == selectedCountry ? "selected" : "";
        let li = `<li onclick="updateName(this)" class="${isSelected}">${country}</li>`;
        options.insertAdjacentHTML("beforeend", li);
    });
}
addCountry();

function updateName(selectedLi) {
    searchInp.value = "";
    addCountry(selectedLi.innerText);
    wrapper.classList.remove("active");
    selectBtn.firstElementChild.innerText = selectedLi.innerText;

    var cursoError = document.getElementById("cursoError");
    cursoError.style.display = "none";
    selectBtn.classList.remove("error-border");
}


function submitForm() {
    var nombre = document.getElementById("nombre").value.trim();
    var curso = document.querySelector(".select-btn span").innerText;
    var checkBoxChecked = document.getElementById("input-check").checked;
    var nameError = document.getElementById("nameError");
    var cursoError = document.getElementById("cursoError");

    if (document.getElementById("nameError").style.display === 'block') {
        return;
    }

    if (nombre === "") {
        alertMessage.textContent = "Por favor, completa el campo de nombre.";
        alertBox.style.display = "block";
        return;
    }

    if (curso === "Selecciona tu Aula / Curso") {
        cursoError.style.display = "block";
        selectBtn.classList.add("error-border");
        return;
    } else {
        cursoError.style.display = "none";
        selectBtn.classList.remove("error-border");
    }

    if (!checkBoxChecked) {
        return;
    }

    sessionStorage.setItem("nombre", nombre);
    sessionStorage.setItem("curso", curso);
    sessionStorage.setItem("checkBoxChecked", checkBoxChecked);

    window.location.href = "https://astroversed.github.io/ranking.com.dashboard/#";
}


searchInp.addEventListener("keyup", () => {
    let arr = [];
    let searchWord = searchInp.value.toLowerCase();
    arr = countries.filter(data => {
        return data.toLowerCase().startsWith(searchWord);
    }).map(data => {
        let isSelected = data == selectBtn.firstElementChild.innerText ? "selected" : "";
        return `<li onclick="updateName(this)" class="${isSelected}">${data}</li>`;
    }).join("");
    options.innerHTML = arr ? arr : `<p style="margin-top: 10px;">¡Oops! Aula no encontrada.</p>`;
});

selectBtn.addEventListener("click", () => wrapper.classList.toggle("active"));

document.addEventListener("DOMContentLoaded", function() {
    const nombreInput = document.getElementById("nombre");

    nombreInput.addEventListener("input", function() {
        let nombre = nombreInput.value.toLowerCase().split(' ');
        for (let i = 0; i < nombre.length; i++) {
            nombre[i] = nombre[i].charAt(0).toUpperCase() + nombre[i].substring(1);
        }
        nombreInput.value = nombre.join(' ');
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const nombreInput = document.getElementById("nombre");

    nombreInput.addEventListener("input", function() {
        let nombre = nombreInput.value.trim().toLowerCase().split(' ');
        for (let i = 0; i < nombre.length; i++) {
            nombre[i] = nombre[i].charAt(0).toUpperCase() + nombre[i].substring(1);
        }
        nombreInput.value = nombre.join(' ');

        if (nombreInput.value.length > 10) {
            nombreInput.value = nombreInput.value.slice(0, 10);
        }
    });
});

function validateName() {
    var nameInput = document.getElementById("nombre");
    var nameError = document.getElementById("nameError");
    var name = nameInput.value.trim();
    var regex = /[^\p{L}]/gu;

    var accentMap = {
        'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
        'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U'
    };

    var removeAccents = function (str) {
        return str.replace(/[áéíóúÁÉÍÓÚ]/g, function (match) {
            return accentMap[match];
        });
    };

    name = removeAccents(name);

    if (regex.test(name)) {
        nameError.textContent = "Los Números, Emojis y Caracteres Especiales no están permitidos.";
        nameError.style.display = "block";
        nameInput.classList.add("error-border");
        document.getElementById("submitButton").disabled = true;
    } else if (name.split(' ').length > 2) {
        nameError.textContent = "Solo se permite un espacio";
        nameError.style.display = "block";
        nameInput.classList.add("error-border");
        document.getElementById("submitButton").disabled = true;
    } else {
        nameError.style.display = "none";
        nameInput.classList.remove("error-border");
        document.getElementById("submitButton").disabled = false;
    }
}