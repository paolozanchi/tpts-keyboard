<template>
  <section>
    <div
      v-if="showAlert"
      class="midi-alert"
    >
      <span v-if="isMIDIavailable">
        <v-icon
          name="bi-music-note-beamed"
          animation="wrench"
        />
        Listening to MIDI device

        <br>

        <span v-if="!firstNotePressed">
          Play the first note on the screen-keyboard
        </span>
      </span>

      <span v-else>
        <v-icon
          name="bi-music-note-beamed"
          animation="pulse"
        />
        MIDI input not available in this browser!
      </span>
    </div>
    
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
        :key-pressed="keyPressed"
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
    showAlert: {
      type: Boolean,
      default: true
    },
    showHints: Boolean
  },
  data() {
    return {
      firstNotePressed: false,
      isMIDIavailable: false,
      keyPressed: null,
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
    this.isMIDIavailable = navigator.requestMIDIAccess;
    
    if (this.isMIDIavailable) {
      // Handle the MIDI events
      this.useMIDIdevice();
    }
  },
  methods: {
    onKeyPressed(note, octave, fromMIDI) {
      // The first note must be pressed using the GUI due to some Web MIDI limitations.
      // Break if we received a MIDI command but the first note hasn't been played using the GUI
      if(fromMIDI && !this.firstNotePressed) 
        return;

      this.firstNotePressed = true;
      this.keyPressed = note + octave;

      // Play the note for the duration of an 8th note
      this.synth.triggerAttackRelease(this.keyPressed, "8n", Tone.now());

      // Bubble up
      this.$emit('keyPressed', note, octave);
    },
    useMIDIdevice() {
      const page = this;
      WebMidi.enable(function (err) {
        if (err) {
          alert("Midi could not be enabled.", err);
        } else {
          // Attach MIDI event listeners to each input
          WebMidi.inputs.forEach(input => {
            input.addListener('noteon', "all", (e) => {
              // Trigger the press of the key
              page.onKeyPressed(e.note.name, e.note.octave, true)
            });
          });
        }
      });
    },
  }
}
</script>

<style scoped>
  .midi-alert {
    position: absolute;
    top: 25px;
    right: 50px;
    display: inline;
    border: 1px solid var(--light);
    border-radius: var(--border-radius);
    padding: 1rem;
  }

  .octave {
    display: inline-block;
    position: relative;
  }
</style>