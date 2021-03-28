<template>
  <section class="container">
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

      <br>
      
      <CheckBox
        id="hintsToggle"
        v-model="showHints"
        label="Show hints"
      />
    </header>

    <main>
      <NoteSelector
        style="margin-bottom: 2rem"
        :show-hint="showHints"
        @durationSelected="durationSelected"
      />

      <PianoKeyboard
        :octaves="octaves"
        :octave-shift="octaveShift"
        :show-alert="showHints"
        :show-hints="showHints"
        @keyPressed="onKeyPressed"
      />
      
      <h3>
        Sequence:
      </h3>
      <h3 class="result">
        {{ formattedSequence }}
      </h3>

      <div class="buttons">
        <RippleButton
          v-if="isMobile"
          :disabled="sequence.length == 0"
          variant="primary"
          @click="copySequence"
        >
          <v-icon name="px-copy" /> Copy sequence
        </RippleButton>

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

    <GdprConsentModal
      v-if="GDPRModalVisible"
      @grant-consent="GDPRconsentGranted"
      @deny-consent="GDPRconsentDenied"
    />
  </section>
</template>

<script>
import NoteSelector from '@/components/NoteSelector.vue'
import PianoKeyboard from '@/components/PianoKeyboard.vue'
import RippleButton from '@/components/RippleButton.vue'
import CheckBox from '@/components/CheckBox.vue'
import GdprConsentModal from '@/components/GdprConsentModal.vue'
import mobileMixin from '@/mixins/mobile.js'
import { version } from '../package.json'
import { bootstrap } from 'vue-gtag'

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
    GdprConsentModal,
  },
  mixins: [
    mobileMixin
  ],
  data() {
    return {
      appVersion: version,
      GDPRModalVisible: false,
      GDPRconsentLocalStorageItem: 'tpts-keyboard-gdpr',
      lastNoteDistanceFromC4: null,
      octaves: 5,
      octaveShift: 1,
      selectedDuration: '1',
      sequence: [],
      showHints: true,
    }
  },
  computed: {
    formattedSequence() {
      return this.sequence.length > 0 ? '!m1 ' + this.sequence.join(' ') : '<empty>';
    }
  },
  mounted() {
    this.checkGDPRconsent();
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
    },
    copySequence() {
      navigator.clipboard.writeText(this.formattedSequence);
    },
    checkGDPRconsent() {
      const gdprConsent = localStorage.getItem(this.GDPRconsentLocalStorageItem);

      if (gdprConsent === null) {
        this.GDPRModalVisible = true;
      } else {
        this.GDPRModalVisible = false;
        
        if (gdprConsent == 'true') {
          // Activate gtag
          bootstrap().then(() => {
            // all done!
            console.debug("ALL DONE");
          })
        }
      }
    },
    GDPRconsentGranted() {
      localStorage.setItem(this.GDPRconsentLocalStorageItem, true);
      this.checkGDPRconsent();
    },
    GDPRconsentDenied() {
      localStorage.setItem(this.GDPRconsentLocalStorageItem, false);
      this.checkGDPRconsent();
    },
  }
}
</script>

<style>
  @font-face {
    font-family: "Metropolis";
    src: url('./assets/metropolis.regular.otf');
  }

  :root {
    --dark: #121212;
    --lightenDark: #333;
    --light: #eee;
    --accent: #f57f17;
    --accentRgb: 245, 127, 23;
    --secondary: #ffb04c;

    --success: #218838;
    --danger: #c82333;

    --border-radius: .25rem;
  }

  html {
    background: var(--dark);
    color: var(--light);
    font-family: 'Metropolis', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    text-align: center;
  }

  html, body {
    height: 100%;
    margin: 0;
  }

  body {
    display: flex;
    flex-direction: column;
  }

  .container {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1 0 auto;
  }

  footer {
    flex-shrink: 0;
    padding: .5rem;
  }

  .logoContainer {
    color: var(--light);
    font-size: 24pt;
    text-decoration: none;
  }

  .logo {
    width: 100px;
    vertical-align: middle;
  }

  .result {
    color: var(--accent);
  }

  .link {
    color: var(--accent);
  }

  .heart {
    color: transparent;
    text-shadow: 0 0 0 var(--accent);
  }
</style>
