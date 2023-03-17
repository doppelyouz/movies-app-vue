<template>
  <button class="sliding-button">
    <slot></slot>
  </button>
</template>
<script>
  export default {
    name: 'my-button',
  }
</script>
<style scoped>
  button {
    background: #533030;
  }

  .sliding-button {
    padding: 15px 30px;
    text-decoration: none;
    color: white;
    display: inline-block;
    position: relative;
    border: 1px solid #1D1B26;
    border-image: linear-gradient(180deg, #ff3000, #ed0200, #ff096c, #d50082);
    border-image-slice: 1;
    text-transform: uppercase;
    overflow: hidden;
    letter-spacing: 2px;
    transition: .8s cubic-bezier(.165, .84, .44, 1);
  }

  .sliding-button:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 0;
    width: 100%;
    z-index: -1;
    color: white;
    background: linear-gradient(180deg, #ff3000, #ed0200, #ff096c, #d50082);
    transition: .8s cubic-bezier(.165, .84, .44, 1);
  }

  .sliding-button:hover {
    background: rgba(255, 255, 255, 0);
  }

  .sliding-button:hover:before {
    bottom: 0%;
    top: auto;
    height: 100%;
  }
</style>