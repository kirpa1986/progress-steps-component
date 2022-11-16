const numberOfSteps = document.querySelectorAll('.step-circle').length;
const steps = document.querySelectorAll('.step-circle');
const progressLine = document.getElementById('progress-line');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

let currentStep = 4
setCurrentStep(currentStep, null);

function setCurrentStep(currentStep, btn) {
    if (btn) {
        if (btn.id === 'next') {
            getStepCircle(currentStep-1).style.transition = 'border-color 1.5s ease';
        }
        if (btn.id === 'prev') {
            getStepCircle(currentStep).style.transition = 'border-color 1.5s ease 0.5s';
        }
    }
    const progressWidth = parseFloat(currentStep * 100 / numberOfSteps - 100 / numberOfSteps /2);
    progressLine.style.width = `${progressWidth}%`
    steps.forEach(step => {
        if(parseInt(step.textContent) < currentStep) {
            step.classList.add('completed');
        } else {step.classList.remove('completed');}
    if (currentStep === 1) {prevBtn.setAttribute('disabled', true)} else {prevBtn.removeAttribute('disabled')}
    if (currentStep === numberOfSteps) {document.getElementById('next').setAttribute('disabled', true)} else {nextBtn.removeAttribute('disabled')}   
    })
}

function getStepCircle(currentStep) {
    let stepCircle = null;
    steps.forEach(step => {
        if (parseInt(step.textContent) === currentStep) {stepCircle = step}
    })
    return stepCircle;
}

nextBtn.addEventListener('click', ev => {
    progressLine.style.transition = '1s ease 0.5s';
    currentStep++;
    setCurrentStep(currentStep, ev.target);
})
prevBtn.addEventListener('click', ev => {
    progressLine.style.transition = '1s ease';
    currentStep--;
    setCurrentStep(currentStep, ev.target);
})