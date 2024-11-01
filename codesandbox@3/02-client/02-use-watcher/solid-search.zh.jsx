import { useWatcher } from 'alova/client';
import { createSignal } from 'solid-js';
import { alovaInstance } from './api';

// 创建method实例
const filterTodoList = userId => {
  return alovaInstance.Get(`/users/${userId}/todos`);
};

const App = () => {
  const [userId, setUserId] = createSignal(1);
  const { loading, data } = useWatcher(
    // 必须设置为返回method实例的函数
    () => filterTodoList(userId()),

    // 被监听的状态数组，这些状态变化将会触发一次请求
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

      {/* 渲染筛选后的todo列表 */}
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
