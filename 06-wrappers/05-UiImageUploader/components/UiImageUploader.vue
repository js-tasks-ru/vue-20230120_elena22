<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': isUploading }"
      :style="imageOrPreview && `--bg-url: url('${imageOrPreview}')`"
    >
      <span class="image-uploader__text">{{ text }}</span>
      <input
        v-bind="$attrs"
        :value="imageOrPreview"
        :type="type"
        accept="image/*"
        class="image-uploader__input"
        @[change].prevent="imageChange"
      />
    </label>
  </div>
</template>

<script>
export default {
    name: 'UiImageUploader',
  inheritAttrs: false,
  props: {
    preview: {
      type: String,
    },
    uploader: {
      type: Function,
    },
  },
  emits: {
    remove: null,
    upload: null,
    select: null,
    error: null,
  },
  data() {
    return {
      image: undefined,
      isUploading: false,
      localPreview: '',
    };
  },
  computed: {
    imageOrPreview() {
      return this.localPreview || this.image;
    },
    text() {
      if (this.isUploading) {
        return 'Загрузка...';
      } else if (this.imageOrPreview) {
        return 'Удалить изображение';
      } else {
        return 'Загрузить изображение';
      }
    },
    change() {
      if (this.isUploading || this.imageOrPreview){
        return 'click';
      } else {
        return 'change';
      }
    },
    type() {
      if (this.isUploading || this.imageOrPreview) {
        return undefined;
      } else {
        return 'file';
      }
    },
  },
  watch: {
    preview: {
      deep: true,
      immediate: true,
      handler() {
        this.localPreview = this.preview;
      },
    },
  },
  methods: {
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      const file = files[0];
      this.$emit('select', file);
      if (this.uploader) {
        this.isUploading = true;
        this.image = URL.createObjectURL(file);
        this.uploader(file).then(
          (result) => {
            this.isUploading = false;
            this.$emit('upload', result);
          },
          (error) => {
            this.isUploading = false;
            this.image = undefined;
            this.$emit('error', error);
          },
        );
      } else {
        this.image = URL.createObjectURL(file);
      }
    },
    imageChange(e) {
      if (this.isUploading) {
        return;
      } else if (this.imageOrPreview) {
        this.removeImage();
      } else {
        this.onFileChange(e);
      }
    },
    removeImage() {
      this.image = undefined;
      this.$emit('remove');
      this.localPreview = '';
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
