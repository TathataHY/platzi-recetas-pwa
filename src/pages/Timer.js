import React from "react";

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { timer: 3, timeLeft: 0 };
  }

  start = async () => {
    if (!("Notification" in window) || !("serviceWorker" in navigator)) {
      return alert("This browser does not support desktop notification");
    }

    if (Notification.permission === "default") {
      await Notification.requestPermission();
    }

    if (Notification.permission === "blocked") {
      return alert("Please allow notifications in your browser settings");
    }

    if (Notification.permission !== "granted") {
      return;
    }

    var timer = this.state.timer;
    this.setState({ timeLeft: timer });

    var countdownInterval = setInterval(() => {
      timer = timer - 1;
      this.setState({ timeLeft: timer });
      if (timer <= 0) {
        clearInterval(countdownInterval);
        this.showNotification();
      }
    }, 1000);
  };

  showNotification = async () => {
    const registration = await navigator.serviceWorker.getRegistration();

    if (!registration) {
      return alert("No registration");
    }

    registration.showNotification("Timer", {
      body: "Time's up!",
      image: "/icon.png",
      icon: "/icon.png",
    });
  };

  handleChange = (e) => {
    this.setState({ timer: e.target.value });
  };

  render() {
    const { timer, timeLeft } = this.state;

    return (
      <div className="Timer">
        <div className="name">Timer</div>
        {timeLeft === 0 ? (
          <div className="center">
            <input
              type="number"
              min="0"
              max="999"
              step="1"
              value={timer}
              onChange={this.handleChange}
            />
            <button onClick={this.start}>Start</button>
          </div>
        ) : (
          <div className="timeLeft">{timeLeft}s</div>
        )}
      </div>
    );
  }
}
