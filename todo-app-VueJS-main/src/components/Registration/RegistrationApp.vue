<template>
  <div id="main">
    <div class="container">
      <div class="title">Registration</div>
      <div class="content">
        <form id="form" @submit.prevent="registerUser">
          <div class="user-details">
            <div class="input-box">
              <span class="details">Full Name</span>
              <input
                type="text"
                id="fullName"
                name="fullName"
                v-model="user.fullName"
                placeholder="Enter your name"
              />
              <div
                class="error"
                id="fullNameError"
                v-if="formError.fullNameError"
                v-text="formError.fullNameError"
              ></div>
            </div>
            <div class="input-box">
              <span class="details">Email</span>
              <input
                type="email"
                id="email"
                name="email"
                v-model="user.email"
                placeholder="Enter your email"
              />
              <div
                class="error"
                id="emailError"
                v-if="formError.emailError"
                v-text="formError.emailError"
              ></div>
            </div>
            <div class="input-box">
              <span class="details">Password</span>
              <input
                type="password"
                id="password"
                name="password"
                v-model="user.password"
                placeholder="Enter your password"
              />
              <div
                class="error"
                id="passwordError"
                v-if="formError.passwordError"
                v-text="formError.passwordError"
              ></div>
            </div>
            <div class="input-box">
              <span class="details">Confirm Password</span>
              <input
                type="password"
                id="password2"
                name="password2"
                v-model="confirmpasswordInput"
                placeholder="Confirm your password"
              />
              <div
                class="error"
                id="confirmPasswordError"
                v-if="formError.confirmPasswordError"
                v-text="formError.confirmPasswordError"
              ></div>
            </div>
          </div>

          <div class="button">
            <button type="submit" class="glow-on-hover">Register</button>
          </div>

          <div class="register">
            <p>Already a user?</p>
            <router-link to="/Login" id="login">Login</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormError, userInterface } from '../Interface'
import { reactive, ref } from 'vue'

const confirmpasswordInput = ref('')
const user = reactive<userInterface>({
  fullName: '',
  email: '',
  password: ''
})

const formError: FormError = reactive({
  fullNameError: '',
  emailError: '',
  passwordError: '',
  confirmPasswordError: ''
})

const required = (input: string, errorid: keyof FormError, fieldName: string): boolean => {
  if (!input || input.trim() === '') {
    formError[errorid] = `${fieldName} cannot be empty.`
    return true
  }
  formError[errorid] = ''
  return false
}

const stringValidation = (input: string, errorid: keyof FormError): boolean => {
  const pattern = /^[A-Za-z\s]+$/
  if (!pattern.test(input)) {
    formError[errorid] = 'Input should contain only letters and spaces.'
    return true
  }
  formError[errorid] = ''
  return false
}

const checkLength = (
  input: string,
  errorid: keyof FormError,
  min: number,
  max: number
): boolean => {
  if (input.length < min && input.length > 0) {
    formError[errorid] = `Length cannot be less than ${min}`
    return true
  } else if (input.length > max) {
    formError[errorid] = `Length can't be greater than ${max}`
    return true
  }
  formError[errorid] = ''
  return false
}

const emailFormatValidation = (input: string, errorid: keyof FormError): boolean => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!pattern.test(input)) {
    formError[errorid] = 'Please enter a valid email address.'
    return true
  }
  formError[errorid] = ''
  return false
}

const checkPasswordFormat = (input: string, errorid: keyof FormError): boolean => {
  return (
    capitalAlphabetCheck(input, errorid) ||
    smallAlphabetCheck(input, errorid) ||
    numberCheck(input, errorid) ||
    specialCharacterCheck(input, errorid)
  )
}

const capitalAlphabetCheck = (input: string, errorid: keyof FormError): boolean => {
  const pattern = /[A-Z]/
  if (!pattern.test(input)) {
    formError[errorid] = 'Password must contain at least one capital letter.'
    return true
  }
  return false
}

const smallAlphabetCheck = (input: string, errorid: keyof FormError): boolean => {
  const pattern = /[a-z]/g
  if (!pattern.test(input)) {
    formError[errorid] = 'Password must contain at least one lowercase letter.'
    return true
  }
  return false
}

const numberCheck = (input: string, errorid: keyof FormError): boolean => {
  const pattern = /[0-9]/g
  if (!pattern.test(input)) {
    formError[errorid] = 'Password must contain at least one number.'
    return true
  }
  return false
}

