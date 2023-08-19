/* @refresh reload */
import { render } from 'solid-js/web'

//import './index.css'
//import App from './App'
import { Clock } from './Clock';
import { Todo } from './Todo';
import { EtchASketch } from './EtchASketch';


const clock = document.getElementById('clock')
const todo = document.getElementById('todo')
const sketch = document.getElementById('sketch')

render(() => <Clock />, clock!)
render(() => <Todo />, todo!)
render(() => <EtchASketch />, sketch!)
