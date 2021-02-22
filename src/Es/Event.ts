
const el: HTMLElement = document.querySelector('#build')
const ev: Event = document.createEvent('Event')

ev.initEvent('build', true, true)


el.addEventListener('build', () => {
  console.log('dispatch build event')
})
el.dispatchEvent(ev)
