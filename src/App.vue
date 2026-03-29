<template>
  <Board />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Board from './components/Board.vue'
import { Player } from './modules/Player';

onMounted(async () => {
  const player = new Player('Christophe', 0, 'lia');
  await player.fetchDeck();
  
  player.startingHand();
  player.playCard('paroles-tranchantes')
})
</script>
