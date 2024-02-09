<script setup>
import { ref } from "vue"
import { useUserStore } from "@/stores/UserStore";
import { useRouter } from "vue-router";

const email = ref("")
const password = ref("")

const visible = ref(false)

const rules = ref({
  required: value => !!value || 'Поле обязательно.',
  minSymbols: value => value.length >=8 || "Пароль должен содержать минимум 8 символов",
  email: value => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'Недействительный email'
  },
})

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
    <v-card width="400" class="mx-auto" title="Вход">
      <v-container>
        <v-form fast-fail @submit.prevent="handleLogin">
          <v-text-field
            v-model="email"
            type="email"
            prepend-inner-icon="mdi-email-outline"
            label="Почта"
            placeholder="example@email.com"
            hint="Введите адрес электронной почты пользователя"
            variant="underlined"
            color="primary"
            :rules="[rules.required, rules.email]"
          ></v-text-field>
          <v-text-field
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            v-model="password"
            prepend-inner-icon="mdi-lock-outline"
            label="Пароль"
            hint="Введите пароль пользователя"
            variant="underlined"
            color="primary"
            @click:append-inner="visible = !visible"
            :rules="[rules.required, rules.minSymbols]"
          ></v-text-field>

          <v-spacer></v-spacer>

          <a href="#" class="text-body-2 font-weight-regular">Забыли пароль?</a>
          <v-btn type="submit" color="primary" block class="mt-2">Вход</v-btn>
        </v-form>
        <div class="mt-2">
          <a href="#" class="text-body-2">Нет аккаунта?</a>
        </div>
      </v-container>
    </v-card>
  </v-container>@/stores/UserStore
</template>