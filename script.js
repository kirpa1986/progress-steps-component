const numberOfSteps = document.querySelectorAll(".step-circle").length;
const steps = document.querySelectorAll(".step-circle");
const progressLine = document.getElementById("progress-line");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const submitBtn = document.getElementById("submit");
const alertBox = document.getElementById('alert');

let currentStep = 1;
setCurrentStep(currentStep, null);

function setCurrentStep(currentStep, btn) {
    
  // If button (Prev or Next) was clciked - btn is not null
  if (btn) {
    if (btn.id === "next") {
      getStepCircle(currentStep - 1).style.transition = "border-color 1s ease";
    }
    if (btn.id === "prev") {
      getStepCircle(currentStep).style.transition = "border-color 1s ease 0.5s";
    }
  }
  // Setting parameters of the progress line width and step circles based on the current step
  const progressWidth = parseFloat(
    (currentStep * 100) / numberOfSteps - 100 / numberOfSteps / 2
  );
  progressLine.style.width = `${progressWidth}%`;
  steps.forEach((step) => {
    if (parseInt(step.textContent) < currentStep) {
      step.classList.add("completed");
    } else {
      step.classList.remove("completed");
    }
    if (currentStep === 1) {
      prevBtn.disabled = true;
    } else {
      prevBtn.disabled = false;
    }
    if (currentStep === numberOfSteps) {
      nextBtn.setAttribute("disabled", true);
      submitBtn.removeAttribute("disabled");
    } else {
      nextBtn.removeAttribute("disabled");
      submitBtn.setAttribute("disabled", true);
    }
  });
}

// Getting step-cicle DOM element that corresponds to the current step number
function getStepCircle(currentStep) {
  let stepCircle = null;
  steps.forEach((step) => {
    if (parseInt(step.textContent) === currentStep) {
      stepCircle = step;
    }
  });
  return stepCircle;
}

// Event Listeners for nav buttons and for mimicking of form submission
nextBtn.addEventListener("click", ev => {
  progressLine.style.transition = "1s ease 0.5s";
  currentStep++;
  setCurrentStep(currentStep, ev.target);
});
prevBtn.addEventListener("click", ev => {
  progressLine.style.transition = "1s ease";
  currentStep--;
  setCurrentStep(currentStep, ev.target);
});
submitBtn.addEventListener('click', ev => {
    progressLine.style.width = '100%';
    steps[numberOfSteps-1].classList.add("completed");
    alertBox.textContent = 'Form has been sucessfully submitted.';
    alertBox.classList.add('show');
    submitBtn.disabled = true;
    prevBtn.disabled = true;

    setTimeout(() => {
        alertBox.classList.remove('show');
        currentStep = 1;
        setCurrentStep(currentStep, null);
    }, 5000)
})