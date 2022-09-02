<template>
  <b-card
    title="Card Title"
    img-src="https://picsum.photos/600/300/?image=25"
    img-alt="Image"
    img-top
    tag="article"
    class="mb-2"
  >
    <slot></slot>
  </b-card>
</template>

<script>
export default {
  name: "CardComp"
};
</script>

<style>
</style>