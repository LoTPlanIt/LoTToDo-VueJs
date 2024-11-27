<template>
  <div>
    <v-card class="kanban-column-card">
      <v-card-title>{{ title }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div class="pt-0 pb-2">
          <div v-if="!isCreateTask">
            <v-btn block @click="onClickCreate">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>
          <div v-else>
            <todo-card-create
              v-click-outside="onClickCreate"
              :rules="nameRules"
              @submitForm="onSubmitForm"
            />
          </div>
        </div>
        <draggable
          v-model="localTaskList"
          group="task"
          @start="onDragStart"
          @end="onDragEnd"
          :id="title"
          class="py-0"
        >
          <todo-card
            v-for="task in localTaskList"
            :key="task.id"
            :id="task.id"
            :task="task.name"
            @editTask="onClickEditTask(task.id)"
            @deleteTask="onClickDeleteTask(task.id)"
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
import TodoCardCreate from "../molecules/TodoCardCreate.vue";
export default {
  name: "TodoColumn",
  components: {
    draggable,
    TodoCard,
    TodoCardCreate,
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
      nameRules: [
        (v) => !!v || "Task name is required",
        (v) => v.length <= 10 || "Name must be less than 10 characters",
      ],
    };
  },
  methods: {
    onDragStart(e) {
      console.log("Drag stated", e);
    },
    onDragEnd(e) {
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
    onClickCreate() {
      this.isCreateTask = !this.isCreateTask;
    },
    onClickEditTask(taskId) {
      this.$emit("editCard", taskId);
    },
    onClickDeleteTask(taskId) {
      this.$emit("deleteCard", taskId);
    },
    onSubmitForm(form) {
      if (!form) return;
      const { taskName } = form;
      this.$emit("addCard", { title: this.title, taskName: taskName });
      this.isCreateTask = false;
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
