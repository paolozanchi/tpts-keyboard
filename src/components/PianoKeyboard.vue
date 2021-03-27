<template>
  <section>
    <PianoOctave 
      v-for="i in octaves"
      :key="i"
      :octave="i + octaveShift"
      :octave-width-style="octaveWidthStyle"
      :show-hints="showHints"
      @keyPressed="keyPressed"
    />
  </section>
</template>

<script>
import PianoOctave from '@/components/PianoOctave.vue'

export default {
  name: 'PianoKeyboard',
  components: {
    PianoOctave
  },
  props: {
    octaves: {
      type: Number,
      default: 5
    },
    octaveShift: {
      type: Number,
      default: 1
    },
    showHints: Boolean
  },
  computed: {
    octaveWidthStyle () {
      return {
        width: (100 / this.octaves) + '%'
      };
    }
  },
  methods: {
    keyPressed(note, octave) {
      // Bubble up
      this.$emit('keyPressed', note, octave);
    }
  }
}
</script>
