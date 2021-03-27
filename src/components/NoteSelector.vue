<template>
  <div class="noteSelectorContainer">
    <div
      v-for="duration in durations"
      :key="duration.name"
      class="noteSelector"
    >
      <input
        :id="duration.name"
        v-model="selectedDuration"
        type="radio"
        name="notes"
        :value="duration.value"
      >
      <label :for="duration.name">
        {{ duration.label }}
      </label>
    </div>

    <p class="hint">
      Use
      <kbd>
        <v-icon name="bi-arrow-left-square-fill" /> 
      </kbd> and
      <kbd>
        <v-icon name="bi-arrow-right-square-fill" /> 
      </kbd> to quickly change the note duration
    </p>
  </div>
</template>

<script>
export default {
  name: 'NoteSelector',
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
  data() {
    return {
      durations: [
        {
          name: 'dottedWhole',
          value: '6',
          label: 'w .'
        },
        {
          name: 'whole',
          value: '4',
          label: 'w'
        },
        {
          name: 'dottedHalf',
          value: '3',
          label: 'h .'
        },
        {
          name: 'half',
          value: '2',
          label: 'h'
        },
        {
          name: 'dottedQuarter',
          value: '1.5',
          label: 'q .'
        },
        {
          name: 'quarter',
          value: '1',
          label: 'q'
        },
        {
          name: 'dottedEighth',
          value: '0.75',
          label: 'e.'
        },
        {
          name: 'eighth',
          value: '0.5',
          label: 'e'
        },
        {
          name: 'dottedSixteenth',
          value: '0.375',
          label: 'x.'
        },
        {
          name: 'sixteenth',
          value: '0.25',
          label: 'x'
        },
        {
          name: 'dottedThirtysecond',
          value: '0.1875',
          label: 'r .'
        }, 
        {
          name: 'thirtysecond',
          value: '0.125',
          label: 'r'
        }
      ],
      selectedDuration: '1'
    }
  },
  watch: {
    selectedDuration() {
      this.$emit('durationSelected', this.selectedDuration);
    }
  },
  created() {
    document.addEventListener('keydown', this.handleHotkeys);
  },
  destroyed() {
    document.removeEventListener('keydown', this.handleHotkeys);
  },
  methods: {
    handleHotkeys(e) {
      if (e.key === 'ArrowLeft') {
        this.changeSelectedDuration(-1);
      } else if (e.key === 'ArrowRight') {
        this.changeSelectedDuration(+1);
      }
    },
    changeSelectedDuration(value) {
      const currentIndex = this.durations.map(e => e.value).indexOf(this.selectedDuration);
      let newIndex = currentIndex + value;

      // Clamp newIndex between 0 and this.durations.length - 1
      newIndex = Math.min(Math.max(newIndex, 0), this.durations.length - 1);
      this.selectedDuration = this.durations[newIndex].value;
    }
  }
}
</script>

<style scoped>
  @font-face {
    font-family: 'MusicalNotes';
    src: url('../assets/Musical Notes.ttf');
  }

  .noteSelectorContainer {
    color: var(--light);
  }

  .noteSelector {
    display: inline-block;
    font-family: 'MusicalNotes', sans-serif;
    font-size: 3rem;
    margin: 0 1rem;
    max-height: 1.5em;
  }

  .hint {
    opacity: 0.8;
  }

  label {
    cursor: pointer;
  }

  label:hover {
    color: var(--secondary);
  }

  input {
    display: none; 
  }

  input:checked + label {
    color: var(--accent);
  }
</style>
