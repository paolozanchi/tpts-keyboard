<template>
  <section>
    <header>
      <a
        href="#"
        class="logoContainer"
        @click.prevent="trackLinkClick('https://twitch.tv/twitchplaysthesynth')"
      >
        <img
          src="./assets/logo.png"
          class="logo"
        >
        keyboard
      </a>
    </header>

    <main>
      <NoteSelector
        style="margin-bottom: 2rem"
        @durationSelected="durationSelected"
      />

      <PianoKeyboard
        :octaves="octaves"
        :octave-shift="octaveShift"
        :show-hints="showHints"
        @keyPressed="onKeyPressed"
      />

      <CheckBox
        id="hintsToggle"
        v-model="showHints"
        label="Show note hints"
      />

      <div class="buttons">
        <RippleButton
          @click="undoLastNote"
        >
          <v-icon name="io-arrow-undo-sharp" /> Undo last note
        </RippleButton>

        <RippleButton
          @click="clearSequence"
        >
          <v-icon name="ri-delete-bin-6-line" /> Clear sequence
        </RippleButton>
      </div>

      <h3>
        Result:
        <br><br>
        <span class="result">{{ formattedSequence }}</span>
      </h3>
    </main>

    <footer>
      <span v-if="appVersion">
        v{{ appVersion }} - 
      </span>

      Made with <span class="heart">❤️</span> by 
      <a 
        href="#"
        class="link"
        @click.prevent="trackLinkClick('https://github.com/paolozanchi')"
      >
        mmmmmeh1
      </a>
      |
      <a
        href="#"
        class="link"
        @click.prevent="trackLinkClick('https://linkedin.com/in/paolo-zanchi')"
      >
        Paolo Zanchi
      </a>
    </footer>
  </section>
</template>

<script>
import NoteSelector from '@/components/NoteSelector.vue'
import PianoKeyboard from '@/components/PianoKeyboard.vue'
import RippleButton from '@/components/RippleButton.vue'
import CheckBox from '@/components/CheckBox.vue'
import { version } from '../package.json'

export default {
  name: 'TptsKeyboard',
  metaInfo: {
    title: '!tpts keyboard',
    charset: 'utf-8',
  },
  components: {
    NoteSelector,
    PianoKeyboard,
    RippleButton,
    CheckBox,
  },
  data() {
    return {
      appVersion: version,
      lastNoteDistanceFromC4: null,
      octaves: 5,
      octaveShift: 1,
      selectedDuration: '1',
      sequence: [],
      showHints: true
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
    onKeyPressed(note, octave) {
      // Create the note-duration tuple and push it to the sequence

      if(this.sequence.length == 0) {
        // FIRST NOTE
        // We need to find the first note's distance from C4 to start the sequence
        this.lastNoteDistanceFromC4 = this.getDistanceFromC4(note, octave);
        this.sequence.push(this.lastNoteDistanceFromC4 + "[" + this.selectedDuration + "]");
      } else {
        const currentNoteDistance = this.getDistanceFromC4(note, octave);
        const difference = currentNoteDistance - this.lastNoteDistanceFromC4;

        this.lastNoteDistanceFromC4 += difference;

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
    undoLastNote() {
      this.sequence.pop();

      let newDistance = 0;
      this.sequence.forEach(tuple => {
        // Each tuple is formed like this: 2[4] => we take the 2
        newDistance += parseInt(tuple.split('[')[0]);
      });
      
      this.lastNoteDistanceFromC4 = newDistance;
    },
    clearSequence() {
      this.sequence = [];
      this.lastNoteDistanceFromC4 = null;
    },
    trackLinkClick(url) {
      // Track link click in the analytics
      this.$gtag.event('link_click', {
        event_category: 'link_click',
        event_label: 'link_click',
        value: url
      })

      // Open a new tab
      window.open(url, '_blank').focus();
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
    --accentRgb: 245, 127, 23;
    --secondary: #f9a825;

    --border-radius: .25rem;
  }

  html {
    background: var(--dark);
    color: var(--light);
    font-family: 'Metropolis', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    text-align: center;
  }

  h2 {
    margin-top: 1rem;
    margin-bottom: .5rem;
  }

  .logoContainer {
    color: var(--light);
    font-size: 24pt;
    text-decoration: none;
    outline: none;
  }

  .logo {
    width: 100px;
    vertical-align: middle;
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

  .heart {
    color: transparent;
    text-shadow: 0 0 0 var(--accent);
  }

  footer {
    position: fixed;
    bottom: 1rem;
    width: 100%;
  }
</style>
