<template>
  <div>
    <h1 class="page-title text-left mb-4" stylw="color:#34423f">
      Створити зустріч
    </h1>
    <span>
      <label class="form-label">Назва</label>
      <v-text-field
        v-model="title"
        outlined
        hint="Це поле обов'язкове"
        color="primary"
        placeholder="Title"
        class="create-text-field form-input font-bold"
        background-color="#fff"
      ></v-text-field>
    </span>
    <span>
      <label class="form-label">Дата</label>
      <DatePicker @date="changeDate($event)" />
    </span>
    <span>
      <label class="form-label">Місце проведення</label>
      <v-text-field
        v-model="location"
        outlined
        placeholder="Location"
        class="create-text-field form-input"
        background-color="#fff"
        hint="Це поле обов'язкове"
      ></v-text-field>
    </span>
    <span>
      <label class="form-label">Опис події</label>
      <v-textarea
        outlined
        hint="Це поле обов'язкове"
        height="216"
        class="form-input"
        background-color="#fff"
        placeholder="Description"
        name="input-7-4"
        v-model="desc"
      ></v-textarea>
    </span>

    <v-col cols="12" md="8" class="cursor-pointer p-0">
      <label class="form-label">Зображення</label>
      <div class="p-rel">
        <v-img :src="img" class="rounded"></v-img>
        <input
          @change="chooseFile($event)"
          type="file"
          accept="image/*"
          ref="fileInput"
          class="file-input"
          style="position: absolute"
        />
        <v-overlay :absolute="true">
          <span class="text-h6 text-sm-h4">Добавити картинку</span>
        </v-overlay>
      </div>
    </v-col>
    <h2 class="page-title text-left my-4" stylw="color:#34423f">Программа</h2>
    <span v-if="events.length">
      <EventForm @onUpdate="updafeEvent($event)" @delete="deleteEvent($event)" :idx="idx" v-for="(event, idx) in events" :key="idx" class="mb-4" />
    </span>
    <span class="blue-title my-3" @click="pushEvent">+ Добавити етап програми</span>
  </div>
</template>

<script>
import images from "../utils/base64";
import { toBase } from "../utils/funcs";
import DatePicker from "./datepicker.vue";
import EventForm from "./EventForm.vue";
import { mapGetters, mapActions } from 'vuex'
export default {
  components: { DatePicker, EventForm },
  props: {
    creating: Boolean,
  },
  data: () => ({
    images,
    title: "",
    date: '09/30/2021',
    location: "",
    desc: "",
    img: images.default,
    events: [],
  }),
  methods: {
    ...mapActions(['getUid']),
    toBase,
    changeDate (e) {
      console.log(e)
      this.date = e
    },
    chooseFile(e) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      setTimeout(() => {
        this.img = reader.result;
      }, 1000);
    },
    async createTemplate () {
      const uid = await this.getUid()
      const template = {
        title: this.title,
        date: this.date,
        location: this.location,
        desc: this.desc,
        creator: uid,
        img: this.img,
        events: this.events,
        author: this.getUser.name,
      }
      return template
    },
    pushEvent () {
      this.events.push({type: 'other', title: '', start: '00:00', end: '00:00', desc: ''})
    },
    deleteEvent (e) {
      console.log(e)
      this.events.splice(e, 1)
    },
    updafeEvent (e) {
      const key = e[0]
      const val = e[1]
      this.events[key] = val
    }
  },
  watch: {
   creating() {
      if (this.desc && this.location && this.title && !this.$route.query.update) {
        this.createTemplate().then(async temp => {
          await this.$store.dispatch('addMeetup', temp)

          setTimeout(( )=> {
          let cur = this.meetups.find(m => m.title === this.title && m.desc === this.desc && m.creator === temp.creator)
          this.$router.push('/detail/' + cur.id )

          })
        })
        
        this.$emit("authMessage", { code: "MEETUP_CREATED" });
      }
      else if (this.desc && this.location && this.title && this.$route.query.update) {
        this.createTemplate().then(async temp => {
          await this.$store.dispatch('updateMeetup', [this.$route.query.update, temp])

          setTimeout(( )=> {
          let cur = this.meetups.find(m => m.title === this.title && m.desc === this.desc && m.creator === temp.creator)
          this.$router.push('/detail/' + cur.id )

          })
        })
        this.$emit("authMessage", { code: "MEETUP_UPDATED" });
      } 
       else {
        this.$emit("authMessage", { code: "INCORRECT_DATA" });
      }
    },
  },
  computed: {
    ...mapGetters(['getUser', 'meetups']),
    cur() { return  this.meetups.find(m => m.id === this.$route.query.update) }
  },
  mounted() {
    console.log(this.cur)
    if (this.$route.query.update && this.cur) {
      this.img = this.cur.img
      this.title = this.cur.title
      this.date = this.cur.date
      this.location = this.cur.location
      this.desc = this.cur.desc
      this.events = this.cur.events
     
    }
  }
};
</script>

<style lang="scss">
.form-input {
  & fieldset {
    font-family: Nunito, sans-serif;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    color: var(--body-color);
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
    -webkit-box-shadow: none;
    box-shadow: none;
    border: 2px solid var(--blue-light);
    &:focus {
      border-color: var(--blue);
    }
  }
}
.p-rel {
  position: relative;
}
.file-input {
  top: 0;
  left: 0;
  width: 100%;
  right: 0;
  bottom: 0;
  opacity: 0;
  z-index: 10;
  cursor: pointer;
  & button {
    opacity: 0;
  }
}
.p-0 {
  padding: 0 !important;
}
.blue-title {
  -webkit-box-shadow: none;
  box-shadow: none;
  border: none;
  background-color: transparent;
  padding: 0;
  outline: none;
  color: var(--blue);
  cursor: pointer;
  font-size: 20px;
  line-height: 28px;
}
.rounded {
  border-radius: 6px;
  transition: all 0.15s ease;
  border: 2px solid var(--blue-light);
  overflow: hidden;
  &:hover {
    border: 2px solid var(--blue);
  }
}
</style>
