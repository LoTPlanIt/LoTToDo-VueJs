<template>
  <div>
    <kanban-board :onCardMoved="handleChangeTaskStatus" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import KanbanBoard from "../components/templates/KanbanBoard.vue";
import projectService from "../services/projectService";
export default {
  name: "TaskView",
  components: {
    KanbanBoard,
  },
  data() {
    return {
      isLoading: false,
      projectStatuses: ["Pending", "Doing", "Done"],
    };
  },
  methods: {
    ...mapActions(["setTaskList", "setTaskStatuses", "updateTask"]),
    handleChangeTaskStatus(card) {
      this.updateTask({
        projectData: { status: card.newStatus },
        id: card.taskId,
      });
    },
    async fetchTodos() {
      try {
        this.isLoading = true;
        const response = await projectService.getTodos();
        return response.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  computed: {},
  mounted() {
    this.fetchTodos().then((response) => {
      this.setTaskList(response);
      this.setTaskStatuses(this.projectStatuses);
    });
  },
};
</script>

<style></style>
