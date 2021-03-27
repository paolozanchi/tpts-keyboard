<template>
  <button @click="createRipple">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'RippleButton',
  methods: {
    createRipple(event) {
      const button = event.currentTarget;
      const circle = document.createElement("span");
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${event.clientX - (button.offsetLeft + radius)}px`;
      circle.style.top = `${event.clientY - (button.offsetTop + radius)}px`;
      circle.classList.add("ripple"); 

      const ripple = button.getElementsByClassName("ripple")[0];

      if (ripple) {
        ripple.remove();
      }

      button.appendChild(circle);

      this.$emit('click');
    }
  }
}
</script>

<style scoped>
  button {
    position: relative;
    overflow: hidden;
    transition: background 400ms;
    color: var(--dark);
    background-color:  var(--light);
    margin: 0.5rem;
    padding: 0.75rem 1rem;
    font-family: 'Metropolis', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 1rem;
    outline: 0;
    border: 0;
    border-radius: var(--border-radius);
    box-shadow: 0 0 0.5rem rgba(238, 238, 238, 0.3);
    cursor: pointer;
  }
</style>

<style>
  span.ripple {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 600ms linear;
    background-color: rgba(var(--accentRgb), 0.6);
  }
  
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
</style>