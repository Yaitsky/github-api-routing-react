import React, {Component} from 'react';
import 'whatwg-fetch';
import { browserHistory, Link } from 'react-router';

class Repos extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            repositories: []
        };
    }

    componentDidMount() {
        fetch('https://api.github.com/users/yaitsky/repos')
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Server response wasn't OK");
            }
        })
        .then((responseData) => {
            this.setState({repositories: responseData});
        })
        .catch((error) => {
            console.error('Error: ', error);
            // this.props.history.pushState(null, '/error');
        });
    }

    render() {
        let repos = this.state.repositories.map((repo) => (
            <li key={repo.id}>
                <Link to={'/repos/' + repo.name}>{repo.name}</Link>
            </li>
        ));

        let child = this.props.children && React.cloneElement(this.props.children, {
            repositories: this.state.repositories
        });

        return(
            <div>
                <h1>Github Repos</h1>
                <ul className="repos">
                    {repos}
                    {child}
                </ul>
            </div>
        );
    }
}

export default Repos;