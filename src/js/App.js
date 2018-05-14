import React from 'react';

import TimerStore from './stores/TimerStore'; 
import TaskStore from './stores/TaskStore';

import Tasks from './components/Tasks';


export default class App extends React.Component {

  start() {
    TimerStore.startWork();
    this.timeLoop();
  }

  stop() {
    TimerStore.reset();
  }

  timeLoop() {
    TimerStore.checkStatus();

    // Trigger a re-render
    this.setState({});

    if (TimerStore.isRunning()) {
      this.timer = setTimeout(() => this.timeLoop(), 999);
    }
  }

  componentDidMount() {
    if (TimerStore.isRunning()) {
      this.timeLoop();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);   
  }

  render() {

    const { currentTask } = TaskStore;
    const { currentTimer } = TimerStore;

    let button;
    if (TimerStore.isRunning()) {
      button = <button style={styles.button} onClick={()=>this.stop()}>Stop</button>;
    } else {
      button = <button style={styles.button} onClick={()=>this.start()}>Start</button>;
    }

    return (
      <div style={styles.appContainer}>
        <p style={styles.status}>{TimerStore.getStatus()}</p>
        <p style={styles.remainingTime}>{TimerStore.getRemainingTime()}</p>
        {button}
        <Tasks />
      </div> 
    );
  }
}

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
  },
  button: {
    color: 'white',
    background: 'transparent',
    border: '1px solid white',
    borderRadius: 100,
    fontSize: 16,
    padding: '8px 12px',
    minWidth: 125,
    cursor: 'pointer',
  },
  remainingTime: {
    fontSize: 60,
    margin: '16px 24px 24px',
    textShadow: '2px 2px 1px rgba(0,0,0,.34)',
    minHeight: 70,
  },
  status: {
    margin: 0,
    textShadow: '2px 2px 1px rgba(0,0,0,.34)',
  },
}
