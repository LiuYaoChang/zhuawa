


import { createApp } from './app'

export default (context) => {
  return new Promise((resolve, reject) => {
    const { app, store, router } = createApp(context)


    router.push(context.url)

    router.onReady(() => {
      const comps = router.getMatchedComponents()

      if (!comps.length) {
        return reject({ code: 404 })
      }

      Promise.all(comps.map((comp) => {
        if (comp.asyncData) {
          return comp.asyncData({ store, route: router.currentRoute })
        }
      })).then(() => {
        context.state = store.state
        resolve(app)
      })
    })
  })
}
