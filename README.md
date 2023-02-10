<div style="text-align: center;" align="center">

# use-speak

A composition api for SpeechSynthesis, supports vue2.0 and vue3.0

[![NPM version][npm-image]][npm-url]
[![Codacy Badge][codacy-image]][codacy-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]
[![License][license-image]][license-url]

[![Sonar][sonar-image]][sonar-url]

</div>

<div style="text-align: center; margin-bottom: 20px;" align="center">

## **For API documentation, see: [API Docs](./docs/modules.md)**

</div>

## Installing

```bash
# use pnpm
$ pnpm install use-speak

# use npm
$ npm install use-speak --save

# use yarn
$ yarn add use-speak
```

## Usage

### Use in Vue `>=3.0`

```vue
<script setup>
import { getCurrentInstance, onMounted } from 'vue'
import useSpeak from 'use-speak'

const speech = useSpeak({ lang: 'zh_CN' })

onMounted(() => {
  speech.speak('new bee')
})

useExpose({ speech })
</script>
```

### Use in Vue `2.7`

```vue
<script>
import useSpeak from 'use-speak'

export default {
  setup() {
    const speech = useSpeak({ lang: 'zh_CN' })
    speech.speak('new bee')

    return { speech }
  }
}
</script>
```

### Use in Vue `<=2.6`

> Add `@vue/composition-api` to the `project.json` dependencies and run install.

```json
{
  "dependencies": {
    "@vue/composition-api": "latest"
  }
}
```

```js
// main.js
import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'

Vue.use(VueCompositionApi)

new Vue({}).$mount('#app')
```

```vue
<script>
import useSpeak from 'use-speak'

export default {
  setup() {
    const speech = useSpeak({ lang: 'zh_CN' })
    speech.speak('new bee')

    return { speech }
  }
}
</script>
```

## Support & Issues

Please open an issue [here](https://github.com/saqqdy/use-speak/issues).

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/use-speak.svg?style=flat-square
[npm-url]: https://npmjs.org/package/use-speak
[codacy-image]: https://app.codacy.com/project/badge/Grade/f70d4880e4ad4f40aa970eb9ee9d0696
[codacy-url]: https://www.codacy.com/gh/saqqdy/use-speak/dashboard?utm_source=github.com&utm_medium=referral&utm_content=saqqdy/use-speak&utm_campaign=Badge_Grade
[codecov-image]: https://img.shields.io/codecov/c/github/saqqdy/use-speak.svg?style=flat-square
[codecov-url]: https://codecov.io/github/saqqdy/use-speak?branch=master
[download-image]: https://img.shields.io/npm/dm/use-speak.svg?style=flat-square
[download-url]: https://npmjs.org/package/use-speak
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: LICENSE
[sonar-image]: https://sonarcloud.io/api/project_badges/quality_gate?project=saqqdy_use-speak
[sonar-url]: https://sonarcloud.io/dashboard?id=saqqdy_use-speak
