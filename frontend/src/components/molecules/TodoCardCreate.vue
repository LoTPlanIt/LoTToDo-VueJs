<template>
  <v-card color="surface" class="my-2">
    <v-form v-model="isFormValid" @submit.prevent="onSubmitForm">
      <v-row justify="space-between" class="pa-0">
        <v-col align-self="center" cols="12" class="py-2 px-5"
          ><v-text-field
            solo
            flat
            autofocus
            hide-details
            background-color="surface"
            label="What need to be done?"
            required
            v-model="form.taskName"
            :rules="rules"
          ></v-text-field>
        </v-col>
        <v-col align-self="center" cols="12" class="py-2 px-5">
          <div class="d-flex justify-end">
            <v-btn text type="submit" :disabled="!isFormValid" color="primary"
              >Create</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "TodoCardCreate",
  props: {
    rules: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      form: {
        taskName: "",
      },
      isFormValid: false,
    };
  },
  methods: {
    onSubmitForm() {
      this.$emit("submitForm", this.form);
      this.form.taskName = "";
      this.isFormValid = false;
    },
  },
};
</script>

<style></style>
