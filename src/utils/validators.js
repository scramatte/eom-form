import i18n from '../i18n'

import { isArray, isNil } from 'lodash'
import { compile } from 'expression-eval'

function getNumIBAN(letter) {
    let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    return letters.search(letter) + 10
}

function modulo97(iban) {
    let parts = Math.ceil(iban.length/7)
    let remainer = ''
    for (let i = 1; i <= parts; i++) {
        remainer = Number(parseFloat(remainer+iban.substr((i-1)*7, 7))%97)
    }
    return remainer
}

function isEmpty (value) {
  return (isNil(value) || value === '') 
}

export default {
  required: function (value) {
    if ((isArray(value) && value.length === 0) || isNil(value) || value === '') {
      return i18n.tc('field_is_required')
    }
  },
  minLength: function (value, options) {
    if (value && (value.length < options.min)) {
      return i18n.tc('too_short')
    }
  },
  alpha: function (value) {
    if (!isEmpty(value) && !/^[a-zA-Z]*$/.test(value)) {
      return i18n.tc('invalid_alpha', value)
    }
  },
  alphaDash: function (value) {
    if (!isEmpty(value) && !/^[a-zA-Z-_]*$/.test(value)) {
      return i18n.tc('invalid_alpha_dash', value)
    }
  },
  alphaNumeric: function (value) {
    if (!isEmpty(value) && !/^[a-zA-Z0-9]*$/.test(value)) {
      return i18n.tc('invalid_alpha_numeric', value)
    }
  },
  beforeDate: function (value) {
    if (!isEmpty(value)) {
      return i18n.tc('invalid_before_date', value)
    }
  },
  beforeOrIqualDate: function (value) {
    if (!isEmpty(value)) {
      return i18n.tc('invalid_before_or_iqual_date', value)
    }
  },
  creditCard(value) {
    if (isEmpty(value)) return

    const creditCard = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
    const sanitized = value.replace(/[^0-9]+/g, "");
    if (!creditCard.test(sanitized)) {
      return i18n.tc('invalid_credit_card')
    }

    let sum = 0;
    let digit;
    let tmpNum;
    let shouldDouble;
    for (let i = sanitized.length - 1; i >= 0; i--) {
      digit = sanitized.substring(i, i + 1);
      tmpNum = parseInt(digit, 10);
      if (shouldDouble) {
        tmpNum *= 2;
        if (tmpNum >= 10) {
          sum += tmpNum % 10 + 1;
        } else {
          sum += tmpNum;
        }
      } else {
        sum += tmpNum;
      }
      shouldDouble = !shouldDouble;
    }

    if (!(sum % 10 === 0 ? sanitized : false)) {
      return i18n.tc('invalid_credit_card')
    }
  },
  date: function (value) {
    if (!isEmpty(value)) {
      return i18n.tc('invalid_before_date', value)
    }
  },
  digits: function (value) {
    if (!isEmpty(value) && !/^[0-9]*$/.test(value)) {
      return i18n.tc('invalid_digit', value)
    }
  },
  digitsBetween: function (value, options) {
    if (!isEmpty(value) && !((value < options.max) && (value > options.min))) {
      return i18n.tc('invalid_between', value)
    }
  },
  endsWith: function (value, options) {
    let expr = new RegExp(options.needle+'$');
    if (!isEmpty(value) && !expr.test(value)) {
      return i18n.tc('invalid_ends_with', value)
    }
  },
  e164PhoneNumber: function (value) {
    if (!isEmpty(value) && !/^\+?[1-9][0-9]{1,14}$/.test(value)) {
      return i18n.tc('invalid_e164_phone_number', value)
    }
  },
  email: function (value, field) {
    let res = isEmpty(value, field.required)
    if (res != null) return res

    let re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    if (!re.test(value)) {
      return i18n.tc('invalid_email', value)
    }
  },
  sameAs: function (value, options) {
    if (options.expr) {
      const fn = compile(options.expr)
      if (fn(this) !== value) {
        return i18n.tc('not_the_same_as', value)
      }
    }
  },
  macAddress: function (value) {
    value = value.replace(/[-.:]/gi,'')

    console.warn('macaddress', value)

    if (!isEmpty(value) && !/^[0-9A-F]{12}$/i.test(value)) {
      return i18n.tc('not_a_mac_address', value)
    }
  },
  ipv6: function (value) {
    if (!isEmpty(value) && !/^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/i.test(value)) {
      return i18n.tc('not_an_ipv6_address', value)
    }
  },
  ip: function (value) {
    if (!isEmpty(value) && !/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value)) {
      return i18n.tc('not_an_ipv4_address', value)
    }
  },
  regex: function (value, options) {
    const pattern = options.pattern.replace(/(^\/|\/.*$)/g,'')
    const expr = new RegExp(pattern,'i')

    console.warn('regex', expr.test(value) ,value, pattern)

    if (!isEmpty(value) && !expr.test(value)) {
      return i18n.tc('does_not_match_pattern', value)
    }
  },
  iban: function (value) {
    if (!isEmpty(value)) {
      let iban = value.toUpperCase().trim().replace(/\s/g, '')

      let letter1,letter2,num1,num2, isbanaux
      if (iban.length != 24) {
        return 'iban_too_short';
      }

      letter1 = iban.substring(0, 1)
      letter2 = iban.substring(1, 2)
      num1 = getNumIBAN(letter1)
      num2 = getNumIBAN(letter2)
      isbanaux = String(num1) + String(num2) + iban.substring(2)
      isbanaux = isbanaux.substring(6) + isbanaux.substring(0,6)

      let mod = modulo97(isbanaux)
      if (mod !== 1){
        return i18n.tc('invalid_iban_bank_account', value)
      }
    }
  },
  phoneNumber: function (value) {
    if (!isEmpty(value)) {
      return i18n.tc('invalid', value)
    }
  },
  spanishPostcode: function(value) {
    if (!isEmpty(value) && !/^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/.test(value)) {
      return i18n.tc('invalid_spanish_postcode', value)
    }
  },
  spanishId: function (value) {
    if (isEmpty(value)) return

    let dni = value.toUpperCase()
    let letters = 'TRWAGMYFPDXBNJZSQVHLCKE'

    if (!/(^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$|^[0-9]{8}[A-Z]{1}$)/.test(dni)) {
      return i18n.tc('invalid_identity_number', value)
    }

    if (/^[0-9]{8}[A-Z]{1}$/.test(dni)) {
      if (dni[8] !== letters[ dni.substring(0, 8) % 23 ]) {
        return i18n.tc('invalid_identity_number', value)
      }
    }

    let i
    let sum = Number(dni[2]) + Number(dni[4]) + Number(dni[6])

    for (i = 1; i < 8; i += 2) {
      let str = String(2 * dni[i])
      str = Number(str[0]) + ((str.length === 2) ? Number(str[1]) : 0)
      sum += str
    }

    sum = String(sum)
    let n = (10 - sum[sum.length - 1])

    if (/^[KLM]{1}/.test(dni)) {
      if (dni[8] !== String.fromCharCode(64 + n)) {
        return i18n.tc('invalid_identity_number', value)
      }
    }

    if (/^[ABCDEFGHJNPQRSUVW]{1}/.test(dni)) {
      if (!isNaN(parseInt(dni[8]))) {
        if (Number(dni[8]) !== n) return i18n.tc('invalid_identity_number_cif', value)
      } else if (dni[8] !== String.fromCharCode(64 + n)) {
        return i18n.tc('invalid_identity_number_cif', value)
      }
    }

    if (/^[T]{1}/.test(dni)) {
      if (dni[8] !== /^[T]{1}[A-Z0-9]{8}$/.test(dni)) {
        return i18n.tc('invalid_identity_number_nif', value)
      }
    }
    if (/^[XYZ]{1}/.test(dni)) {
      let letter = letters[ dni.replace('X', '0').replace('Y', '1').replace('Z', '2').substring(0, 8) % 23 ]
      if (dni[8] !== letter) {
        return i18n.tc('invalid_identity_number_nie', value)
      }
    }
  },
  startsWith: function (value, options) {
    let expr = new RegExp('^'+options.needle);
    if (!isEmpty(value) && !expr.test(value)) {
      return i18n.tc('invalid_starts_with', value)
    }
  },
  uri: function (value) {
    if (!isEmpty(value) && !/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/.test(value)) {
      return i18n.tc('invalid_uri', value)
    }
  },
  fqdn: function (value) {
    if (!isEmpty(value) && !/(?=^.{4,253}$)(^((?!-)[a-zA-Z0-9-]{0,62}[a-zA-Z0-9]\.)+[a-zA-Z]{2,63}$)/.test(value)) {
      return i18n.tc('invalid_fqdn', value)
    }
  }
}
