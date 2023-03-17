<template>
  <div class="form-row">
    <input id="input" required autocomplete="off" :value="modelValue" @input="updateInput"><label for="input"><slot></slot></label>
  </div>
</template>
<script>
  export default {
    name: 'my-input',
    props: {
      modelValue: [String, Number]
    },
    methods: {
      updateInput(event) {
        this.$emit('update:modelValue', event.target.value)
      }
    }
  }
</script>
<style scoped>
  * {
    box-sizing: border-box;
  }

  .form-row {
    position: relative;
    margin-bottom: 40px;
  }

  .form-row input {
    display: block;
    width: 100%;
    padding: 0 10px;
    line-height: 40px;
    font-family: 'Roboto', sans-serif;
    background: none;
    border-width: 0;
    border-bottom: 2px solid white;
    transition: all 0.4s ease;
                color:whitesmoke;
  }

  .form-row label {
    position: absolute;
    left: 13px;
    color: white;
    font-size: 20px;
    font-weight: 300;
    transform: translateY(-35px);
    transition: all 0.2s ease;
  }

  .form-row input:focus {
    outline: 0;
    border-color: white;
    color: white;
  }

  .form-row input:focus+label,
  .form-row input:valid+label {
    transform: translateY(-60px);
    margin-left: -14px;
    font-size: 14px;
    font-weight: 400;
    outline: 0;
    border-color: #F77A52;
    color: white;
  }

  .ui-form input[type="submit"] {
    width: 100%;
    padding: 0;
    line-height: 42px;
    background: #4a90e2;
    border-width: 0;
    color: white;
    font-size: 20px;
  }

  .ui-form p {
    margin: 0;
    padding-top: 10px;
  }
</style>