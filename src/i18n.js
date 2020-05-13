import Vue from 'vue'
import VueI18n from 'vue-i18n'

const dateTimeFormats = {
  'es-ES': {
    short: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false },
    longdate: { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' }
  }
}

const numberFormats = {
  'es-ES': {
    currency: {
      style: 'currency', currency: 'EUR'
    }
  }
}

Vue.use(VueI18n)

function loadLocaleMessages () {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

let currentLocale = 'en-GB'

try {
  currentLocale = navigator.language || 'en-GB'
} catch (e) {
  console.log(e)
}

export default new VueI18n({
  locale: currentLocale,
  fallbackLocale: 'en-GB',
  numberFormats,
  dateTimeFormats,
  messages: loadLocaleMessages()
})
