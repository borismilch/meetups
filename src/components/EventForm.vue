<template>
  <div>
    <v-card class="event-card">
       <v-icon class="float-icon" @click="emitEv" color="#4c6bb6">mdi-delete</v-icon> 
      <label for="email" class="form-label">Тип події</label>
      <v-select
        style="
          z-index: 1000;
          border-width: 2px !important;
          border-radius: 12px !important;
        "
        :items="cats"
        background-color="#fff"
        v-model="category"
        outlined
        :append-icon="icons[category]"
        class="form-input"
      ></v-select>
      <v-row>
        <v-col cols="6">
          <v-dialog
            ref="dialog"
            v-model="modal1"
            :return-value.sync="start"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <label for="email" class="form-label">Початок</label>

              <v-text-field
                class="form-input"
                v-model="start"
                style="border-radius: 12px"
                append-icon="mdi-clock-time-four-outline"
                readonly
                background-color="#fff"
                outlined
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker v-if="modal1" v-model="start" full-width>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal1 = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.dialog.save(start)">
                OK
              </v-btn>
            </v-time-picker>
          </v-dialog>
        </v-col>
        <v-col cols="6">
          <v-dialog
            ref="menu"
            v-model="modal2"
            :return-value.sync="end"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <label for="email" class="form-label">Початок</label>

              <v-text-field
                v-model="end"
                style="border-radius: 12px"
                append-icon="mdi-clock-time-four-outline"
                readonly
                class="form-input"
                background-color="#fff"
                outlined
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker v-if="modal2" v-model="end" full-width>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal2 = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(end)">
                OK
              </v-btn>
            </v-time-picker>
          </v-dialog>
        </v-col>
      </v-row>

      <v-col cols="12" style="padding: 0">
        <label for="email" class="form-label">Заголовок</label>
        <v-text-field
          placeholder="Заголовок"
          hint="Це поле обов'язкове"
          outlined
          class="form-input"
          v-model="title"
          style="border-radius: 8px !important"
          background-color="#fff"
        >
        </v-text-field>
      </v-col>

      <v-col cols="12" style="padding: 0">
        <label for="email" class="form-label">Опис події</label>
        <v-textarea
          placeholder="Заголовок"
          outlined
          height="166"
          class="form-input"
          v-model="desc"
          style="border-radius: 8px !important"
          background-color="#fff"
        >
        </v-textarea>
      </v-col>
    </v-card>
  </div>
</template>

<script>
import icons from "../utils/icons";
export default {
  data() {
    return {
      icons,
      type: '',
      title: '',
      start: '00:00',
      end: '00:00',
      desc: '',
      modal1: false,
      modal2: false,
      cats: [
        "party",
        "presentation",
        "other",
        "chating",
        "chating",
        "break",
        "end",
        "start",
      ],
      category: "other",
    };
  },
  computed: {
    evObject () { return { title: this.title, desc: this.desc,
    start:this.start, category: this.category, end: this.end, type: this.type  } }  
  },
  props: {
    idx: Number,
  },
  watch: {
    category(val) {
      console.log(val);
    },
    evObject: {
      deep: true,
      handler (val) {
        this.$emit('onUpdate', [this.idx, val]) 
      }  
    }
  },
  methods: {
    emitEv () {
        console.log(this.idx)
      this.$emit('delete', this.idx)  
    }  
  }

};
</script>

<style lang="scss">
.event-card {
  background-color: transparent !important;
  border-radius: 12px !important;
  border: 2.5px solid rgb(184, 197, 226) !important;
  box-shadow: 0px 0px 0px transparent !important;
  padding: 28px 170px 8px 28px !important;
  @media (max-width: 992px) {
    padding: 20px auto 4px 16px !important;
  }
}
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
.float-icon {
  position: absolute !important;
  cursor: pointer;
  top: 10px;
  right: 10px;  
}
</style>
