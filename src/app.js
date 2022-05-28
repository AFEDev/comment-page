import { Comment } from './comment'
import './style.css'
import { isValid } from './utils'

const form = document.getElementById('comment-form')
const commentInput = form.querySelector('#comment-input')
const nameInput = form.querySelector('#name-input')
const submitBtn = form.querySelector('#submit-form')

window.addEventListener('load', Comment.renderList)

form.addEventListener('submit', submitFormHandler)

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
    
            Comment.create(comment).then(()=> {
                console.log('atejo?');
            })
        
        nameInput.value = ''
        nameInput.classList = ''
        commentInput.value= ''
        commentInput.classList= ''
        submitBtn.disabled = false
    }
}