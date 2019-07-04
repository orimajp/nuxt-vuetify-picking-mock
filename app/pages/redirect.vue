<template>
  <div></div>
</template>

<script>
export default {
  layout: 'blank',
  head() {
    return {
      title: '',
    }
  },
  fetch({base, app, query}) {
    const param = query.p
    if (param === undefined) {
      return app.router.replace('/')
    }
    const redirectPath = '/' + param.replace(base, '')
    return app.router.replace(redirectPath)
  }
}
</script>
