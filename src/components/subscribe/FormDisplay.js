import React from 'react';
import classNames from 'classnames';
import { FaHeart } from 'react-icons/fa';
import './index.less';

class SubscribeForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      inProgress: false
    };
  }

  handleSubmit(event) {
    const { onSubmit } = this.props;
    event.preventDefault();
    this.setState({ inProgress: true });
    const promise = onSubmit
      ? onSubmit(event)
      : Promise.resolve();
    promise.then(() => {
      this.setState({
        thanks: true,
        inProgress: false
      });
    });
  }

  render() {
    const { thanks, inProgress } = this.state;
    const {
      thanksTitle,
      thanksText,
      title,
      emailLabel,
      emailPlaceholder,
      buttonText
    } = this.props;
    const subscribeClasses = classNames('subscribe', {
      'subscribe--thanks': thanks,
      'subscribe--in-progress': inProgress
    });
    if (thanks) {
      return (
        <div className={subscribeClasses}>
          <FaHeart className="subscribe__heart" />
          <p className="h3">{thanksTitle}</p>
          <p>{thanksText}</p>
        </div>
      );
    }
    return (
      <div className={subscribeClasses}>
        <form
          className="subscribe__form"
          onSubmit={this.handleSubmit}
        >
          <h3 className="subscribe_header">{title}</h3>
          <div className="subscribe__controls">
            <input
              aria-label={emailLabel}
              id="subscribe__form-email"
              className={classNames('input', 'input--accent', 'subscribe__form-email')}
              type="email"
              required
              name="email"
              placeholder={emailPlaceholder}
            />
            <button type="submit" className="btn subscribe__form-btn">{buttonText}</button>
          </div>
        </form>
      </div>
    );
  }
}

export default SubscribeForm;
