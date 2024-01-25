<template>
  <div class="container">
    <div v-for="action in actionList" :key="action.id" class="action_container">
      <div>
        <h3>{{action.name}}</h3>
        <p>{{action.description}}</p>
      </div>
      <div>
        <router-link :to="'/edit-action/' + action.id"><v-icon style="color: green; margin-right: 1rem">mdi-pencil</v-icon></router-link>
        <v-icon @click="deleteAction(action.id)" style="color: red;">mdi-delete</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      actionList: [
        {
          id: 1,
          name: 'Действие 1',
          description: 'Описание действия 1',
          stage: [
            { id: 1, name: 'Этап 1.1' },
            { id: 2, name: 'Этап 1.2' }
          ]
        },
        {
          id: 2,
          name: 'Действие 2',
          description: 'Описание действия 2',
          stage: [
            { id: 3, name: 'Этап 2.1' },
            { id: 4, name: 'Этап 2.2' }
          ]
        },
        {
          id: 3,
          name: 'Действие 3',
          description: 'Описание действия 3',
          stage: [
            { id: 5, name: 'Этап 3.1' },
            { id: 6, name: 'Этап 3.2' }
          ]
        },
        {
          id: 4,
          name: 'Действие 4',
          description: 'Описание действия 4',
          stage: [
            { id: 7, name: 'Этап 4.1' },
            { id: 8, name: 'Этап 4.2' }
          ]
        },
        {
          id: 5,
          name: 'Действие 5',
          description: 'Описание действия 5',
          stage: [
            { id: 9, name: 'Этап 5.1' },
            { id: 10, name: 'Этап 5.2' }
          ]
        },
        {
          id: 6,
          name: 'Действие 6',
          description: 'Описание действия 6',
          stage: [
            { id: 11, name: 'Этап 6.1' },
            { id: 12, name: 'Этап 6.2' }
          ]
        },
        {
          id: 7,
          name: 'Действие 7',
          description: 'Описание действия 7',
          stage: [
            { id: 13, name: 'Этап 7.1' },
            { id: 14, name: 'Этап 7.2' }
          ]
        },
        {
          id: 8,
          name: 'Действие 8',
          description: 'Описание действия 8',
          stage: [
            { id: 15, name: 'Этап 8.1' },
            { id: 16, name: 'Этап 8.2' }
          ]
        },
        {
          id: 9,
          name: 'Действие 9',
          description: 'Описание действия 9',
          stage: [
            { id: 17, name: 'Этап 9.1' },
            { id: 18, name: 'Этап 9.2' }
          ]
        },
        {
          id: 10,
          name: 'Действие 10',
          description: 'Описание действия 10',
          stage: [
            { id: 19, name: 'Этап 10.1' },
            { id: 20, name: 'Этап 10.2' }
          ]
        },
        // Можете продолжить добавлять другие объекты Action, как необходимо
      ]
    };
  },
  methods: {
    deleteAction(actionId) {
      console.log('Deleting action with ID:', actionId);
    },
  },
};
</script>

<style scoped>
.action_container {
  display: grid;
  grid-template-columns: 80% 20%;
  border: solid 2px #BAE8FA;
  padding: 1rem;
  border-radius: 1rem;
  text-align: left;
  align-items: center;
  margin-bottom: 1rem;
  cursor: pointer;
}

</style>

