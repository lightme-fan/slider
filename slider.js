function Slider(slider) {
    // Using instanceof element
    if (!(slider instanceof Element)) {
        throw new Error('No error slider passed in');
    }

    // Create variable for working with the slider 
    let prev;
    let current;
    let next;

    // Select the element for the slider
    const slides = slider.querySelector('.slides');
    const prevButton = slider.querySelector('.goToPrev');
    const nextButton = slider.querySelector('.goToNext');

    // Start slider
    function startSlider() {
        current = slider.querySelector('.current') || slides.firstElementChild;
        prev = current.previousElementSibling || slides.lastElementChild;
        next = current.nextElementSibling || slides.firstElementChild;
        console.log({ current, prev, next });
    }

    function applyClass() {
        current.classList.add('current');
        prev.classList.add('prev');
        next.classList.add('nex');
    }

    function move(direction) {
        const classesToRemove = ['prev', 'current', 'next'];

        // [prev, current, next].forEach(el => el.classList.remove(...classesToRemove))
        prev.classList.remove(...classesToRemove);
        current.classList.remove(...classesToRemove);
        next.classList.remove(...classesToRemove);

        if (direction === 'back') {
            [prev, current, next] = [
                prev.previousElementSibling || slides.lastElementChild,
                prev, current
            ];

        } else {
            [prev, current, next] = [
                current, next, 
                next.nextElementSibling || slides.firstElementChild
            ];

        }

        applyClass();
    }

    startSlider();
    applyClass();

    prevButton.addEventListener('click', () => move('back'));
    nextButton.addEventListener('click', move);

};

const mySlider = Slider(document.querySelector('.slider'));
const dogSlider = Slider(document.querySelector('.dog-slider'));