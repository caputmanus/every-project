import { describe, it, expect } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import ItemCard from './ItemCard.vue'

// Тестовая запись фильма
const testItem = {
  id: 'abc-123',
  title: 'Тёмный рыцарь',
  description: 'Бэтмен против Джокера в Готэм-сити',
  category: 'Боевик',
  createdAt: Date.now(),
  isDone: false,
  deletedAt: null,
  posterPath: null,
  rating: 9.0,
  year: '2008',
}

// Вспомогательная функция монтирования
const mountCard = (item = testItem) =>
  mount(ItemCard, {
    props: { item },
    global: { stubs: { RouterLink: RouterLinkStub } },
  })

describe('ItemCard', () => {

  // ─── Тест 4: рендеринг ────────────────────────────────────────────────────
  it('отображает название и жанр фильма', () => {
    const wrapper = mountCard()

    expect(wrapper.text()).toContain('Тёмный рыцарь')
    expect(wrapper.text()).toContain('Боевик')
  })

  // ─── Тест 5: действие пользователя — toggle ───────────────────────────────
  it('отправляет событие toggle при нажатии кнопки «просмотрено»', async () => {
    const wrapper = mountCard()

    // Первая кнопка в .card__actions — кнопка отметки просмотра
    const buttons = wrapper.findAll('button')
    await buttons[0].trigger('click')

    expect(wrapper.emitted('toggle')).toBeTruthy()
    expect(wrapper.emitted('toggle')[0][0]).toBe('abc-123')
  })

  // ─── Тест 6: действие пользователя — delete ───────────────────────────────
  it('отправляет событие delete при нажатии кнопки удаления', async () => {
    const wrapper = mountCard()

    await wrapper.find('.action-btn--danger').trigger('click')

    expect(wrapper.emitted('delete')).toBeTruthy()
    expect(wrapper.emitted('delete')[0][0]).toBe('abc-123')
  })

})
