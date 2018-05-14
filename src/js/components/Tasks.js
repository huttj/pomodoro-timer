import React from 'react';
import { observer } from 'mobx-react';
import TaskStore from '../stores/TaskStore';

@observer
export default class Tasks extends React.Component {

  addTask(e) {
    e.preventDefault();
    TaskStore.addCurrentTask();
  }

  removeTask(task) {
    if (task.completed || confirm(`"${task.name}" is not completed. Really remove it?`)) {
      TaskStore.removeTask(task);
    }
  }

  render() {
    const { tasks, currentTask } = TaskStore;

    return (
      <div style={styles.container}>
        <h2 style={styles.title}>Tasks</h2>
        <form onSubmit={e => this.addTask(e) }>
          <label>
            <input style={styles.input} value={currentTask} onChange={e => TaskStore.setCurrentTask(e.target.value)} />
            <button style={styles.addButton} type="submit">Add</button>
          </label>
        </form>
        <div style={styles.list}>
          {
            tasks.map(task => (
              <div key={task.id} style={styles.task}>
                <label>
                  <input type="checkbox" checked={task.completed} onClick={() => TaskStore.toggleComplete(task)} placeholder="Task name" />
                  <span style={task.completed ? styles.complete : styles.incomplete }>{task.name}</span>
                </label> <span style={styles.removeButton} onClick={()=>this.removeTask(task)}>X</span>
              </div>
            )) 
          }
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    marginTop: 36,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: '100',
    fontSize: 36,
    marginBottom: 12,
  },
  removeButton: {
    color: 'white',
    cursor: 'pointer',
    fontWeight: 100,
    border: '1px solid white',
    borderRadius: 100,
    fontSize: 10,
    height: 10,
    width: 10,
    padding: 3,
    textAlign: 'center',
    marginLeft: 12
  },
  list: {
    height: '25vh',
    overflow: 'auto',
    marginTop: 6,
  },
  input: {
    color: 'white',
    background: 'transparent',
    textShadow: '1px 1px 1px rgba(0,0,0,.25)',
    border: '1px solid white',
    borderRadius: '4px 0 0 4px',
    fontSize: 14,
    padding: '8px',
    borderRightWidth: 0,
    width: 225
  },
  addButton: {
    color: 'white',
    background: 'transparent',
    border: '1px solid white',
    fontSize: 14,
    borderRadius: '0 4px 4px 0',
    padding: '8px 12px 8px 12px',
    cursor: 'pointer',
  },
  task: {
    marginTop: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  complete: {
    textDecoration: 'line-through',
    color: 'rgba(255,255,255,.25)'
  },
  incomplete: {
    textShadow: '1px 1px 1px rgba(0,0,0,.25)',
  }
}