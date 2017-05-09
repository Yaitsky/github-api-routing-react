import React, {Component} from 'react';
import 'whatwg-fetch';
import 'babel-polyfill';

class RepoDetails extends Component {
    render() {
        let repository = this.props.repositories.find(
            (repo) => repo.name === this.props.params.repo_name
        );
        let stars = [];
        for (var i = 0; i < repository.stargazers_count; i++) {
            stars.push('★');
        }
        return (
            <div>
                <h2>{repository.name}</h2>
                <p>{repository.description}</p>
                <span>{stars}</span>
            </div>
        );
    }
}

export default RepoDetails;