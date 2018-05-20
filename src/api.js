const APIURL = '/api/todos/';

export async function getTodos() {
    return fetch(APIURL)
        .then(data => data.json());
}

export async function addTodo(val) {
    return fetch(APIURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: val})
        })
        .then(data => data.json());
}

export async function deleteTodo(id) {
     const deleteURL = APIURL + id;
        fetch(deleteURL, {
            method: 'DELETE'
        })
        .then(data => data.json())
}

export async function toggleTodo(todo) {
    const updateURL = APIURL + todo._id;
        return fetch(updateURL, {
            method: 'PUT',
            body: JSON.stringify({completed: !todo.completed})
        })
        .then(data => data.json());
}