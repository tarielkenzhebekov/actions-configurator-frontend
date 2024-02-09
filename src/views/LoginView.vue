<script setup>
import { ref } from "vue"
import { useUserStore } from "@/stores/UserStore";
import { useRouter } from "vue-router";

const email = ref("")
const password = ref("")

  const userStore = useUserStore()
  
  const router = useRouter()

const handleLogin = async () => {
  const user = {
    email: email.value,
    password: password.value,
  }
  await userStore.login(user)

  if (userStore.isLoggedIn) {
    await router.push({
      name: "actions"
    })
  }
}
</script>

<template>
  <v-container class="d-flex align-center justify-center" style="height: 100vh">
    <v-sheet width="400" class="mx-auto">
      <v-form fast-fail @submit.prevent="handleLogin">
        <v-text-field v-model="username" label="Имя пользователя"></v-text-field>
        <v-text-field v-model="password" label="Пароль"></v-text-field>
        
        <a href="#" class="text-body-2 font-weight-regular">Забыли пароль?</a>

        <v-btn type="submit" color="primary" block class="mt-2">Вход</v-btn>
      </v-form>
      <div class="mt-2">
        <a href="#" class="text-body-2">Нет аккаунта?</a>
      </div>
    </v-sheet>
  </v-container>@/stores/UserStore
</template>