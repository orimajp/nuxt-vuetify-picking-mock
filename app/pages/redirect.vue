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
  fetch({base, route, query}) {
    const param = query.p
    if (param === undefined) {
      return redirect('/')
    }
    const redirectPath = '/' + param.replace(base, '')
    return route.replace(redirectPath)
  }
}
</script>
