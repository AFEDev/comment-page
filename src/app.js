import { authWithEmailAndPassword, getAuthForm } from './auth'
import { Comment } from './comment'
import './style.css'
import { createModal, isValid } from './utils'

const form = document.getElementById('comment-form')
const commentInput = form.querySelector('#comment-input')
const nameInput = form.querySelector('#name-input')
const submitBtn = form.querySelector('#submit-form')
const modalBtn = document.getElementById('modal-btn')

window.addEventListener('load', Comment.renderList)

form.addEventListener('submit', submitFormHandler)

modalBtn.addEventListener('click', openModal)

commentInput.addEventListener('input', () => {
    submitBtn.disabled= !isValid(commentInput.value)
} )

function submitFormHandler(event) {
    event.preventDefault()
    if (isValid(commentInput.value)) {
        const comment = {
            text: commentInput.value.trim(),
            name: nameInput.value.trim(),
            date: new Date().toJSON()
        }
        submitBtn.disabled = true
        Comment.create(comment).then(() => {
            nameInput.value = ''
            nameInput.classList = ''
            commentInput.value= ''
            commentInput.classList= ''
            submitBtn.disabled = false
          })
    }
}

function openModal() {
    createModal('Login', getAuthForm())
    document.getElementById('auth-form')
    .addEventListener('submit', authFormHandler, {once: true})
}

function authFormHandler(event) {
    event.preventDefault()

    const btn = event.target.querySelector('button')
    const email = event.target.querySelector('#email').value
    const pass = event.target.querySelector('#password').value

    btn.disabled = true

    authWithEmailAndPassword(email, pass)
    .then(Comment.fetch)
    .then(renderModalAfterAuth)
    .then(()=> btn.disabled = false)
}

function renderModalAfterAuth(content) {
    if (typeof content === 'string') {
createModal('Error!', content)
    } else {
        createModal('You are logged in', Comment.listToHTML(content))
    }
}