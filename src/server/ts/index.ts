import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/todos/2';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

axios.get(url).then(response => {
  const todo = response.data as Todo;

  const ID = todo.id;
  const title = todo.title;
  const finished = todo.completed;

  console.log({ ID, title, finished });
});
