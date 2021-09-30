<template>
  <div class="filters-panel">
    <div class="filters-panel__col">
      <div class="form-check">
        <div
          class="form-check__group"
          v-for="{ text, to } in items"
          :key="text"
        >
          <router-link
            tag="div"
            :to="to"
            active-class="active"
            class="link-r"
            exact
          >
            <input
              type="radio"
              name="date-filter"
              class="form-check__input"
              :value="to"
            />
            <label class="form-check__label">
              {{ text }}
            </label>
          </router-link>
        </div>
      </div>
    </div>

    <div class="filters-panel__col">
      <div class="form-group form-group_inline">
        <input
          class="form-control form-control_rounded form-control_sm"
          placeholder="Пошук"
          v-model="searching"
        />
        <img :src="loop" class="loop-icon" />
      </div>
      <v-btn-toggle
        v-model="toggle_exclusive"
        rounded
        dense
        mandatory
        style="height: 44px"
        class="ml-5"
        color="primary"
        active-class="active"
      >
        <v-btn class="button-solo">
          <router-link tag="span" to="/" active-class="active" exact>
            <v-icon>mdi-format-list-bulleted</v-icon>
          </router-link>
        </v-btn>

        <v-btn class="button-solo">
          <router-link
            to="/?calendar=true"
            tag="span"
            active-class="active"
            exact
          >
            <v-icon>mdi-calendar-month-outline</v-icon>
          </router-link>
        </v-btn>
      </v-btn-toggle>
    </div>
  </div>
</template>

<script>
import loop from "../assets/loop.svg";
export default {
  data: () => ({
    loop,
    toggle_exclusive: undefined,
    searching: "",
    items: [
      { text: "Всі", to: "/" },
      { text: "Минувші", to: "/?meetups=past" },
      { text: "Очікувані", to: "/?meetups=waiting" },
    ],
  }),
  watch: {
    searching(val) {
      this.$emit("onSearch", val);
    },
  },
};
</script>

<style lang="scss">
.filters-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px 0 32px 0;
}
.filters-panel__col {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
.form-check {
  display: flex;
  flex-direction: row;
}
.form-check__input {
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.form-check__group {
  position: relative;
  display: inline-flex;
}
.form-check__label {
  margin-right: 16px;
  height: 44px;
  padding: 6px 16px;
  border-radius: 22px;
  border: 2px solid transparent;
  color: var(--blue);
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}
.link-r.active {
  .form-check__label {
    border: 2px solid var(--blue);
  }
}
.text-field-s {
  max-height: 44px;
  font-size: 26px;
  font-weight: 800;
  &::placeholder {
    font-size: 28px;
    font-weight: 400;
    color: var(--blue2);
  }
  .v-input__slot {
    box-shadow: 0px 0px 0px transparent;
    border: 2px solid var(--blue2);
    transition: all 0.2s ease;

    & input:focus {
      .v-input__slot {
        border: 2px solid var(--blue);
      }
    }
  }
}
.form-control.form-control_sm.form-control_rounded {
  border-radius: 22px;
}
.input-group .form-control {
  width: 100%;
}
.form-control.form-control_sm {
  padding: 8px 16px 8px 55px !important;
  height: 44px;
  border-radius: 4px;
}
.form-control.form-control_rounded {
  border-radius: 26px;
}
.form-group {
  position: relative;
}
.form-control {
  height: 52px;
  border-radius: 8px;
  border: 2px solid var(--blue-light);
  font-family: Nunito, sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  background-color: var(--white);
  outline: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  &:focus {
    border: 2px solid var(--blue);
    color: var(--blue);
    .loop-icon {
      color: var(--blue);
    }
  }
}
.loop-icon {
  position: absolute;
  left: 13px;
  top: 9px;
}
.button-solo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px !important;
  transition: all 0.23s ease !important;
  background: #fff !important;
  border: 2px solid #1565c0 !important;
  border-color: #1565c0 !important;
  border-right: 0px transparent;
  & i {
    color: #1565c0 !important;
  }
  &.active {
    & i {
      color: white !important;
    }
    background: #1565c0 !important;
  }
}
</style>
