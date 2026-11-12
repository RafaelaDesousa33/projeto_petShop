// 1. ELEMENTOS HTML

const nomePetInput = document.querySelector("#nomePet");
const btnCadastrarPet = document.querySelector("#btn_cadastrarPet");
const btnConfirmarServico = document.querySelector("#btn_confirmarServico");

const nomePetParagrafo = document.querySelector("#nome_pet_paragrafo");
const tipoPetParagrafo = document.querySelector("#tipo_pet_paragrafo");

const spanNomePet = document.querySelector(".span_nomePet");
const spanTipoAnimal = document.querySelector(".span_tipoAnimal");
const spanTipoServico = document.querySelector(".span_tipoServiçoPet");
const valorTotal = document.querySelector(".valorTotal");

const categoriasDiv = document.querySelectorAll(
  "#cadastrarPet_item__tipoAnimal div",
);

const ferramentasDiv = document.querySelectorAll(
  "#container_ferramentasPet__tipo .boxFerramentas_pet",
);

// 2. CLASSES

class Animal {
  constructor(nome, tipoServico) {
    this.nome = nome;
    this.tipoServico = tipoServico;
  }

  escolherServico() {
    if (this.tipoServico === "banho") {
      return 60;
    } else if (this.tipoServico === "tosa") {
      return 50;
    }

    return 0;
  }
}

class Cachorro extends Animal {
  constructor(nome, tipoServico) {
    super(nome, tipoServico);
    this.especie = "Cachorro";
  }
}

class Gato extends Animal {
  constructor(nome, tipoServico) {
    super(nome, tipoServico);
    this.especie = "Gato";
  }
}

// 3. VARIÁVEIS DE CONTROLE

let animalSelecionado = null;
let tipoAnimalSelecionado = null;
let tipoServicoSelecionado = null;

// 4. SELECIONAR TIPO DE ANIMAL

categoriasDiv.forEach((div) => {
  div.addEventListener("click", () => {
    tipoAnimalSelecionado = div.getAttribute("tipoAnimal");

    categoriasDiv.forEach((item) => {
      item.classList.remove("selecionado");
    });

    div.classList.add("selecionado");
  });
});

// 5. CADASTRAR PET
btnCadastrarPet.addEventListener("click", (event) => {
  event.preventDefault();

  const nome = nomePetInput.value.trim();

  if (!nome) {
    alert("Digite o nome do pet!");
    return;
  }

  if (!tipoAnimalSelecionado) {
    alert("Selecione cachorro ou gato!");
    return;
  }

  if (tipoAnimalSelecionado === "cachorro") {
    animalSelecionado = new Cachorro(nome, null);
  } else if (tipoAnimalSelecionado === "gato") {
    animalSelecionado = new Gato(nome, null);
  }

  // Atualiza os dados do pet selecionado
  nomePetParagrafo.innerHTML = `<i class="fas fa-paw"></i> ${animalSelecionado.nome}`;

  tipoPetParagrafo.textContent = animalSelecionado.especie;

  // Atualiza o resumo
  spanNomePet.textContent = `Pet: ${animalSelecionado.nome}`;
  spanTipoAnimal.textContent = `(${animalSelecionado.especie})`;

  // Limpa o serviço anterior
  tipoServicoSelecionado = null;
  spanTipoServico.textContent = "Serviço: ";
  valorTotal.textContent = "R$ 0,00";

  console.log("Pet cadastrado:", animalSelecionado);
});

// SELECIONAR SERVIÇO

ferramentasDiv.forEach((div) => {
  div.addEventListener("click", () => {
    tipoServicoSelecionado = div.getAttribute("tipoFerramenta");

    ferramentasDiv.forEach((item) => {
      item.classList.remove("selecionado");
    });

    div.classList.add("selecionado");
  });
});

// 7 CONFIRMAR SERVIÇO

btnConfirmarServico.addEventListener("click", () => {
  if (!animalSelecionado) {
    alert("Cadastre um pet primeiro!");
    return;
  }

  if (!tipoServicoSelecionado) {
    alert("Selecione um serviço!");
    return;
  }

  // Define o serviço no objeto
  animalSelecionado.tipoServico = tipoServicoSelecionado;

  // Calcula o preço
  const valor = animalSelecionado.escolherServico();

  // Atualiza o resumo
  spanTipoServico.textContent = `Serviço: ${animalSelecionado.tipoServico}`;

  valorTotal.textContent = `R$ ${valor.toFixed(2).replace(".", ",")}`;

  // Confirmação
  alert(
    `Serviço confirmado!\n
    Pet: ${animalSelecionado.nome}
    Animal: ${animalSelecionado.especie}
    Serviço: ${animalSelecionado.tipoServico}
    Valor: R$ ${valor.toFixed(2)}`,
  );

  console.log("Atendimento confirmado:", animalSelecionado);
});
