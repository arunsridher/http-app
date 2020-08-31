import React, { Component } from "react";
import axios from "axios";
import "./App.css";

const apiEndpoint = "https://jsonplaceholder.typicode.com/posts";
class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    const { data: posts } = await axios.get(apiEndpoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "Title", body: "Body" };
    const { data } = await axios.post(apiEndpoint, obj);
    console.log(data);
    const posts = [data, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    post.title = "Arun";
    const response = await axios.put(`${apiEndpoint}/${post.id}`, post);
    if (response.status === 200) {
      let posts = [...this.state.posts];
      const index = posts.indexOf(post);
      posts[index] = post;
      this.setState({ posts });
    }
  };

  handleDelete = async (post) => {
    console.log("Delete ", post);
    const response = await axios.delete(`${apiEndpoint}/${post.id}`);
    if (response.status === 200) {
      let posts = this.state.posts.filter((p) => p.id !== post.id);
      this.setState({ posts });
    }
  };

  render() {
    const { posts } = this.state;
    return (
      <React.Fragment>
        <button className="btn btn-primary btn-md" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
