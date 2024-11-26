<template>
  <div>
    <v-card class="kanban-column-card">
      <v-card-title>{{ title }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div class="pt-0 pb-2">
          <!--send title(status) to parent -->
          <div v-if="!isCreateTask">
            <v-btn block @click="toggleIsCreate">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>
          <div v-else>
            <v-card color="surface" v-click-outside="toggleIsCreate" class="my-2">
              <v-form v-model="isFormValid" @submit.prevent="submitNewTask">
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
                      v-model="newTaskName"
                      :rules="nameRules"
                    ></v-text-field>
                  </v-col>
                  <v-col align-self="center" cols="12" class="py-2 px-5">
                    <div class="d-flex justify-end">
                      <v-btn
                        text
                        type="submit"
                        :disabled="!isFormValid"
                        color="primary"
                        >Create</v-btn
                      >
                    </div>
                  </v-col>
                </v-row>
              </v-form>
            </v-card>
          </div>
        </div>
        <draggable
          v-model="localTaskList"
          group="task"
          @start="handleDragStart"
          @end="handleDragEnd"
          :id="title"
          class="py-0"
        >
          <todo-card
            v-for="task in localTaskList"
            :key="task.id"
            :id="task.id"
            :task="task.name"
            @editTask="$emit('editCard', task.id)"
            @deleteTask="$emit('deleteCard', task.id)"
            color="surface"
            class="py-6"
          />
        </draggable>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import TodoCard from "../molecules/TodoCard.vue";
export default {
  name: "TodoColumn",
  components: {
    draggable,
    TodoCard,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    taskList: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    localTaskList: {
      get() {
        return [...this.taskList];
      },
      set(value) {
        // this.$emit("update:taskList", value);
        console.log("set", value);
      },
    },
  },
  data() {
    return {
      isCreateTask: false,
      isFormValid: false,
      newTaskName: "",
      nameRules: [
        (v) => !!v || "Task name is required",
        (v) => v.length <= 10 || "Name must be less than 10 characters",
      ],
    };
  },
  methods: {
    handleDragStart(e) {
      console.log("Drag stated", e);
    },
    handleDragEnd(e) {
      console.log("Drag ended", e);
      const payload = {
        taskId: e.item.id,
        oldStatus: e.from.id,
        newStatus: e.to.id,
        oldIndex: e.oldIndex,
        newIndex: e.newIndex,
      };
      this.$emit("cardMoved", payload);
    },
    toggleIsCreate() {
      this.isCreateTask = !this.isCreateTask;
    },
    submitNewTask() {
      if (!this.isFormValid) return;
      this.isCreateTask = false;
      this.$emit("addCard", { title: this.title, taskName: this.newTaskName });
      this.newTaskName = "";
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 767px) {
  .kanban-column-card {
    min-width: 200px;
  }
}
@media screen and (min-width: 768px) and (max-width: 1023px) {
  .kanban-column-card {
    min-width: 300px;
  }
}
@media screen and (min-width: 1024px) {
  .kanban-column-card {
    min-width: 320px;
  }
}
</style>
