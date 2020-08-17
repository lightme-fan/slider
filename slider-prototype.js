function Slider(slider) {
    // Using instanceof element
    if (!(slider instanceof Element)) {
        throw new Error('No error slider passed in');
    }

    this.slider = slider;
    // Create variable for working with the slider 
    // let this.prev;
    // let this.current;
    // let this.next;

    // Select the element for the slider
    this.slides = slider.querySelector('.slides');
    const prevButton = slider.querySelector('.goToPrev');
    const nextButton = slider.querySelector('.goToNext');

    this.startSlider();
    this.applyClass();

    prevButton.addEventListener('click', () => this.move('back'));
    nextButton.addEventListener('click', () => this.move());
};

// Start slider
Slider.prototype.startSlider = function () {
    this.current = this.slider.querySelector('.current') || this.slides.firstElementChild;
    this.prev = this.current.previousElementSibling || this.slides.lastElementChild;
    this.next = this.current.nextElementSibling || this.slides.firstElementChild;
}

Slider.prototype.applyClass = function () {
    this.current.classList.add('current');
    this.prev.classList.add('prev');
    this.next.classList.add('nex');
}

Slider.prototype.move = function (direction) {
    const classesToRemove = ['prev', 'current', 'next'];

    // [prev, current, next].forEach(el => el.classList.remove(...classesToRemove))
    this.prev.classList.remove(...classesToRemove);
    this.current.classList.remove(...classesToRemove);
    this.next.classList.remove(...classesToRemove);

    if (direction === 'back') {
        [this.prev, this.current, this.next] = [
            this.prev.previousElementSibling || this.slides.lastElementChild,
            this.prev, this.current
        ];

    } else {
        [this.prev, this.current, this.next] = [
            this.current, this.next, 
            this.next.nextElementSibling || this.slides.firstElementChild
        ];

    }

    this.applyClass();
}   

const mySlider = new Slider(document.querySelector('.slider'));
const dogSlider = new Slider(document.querySelector('.dog-slider'));

console.log(mySlider);
console.log(dogSlider);

window.mySlider = mySlider;
window.dogSlider = dogSlider;

window.addEventListener('keyup', function (e) {
    if (e.key === 'ArrowRight') {
        mySlider.move();
        dogSlider.move();
    }
    if (e.key === 'ArrowLeft') {
        mySlider.move('back');
        dogSlider.move('back');
    }
})