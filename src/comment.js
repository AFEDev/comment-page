
export class Comment {
    static create(comment) {
        fetch('https://comment-form-app-default-rtdb.europe-west1.firebasedatabase.app/comment.json', {
            method: 'POST',
            body: JSON.stringify(comment),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then( response => response.json())
        .then(response => {
            comment.id = response.name
            console.log(comment);
            return comment
           
        })
        .then(addToLocalStorege)
        .then(Comment.renderList)
    }
    static renderList() {
        const comments = getCommentsFromLocalStorage()
        const html = comments.length
        ? comments.map(toCard).join(' ')
        : `<div class="mui--text-headline">There are no comments. Be first.</div>`

        const list = document.getElementById('list') 

        list.innerHTML = html
    }
}

function addToLocalStorege(comment) {
    const all = getCommentsFromLocalStorage()
    console.log('all', all);
    all.push(comment)
    localStorage.setItem('comments', JSON.stringify(all))
    
}

function getCommentsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('comments') || '[]')
}

function toCard(comment) {
    return `
    <div class="mui--text-black-54">By <a href="#">${comment.name}</a>
    ${new Date(comment.date).toLocaleDateString()}
    ${new Date(comment.date).toLocaleTimeString()}
    </div>
    <div>${comment.text}<a href="#">  Read more...</a></div><br><hr>
    `

}