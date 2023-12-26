<template>
  <svg class="loader-circular" viewBox="25 25 50 50">
      <circle class="elipse" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10" />
  </svg>
</template>

<style lang="scss" scoped>
.loader-circular {
  width: 85px;
  height: 85px;
  animation: rotate 2s linear infinite;
  transform-origin: center center;

  .elipse {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
      animation:
          dash 1s ease-in-out infinite,
          color 2s ease-in-out infinite;
      stroke-linecap: round;
  }
}

@keyframes rotate {
  100% {
      transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
  }

  50% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -35px;
  }

  100% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -124px;
  }
}

@keyframes color {

  100%,
  0% {
      stroke: white;
  }

  40% {
      stroke: white;
  }

  60% {
      stroke: white;
  }

  74%,
  90% {
      stroke: white;
  }
}
</style>