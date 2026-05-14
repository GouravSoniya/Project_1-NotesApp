const titleInput = document.getElementById('title-input')
const contentInput = document.getElementById('content-input')
const saveBtn = document.getElementById('save-btn')
const notesList = document.getElementById('notes-list')

// Fetch and display all notes
async function fetchNotes() {
  const response = await fetch('/api/notes')
  const notes = await response.json()

  notesList.innerHTML = ''

  notes.forEach(note => {
    const div = document.createElement('div')
    div.id = `note-${note.id}`
    div.className = 'note-card'
    div.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <small>${new Date(note.created_at).toLocaleString()}</small>
      <button onclick="editNote(${note.id}, '${note.title}', '${note.content}')">Edit</button>
      <button onclick="deleteNote(${note.id})">Delete</button>
    `
    notesList.appendChild(div)
  })
}

//edit note
function editNote(id, currentTitle, currentContent) {
  const card = document.getElementById(`note-${id}`)

  card.innerHTML=`
    <div class="form-section">
      <input type="text" id="edit-title-input" value="${currentTitle}" />
      <textarea id="edit-content-input">${currentContent}</textarea>
      <button onclick="updateNote(${id})">Confirm</button>
    </div>
  `
}

async function updateNote(id) {
    const titleInput = document.getElementById('edit-title-input')
    const contentInput = document.getElementById('edit-content-input')
    const title = titleInput.value.trim()
    const content = contentInput.value.trim()
    await fetch(`/api/notes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
    })
    titleInput.value = ''
    contentInput.value = ''
    fetchNotes()
}


// Create a note
saveBtn.addEventListener('click', async () => {
  const title = titleInput.value.trim()
  const content = contentInput.value.trim()

  if (!title) {
    alert('Title is required')
    return
  }

  await fetch('/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content })
  })

  titleInput.value = ''
  contentInput.value = ''
  fetchNotes()
})

// Delete a note
async function deleteNote(id) {
  await fetch(`/api/notes/${id}`, {
    method: 'DELETE'
  })
  fetchNotes()
}

// Load notes on page load
fetchNotes()