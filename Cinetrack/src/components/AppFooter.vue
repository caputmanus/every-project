<template>
  <footer class="footer">
    <div class="footer__inner">
      <span class="footer__brand">🎬 CineTrack — твой личный кинозал</span>
      <span class="footer__year">© {{ year }}</span>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: var(--surface);
  border-top: 1px solid var(--border);
  padding: 1rem 1.5rem;
  color: var(--text-muted);
  font-size: 0.82rem;
}
.footer__inner {
  max-width: 1140px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
</style>
