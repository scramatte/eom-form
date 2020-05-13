<template>
  <b-col sm="12" md="6">
    <b-form-group :invalid-feedback="error" :state="state">
    <template v-slot:label>
    <i v-if="help" class="fas fa-info-circle align-middle" @click="toggleHelp = !toggleHelp" /> {{label}} <span class="text-danger">*</span>
    </template>
    <div class="dropbox">
      <input 
        type="file"
        multiple
        :name="uploadFieldName"
	:disabled="isUploading"
        @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
        :accept="acceptedMimeTypes"
        class="input-file" />
      <div class="message">
        <h3><i class="ion ion-ios-cloud-upload"></i> drop_files_here</h3>
        <small>or_click_to_select_files</small>
	<b-progress variant="success" :value="progress" height="0.5rem" v-if="progress > 0">
        </b-progress>
      </div>

      <b-row class="text-left">
        <b-col cols="6" md="4" lg="3" v-for="(item,index) in files" :key="item.id" :class="['p-1', (index%2==0?'text-right':'text-left') ]" @mouseover="item.hover = true" @mouseleave="item.hover = false">
          <b-spinner label="Spinning" type="grow" small class="loader" v-show="!item.loaded"/>
          <img :src="item.url" class="img-fluid img-thumbnail h-100 w-100" :alt="item.filename" @load="item.loaded=true">
          <div v-show="item.hover" class="item-btn"><b-btn @click="handleDelete(item)" variant="success"><i class="ion ion-ios-trash" />delete</b-btn></div>
        </b-col>
      </b-row>
    </div>
    <b-form-text v-show="toggleHelp" v-html="help"></b-form-text>
  </b-form-group>
  </b-col>
</template>

<style lang="scss">
  .dropbox {
    border: 1px dashed grey; /* the dash box */
    color: dimgray;
    padding: 0;
    min-height: 50px; /* minimum height */
    position: relative;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .loader {
    position: absolute;
    left: 58px;
    top: 58px;
  }

  .item-btn {
    position: absolute;
    bottom: 0px;
    left: 0px;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 100%;
    position: absolute;
    cursor: pointer;
  }
  
  .dropbox:hover {
    background: #f2f2f2;
  }
  
  .dropbox .row {
    padding: 5px;
  }

  .dropbox .message {
    padding: 20px 20px 0px 20px;
  }
  
  .dropbox img {
    min-height: 128px;
  }

  .dropbox a, .dropbox a:active, .dropbox a:hover {
    font-size: 0.90rem;
    text-decoration: none;
  }
  
  .dropbox div {
    text-align: center;
    width: 100%;
    margin: 0;
  }

</style>
<script>
import EomAbstract from './EomAbstract'
import axios from 'axios'

const BASE_URL = 'https://eom.nixus.es:8443/api/v1/contacts/40/files'

export default {
  inheritAttrs: false,
  name: 'EomInput',
  mixins: [ EomAbstract ],
  components: {
  },
  methods: {
    handleDelete(item) {
      axios.delete(`${this.url}/${item.id}`, {}, {
      }).then((response) => {
        console.log(response.data)
	this.files.splice(this.files.indexOf(item),1)
	this.$emit('input', this.files.map(i => i.id))
      }).catch((error) => {
	console.log(error.response)
      })
    },
    filesChange(fieldName, fileList) {
      const formData = new FormData();

      if (!fileList.length) return;
      Array
        .from(Array(fileList.length).keys())
        .map(x => {
          formData.append(fieldName, fileList[x], fileList[x].name);
        })

      this.currentStatus = 1
      this.save(formData)
    },
    save(formData) {
      axios.post(this.url, formData, {
        onUploadProgress: (p) => {
          this.progress = Math.round((p.loaded * 100) / p.total)
        }
      }).then((response) => {
	this.progress = 0
        let files = response.data.data.map(file => Object.assign({}, file, {hover: false, loaded: false, url: `${BASE_URL}/${file.id}/thumbnail` }))
        this.files.push(...files)
	this.$emit('input', this.files.map(i => i.id))
        this.currentStatus = 2
      }).catch((error) => {
        console.log(error.response)
        this.progress = 0
        this.currentStatus = 3
      })
    }
  },
  computed: {
    isInitial() {
      return this.currentStatus === 0
    },
    isUploading() {
      return this.currentStatus === 1
    },
    uploadFieldName() {
      return this.paramName + (this.uploadMultiple?'[]':'')
    }
  },
  props: {
    value : {
      type: [ Array ],
    },
    url: {
      type: String,
      required: true
    },
    deleteUrl: {
      type: String
    },
    thumbnailUrl: {
      type: String
    }, 
    method: {
      type: String,
      default: 'post'
    },
    paramName: {
      type: String,
      default: 'files'
    },
    acceptedMimeTypes: {
      type: String,
      default: 'image/jpeg;image/png;application/pdf'
    },
    maxFiles: {
      type: Number,
      default: 10
    },
    uploadMultiple: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      currentStatus: 0,
      files: [],
      progress: 0,
    }
  },
  mounted() {
    console.warn(this.url)
  }
}
</script>
