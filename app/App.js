import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {render} from 'react-dom';

class ContactAppContainer extends Component {
  constructor() {
    super();
    this.state = {
      contacts: []
    }
  }

  componentDidMount() {
    fetch('./contacts.json')
      .then((response) => response.json())
      .then((responseData) => this.setState({contacts: responseData}))
      .catch((error) => {
        console.log('Error fetching contact-list', error);
      });
  }

  render() {
    return (<ContactApp contacts={this.state.contacts}/>);
  }
}

class ContactApp extends Component {
  constructor() {
    super();
    this.state = {
      filterText: ''
    }
  }

  handleUserInput(searchItem) {
    this.setState({filterText: searchItem});
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          onUserInput={this
          .handleUserInput
          .bind(this)}/>
        <ContactList
          contactList={this.props.contacts}
          filterText={this.state.filterText}/>
      </div>
    );
  }
}

ContactApp.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object)
}

class SearchBar extends Component {
  handleChange(event) {
    this
      .props
      .onUserInput(event.target.value);
  }
  render() {
    return (<input
      type="search"
      placeholder="search"
      value={this.props.filterText}
      onChange={this
      .handleChange
      .bind(this)}/>);
  }
}

SearchBar.propTypes = {
  filterText: PropTypes.string
}

function isMatching(full, chunk) {
  var string = full.toLowerCase(),
    substring = chunk.toLowerCase();

  if (string.indexOf(substring) + 1) {
    return true;
  }

  return false;
}

class ContactList extends Component {
  render() {
    let filteredContacts = this
      .props
      .contactList
      .filter((contact) => isMatching(contact.name, this.props.filterText));
    return (
      <ul>
        {filteredContacts.map((contact) => <ContactItem key={contact.email} name={contact.name} email={contact.email}/>)}
      </ul>
    );
  }
}

ContactList.propTypes = {
  contactList: PropTypes.arrayOf(PropTypes.object)
}

class ContactItem extends Component {
  render() {
    return (
      <li key={this.props.id}>
        {this.props.name}
        - {this.props.email}
      </li>
    );
  }
}

ContactItem.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string
}

render(
  <ContactAppContainer/>, document.getElementById('root'));
