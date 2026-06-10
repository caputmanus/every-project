import { describe, it, expect } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import ItemForm from './ItemForm.vue'

// Заглушка для дочернего компонента TmdbSearch —
// чтобы не делать реальные запросы к TMDB API в тестах
const globalStubs = {
  stubs: {
    TmdbSearch: { template: '<div />' },
    RouterLink: RouterLinkStub,
  },
}

describe('ItemForm', () => {

  // ─── Тест 1: рендеринг ────────────────────────────────────────────────────
  it('отображает поля ввода и кнопку отправки', () => {
    const wrapper = mount(ItemForm, {
      props: { submitLabel: 'Добавить в список' },
      global: globalStubs,
    })

    expect(wrapper.find('#f-title').exists()).toBe(true)
    expect(wrapper.find('#f-desc').exists()).toBe(true)
    expect(wrapper.find('#f-cat').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').text()).toContain('Добавить в список')
  })

  // ─── Тест 2: валидация при пустой форме ──────────────────────────────────
  it('показывает сообщения об ошибках при отправке пустой формы', async () => {
    const wrapper = mount(ItemForm, { global: globalStubs })

    // Сабмитим форму без заполнения полей
    await wrapper.find('form').trigger('submit')

    expect(wrapper.text()).toContain('Введите название')
    expect(wrapper.text()).toContain('Введите описание')
    expect(wrapper.text()).toContain('Выберите жанр')
  })

  // ─── Тест 3: успешная отправка ────────────────────────────────────────────
  it('генерирует событие submit с корректными данными при заполненной форме', async () => {
    const wrapper = mount(ItemForm, {
      props: { submitLabel: 'Сохранить' },
      global: globalStubs,
    })

    await wrapper.find('#f-title').setValue('Интерстеллар')
    await wrapper.find('#f-desc').setValue('Фильм о путешествии через космическую червоточину')
    await wrapper.find('#f-cat').setValue('Фантастика')
    await wrapper.find('form').trigger('submit')

    const emitted = wrapper.emitted('submit')
    expect(emitted).toBeTruthy()
    expect(emitted[0][0].title).toBe('Интерстеллар')
    expect(emitted[0][0].category).toBe('Фантастика')
  })

})
