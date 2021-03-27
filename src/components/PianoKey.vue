<template>
  <div
    tabindex="-1"
    :data-note="dataNote"
    class="key"
    :class="{ 'sharp' : sharp }"
    @click="keyPressed"
  >
    <span
      v-if="showHints"
      class="hint"
    >
      {{ hint }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'PianoKey',
  props: {
    dataNote: {
      type: String,
      required: true
    },
    hint: {
      type: String,
      required: true
    },
    sharp: Boolean,
    showHints: Boolean
  },
  methods: {
    keyPressed(evt) {
      let element = evt.target;
      element.focus();
      this.$emit('keyPressed', this.dataNote);
    }
  }
}
</script>

<style scoped>
  .key {
    position: relative;
    border: 4px solid black;
    border-radius: .5rem;
    transition: all .07s ease;
    display: block;
    box-sizing: border-box;
    z-index: 2;
    cursor: pointer;
  }

  .key:not(.sharp) {
    background: var(--light);
    color: var(--dark);
    float: left;
    width: calc(100% / 7);
    height: 100%;
  }

  .key.sharp {
    background: var(--dark);
    color: var(--light);
    position: absolute;
    width: 11%;
    height: 60%;
    top: 0;
    z-index: 3;
  }

  .key:hover {
    border: 1px solid var(--secondary);
    color: var(--secondary);
  }

  .key:focus {
    border: 1px solid var(--accent);
    background: var(--accent);
    color: var(--dark);
  }

  .key[data-note="C#"] {
    left: 9%;
  }

  .key[data-note="D#"] {
    left: 23%;
  }

  .key[data-note="F#"]  {
    left: 51%;
  }

  .key[data-note="G#"] {
    left: 66%;
  }

  .key[data-note="A#"] {
    left: 80%;    
  }

  .hint {
    display: block;
    width: 100%;
    opacity: 1;
    position: absolute;
    bottom: 7px;
    font-size: 20px;

    -webkit-user-select: none; /* Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
  }
</style>
