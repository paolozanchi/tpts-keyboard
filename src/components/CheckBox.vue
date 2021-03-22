<template>
  <div class="checkbox-container">
    <input 
      type="checkbox"
      :id="id"
      :checked="isChecked"
      :value="value"
      @change="updateInput"
      class="checkbox"
    />

    <label
      :for="id"
      class="label"
    >
      {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  name: 'CheckBox',
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    id: String,
    label: String,
    value: { type: String },
    modelValue: { default: "" },
    trueValue: { default: true },
    falseValue: { default: false }
  },
  computed: {
    isChecked() {
      if (this.modelValue instanceof Array) {
        return this.modelValue.includes(this.value);
      }
      // Note that `true-value` and `false-value` are camelCase in the JS
      return this.modelValue === this.trueValue;
    }
  },
  methods: {
    updateInput(event) {
      let isChecked = event.target.checked;

      if (this.modelValue instanceof Array) {
        let newValue = [...this.modelValue];

        if (isChecked) {
          newValue.push(this.value);
        } else {
          newValue.splice(newValue.indexOf(this.value), 1);
        }
        
        this.$emit('change', newValue);
      } else {
        this.$emit('change', isChecked ? this.trueValue : this.falseValue);
      }
    }
  }
}
</script>

<style scoped>
  .checkbox-container {
    position: relative;
    display: inline-block;
  }

  .checkbox {
    appearance: none;
  }

  .label {
    cursor: pointer;
  }

  .label::before {
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

  .checkbox:checked ~ .label::after {
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
</style>
