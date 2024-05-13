// JavaScript para alternar entre os formulários
document.getElementById("sacBtn").addEventListener("click", function () {
  document.getElementById("SAC").classList.add("active");
  document.getElementById("Quero_revender").classList.remove("active");
});

document.getElementById("revenderBtn").addEventListener("click", function () {
  document.getElementById("Quero_revender").classList.add("active");
  document.getElementById("SAC").classList.remove("active");
});

// JavaScript para garantir que o formulário de SAC esteja ativo por padrão
document.addEventListener("DOMContentLoaded", function () {
  // Adicionar a classe "active" ao formulário de SAC e remover do formulário de Quero Revender
  document.getElementById("SAC").classList.add("active");
  document.getElementById("Quero_revender").classList.remove("active");
});
