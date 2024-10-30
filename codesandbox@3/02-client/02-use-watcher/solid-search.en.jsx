import { useWatcher } from 'alova/client';
import { createSignal } from 'react';
import { alovaInstance } from './api';

//Create method instance
const filterTodoList = userId => {
  return alovaInstance.Get(`/users/${userId}/todos`);
};

const App = () => {
  const [userId, setUserId] = createSignal(1);
  const { loading, data } = useWatcher(
    // Must be set to a function that returns a method instance
    () => filterTodoList(userId),

    // The monitored status array, these status changes will trigger a request
    [userId],
    {
      initialData: []
    }
  );

  return (
    <>
      <select
        value={userId()}
        onChange={e => setUserId(e.target.value)}>
        <option value={1}>User 1</option>
        <option value={2}>User 2</option>
        <option value={3}>User 3</option>
      </select>

      {/* Render the filtered todo list */}
      {loading() ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data().map(todo => (
            <li>
              {todo.completed ? '(Completed)' : ''}
              {todo.title}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
export default App;
