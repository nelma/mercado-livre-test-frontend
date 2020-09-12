import React from 'react';
import PropTypes from 'prop-types';


import styles from './Search.module.scss';

class Search extends React.PureComponent {

  static propTypes = {
    fetcher: PropTypes.func
  }

  render() {
    return (
      <div className={styles.SearchLogo}>
        <div className={styles.CustomInput}>
          <input type="text" placeholder="Nunca deixe de buscar" className={styles.SearchInput} />
          <i className={styles.SearchIcon} onClick={this.props.fetcher}></i>
        </div>
      </div>
    )
  }
}

export default Search;