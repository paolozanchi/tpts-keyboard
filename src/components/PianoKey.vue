<template>
  <div
    tabindex="-1"
    :data-note="dataNote"
    :data-octave="dataOctave"
    class="key"
    :class="{ 'sharp' : sharp, 'pressed' : pressed }"
    @click="onKeyPressed"
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
    dataOctave: {
      type: Number,
      required: true
    },
    dataNote: {
      type: String,
      required: true
    },
    hint: {
      type: String,
      required: true
    },
    keyPressed: {
      type: String,
      default: ''
    },
    sharp: Boolean,
    showHints: Boolean
  },
  computed: {
    pressed() {
      return this.keyPressed == this.dataNote + this.dataOctave;
    }
  },
  methods: {
    onKeyPressed() {
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

  .key.pressed {
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
    left: 52%;
  }

  .key[data-note="G#"] {
    left: 66%;
  }

  .key[data-note="A#"] {
    left: 81%;    
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
