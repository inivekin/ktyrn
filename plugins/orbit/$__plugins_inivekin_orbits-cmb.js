const myObserver = new ResizeObserver(entries => {
    Orbit.resize('cosmic-microwave-background');
});
const cosmic_microwave_background = document.getElementsByTagName("cosmic-microwave-background");
for (let entry of cosmic_microwave_background) {
    myObserver.observe(entry);
}