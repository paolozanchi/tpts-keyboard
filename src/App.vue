<template>
  <section>
    <header>
      <a href="https://www.twitch.tv/twitchplaysthesynth" target="_blank" class="logoContainer">
        <img src="./assets/logo.png" class="logo" />
        keyboard
      </a>
    </header>

    <main>
      <h2>Select a note duration</h2>

      <NoteSelector
        @durationSelected="durationSelected"
      />

      <h2>and play a note on the keyboard</h2>

      <PianoKeyboard
        :octaves="octaves"
        :octaveShift="octaveShift"
        :showHints="showHints"
        @keyPressed="keyPressed"
      />
      <div class="hints">
        <input type="checkbox" id="showHints" v-model="showHints" class="hints__checkbox">
        <label for="showHints" class="hints__label">Show note hints</label>
      </div>

      <div class="buttons">
        <RippleButton
          title="Clear sequence"
          @click="clearSequence"
        />
      </div>

      <h2>Last note: <strong>{{ selectedNote + selectedOctave }}</strong></h2>
      <h1>
        Result: <span class="result">{{ formattedSequence }}</span>
      </h1>
    </main>

    <footer>
      <span v-if="appVersion">
        v{{ appVersion }} - 
      </span>

      Made with <span class="heart">❤️</span> by 
      <a href="https://github.com/paolozanchi" target="_blank" class="link">
        mmmmmeh1
      </a>
      /
      <a href="https://www.linkedin.com/in/paolo-zanchi/" target="_blank" class="link">
        Paolo Zanchi
      </a>
    </footer>
  </section>
</template>

<script>
import NoteSelector from '@/components/NoteSelector.vue'
import PianoKeyboard from '@/components/PianoKeyboard.vue'
import RippleButton from '@/components/RippleButton.vue'
import { version } from '../package.json'

export default {
  name: 'TptsKeyboard',
  metaInfo: {
    title: 'tpts! keyboard',
    charset: 'utf-8',
  },
  components: {
    NoteSelector,
    PianoKeyboard,
    RippleButton
  },
  data() {
    return {
      appVersion: version,
      octaves: 5,
      octaveShift: 1,
      previousNoteDistance: null,
      selectedDuration: '1',
      selectedNote: null,
      selectedOctave: null,
      sequence: [],
      showHints: true,
    }
  },
  computed: {
    formattedSequence() {
      return this.sequence.length > 0 ? '!m1 ' + this.sequence.join(' ') : ' ';
    }
  },
  methods: {
    durationSelected(duration) {
      this.selectedDuration = duration;
    },
    keyPressed(note, octave) {
      // Convert the note
      this.selectedNote = note;
      this.selectedOctave = octave;
      
      if(this.sequence.length == 0) {
        // FIRST NOTE
        // We need to find the first note's distance from C4 to start the sequence
        this.previousNoteDistance = this.getDistanceFromC4(note, octave);
        this.sequence.push(this.previousNoteDistance + "[" + this.selectedDuration + "]");
      } else {
        const currentNoteDistance = this.getDistanceFromC4(note, octave);
        const difference = currentNoteDistance - this.previousNoteDistance;

        this.previousNoteDistance += difference;

        this.sequence.push(difference + "[" + this.selectedDuration + "]");
      }
    },
    getDistanceFromC4(note, octave) {
      let distance = 0;

      const pureNote = note[0];
      const pitch = note[1];

      switch (pureNote) {
        case "D":
          distance += 2;
          break;

        case "E":
          distance += 4;
          break;

        case "F":
          distance += 5;
          break;

        case "G":
          distance += 7;
          break;

        case "A":
          distance += 9;
          break;

        case "B":
          distance += 11;
          break;
      }

      if (pitch) {
        switch (pitch) {
          case "b":
            distance -= 1;
            break;

          case "#":
            distance += 1;
            break;
        }
      }

      if (octave != 4) {
        let octaveDistance = -12 * (4 - octave);
        distance += octaveDistance;
      }

      return distance;
    },
    clearSequence() {
      this.sequence = [];
      this.previousNoteDistance = null;
      this.selectedNote = null;
      this.selectedOctave = null;
    }
  }
}
</script>

<style>
  @font-face {
    font-family: "Metropolis";
    src: url('./assets/metropolis.regular.otf');
  }

  :root {
    --dark: #111;
    --light: #eee;
    --accent: #f57f17;
    --secondary: #f9a825;
  }

  html {
    background: var(--dark);
    color: var(--light);
    font-family: 'Metropolis', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    text-align: center;
  }

  .logoContainer {
    color: var(--light);
    font-size: 24pt;
    text-decoration: none;
    outline: none;
  }

  .logo {
    width: 100px;
    vertical-align:middle;
  }

  .buttons {
    margin-top: 2em;
  }

  .result {
    color: var(--accent);
  }

  .link {
    color: var(--light);
    outline: none;
  }

  .hints__checkbox {
    appearance: none;
  }
  .hints {
    position: relative;
    display: inline-block;
  }
  .hints__label {
    cursor: pointer;
  }
  .hints__label::before {
    position: relative;
    content: '';
    width: 14px;
    height: 14px;
    top: 1px;
    left: -3px;
    background: var(--accent);
    display: inline-block;
    border-radius: 2px;
  }
  .hints__checkbox:checked ~ .hints__label::after {
  content: '';
  display: block;
  position: absolute;
  top: 1px;
  left: 8px;
  width: 3px;
  height: 9px;
  border: solid #EEEEEE;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
} 
.heart {
  color: transparent;
  text-shadow: 0 0 0 var(--accent);
}
</style>
