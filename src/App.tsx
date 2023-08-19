//import { createSignal } from 'solid-js'
import { createSignal, onCleanup } from "solid-js";

import { createMemo } from 'solid-js'
import { mergeProps } from 'solid-js'
import solidLogo from './assets/solid.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Clock } from './Clock';
import { EtchASketch } from './EtchASketch';
//import './styles.css';


//--------------------------
const Parent = () => (
  <section>
    <Label greeting="Hello">
      <div>John</div>
      <div>Alice</div>
    </Label>
  </section>
);

const Label = (props) => (
  <>
    <div>{props.greeting}</div>
    {props.children}
  </>
);


//--------------------------

//NG
const BasicComponent_0 = (props) => {
  const value = props.value || "default";

  return <div>{value}</div>;
};


//OK
const BasicComponent_1 = (props) => {
  return <div>{props.value || "default"}</div>;
};

//OK
const BasicComponent_2 = (props) => {
  const value = () => props.value || "default";

  return <div>{value()}</div>;
};

//OK createMemo
const BasicComponent_3 = (props) => {
  const value = createMemo(() => props.value || "default");

  return <div>{value()}</div>;
};

//OK helper
const BasicComponent = (props) => {
  props = mergeProps({ value: "default" }, props);

  return <div>{props.value}</div>;
};

const Form = () => {
  const [value, setValue] = createSignal("");

  return (
    <div>
      <BasicComponent_2 value={value()} />
      <input type="text" oninput={(e) => setValue(e.currentTarget.value)} />
    </div>
  );
}

//--------------------------
// Children
// 単一の子
const Label2 = (props) => {return (<div class="label">Hi, { props.children }</div>);}


// 複数の子
const List = (props) => {return (<div>{props.children}</div>)}

// 子の配列を map 処理
const List2 = (props) => <ul>
  <For each={props.children}>{item => <li>{item}</li>}</For>
</ul>;

//--------------------------
//https://www.solidjs.com/examples/counter

const CountingComponent = () => {
	const [count, setCount] = createSignal(0);
	const interval = setInterval(
		() => setCount(c => c + 1),
		1000
	);
	onCleanup(() => clearInterval(interval));
	return <div>Count value is {count()}</div>;
};
//--------------------------
import { batch, For } from "solid-js";
import { createLocalStore, removeIndex } from "./utils";

type TodoItem = { title: string; done: boolean };

const ToDo = () => {
  const [newTitle, setTitle] = createSignal("");
  const [todos, setTodos] = createLocalStore<TodoItem[]>("todos", []);

  const addTodo = (e: SubmitEvent) => {
    e.preventDefault();
    batch(() => {
      setTodos(todos.length, {
        title: newTitle(),
        done: false,
      });
      setTitle("");
    });
  };

  return (
    <>
      <h3>Simple Todos Example</h3>
      <form onSubmit={addTodo}>
        <input
          placeholder="enter todo and click +"
          required
          value={newTitle()}
          onInput={(e) => setTitle(e.currentTarget.value)}
        />
        <button>+</button>
      </form>
      <For each={todos}>
        {(todo, i) => (
          <div>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={(e) => setTodos(i(), "done", e.currentTarget.checked)}
            />
            <input
              type="text"
              value={todo.title}
              onChange={(e) => setTodos(i(), "title", e.currentTarget.value)}
            />
            <button onClick={() => setTodos((t) => removeIndex(t, i()))}>
              x
            </button>
          </div>
        )}
      </For>
    </>
  );
};

//--------------------------
//--------------------------


function App() {
  const [count, setCount] = createSignal(0)

  return (
    <>
     <Parent/>
     <Form/>

     <Label2><span>Josie</span></Label2>

     <List>
       <div>First</div>
       <Label2>Judith</Label2>
     </List>

     <List2>
       <div>First</div>
       <Label2>Judith</Label2>
     </List2>
  <hr/>
    <h3>Counting Counter</h3>
    <CountingComponent/>
  <hr/>
    <h3>ToDo</h3>
    <ToDo/>
  <hr/>
    <Clock/>
  <hr/>
    <EtchASketch/>
  <hr/>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://solidjs.com" target="_blank">
          <img src={solidLogo} class="logo solid" alt="Solid logo" />
        </a>
      </div>
      <h1>Vite + Solid</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count()}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p class="read-the-docs">
        Click on the Vite and Solid logos to learn more
      </p>
     <Parent/>
    </>
  )
}

export default App
