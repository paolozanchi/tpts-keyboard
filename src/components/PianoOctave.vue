<template>
  <section
    class="keys"
    :style="[octaveWidthStyle]"
  >
    <PianoKey
      v-for="note in notes"
      :key="note.name + octave"
      :data-note="note.name"
      :sharp="note.isSharp"
      :hint="(note.name == 'C') ? note.name + octave : note.name"
      :showHints="showHints"
      @keyPressed="keyPressed"
    />
  </section>

</template>

<script>
import PianoKey from '@/components/PianoKey.vue'
import * as Tone from 'tone'

export default {
  name: 'PianoOctave',
  components: {
    PianoKey
  },
  props: {
    octave: Number,
    octaveWidthStyle: Object,
    showHints: Boolean
  },
  data() {
    return {
      notes: [
        {
          name: 'C',
        },
        {
          name: 'C#',
          isSharp: true
        },
        {
          name: 'D',
        },
        {
          name: 'D#',
          isSharp: true
        },
        {
          name: 'E',
        },
        {
          name: 'F',
        },
        {
          name: 'F#',
          isSharp: true
        },
        {
          name: 'G',
        },
        {
          name: 'G#',
          isSharp: true
        },
        {
          name: 'A',
        },
        {
          name: 'A#',
          isSharp: true
        },
        {
          name: 'B',
        },
      ],
      synth: null,
    }
  },
  created() {
    // Create a synth and connect it to the main output
    this.synth = new Tone.Synth().toDestination();
    this.synth.volume.value = -6;
  },
  methods: {
    keyPressed(note) {
      // Bubble up adding the octave info
      this.$emit('keyPressed', note, this.octave);

      // Play the note for the duration of an 8th note
      this.synth.triggerAttackRelease(note + this.octave, "8n");
    }
  }
}
</script>

<style scoped>
  .keys {
    display: inline-block;
    height: 300px;
    position: relative;
  }
</style>