const specialCharacterCheck = (input: string, errorid: keyof FormError): boolean => {
  const pattern = /[!@#$%^&*]/g
  if (!pattern.test(input)) {
    formError[errorid] = 'Password must contain at least one special character.'
    return true
  }
  return false
}

const nameValidation = (fullName: string, errorid: keyof FormError) => {
  required(fullName, errorid, 'Name') ||
    stringValidation(fullName, errorid) ||
    checkLength(fullName, errorid, 3, 30) ||
    (formError[errorid] = '')
}

const emailValidation = (input: string, errorid: keyof FormError) => {
  required(input, errorid, 'Email') ||
    emailFormatValidation(input, errorid) ||
    (formError[errorid] = '')
}

const passwordValidation = (input: string, errorid: keyof FormError): void => {
  if (
    required(input, errorid, 'Password') ||
    checkLength(input, errorid, 8, 16) ||
    checkPasswordFormat(input, errorid)
  ) {
    return
  }
  formError[errorid] = ''
}

const confirmPasswordValidation = (
  password: string,
  confirmPassword: string,
  errorid: keyof FormError
): boolean => {
  if (password !== confirmPassword) {
    formError[errorid] = 'Passwords do not match.'
    return true
  } else {
    formError[errorid] = ''
    return false
  }
}

function registerUser() {
  // Full Name
  nameValidation(user.fullName, 'fullNameError')
  // Email
  emailValidation(user.email, 'emailError')
  // Password
  passwordValidation(user.password, 'passwordError')
  // Confirm Password
  confirmPasswordValidation(user.password, confirmpasswordInput.value, 'confirmPasswordError')

  if (
    !formError.fullNameError &&
    !formError.emailError &&
    !formError.passwordError &&
    !formError.confirmPasswordError
  ) {
    const storedFormData = JSON.parse(localStorage.getItem('users') || '[]')
    const lastUserId =
      storedFormData.length > 0 ? parseInt(storedFormData[storedFormData.length - 1].id) : 0
    const userId = lastUserId + 1
    const existingUser = storedFormData.some(
      (entry: { email: string }) => entry.email === user.email
    )
    if (existingUser) {
      alert('User with this email already exists.')
    } else {
      const formData = {
        id: userId.toString(),
        fullName: user.fullName,
        email: user.email,
        password: user.password
      }

      storedFormData.push(formData)
      localStorage.setItem('users', JSON.stringify(storedFormData))
      alert(`${user.fullName} has submitted form successfully.`)
      // handleLoginPath()
      user.email = ''
      user.fullName = ''
      user.password = ''
      confirmpasswordInput.value = ''
    }
  }
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
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url(../../public/clouds.jpg);
  background-size: cover;
  background-color: white;
}

.container {
  max-width: 700px;
  height: 100%;
  width: 100%;
  /* background-color: rgba(10, 73, 230, 0.294); */
  background-color: rgba(169, 178, 251, 0.18);
  padding: 25px 30px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
  color: white;
}

.container .title {
  font-size: 25px;
  font-weight: 500;
  position: relative;
}

.container .title::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  width: 30px;
  border-radius: 5px;
  background-image: linear-gradient(135deg, #4062bb 10%, #ebebeb 100%);
}

.content {
  height: 100%;
}

.content form .user-details {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px 0 12px 0;
}

form .user-details .input-box {
  margin-bottom: 5px;
  width: calc(100% / 2 - 20px);
}

form .input-box span.details {
  display: block;
  font-weight: 500;
  margin-bottom: 5px;
}

.user-details .input-box input {
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

form .permission .permission-title,
.gender-details .gender-title {
  font-size: 16px;
  font-weight: 500;
}

form .category {
  display: flex;
  width: 80%;
  margin: 14px 0;
  justify-content: space-between;
}

form .category label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

form .category label .dot {
  height: 18px;
  width: 18px;
  border-radius: 50%;
  margin-right: 10px;
  background: #d9d9d9;
  border: 5px solid transparent;
  transition: all 0.3s ease;
}

#male:checked ~ .category label .one,
#female:checked ~ .category label .two,
#other:checked ~ .category label .three {
  background: #9b59b6;
  border-color: #d9d9d9;
}

form input[type='radio'] {
  display: none;
}

form .button {
  height: 45px;
  width: 100%;
  margin: 10px 0;
  display: flex;
  justify-content: center;
}

form .button button {
  height: 80%;
  width: 100%;
  border-radius: 10px;
  border: none;
  color: #fff;
  font-size: 23px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-image: linear-gradient(135deg, #4062bb 10%, #ebebeb 100%);
  text-decoration: none;
  text-align: center;
}

form .button button:hover {
  background-image: linear-gradient(-135deg, #4062bb 10%, #ebebeb 100%);
  transition: 0.5ms;
}

@media (max-width: 584px) {
  .container {
    max-width: 100%;
  }

  form .user-details .input-box {
    margin-bottom: 15px;
    width: 100%;
  }

  form .category {
    width: 100%;
  }

  .content {
    max-height: 650px;
    overflow-y: scroll;
  }

  .content::-webkit-scrollbar {
    width: 5px;
  }
}

@media (max-width: 459px) {
  .container .content .category {
    flex-direction: column;
  }
}

.permission-error,
.gender-error,
.input-box .error {
  color: #ff3860;
  font-size: 13px;
  height: 13px;
}

.permission-values {
  display: flex;
  width: 80%;
  margin: 14px 0;
  justify-content: left;
  gap: 10px;
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
  font-weight: bolder;
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
