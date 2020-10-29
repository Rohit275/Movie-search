import React, {Component } from 'react';
import './App.css';
import MovieRow from './MovieRow.js'
import $ from 'jquery'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    //console.log("This is my initializer")

    /* const movies = [
      {id: 0, poster_src: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2F8%2F8a%2FThe_Avengers_%25282012_film%2529_poster.jpg&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FThe_Avengers_(2012_film)&tbnid=gu6TyfpjLCfGYM&vet=12ahUKEwig0vW0o9DsAhWK_TgGHRViAHIQMygBegUIARDUAQ..i&docid=zQuIjGmJr-eC6M&w=220&h=326&q=avengers&ved=2ahUKEwig0vW0o9DsAhWK_TgGHRViAHIQMygBegUIARDUAQ",
      title: "Avengers", overview: "Sample texts here"},
      {id: 1, poster_src: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2F8%2F8a%2FThe_Avengers_%25282012_film%2529_poster.jpg&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FThe_Avengers_(2012_film)&tbnid=gu6TyfpjLCfGYM&vet=12ahUKEwig0vW0o9DsAhWK_TgGHRViAHIQMygBegUIARDUAQ..i&docid=zQuIjGmJr-eC6M&w=220&h=326&q=avengers&ved=2ahUKEwig0vW0o9DsAhWK_TgGHRViAHIQMygBegUIARDUAQ",
      title: "The Avengers", overview: "Sample texts 2 here"},
    ]

    var movieRows = []
    movies.forEach((movie) => {
      console.log(movie.title)
      const movieRow = <MovieRow movie={movie} />
      movieRows.push(movieRow)
    })

    this.state = {rows: movieRows} */

    this.performSearch("batman")
  } 

  performSearch(searchTerm) {
    console.log("perform search using moviedb")
    const urlString = "https://api.themoviedb.org/3/search/movie?api_key=bde0a2db885cb096e564f9314f6d6fe5&query=" + searchTerm
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log("fetched data from moviedb")
        console.log(searchResults)
        const results = searchResults.results
        //console.log(results[0])

        var movieRows = []

        results.forEach((movie) => {
          const posterUrl= 'https://image.tmdb.org/t/p/w600_and_h900_bestv2'+movie.poster_path
          movie.poster_src = posterUrl
          console.log(movie.poster_path)
          const movieRow = <MovieRow key={movie.id} movie={movie}/>
          movieRows.push(movieRow)
        })

        this.setState({rows: movieRows})
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }
    })
  }

  searchChangeHandler(event) {
    console.log(event.target.value)
    const searchTerm = event.target.value
    this.performSearch(searchTerm)
  }

  render() {
    return (
      <div>
        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <img alt ="app icon" width="80" src="Movie.png"/>
              </td>
              <td width ="20"/>
              <td>
                <h1>Movie search</h1>
              </td>
            </tr>
          </tbody>
        </table>
        
        <input style={{
          fontSize: 24,
          display: 'block',
          width: "99%",
          paddingTop: 8,
          paddingLeft: 16,
          paddingBottom: 8
        }} onChange={this.searchChangeHandler.bind(this)} placeholder="Enter your movie here" />

        {this.state.rows}

      </div>
    )
  }
}

export default App;
