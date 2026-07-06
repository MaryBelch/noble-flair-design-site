import { Component } from 'react';
import { useTranslation } from '../../context/I18nContext';
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
      const {
        fallback,
        errorTitle = 'Щось пішло не так',
        errorText = 'Сталася помилка під час завантаження цього розділу.',
        retryText = 'Спробувати ще раз',
      } = this.props;

      const content = fallback || (
        <div className="error-boundary">
          <div className="error-boundary__content">
            <span className="error-boundary__icon">⚠️</span>
            <h2 className="error-boundary__title">{errorTitle}</h2>
            <p className="error-boundary__text">{errorText}</p>
            <button className="error-boundary__btn" onClick={this.handleRetry}>
              {retryText}
            </button>
          </div>
        </div>
      );

      return content;
    }

    return this.props.children;
  }
}

/** ErrorBoundary wrapper that reads translated fallback text from i18n context */
export function TranslatedErrorBoundary({ children }) {
  const { t } = useTranslation();
  return (
    <ErrorBoundary
      errorTitle={t('error.title')}
      errorText={t('error.text')}
      retryText={t('error.retry')}
    >
      {children}
    </ErrorBoundary>
  );
}
