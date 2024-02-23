import React from "react";

export default class IfOffline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onLine: navigator ? navigator.onLine : true,
    };
  }

  componentDidMount() {
    if (!window) return;
    window.addEventListener("online", this.handleOnline);
    window.addEventListener("offline", this.handleOffline);
  }

  componentWillUnmount() {
    if (!window) return;
    window.removeEventListener("online", this.handleOnline);
    window.removeEventListener("offline", this.handleOffline);
  }

  handleOnline = () => {
    this.setState({ onLine: true });
  };

  handleOffline = () => {
    this.setState({ onLine: false });
  };

  render() {
    const { children } = this.props;
    const { onLine } = this.state;

    if (onLine) return null;

    return <span>{children}</span>;
  }
}
