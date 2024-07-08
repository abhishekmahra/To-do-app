<template>
  <div id="main">
    <div class="container">
      <div class="title">Log In</div>
      <p id="authenticationError" v-text="loginError"></p>
      <!--FOR ERROR MESSAGE-->
      <div class="content">
        <form id="form-login" @submit.prevent="validateLogin">
          <div class="user-details">
            <div class="input-box">
              <span class="details">Email</span>
              <input
                type="email"
                id="emailAuthenticate"
                placeholder="Enter your email"
                v-model="loginDetails.email"
                required
              />
            </div>
            <div class="input-box">
              <span class="details">Password</span>
              <input
                type="password"
                id="passwordAuthenticate"
                placeholder="Enter your password"
                v-model="loginDetails.password"
              />
            </div>
          </div>
          <div class="button">
            <button id="btn" type="submit" class="glow-on-hover">Log In</button>
          </div>
        </form>
      </div>
      <div class="register">
        <p>Not a user?</p>
        <router-link to="/Registration">Register</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { userInterface } from '../Interface'
import router from '@/router'

const loginDetails = reactive({
  email: '',
  password: ''
})

const loginError = ref('')

const validateLogin = (event: Event) => {
  event.preventDefault()
  if (authenticateUser()) {
    localStorage.setItem('currentUser', loginDetails.email)
    router.push('/Todo')
  }
}

function authenticateUser(): boolean {
  if (!loginDetails.email || !loginDetails.password) {
    loginError.value = 'Please enter your credentials*'
    return false
  } else if (isUserExist()) {
    return true
  } else {
    loginError.value = 'No such User*'
    return false
  }
}

function isUserExist(): boolean {
  const userList: userInterface[] = JSON.parse(localStorage.getItem('users') || '[]')
  console.log(userList)

  for (const user of userList) {
    if (user.email === loginDetails.email && user.password === loginDetails.password) {
      console.log('Login successful')
      return true
    }
  }
  return false
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Be Vietnam Pro', sans-serif;
}

#main {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url(../../public/clouds.jpg);
  background-size: cover;
}

body img {
  max-inline-size: 100%;
  block-size: auto;
}

.container {
  max-width: 700px;
  width: 500px;
  padding: 25px 30px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
  background-color: rgba(169, 178, 251, 0.18);
  color: white;
}

.title {
  font-size: 35px;
  font-weight: 500;
  position: relative;
  display: flex;
  justify-content: center;
}

.title::before {
  content: '';
  position: absolute;
  left: 40%;
  bottom: 0;
  height: 3px;
  width: 50px;
  border-radius: 5px;
  background-image: linear-gradient(135deg, #4062bb 10%, #ebebeb 100%);
}

#authenticationError {
  text-align: center;
  margin-top: 30px;
  color: red;
}

.user-details {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px 0 12px 0;
  align-items: center;
  flex-direction: column;
}

.input-box {
  margin-bottom: 15px;
  width: 60%;
}

input {
  height: 35px;
  width: 100%;
  outline: none;
  font-size: 16px;
  border-radius: 5px;
  padding-left: 15px;
  border: 1px solid #ccc;
  border-bottom-width: 2px;
  transition: all 0.3s ease;
}

.button {
  display: flex;
  justify-content: center;
}

#btn {
  width: 30%;
  height: 150%;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 10px;
  background-image: linear-gradient(135deg, #4062bb 10%, #ebebeb 100%);
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  transition: all 0.3s ease;
}

#btn:hover {
  transform: scale(0.95);
  background-image: linear-gradient(-135deg, #4062bb 10%, #ebebeb 100%);
}

@media (max-width: 584px) {
  .input-box {
    width: 100%;
  }
}

.register {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  gap: 10px;
}

.register a {
  text-decoration: none;
  color: #ecec0e;
}

.glow-on-hover {
  width: 220px;
  height: 50px;
  border: none;
  outline: none;
  color: #fff;
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
}

.glow-on-hover:before {
  content: '';
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7300,
    #fffb00,
    #48ff00,
    #00ffd5,
    #002bff,
    #7a00ff,
    #ff00c8,
    #ff0000
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing 20s linear infinite;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

.glow-on-hover:active {
  color: #000;
}

.glow-on-hover:active:after {
  background: transparent;
}

.glow-on-hover:hover:before {
  opacity: 1;
}

.glow-on-hover:after {
  z-index: -1;
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: #111;
  left: 0;
  top: 0;
  border-radius: 10px;
}

@keyframes glowing {
  0% {
    background-position: 0 0;
  }

  50% {
    background-position: 400% 0;
  }

  100% {
    background-position: 0 0;
  }
}
</style>
