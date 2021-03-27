<template>
  <section>
    <h1>MIDI debug: {{ mididebug }}</h1>
    <br>
    <div
      v-for="octave in octaves"
      :key="octave + octaveShift"
      class="octave"
      :style="[octaveWidthStyle, octaveHeightStyle]"
    >
      <PianoKey
        v-for="note in notes"
        :key="note.name + (octave + octaveShift)"
        :data-note="note.name"
        :data-octave="octave + octaveShift"
        :sharp="note.isSharp"
        :hint="(note.name == 'C') ? note.name + (octave + octaveShift) : note.name"
        :show-hints="showHints"
        @keyPressed="onKeyPressed(note.name, octave + octaveShift)"
      />
    </div>
  </section>
</template>

<script>
import PianoKey from '@/components/PianoKey.vue'
import * as Tone from 'tone'
import WebMidi from 'webmidi'

export default {
  name: 'PianoKeyboard',
  components: {
    PianoKey
  },
  props: {
    height: {
      type: Number,
      default: 250
    },
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
  data() {
    return {
      isMIDIactive: false,
      mididebug: null,
      notes: [
        { name: 'C' },
        { name: 'C#', isSharp: true },
        { name: 'D' },
        { name: 'D#', isSharp: true },
        { name: 'E' },
        { name: 'F' },
        { name: 'F#', isSharp: true },
        { name: 'G' },
        { name: 'G#', isSharp: true },
        { name: 'A' },
        { name: 'A#', isSharp: true },
        {  name: 'B' }
      ],
      synth: null,
    }
  },
  computed: {
    octaveWidthStyle() {
      return {
        width: (100 / this.octaves) + '%'
      };
    },
    octaveHeightStyle() {
      return {
        height: this.height + 'px'
      };
    }
  },
  mounted() {
    // Create a synth and connect it to the main output
    this.synth = new Tone.Synth().toDestination();

    // Check MIDI availability
    if(navigator.requestMIDIAccess) {
      // Handle the MIDI events
      this.useMIDIdevice();
    }
  },
  methods: {
    onKeyPressed(note, octave) {
      // Play the note for the duration of an 8th note
      this.synth.triggerAttackRelease(note + octave, "8n", Tone.now());

      // Bubble up
      this.$emit('keyPressed', note, octave);
    },
    useMIDIdevice() {
      const page = this;
      WebMidi.enable(function (err) {
        if (err) {
          alert("Midi could not be enabled.", err);
        } else {
          page.$emit('MIDIstatusChanged', true);
          
          // Attach MIDI event listeners to each input
          WebMidi.inputs.forEach(input => {
            input.addListener('noteon', "all", (e) => {
              page.mididebug = e.note.name + e.note.octave;

              // Trigger the press of the key
              page.onKeyPressed(e.note.name, e.note.octave)
            });
          });
        }
      });
    },
  }
}
</script>

<style scoped>
  .octave {
    display: inline-block;
    position: relative;
  }
</style>