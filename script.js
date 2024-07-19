window.onload = function () {
  const buttonCalc = document.getElementById("calc");
  const closeButton = document.querySelector("#close");
  const modal = document.querySelector(".modal-result");
  const result = document.querySelector("#result");
  const weightInput = document.getElementById("input-weight");
  const heightInput = document.getElementById("input-height");

  weightInput.focus();

  buttonCalc.addEventListener("click", (e) => {
    e.preventDefault();

    if (
      weightInput.value > 480 ||
      weightInput.value < 35 ||
      heightInput.value > 240 ||
      heightInput.value < 50
    ) {
      alert("verifique os dados");
      clearAndFocusInput();
      return;
    }
    calculateIMC();
    openModal();
  });

  closeButton.addEventListener("click", () => {   
    closeModal()
    clearAndFocusInput();
  });

  modal.addEventListener('click', ()=>{
    closeModal()
    clearAndFocusInput()
})
    

  function clearAndFocusInput() {
    heightInput.value = "";
    weightInput.value = "";
    weightInput.focus();
  }

  function calculateIMC() {
    const weight = weightInput.value;
    const height = heightInput.value;

    const base = (Number(height) * Number(height)) / 10000;
    const calcImc = Number(weight) / base;
    return calcImc.toPrecision(2);
  }

  function openModal() {
    modal.style.display = "block";
    result.innerHTML = calculateIMC();
    classificationIMC();
  }

  function closeModal(){
    modal.style.display = "none";
  }

  function classificationIMC() {
    const text = document.querySelector("#classification");
    let imc = calculateIMC();
    let classification = "";
    if (imc <= 18) {
      classification =
        "<b>Baixo peso</b>. É recomendado procurar um médico para avaliação criteriosa do resultado. Pode indicar um estado de consumo do organismo, com poucas reservas e riscos associados.";
    } else if (imc > 18 && imc <= 24) {
      classification =
        "<b>Peso adequado</b>. Tudo indica que está tudo bem, mas é importante avaliar outros parâmetros da composição corporal, para compreender se estão dentro do recomendado. Algumas pessoas apresentam IMC dentro da normalidade, mas têm circunferência abdominal maior que a recomendada e/ou quantidade de massa gorda acima do ideal.";
    } else if (imc >= 25 && imc <= 29) {
      classification =
        "<b>Sobrepeso</b>. O sobrepeso está associado ao risco de doenças como diabetes e hipertensão. Então, atenção! Consulte um médico e reveja hábitos para reverter o quadro. Também é importante avaliar outros parâmetros, como a circunferência abdominal.";
    } else if (imc >= 30 && imc <= 34) {
      classification =
        "<b>Obesidade grau I</b>. É importante buscar orientação médica e nutricional para entender melhor o seu caso, mesmo que os exames (colesterol e glicemia, por exemplo) estejam normais.";
    } else if (imc >= 35 && imc <= 39) {
      classification =
        "<b>Obesidade grau II</b>. Indica um quadro de obesidade mais evoluído em relação à classificação anterior e, mesmo com exames laboratoriais dentro da normalidade, não se deve atrasar a busca por orientação médica e nutricional.";
    } else if (imc >= 40) {
      classification =
        "<b>Obesidade grau III</b>. Nesse ponto, a chance de já estarmos diante de outras doenças associadas é mais elevada. É fundamental buscar orientação médica.";
    } else {
      classification = "Valor de IMC não reconhecido.";
    }
    text.innerHTML = classification;
  }
};
