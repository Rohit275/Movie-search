import React from 'react'
import './button.css'

class MovieRow extends React.Component {
    viewMovie() {
        console.log("Trying to view the detials")
        const url = "https://www.themoviedb.org/movie/"+this.props.movie.id
        window.location.href = url
    }
    render() {
        return <table key={this.props.movie.id}>
        <tbody>
          <tr>
            <td>
              <img alt="poster" width="120" src="this.props.movie.poster_src"/>
            </td>
            <td>
              <h2>{this.props.movie.title}</h2>
              <p>{this.props.movie.overview}</p>
              <input className="button1" type="button" onClick={this.viewMovie.bind(this)} value="view"/>
            </td>
          </tr>
        </tbody>
      </table>
    }
}

export default MovieRow