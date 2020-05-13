<template lang="html">
  <div class="split-container">
    <button
      class="split-tab-button"
      :class="isActive('example')"
      type="button"
      @click="setDisplay('example')"
    >
      Example
    </button>
    <button
      class="split-tab-button"
      :class="isActive('code')"
      type="button"
      @click="setDisplay('code')"
    >
      Code
    </button>
    <button
      class="split-tab-button"
      :class="isActive('both')"
      type="button"
      @click="setDisplay('both')"
    >
      Example+Code
    </button>
    <div class="split row">
      <div
        v-if="exampleVisible"
        class="split-example col-sm-12 col-lg-6"
      >
        <keep-alive>
          <slot name="example"/>
        </keep-alive>
      </div>
      <div
        v-if="codeVisible"
        class="split-code col-sm-12 col-md-6"
      >
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      display: 'both'
    }
  },
  computed: {
    exampleVisible () {
      return this.display === 'example' || this.display === 'both'
    },
    codeVisible () {
      return this.display === 'code' || this.display === 'both'
    }
  },
  methods: {
    setDisplay (type) {
      this.display = type
    },
    isActive (type) {
      return this.display === type
        ? 'split-tab-button-active'
        : ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.split-container
  margin: 20px 0
  padding: 20px
  background: #fafafa
  border-radius: 10px

.split-tab-button
  border: none
  background: #fff
  padding: 12px 24px
  font-size: 14px
  display: inline-flex
  margin-bottom: 5px

.split-tab-button-active
  color: #fff
  background: #3eaf7c

</style>
