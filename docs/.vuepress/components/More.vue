<template>
   <b-container class="p-2">
      <b-alert :variant="status.variant" dismissible v-model="status.invalid" v-if="status.message">
        {{status.message}} 
      </b-alert>

      <form class="mb-3" @submit.prevent="handleSubmit" novalidate>
        <EomForm
          :schema="schema"
          v-model="model"
          ref="eomForm"
        />
        <b-btn variant="success" type="submit">submit</b-btn>
      </form>
    </b-container>
</template>

<script>
const SCHEMA = {
  spanishId: {
    component: "EomInput",
    label: "spanishId",
    icon: "ion ion-ios-finger-print",
    help: "",
    validations: {
      required: {
      },
      spanishId: {
      }
    }
  },
  bankAccount: {
    component: "EomInput",
    label: "bankAccount",
    icon: "ion ion-logo-euro",
    help: "",
    validations: {
      required: {
      },
      iban: {
      }
    }
  },
  ipAddress: {
    component: "EomInput",
    label: "ipAddress",
    help: "",
    validations: {
      required: {
      },
      ip: {
      }
    }
  },
  ipv6Address: {
    component: "EomInput",
    label: "ipv6Address",
    help: "",
    validations: {
      required: {
      },
      ipv6: {
      }
    }
  },
  macAddress: {
    component: "EomInput",
    label: "macAddress",
    help: "",
    validations: {
      required: {
      },
      macAddress: {
      }
    }
  },
  e164PhoneNumber: {
    component: "EomInput",
    label: "e164PhoneNumber",
    help: "",
    validations: {
      required: {
      },
      e164PhoneNumber: {
      }
    }
  },
  alpha: {
    component: "EomInput",
    label: "alpha",
    validations: {
      required: {
      },
      alpha: {
      }
    }
  },
  alphaDash: {
    component: "EomInput",
    label: "alphaDash",
    validations: {
      required: {
      },
      alphaDash: {
      }
    }
  },
  alphaNumeric: {
    component: "EomInput",
    label: "alphaNumeric",
    validations: {
      required: {
      },
      alphaNumeric: {
      }
    }
  },
  digits: {
    component: "EomInput",
    label: "digits",
    validations: {
      required: {
      },
      digits: {
      }
    }
  },
  digitsBetween: {
    component: "EomInput",
    label: "digitsBetween",
    help: "enter number between 5 and 50",
    validations: {
      required: {
      },
      digitsBetween: {
        min: 5,
        max: 50
      }
    }
  },
  amount: {
    component: "EomCurrency",
    label: "amount",
    validations: {
      required: {
      }
    }
  },
  numeric: {
    component: "EomNumeric",
    label: "numeric",
    validations: {
      required: {
      }
    }
  },
  date: {
    component: "EomDatepicker",
    label: "date",
    icon: "ion ion-ios-calendar",
    validations: {
      required: {
      } 
    }
  },
  startsWith: {
    component: "EomInput",
    label: "startsWith",
    help: "must starts with https://",
    validations: {
      required: {
      },
      startsWith: {
        needle: "https://"
      }
    }
  },
  endsWith: {
    component: "EomInput",
    label: "endsWith",
    help: "must ends with EUROS",
    validations: {
      required: {
       },
       startsWith: {
         needle: "EUROS"
       }
    }
  }
}

export default {
  data () {
    return {
      status: {
        message: '',
        variant: 'success',
        invalid: false
      },
      schema: SCHEMA,
      model: {
        spanishId: '39921948C',
        bankAccount: 'ES0504873597264184221852',
        ipAddress: '192.168.20.7',
        ipv6Address: '2001:1:2:3:4:5:6:7',
        macAddress: '0000.0000.0000',
        e164PhoneNumber: '+34968000730',
        alpha: 'abcd',
        alphaDash: 'a-b_c',
        alphaNumeric: 'abc123',
        digits: '1234',
        digitsBetween: 25,
        amount: '5.50',
        numeric: '18.36',
        date: '2020-05-07',
        startsWith: 'https://',
        endsWith: 'EUROS'
      },
    }
  },
  methods: {
    handleSubmit () {
      this.status.message = ''
      let valid = this.$refs.eomForm.validate()

      if (!valid) {
        console.warn('invalid form')
        this.status = {
          message:  'invalid_datas',
          variant:  'danger',
          invalid: true
        }
        return
      }
    }
  }
}
</script>
