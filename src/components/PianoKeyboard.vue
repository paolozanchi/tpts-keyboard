<template>
  <section>
    <PianoOctave 
      v-for="i in octaves"
      :key="i"
      :octave="i + octaveShift"
      :octaveWidthStyle="octaveWidthStyle"
      :showHints="showHints"
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
    octaves: Number,
    octaveShift: Number,
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
