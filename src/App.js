import { React, Component } from "react";
import Logo from "./Logo/Logo";
import ImageLinkForm from "./ImageLinkForm/ImageLinkForm";
import "./App.css";
import Particle from "./Particle";
import FaceRecognition from "./FaceRecognition/FaceRecognition";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      },
    };
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };
  displayFaceBox = (box) => {
    this.setState({ box: box });
  };
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };
  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    const PAT = "88025c84d99e4fd28ceaa73166b9efed";
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = "786786";
    const APP_ID = "Smart_Brain_application";
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = "face-detection";
    // const MODEL_VERSION_ID = '45fb9a671625463fa646c3523a3087d5';
    const IMAGE_URL = this.state.input;
    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
            },
          },
        },
      ],
    });
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };

    fetch(
      `https://api.clarifai.com/v2/models/${MODEL_ID}/outputs`,
      requestOptions
    )
      .then((response) => {
        if (response) {
          fetch("http://localhost:3000/image", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            });
        }
        return response.json();
      })

      .then((result) => this.displayFaceBox(this.calculateFaceLocation(result)))
      .catch((error) => console.log("error", error));
  };

  render() {
    const { imageUrl, box } = this.state;
    return (
      <div className="App">
        <Particle />

        <div>
          <Logo />
          <ImageLinkForm
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}
          />
          <FaceRecognition imageUrl={imageUrl} box={box} />
        </div>
      </div>
    );
  }
}

export default App;
