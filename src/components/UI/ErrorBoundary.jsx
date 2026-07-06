import { Component } from 'react';
import './ErrorBoundary.css';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      const fallback = this.props.fallback || (
        <div className="error-boundary">
          <div className="error-boundary__content">
            <span className="error-boundary__icon">⚠️</span>
            <h2 className="error-boundary__title">Щось пішло не так</h2>
            <p className="error-boundary__text">
              Сталася помилка під час завантаження цього розділу.
            </p>
            <button className="error-boundary__btn" onClick={this.handleRetry}>
              Спробувати ще раз
            </button>
          </div>
        </div>
      );

      return this.props.fallback || fallback;
    }

    return this.props.children;
  }
}
